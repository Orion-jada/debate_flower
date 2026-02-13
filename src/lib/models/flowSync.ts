import { supabase } from '$lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';
import type { Nodes } from './node';
import { _nodesMut } from './store';
import { replaceNodes } from './nodeDecorateAction';

let currentChannel: RealtimeChannel | null = null;
let currentFlowId: string | null = null;
let suppressNextRemoteUpdate = false;

/**
 * Subscribe to realtime updates for a specific flow.
 * When a remote update is received, nodes are replaced with the new data.
 */
export function subscribeToFlow(flowId: string) {
    // Unsubscribe from previous flow
    unsubscribeFromFlow();

    currentFlowId = flowId;

    currentChannel = supabase
        .channel(`flow:${flowId}`)
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
        .subscribe();
}

/**
 * Unsubscribe from the current flow's realtime updates.
 */
export function unsubscribeFromFlow() {
    if (currentChannel) {
        supabase.removeChannel(currentChannel);
        currentChannel = null;
        currentFlowId = null;
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
