<script lang="ts">
	import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '$lib/models/auth';

	let mode: 'login' | 'signup' = 'login';
	let email = '';
	let password = '';
	let error = '';
	let loading = false;
	let signupSuccess = false;

	async function handleGoogle() {
		loading = true;
		error = '';
		try {
			await signInWithGoogle();
		} catch (e: any) {
			error = e.message || 'Failed to sign in with Google';
			loading = false;
		}
	}

	async function handleEmailSubmit() {
		if (!email || !password) {
			error = 'Please fill in both fields';
			return;
		}
		loading = true;
		error = '';
		try {
			if (mode === 'login') {
				await signInWithEmail(email, password);
			} else {
				await signUpWithEmail(email, password);
				signupSuccess = true;
				loading = false;
			}
		} catch (e: any) {
			error = e.message || 'Authentication failed';
			loading = false;
		}
	}
</script>

<div class="auth-container">
	<div class="auth-card">
		<h2>{mode === 'login' ? 'Sign In' : 'Create Account'}</h2>
		<p class="subtitle">
			{mode === 'login' ? 'Sign in to save and share your flows' : 'Create an account to get started'}
		</p>

		{#if signupSuccess}
			<div class="success">
				Check your email for a confirmation link!
			</div>
		{:else}
			<button class="google-btn" on:click={handleGoogle} disabled={loading}>
				<svg viewBox="0 0 24 24" width="20" height="20">
					<path
						fill="#4285F4"
						d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
					/>
					<path
						fill="#34A853"
						d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
					/>
					<path
						fill="#FBBC05"
						d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
					/>
					<path
						fill="#EA4335"
						d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
					/>
				</svg>
				Continue with Google
			</button>

			<div class="divider">
				<span>or</span>
			</div>

			<form on:submit|preventDefault={handleEmailSubmit}>
				<input
					type="email"
					placeholder="Email"
					bind:value={email}
					disabled={loading}
					autocomplete="email"
				/>
				<input
					type="password"
					placeholder="Password"
					bind:value={password}
					disabled={loading}
					autocomplete={mode === 'login' ? 'current-password' : 'new-password'}
				/>
				{#if error}
					<div class="error">{error}</div>
				{/if}
				<button type="submit" class="email-btn" disabled={loading}>
					{loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
				</button>
			</form>

			<button class="switch-mode" on:click={() => { mode = mode === 'login' ? 'signup' : 'login'; error = ''; }}>
				{mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
			</button>
		{/if}
	</div>
</div>

<style>
	.auth-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		padding: 2rem;
		box-sizing: border-box;
	}
	.auth-card {
		background: var(--background);
		border-radius: var(--border-radius);
		padding: 2.5rem;
		width: 100%;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	h2 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: var(--font-weight-bold);
		text-align: center;
	}
	.subtitle {
		margin: 0;
		text-align: center;
		opacity: 0.7;
		font-size: 0.9rem;
	}
	.google-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		width: 100%;
		padding: 0.75rem 1rem;
		border: 1px solid var(--text-weak);
		border-radius: calc(var(--border-radius) * 0.5);
		background: transparent;
		color: inherit;
		font-size: 1rem;
		cursor: pointer;
		transition: background var(--transition-speed) ease;
	}
	.google-btn:hover:not(:disabled) {
		background: var(--background-accent-indent);
	}
	.google-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.divider {
		display: flex;
		align-items: center;
		gap: 1rem;
		opacity: 0.5;
		font-size: 0.85rem;
	}
	.divider::before,
	.divider::after {
		content: '';
		flex: 1;
		height: 1px;
		background: currentColor;
		opacity: 0.3;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	input {
		padding: 0.75rem 1rem;
		border: 1px solid var(--text-weak);
		border-radius: calc(var(--border-radius) * 0.5);
		background: transparent;
		color: inherit;
		font-size: 1rem;
		font-family: inherit;
		outline: none;
		transition: border-color var(--transition-speed) ease;
	}
	input:focus {
		border-color: var(--accent-text);
	}
	input:disabled {
		opacity: 0.5;
	}
	.email-btn {
		padding: 0.75rem 1rem;
		border: none;
		border-radius: calc(var(--border-radius) * 0.5);
		background: var(--accent-text);
		color: var(--background);
		font-size: 1rem;
		font-weight: var(--font-weight-bold);
		cursor: pointer;
		transition: opacity var(--transition-speed) ease;
	}
	.email-btn:hover:not(:disabled) {
		opacity: 0.9;
	}
	.email-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.error {
		color: hsl(0, 70%, 60%);
		font-size: 0.85rem;
		text-align: center;
	}
	.success {
		background: hsla(120, 40%, 50%, 0.15);
		color: hsl(120, 40%, 60%);
		padding: 1rem;
		border-radius: calc(var(--border-radius) * 0.5);
		text-align: center;
		font-size: 0.9rem;
	}
	.switch-mode {
		background: none;
		border: none;
		color: var(--accent-text);
		cursor: pointer;
		font-size: 0.85rem;
		text-align: center;
		padding: 0.5rem;
	}
	.switch-mode:hover {
		text-decoration: underline;
	}
</style>
