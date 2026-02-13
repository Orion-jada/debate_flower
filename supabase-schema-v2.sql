-- Flower App: Schema v2 — Profiles table + share-by-email + presence
-- Run this in your Supabase SQL Editor AFTER the initial schema

-- 1. Profiles table (auto-populated from auth.users)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  created_at timestamptz default now()
);

alter table profiles enable row level security;

-- Everyone can read profiles (needed for looking up collaborators)
create policy "profiles_read" on profiles
  for select using (true);

-- Users can update their own profile
create policy "profiles_update" on profiles
  for update using (auth.uid() = id);

-- 2. Trigger to auto-create a profile when a user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if it exists, then create
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Backfill profiles for any existing users
insert into profiles (id, email, display_name)
select id, email, coalesce(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', split_part(email, '@', 1))
from auth.users
where id not in (select id from profiles)
on conflict (id) do nothing;

-- 4. RPC function to find a user by email (for share-by-email)
create or replace function find_user_by_email(lookup_email text)
returns table(user_id uuid, user_email text, user_display_name text) as $$
begin
  return query
    select p.id, p.email, p.display_name
    from profiles p
    where p.email = lookup_email
    limit 1;
end;
$$ language plpgsql security definer;

-- 5. Add email column to flow_shares view for display
-- (We'll join profiles in the API instead)

-- 6. Enable realtime for presence (already enabled for flows table)
-- Presence uses the channel system, no extra table needed.
