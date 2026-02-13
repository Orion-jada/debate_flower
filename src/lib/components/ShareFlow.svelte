<script lang="ts">
	import { createShareInvite, listFlowShares, removeShare, type FlowShareRecord } from '$lib/models/flowApi';
	import { currentCloudFlowId } from '$lib/models/store';
	import Icon from './Icon.svelte';

	let inviteLink = '';
	let shares: FlowShareRecord[] = [];
	let loading = false;
	let copied = false;

	$: if ($currentCloudFlowId) {
		loadShares();
	}

	async function loadShares() {
		if (!$currentCloudFlowId) return;
		shares = await listFlowShares($currentCloudFlowId);
	}

	async function generateLink() {
		if (!$currentCloudFlowId) return;
		loading = true;
		const token = await createShareInvite($currentCloudFlowId, 'edit');
		if (token) {
			inviteLink = `${window.location.origin}/app?invite=${token}`;
		}
		loading = false;
	}

	async function copyLink() {
		if (!inviteLink) return;
		try {
			await navigator.clipboard.writeText(inviteLink);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			// fallback
			const input = document.createElement('input');
			input.value = inviteLink;
			document.body.appendChild(input);
			input.select();
			document.execCommand('copy');
			document.body.removeChild(input);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		}
	}

	async function handleRemoveShare(shareId: string) {
		await removeShare(shareId);
		shares = shares.filter((s) => s.id !== shareId);
	}
</script>

<div class="share-flow">
	<h3>Share this Flow</h3>
	<p class="info">Share this flow with your debate partner. Anyone with the link can edit it.</p>

	{#if !$currentCloudFlowId}
		<p class="warning">Save this flow first before sharing.</p>
	{:else}
		{#if !inviteLink}
			<button class="generate-btn" on:click={generateLink} disabled={loading}>
				{loading ? 'Generating...' : 'Generate Share Link'}
			</button>
		{:else}
			<div class="link-container">
				<div class="link-text">{inviteLink}</div>
				<button class="copy-btn" on:click={copyLink}>
					{copied ? 'Copied!' : 'Copy'}
				</button>
			</div>
			<button class="generate-btn secondary" on:click={generateLink} disabled={loading}>
				Generate New Link
			</button>
		{/if}

		{#if shares.length > 0}
			<div class="collaborators">
				<h4>Collaborators</h4>
				{#each shares as share}
					<div class="collaborator">
						<span class="collab-info">
							{#if share.shared_with}
								<span class="badge">Active</span>
							{:else if share.invite_token}
								<span class="badge pending">Pending invite</span>
							{/if}
							<span class="permission">{share.permission}</span>
						</span>
						<button class="remove-btn" on:click={() => handleRemoveShare(share.id)}>
							Remove
						</button>
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</div>

<style>
	.share-flow {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0.5rem;
	}
	h3 {
		margin: 0;
		font-size: 1.2rem;
	}
	h4 {
		margin: 0;
		font-size: 1rem;
		opacity: 0.8;
	}
	.info {
		margin: 0;
		font-size: 0.85rem;
		opacity: 0.7;
	}
	.warning {
		margin: 0;
		color: hsl(40, 80%, 55%);
		font-size: 0.85rem;
	}
	.generate-btn {
		padding: 0.6rem 1rem;
		border: none;
		border-radius: calc(var(--border-radius) * 0.5);
		background: var(--accent-text);
		color: var(--background);
		font-size: 0.9rem;
		font-weight: var(--font-weight-bold);
		cursor: pointer;
		transition: opacity var(--transition-speed) ease;
	}
	.generate-btn:hover:not(:disabled) {
		opacity: 0.85;
	}
	.generate-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.generate-btn.secondary {
		background: transparent;
		color: var(--accent-text);
		border: 1px solid var(--accent-text);
		font-size: 0.8rem;
		padding: 0.4rem 0.75rem;
	}
	.link-container {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
	.link-text {
		flex: 1;
		padding: 0.5rem 0.75rem;
		background: var(--background-accent-indent);
		border-radius: calc(var(--border-radius) * 0.5);
		font-size: 0.8rem;
		word-break: break-all;
		font-family: monospace;
	}
	.copy-btn {
		padding: 0.5rem 0.75rem;
		border: none;
		border-radius: calc(var(--border-radius) * 0.5);
		background: var(--accent-text);
		color: var(--background);
		font-size: 0.8rem;
		cursor: pointer;
		white-space: nowrap;
	}
	.collaborators {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.collaborator {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0.75rem;
		background: var(--background-accent-indent);
		border-radius: calc(var(--border-radius) * 0.5);
	}
	.collab-info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
	}
	.badge {
		font-size: 0.75rem;
		padding: 0.15rem 0.4rem;
		border-radius: 3px;
		background: hsl(120, 40%, 40%);
		color: white;
	}
	.badge.pending {
		background: hsl(40, 60%, 45%);
	}
	.permission {
		opacity: 0.6;
		font-size: 0.75rem;
		text-transform: uppercase;
	}
	.remove-btn {
		padding: 0.25rem 0.5rem;
		border: none;
		border-radius: 3px;
		background: hsl(0, 50%, 45%);
		color: white;
		font-size: 0.75rem;
		cursor: pointer;
	}
	.remove-btn:hover {
		background: hsl(0, 50%, 55%);
	}
</style>
