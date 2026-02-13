import { writable, derived } from 'svelte/store';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '$lib/supabase';

// Stores
export const currentUser = writable<User | null>(null);
export const session = writable<Session | null>(null);
export const authLoading = writable<boolean>(true);
export const isLoggedIn = derived(currentUser, ($user) => $user != null);

// Initialize auth state listener
export function initAuth() {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: s } }) => {
        session.set(s);
        currentUser.set(s?.user ?? null);
        authLoading.set(false);
    });

    // Listen for auth changes
    const {
        data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, s) => {
        session.set(s);
        currentUser.set(s?.user ?? null);
        authLoading.set(false);
    });

    return () => subscription.unsubscribe();
}

// Sign in with Google OAuth
export async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin + '/app'
        }
    });
    if (error) {
        console.error('Google sign-in error:', error.message);
        throw error;
    }
}

// Sign in with email and password
export async function signInWithEmail(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (error) {
        console.error('Email sign-in error:', error.message);
        throw error;
    }
}

// Sign up with email and password
export async function signUpWithEmail(email: string, password: string) {
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: window.location.origin + '/app'
        }
    });
    if (error) {
        console.error('Email sign-up error:', error.message);
        throw error;
    }
}

// Sign out
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Sign-out error:', error.message);
        throw error;
    }
}
