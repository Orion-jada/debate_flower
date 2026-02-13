import { supabase } from '$lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';
import type { Nodes } from './node';
import { replaceNodes } from './nodeDecorateAction';
import { writable } from 'svelte/store';
import { get } from 'svelte/store';
import { currentUser } from './auth';

let currentChannel: RealtimeChannel | null = null;
let currentFlowId: string | null = null;
let suppressNextRemoteUpdate = false;

export type PresenceUser = {
    user_id: string;
    email: string;
    display_name: string;
    online_at: string;
};

/** Reactive store of users currently viewing/editing the flow */
export const flowPresence = writable<PresenceUser[]>([]);

/**
 * Subscribe to realtime updates AND presence for a specific flow.
 */
export function subscribeToFlow(flowId: string) {
    // Unsubscribe from previous flow
    unsubscribeFromFlow();

    currentFlowId = flowId;

    const user = get(currentUser);
    const userPresence: PresenceUser = {
        user_id: user?.id ?? 'unknown',
        email: user?.email ?? 'unknown',
        display_name: user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'Unknown',
        online_at: new Date().toISOString()
    };

    currentChannel = supabase
        .channel(`flow:${flowId}`, {
            config: {
                presence: {
                    key: user?.id ?? 'unknown'
                }
            }
        })
        .on(
            'postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: 'flows',
                filter: `id=eq.${flowId}`
            },
            (payload) => {
                if (suppressNextRemoteUpdate) {
                    suppressNextRemoteUpdate = false;
                    return;
                }

                const newNodesData = payload.new.nodes_data as Nodes;
                if (newNodesData) {
                    replaceNodes(newNodesData);
                }
            }
        )
        .on('presence', { event: 'sync' }, () => {
            if (!currentChannel) return;
            const state = currentChannel.presenceState<PresenceUser>();
            const users: PresenceUser[] = [];
            const seenIds = new Set<string>();

            for (const key of Object.keys(state)) {
                for (const presence of state[key]) {
                    if (!seenIds.has(presence.user_id)) {
                        seenIds.add(presence.user_id);
                        users.push({
                            user_id: presence.user_id,
                            email: presence.email,
                            display_name: presence.display_name,
                            online_at: presence.online_at
                        });
                    }
                }
            }

            flowPresence.set(users);
        })
        .subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
                await currentChannel?.track(userPresence);
            }
        });
}

/**
 * Unsubscribe from the current flow's realtime updates and presence.
 */
export function unsubscribeFromFlow() {
    if (currentChannel) {
        currentChannel.untrack();
        supabase.removeChannel(currentChannel);
        currentChannel = null;
        currentFlowId = null;
        flowPresence.set([]);
    }
}

/**
 * Call this before saving locally to prevent the realtime
 * callback from overwriting the data we just saved.
 */
export function suppressNextUpdate() {
    suppressNextRemoteUpdate = true;
}

/**
 * Get the currently subscribed flow ID.
 */
export function getSubscribedFlowId(): string | null {
    return currentFlowId;
}
