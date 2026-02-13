-- Flower App: Database Schema for Supabase
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

-- Flows table: stores each saved flow
create table flows (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade not null,
  title text not null default '',
  nodes_data jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Row-level security for flows
alter table flows enable row level security;

-- Owner can do anything with their flows
create policy "owners_all" on flows
  for all using (auth.uid() = owner_id);

-- Sharing table: tracks who has access to which flows
create table flow_shares (
  id uuid primary key default gen_random_uuid(),
  flow_id uuid references flows(id) on delete cascade not null,
  shared_by uuid references auth.users(id) on delete cascade not null,
  shared_with uuid references auth.users(id) on delete cascade,
  invite_token text unique,
  permission text not null default 'edit' check (permission in ('view', 'edit')),
  created_at timestamptz default now(),
  unique(flow_id, shared_with)
);

alter table flow_shares enable row level security;

-- Share policies
create policy "shares_owner" on flow_shares
  for all using (auth.uid() = shared_by);

create policy "shares_recipient" on flow_shares
  for select using (auth.uid() = shared_with);

-- Allow reading by invite_token (for accepting invites before user is attached)
create policy "shares_invite" on flow_shares
  for select using (invite_token is not null);

-- Shared users can read flows shared with them
create policy "shared_select" on flows
  for select using (
    id in (select flow_id from flow_shares where shared_with = auth.uid())
  );

-- Shared users with 'edit' permission can update shared flows
create policy "shared_update" on flows
  for update using (
    id in (select flow_id from flow_shares where shared_with = auth.uid() and permission = 'edit')
  );

-- Enable realtime for flows table (for live collaboration)
alter publication supabase_realtime add table flows;
