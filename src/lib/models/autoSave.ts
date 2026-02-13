import { nodes, subscribeFlowsChange, currentCloudFlowId, cloudFlowList, saveStatus } from '$lib/models/store';
import type { Writable } from 'svelte/store';
import { writable, derived, get } from 'svelte/store';
import { getJson, loadNodes, downloadString } from './file';
import { getNode, isNodesWorthSaving, type Nodes } from './node';
import { replaceNodes } from './nodeDecorateAction';
import { saveFlow, createFlow, listFlows, loadFlow, deleteFlowFromDb, type FlowRecord } from './flowApi';
import { isLoggedIn, currentUser } from './auth';
import { suppressNextUpdate, subscribeToFlow, unsubscribeFromFlow } from './flowSync';
import { supabase } from '$lib/supabase';

// ─── Local auto‑save (kept as offline fallback) ───────────────────────

let localFlowKey: LocalNodeKey | null = null;
const savedNodesDatasMut: Writable<SavedNodesDatas> = writable(getSavedNodesDatas());
export const savedNodesDatas = derived(savedNodesDatasMut, (value) => value);

export const MAX_SAVED_FLOWS = 20;

export type LocalNodeKey = string;

export type SavedNodesData = {
	created: string;
	modified: string;
	flowInfos: { content: string; invert: boolean }[];
};

export type SavedNodesDatas = {
	[key: LocalNodeKey]: SavedNodesData;
};

function newLocalNodeKey(): LocalNodeKey {
	const uuid = crypto.randomUUID();
	return `flow:${uuid}`;
}

let $nodes: Nodes;
nodes.subscribe((nodes) => {
	$nodes = nodes;
});

let $savedNodesDatasMut: SavedNodesDatas;
savedNodesDatasMut.subscribe((value) => {
	$savedNodesDatasMut = value;
	try {
		localStorage.setItem('savedFlows', JSON.stringify(value));
	} catch {
		// localStorage might be unavailable
	}
});

// ─── Cloud auto‑save ──────────────────────────────────────────────────

let lastSaveTime = Date.now();
let saveTimeout: ReturnType<typeof setTimeout> | null = null;

export function maybeSaveNodes() {
	if (!isNodesWorthSaving($nodes)) return;

	const now = Date.now();
	if (now - lastSaveTime < 3000) {
		// Debounce: schedule a save in the remaining time
		if (saveTimeout == null) {
			saveTimeout = setTimeout(() => {
				saveTimeout = null;
				maybeSaveNodes();
			}, 3000 - (now - lastSaveTime));
		}
		return;
	}
	lastSaveTime = now;

	if (get(isLoggedIn)) {
		saveToCloud($nodes);
	} else {
		saveToLocal($nodes);
	}
}

async function saveToCloud(nodesData: Nodes) {
	const cloudId = get(currentCloudFlowId);
	saveStatus.set('saving');

	try {
		if (cloudId) {
			// Get the title from the first flow
			const title = nodesData.root.children.length > 0
				? getNode(nodesData, nodesData.root.children[0]).unwrap().value.content || 'Untitled'
				: 'Untitled';

			suppressNextUpdate();
			const success = await saveFlow(cloudId, nodesData, title);
			if (success) {
				saveStatus.set('saved');
				// Refresh the flow list to get updated timestamps
				refreshFlowList();
			} else {
				saveStatus.set('error');
				// Fallback to local save
				saveToLocal(nodesData);
			}
		} else {
			// No cloud flow ID yet — create a new one
			const title = nodesData.root.children.length > 0
				? getNode(nodesData, nodesData.root.children[0]).unwrap().value.content || 'Untitled'
				: 'Untitled';

			const record = await createFlow(title, nodesData);
			if (record) {
				currentCloudFlowId.set(record.id);
				subscribeToFlow(record.id);
				saveStatus.set('saved');
				refreshFlowList();
			} else {
				saveStatus.set('error');
				saveToLocal(nodesData);
			}
		}
	} catch {
		saveStatus.set('error');
		saveToLocal(nodesData);
	}
}

function saveToLocal(nodesData: Nodes) {
	try {
		savedNodesDatasMut.set(getSavedNodesDatas());
		const data: string = getJson(nodesData);
		if (localFlowKey === null) {
			localFlowKey = newLocalNodeKey();
		}
		localStorage.setItem(localFlowKey, data);
		$savedNodesDatasMut[localFlowKey] = {
			created: $savedNodesDatasMut[localFlowKey]?.created ?? new Date().toISOString(),
			modified: new Date().toISOString(),
			flowInfos: nodesData.root.children.map((flowId) => ({
				content: getNode(nodesData, flowId).unwrap().value.content,
				invert: getNode(nodesData, flowId).unwrap().value.invert
			}))
		};
		// Evict oldest
		const keys = Object.keys($savedNodesDatasMut);
		if (keys.length > MAX_SAVED_FLOWS) {
			const oldestKey = keys.reduce((a, b) =>
				$savedNodesDatasMut[a].modified < $savedNodesDatasMut[b].modified ? a : b
			);
			delete $savedNodesDatasMut[oldestKey];
			localStorage.removeItem(oldestKey);
		}
		savedNodesDatasMut.set($savedNodesDatasMut);
	} catch {
		// localStorage might be unavailable
	}
}

subscribeFlowsChange(maybeSaveNodes);

// ─── Cloud flow management ────────────────────────────────────────────

/**
 * Refresh the flow list from Supabase.
 */
export async function refreshFlowList() {
	if (!get(isLoggedIn)) {
		cloudFlowList.set([]);
		return;
	}
	try {
		const flows = await listFlows();
		cloudFlowList.set(flows);
	} catch {
		console.error('Failed to refresh flow list');
	}
}

/**
 * Open a flow from the cloud. Loads its nodes and subscribes to realtime.
 */
export async function openCloudFlow(flowId: string) {
	const record = await loadFlow(flowId);
	if (!record) return;

	currentCloudFlowId.set(record.id);
	subscribeToFlow(record.id);

	const nodesData = record.nodes_data as Nodes;
	replaceNodes(nodesData);
	saveStatus.set('saved');
}

/**
 * Create a new empty cloud flow and switch to it.
 */
export function startNewCloudFlow() {
	unsubscribeFromFlow();
	currentCloudFlowId.set(null);
	saveStatus.set('idle');
}

/**
 * Delete a cloud flow.
 */
export async function deleteCloudFlow(flowId: string) {
	const success = await deleteFlowFromDb(flowId);
	if (success) {
		const currentId = get(currentCloudFlowId);
		if (currentId === flowId) {
			startNewCloudFlow();
			replaceNodes({ root: { value: { tag: 'root' }, level: -1, parent: null, children: [] } } as Nodes);
		}
		refreshFlowList();
	}
}

/**
 * Rename a cloud flow's title.
 */
export async function renameCloudFlow(flowId: string, newTitle: string) {
	const { error } = await supabase
		.from('flows')
		.update({ title: newTitle, updated_at: new Date().toISOString() })
		.eq('id', flowId);

	if (error) {
		console.error('Error renaming flow:', error);
		return;
	}
	refreshFlowList();
}

// ─── Local storage helpers (kept for backward compat) ─────────────────

export function unsetFlowKey() {
	localFlowKey = null;
	// Also reset cloud flow ID so a new one is created
	startNewCloudFlow();
}

export function getSavedNodesDatas(): SavedNodesDatas {
	try {
		const raw = localStorage.getItem('savedFlows');
		if (raw === null) {
			localStorage.setItem('savedFlows', JSON.stringify({}));
			return {};
		}
		return JSON.parse(raw);
	} catch {
		return {};
	}
}

export function loadSavedNodes(key: LocalNodeKey, modifyOriginal = false) {
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return;
		const nodesObj = JSON.parse(raw);
		const newNodes: Nodes = loadNodes(nodesObj);
		replaceNodes(newNodes);
		if (modifyOriginal) {
			localFlowKey = key;
		}
	} catch {
		// skip
	}
}

export function deleteNodes(key: LocalNodeKey) {
	try {
		savedNodesDatasMut.set(getSavedNodesDatas());
		localStorage.removeItem(key);
		if (Object.hasOwn($savedNodesDatasMut, key)) {
			delete $savedNodesDatasMut[key];
			savedNodesDatasMut.set($savedNodesDatasMut);
		}
	} catch {
		// skip
	}
}

export function downloadSavedNodes(key: LocalNodeKey) {
	try {
		const raw = localStorage.getItem(key);
		if (raw === null) return;
		const data = JSON.parse(raw);
		downloadString(JSON.stringify(data), 'flow.json');
	} catch {
		// skip
	}
}
