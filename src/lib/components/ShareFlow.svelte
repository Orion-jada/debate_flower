<script lang="ts">
	import {
		createShareInvite,
		listFlowShares,
		removeShare,
		shareFlowByEmail,
		type FlowShareWithProfile,
	} from "$lib/models/flowApi";
	import { currentCloudFlowId } from "$lib/models/store";
	import { flowPresence, type PresenceUser } from "$lib/models/flowSync";
	import { currentUser } from "$lib/models/auth";

	let inviteLink = "";
	let shares: FlowShareWithProfile[] = [];
	let loading = false;
	let copied = false;

	// Email sharing
	let shareEmail = "";
	let shareEmailError = "";
	let shareEmailLoading = false;
	let shareEmailSuccess = false;

	$: if ($currentCloudFlowId) {
		loadShares();
	}

	// Filter out current user from presence
	$: otherViewers = $flowPresence.filter(
		(u) => u.user_id !== $currentUser?.id
	);

	async function loadShares() {
		if (!$currentCloudFlowId) return;
		shares = await listFlowShares($currentCloudFlowId);
	}

	async function generateLink() {
		if (!$currentCloudFlowId) return;
		loading = true;
		const token = await createShareInvite($currentCloudFlowId, "edit");
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
			const input = document.createElement("input");
			input.value = inviteLink;
			document.body.appendChild(input);
			input.select();
			document.execCommand("copy");
			document.body.removeChild(input);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		}
	}

	async function handleShareByEmail() {
		if (!$currentCloudFlowId || !shareEmail.trim()) return;
		shareEmailError = "";
		shareEmailSuccess = false;
		shareEmailLoading = true;

		const result = await shareFlowByEmail(
			$currentCloudFlowId,
			shareEmail.trim()
		);

		if (result.success) {
			shareEmailSuccess = true;
			shareEmail = "";
			await loadShares();
			setTimeout(() => (shareEmailSuccess = false), 3000);
		} else {
			shareEmailError = result.error || "Failed to share";
		}
		shareEmailLoading = false;
	}

	async function handleRemoveShare(shareId: string) {
		await removeShare(shareId);
		shares = shares.filter((s) => s.id !== shareId);
	}

	function getInitials(name: string): string {
		return (
			name
				.split(" ")
				.map((w) => w[0])
				.join("")
				.toUpperCase()
				.slice(0, 2) || "?"
		);
	}

	function getAvatarColor(userId: string): string {
		let hash = 0;
		for (let i = 0; i < userId.length; i++) {
			hash = userId.charCodeAt(i) + ((hash << 5) - hash);
		}
		const hue = Math.abs(hash) % 360;
		return `hsl(${hue}, 55%, 50%)`;
	}
</script>

<div class="share-flow">
	<h3>Share this Flow</h3>

	{#if !$currentCloudFlowId}
		<p class="warning">Save this flow first before sharing.</p>
	{:else}
		<!-- Active viewers -->
		{#if otherViewers.length > 0}
			<div class="presence-section">
				<div class="presence-label">Currently viewing</div>
				<div class="presence-avatars">
					{#each otherViewers as viewer}
						<div
							class="presence-avatar"
							style="background: {getAvatarColor(viewer.user_id)}"
							title="{viewer.display_name} ({viewer.email})"
						>
							{getInitials(viewer.display_name)}
						</div>
					{/each}
					<div class="presence-names">
						{#each otherViewers as viewer, i}
							<span class="presence-name"
								>{viewer.display_name}{i <
								otherViewers.length - 1
									? ", "
									: ""}</span
							>
						{/each}
					</div>
				</div>
			</div>
		{/if}

		<!-- Share by email -->
		<div class="email-section">
			<div class="section-title">Invite by email</div>
			<form
				class="email-form"
				on:submit|preventDefault={handleShareByEmail}
			>
				<input
					type="email"
					placeholder="partner@email.com"
					bind:value={shareEmail}
					disabled={shareEmailLoading}
				/>
				<button
					type="submit"
					class="invite-btn"
					disabled={shareEmailLoading || !shareEmail.trim()}
				>
					{shareEmailLoading ? "..." : "Invite"}
				</button>
			</form>
			{#if shareEmailError}
				<div class="email-error">{shareEmailError}</div>
			{/if}
			{#if shareEmailSuccess}
				<div class="email-success">Shared successfully!</div>
			{/if}
		</div>

		<!-- Or share via link -->
		<div class="link-section">
			<div class="section-title">Or share via link</div>
			{#if !inviteLink}
				<button
					class="generate-btn"
					on:click={generateLink}
					disabled={loading}
				>
					{loading ? "Generating..." : "Generate Share Link"}
				</button>
			{:else}
				<div class="link-container">
					<div class="link-text">{inviteLink}</div>
					<button class="copy-btn" on:click={copyLink}>
						{copied ? "Copied!" : "Copy"}
					</button>
				</div>
				<button
					class="generate-btn secondary"
					on:click={generateLink}
					disabled={loading}
				>
					Generate New Link
				</button>
			{/if}
		</div>

		<!-- Collaborators list -->
		{#if shares.length > 0}
			<div class="collaborators">
				<div class="section-title">Collaborators</div>
				{#each shares as share}
					<div class="collaborator">
						<div class="collab-left">
							{#if share.shared_with}
								<div
									class="collab-avatar"
									style="background: {getAvatarColor(
										share.shared_with
									)}"
								>
									{getInitials(share.shared_with_name || "?")}
								</div>
								<div class="collab-details">
									<span class="collab-name"
										>{share.shared_with_name ||
											"Unknown"}</span
									>
									<span class="collab-email"
										>{share.shared_with_email || ""}</span
									>
								</div>
							{:else if share.invite_token}
								<div class="collab-avatar pending-avatar">
									?
								</div>
								<div class="collab-details">
									<span class="collab-name"
										>Pending invite</span
									>
									<span class="collab-email"
										>Link not yet accepted</span
									>
								</div>
							{/if}
						</div>
						<div class="collab-right">
							<span class="permission-badge"
								>{share.permission}</span
							>
							<button
								class="remove-btn"
								on:click={() => handleRemoveShare(share.id)}
							>
								Remove
							</button>
						</div>
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
		gap: 1.25rem;
		padding: 0.5rem;
		min-width: 360px;
	}
	h3 {
		margin: 0;
		font-size: 1.2rem;
	}
	.section-title {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		opacity: 0.55;
		font-weight: var(--font-weight-bold);
		margin-bottom: 0.4rem;
	}
	.warning {
		margin: 0;
		color: hsl(40, 80%, 55%);
		font-size: 0.85rem;
	}

	/* ─── Presence ─── */
	.presence-section {
		background: var(--background-accent-indent);
		border-radius: calc(var(--border-radius) * 0.5);
		padding: 0.75rem;
	}
	.presence-label {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		opacity: 0.5;
		margin-bottom: 0.4rem;
	}
	.presence-avatars {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		flex-wrap: wrap;
	}
	.presence-avatar {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.65rem;
		font-weight: bold;
		color: white;
		flex-shrink: 0;
	}
	.presence-names {
		margin-left: 0.35rem;
		font-size: 0.8rem;
	}
	.presence-name {
		font-weight: var(--font-weight-bold);
	}

	/* ─── Email invite ─── */
	.email-form {
		display: flex;
		gap: 0.4rem;
	}
	.email-form input {
		flex: 1;
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--text-weak);
		border-radius: calc(var(--border-radius) * 0.4);
		background: transparent;
		color: inherit;
		font-family: inherit;
		font-size: 0.85rem;
		outline: none;
	}
	.email-form input:focus {
		border-color: var(--accent-text);
	}
	.invite-btn {
		padding: 0.5rem 0.85rem;
		border: none;
		border-radius: calc(var(--border-radius) * 0.4);
		background: var(--accent-text);
		color: var(--background);
		font-size: 0.85rem;
		font-weight: var(--font-weight-bold);
		cursor: pointer;
		white-space: nowrap;
	}
	.invite-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
	.email-error {
		color: hsl(0, 60%, 55%);
		font-size: 0.8rem;
	}
	.email-success {
		color: hsl(120, 45%, 50%);
		font-size: 0.8rem;
	}

	/* ─── Link sharing ─── */
	.generate-btn {
		padding: 0.55rem 1rem;
		border: none;
		border-radius: calc(var(--border-radius) * 0.5);
		background: var(--accent-text);
		color: var(--background);
		font-size: 0.85rem;
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
		font-size: 0.75rem;
		padding: 0.35rem 0.65rem;
		margin-top: 0.3rem;
	}
	.link-container {
		display: flex;
		gap: 0.4rem;
		align-items: center;
	}
	.link-text {
		flex: 1;
		padding: 0.45rem 0.65rem;
		background: var(--background-accent-indent);
		border-radius: calc(var(--border-radius) * 0.4);
		font-size: 0.75rem;
		word-break: break-all;
		font-family: monospace;
	}
	.copy-btn {
		padding: 0.45rem 0.65rem;
		border: none;
		border-radius: calc(var(--border-radius) * 0.4);
		background: var(--accent-text);
		color: var(--background);
		font-size: 0.75rem;
		cursor: pointer;
		white-space: nowrap;
	}

	/* ─── Collaborators ─── */
	.collaborators {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.collaborator {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0.65rem;
		background: var(--background-accent-indent);
		border-radius: calc(var(--border-radius) * 0.5);
		gap: 0.5rem;
	}
	.collab-left {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-width: 0;
		flex: 1;
	}
	.collab-avatar {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.65rem;
		font-weight: bold;
		color: white;
		flex-shrink: 0;
	}
	.pending-avatar {
		background: hsl(40, 40%, 45%) !important;
	}
	.collab-details {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}
	.collab-name {
		font-size: 0.85rem;
		font-weight: var(--font-weight-bold);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.collab-email {
		font-size: 0.7rem;
		opacity: 0.55;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.collab-right {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		flex-shrink: 0;
	}
	.permission-badge {
		font-size: 0.65rem;
		padding: 0.1rem 0.35rem;
		border-radius: 3px;
		background: hsl(210, 40%, 40%);
		color: white;
		text-transform: uppercase;
	}
	.remove-btn {
		padding: 0.2rem 0.4rem;
		border: none;
		border-radius: 3px;
		background: hsl(0, 50%, 45%);
		color: white;
		font-size: 0.7rem;
		cursor: pointer;
	}
	.remove-btn:hover {
		background: hsl(0, 50%, 55%);
	}
</style>
