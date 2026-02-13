import { derived, writable, type Writable } from 'svelte/store';
import type { Nodes } from './node';
import type { Connections } from './sharingConnection';
import type { PendingAction } from './nodePendingAction';

export function newNodes(): Nodes {
	return {
		root: { value: { tag: 'root' }, level: -1, parent: null, children: [] }
	};
}
export const _nodesMut: Writable<Nodes> = writable(newNodes());
export const nodes = derived(_nodesMut, (value) => value);

export const connections: Writable<Connections> = writable({
	tag: 'empty'
});
export const pendingAction: Writable<PendingAction | null> = writable(null);

export const tutorialStep = writable(0);
export const activeMouse = writable(true);
export const tooltipState = writable({
	open: false,
	claimed: false
});
export const appMinimized = writable(false);
export const isSheetSharing = writable(false);

// Cloud storage stores
import type { FlowRecord } from './flowApi';
/** The Supabase flow ID currently being edited */
export const currentCloudFlowId = writable<string | null>(null);
/** List of owned + shared flows from the backend */
export const cloudFlowList = writable<FlowRecord[]>([]);
/** Save status for UI feedback */
export const saveStatus = writable<'saved' | 'saving' | 'error' | 'idle'>('idle');

const flowsChangeCallbacks: (() => void)[] = [];
export function subscribeFlowsChange(callback: () => void): () => void {
	flowsChangeCallbacks.push(callback);
	return () => {
		const index = flowsChangeCallbacks.indexOf(callback);
		if (index !== -1) {
			flowsChangeCallbacks.splice(index, 1);
		}
	};
}
export function flowsChange() {
	flowsChangeCallbacks.forEach((callback) => callback());
}

export const sideDocText = writable('');

export const frozen = derived(connections, (connections) => {
	return (
		connections.tag == 'guest' &&
		connections.connection.tag == 'guestConnected' &&
		connections.connection.awaitingSync
	);
});
