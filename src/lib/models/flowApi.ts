import { supabase } from '$lib/supabase';
import type { Nodes } from './node';
import { get } from 'svelte/store';
import { currentUser } from './auth';

export type FlowRecord = {
    id: string;
    owner_id: string;
    title: string;
    nodes_data: Nodes;
    created_at: string;
    updated_at: string;
    // Populated for shared flows
    is_shared?: boolean;
    permission?: 'view' | 'edit';
    owner_email?: string;
};

export type FlowShareRecord = {
    id: string;
    flow_id: string;
    shared_by: string;
    shared_with: string | null;
    invite_token: string | null;
    permission: 'view' | 'edit';
    created_at: string;
};

export type FlowShareWithProfile = FlowShareRecord & {
    shared_with_email?: string;
    shared_with_name?: string;
};

/**
 * List all flows the current user owns or has been shared with.
 */
export async function listFlows(): Promise<FlowRecord[]> {
    const user = get(currentUser);
    if (!user) return [];

    // Fetch owned flows
    const { data: owned, error: ownedError } = await supabase
        .from('flows')
        .select('*')
        .eq('owner_id', user.id)
        .order('updated_at', { ascending: false });

    if (ownedError) {
        console.error('Error fetching owned flows:', ownedError);
        return [];
    }

    // Fetch shared flows
    const { data: shares, error: sharesError } = await supabase
        .from('flow_shares')
        .select('flow_id, permission')
        .eq('shared_with', user.id);

    let sharedFlows: FlowRecord[] = [];
    if (!sharesError && shares && shares.length > 0) {
        const sharedFlowIds = shares.map((s) => s.flow_id);
        const { data: sharedData, error: sharedError } = await supabase
            .from('flows')
            .select('*')
            .in('id', sharedFlowIds)
            .order('updated_at', { ascending: false });

        if (!sharedError && sharedData) {
            sharedFlows = sharedData.map((flow) => {
                const share = shares.find((s) => s.flow_id === flow.id);
                return {
                    ...flow,
                    is_shared: true,
                    permission: share?.permission ?? 'view'
                } as FlowRecord;
            });
        }
    }

    const ownedFlows = (owned ?? []).map((f) => ({ ...f, is_shared: false }) as FlowRecord);
    return [...ownedFlows, ...sharedFlows];
}

/**
 * Load a single flow by ID.
 */
export async function loadFlow(id: string): Promise<FlowRecord | null> {
    const { data, error } = await supabase.from('flows').select('*').eq('id', id).single();

    if (error) {
        console.error('Error loading flow:', error);
        return null;
    }
    return data as FlowRecord;
}

/**
 * Create a new flow.
 */
export async function createFlow(title: string, nodesData: Nodes): Promise<FlowRecord | null> {
    const user = get(currentUser);
    if (!user) return null;

    const { data, error } = await supabase
        .from('flows')
        .insert({
            owner_id: user.id,
            title,
            nodes_data: nodesData
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating flow:', error);
        return null;
    }
    return data as FlowRecord;
}

/**
 * Save (upsert) flow data. Updates the nodes_data and/or title.
 */
export async function saveFlow(
    id: string,
    nodesData?: Nodes,
    title?: string
): Promise<boolean> {
    const updateObj: Record<string, unknown> = {
        updated_at: new Date().toISOString()
    };
    if (nodesData !== undefined) {
        updateObj.nodes_data = nodesData;
    }
    if (title !== undefined) {
        updateObj.title = title;
    }

    const { error } = await supabase.from('flows').update(updateObj).eq('id', id);

    if (error) {
        console.error('Error saving flow:', error);
        return false;
    }
    return true;
}

/**
 * Delete a flow by ID (only owner can delete).
 */
export async function deleteFlowFromDb(id: string): Promise<boolean> {
    const { error } = await supabase.from('flows').delete().eq('id', id);

    if (error) {
        console.error('Error deleting flow:', error);
        return false;
    }
    return true;
}

/**
 * Generate a share invite link for a flow.
 * Returns the invite token.
 */
export async function createShareInvite(
    flowId: string,
    permission: 'view' | 'edit' = 'edit'
): Promise<string | null> {
    const user = get(currentUser);
    if (!user) return null;

    const inviteToken = crypto.randomUUID();

    const { error } = await supabase.from('flow_shares').insert({
        flow_id: flowId,
        shared_by: user.id,
        invite_token: inviteToken,
        permission
    });

    if (error) {
        console.error('Error creating share invite:', error);
        return null;
    }
    return inviteToken;
}

/**
 * Accept a share invitation by token.
 */
export async function acceptShareInvite(token: string): Promise<FlowRecord | null> {
    const user = get(currentUser);
    if (!user) return null;

    // Find the share record
    const { data: share, error: findError } = await supabase
        .from('flow_shares')
        .select('*')
        .eq('invite_token', token)
        .single();

    if (findError || !share) {
        console.error('Error finding share invite:', findError);
        return null;
    }

    // Update the share to attach the current user
    const { error: updateError } = await supabase
        .from('flow_shares')
        .update({
            shared_with: user.id,
            invite_token: null // consume the token
        })
        .eq('id', share.id);

    if (updateError) {
        console.error('Error accepting share invite:', updateError);
        return null;
    }

    // Load and return the shared flow
    return loadFlow(share.flow_id);
}

/**
 * List collaborators on a flow, enriched with profile info.
 */
export async function listFlowShares(flowId: string): Promise<FlowShareWithProfile[]> {
    const { data, error } = await supabase
        .from('flow_shares')
        .select('*')
        .eq('flow_id', flowId);

    if (error) {
        console.error('Error listing shares:', error);
        return [];
    }

    const shares = (data ?? []) as FlowShareRecord[];

    // Enrich with profile info
    const userIds = shares.map((s) => s.shared_with).filter((id): id is string => id != null);
    let profileMap: Record<string, { email: string; display_name: string }> = {};

    if (userIds.length > 0) {
        const { data: profiles } = await supabase
            .from('profiles')
            .select('id, email, display_name')
            .in('id', userIds);

        if (profiles) {
            for (const p of profiles) {
                profileMap[p.id] = { email: p.email, display_name: p.display_name };
            }
        }
    }

    return shares.map((s) => ({
        ...s,
        shared_with_email: s.shared_with ? profileMap[s.shared_with]?.email : undefined,
        shared_with_name: s.shared_with ? profileMap[s.shared_with]?.display_name : undefined
    }));
}

/**
 * Share a flow directly by email.
 */
export async function shareFlowByEmail(
    flowId: string,
    email: string,
    permission: 'view' | 'edit' = 'edit'
): Promise<{ success: boolean; error?: string }> {
    const user = get(currentUser);
    if (!user) return { success: false, error: 'Not logged in' };

    const { data, error: rpcError } = await supabase.rpc('find_user_by_email', {
        lookup_email: email.trim().toLowerCase()
    });

    if (rpcError) {
        console.error('Error looking up user:', rpcError);
        return { success: false, error: 'Failed to look up user' };
    }

    if (!data || data.length === 0) {
        return { success: false, error: 'No user found with that email' };
    }

    const targetUserId = data[0].user_id;

    if (targetUserId === user.id) {
        return { success: false, error: "You can't share with yourself" };
    }

    const { data: existing } = await supabase
        .from('flow_shares')
        .select('id')
        .eq('flow_id', flowId)
        .eq('shared_with', targetUserId)
        .maybeSingle();

    if (existing) {
        return { success: false, error: 'Flow is already shared with this user' };
    }

    const { error: insertError } = await supabase.from('flow_shares').insert({
        flow_id: flowId,
        shared_by: user.id,
        shared_with: targetUserId,
        permission
    });

    if (insertError) {
        console.error('Error sharing flow:', insertError);
        return { success: false, error: 'Failed to share flow' };
    }

    return { success: true };
}

/**
 * Remove a share (revoke access).
 */
export async function removeShare(shareId: string): Promise<boolean> {
    const { error } = await supabase.from('flow_shares').delete().eq('id', shareId);

    if (error) {
        console.error('Error removing share:', error);
        return false;
    }
    return true;
}
