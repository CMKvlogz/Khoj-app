-- Khoj app database setup
-- Supabase Dashboard -> SQL Editor -> New Query -> paste this whole file -> Run

create table if not exists khoj_items (
  collection text not null,
  id text not null,
  data jsonb not null,
  created_at timestamp with time zone default now(),
  primary key (collection, id)
);

-- Allow the app (using the public anon key) to read and write.
-- This app has no login system, so all access is public by design.
alter table khoj_items enable row level security;

create policy "Public read access"
  on khoj_items for select
  using (true);

create policy "Public insert access"
  on khoj_items for insert
  with check (true);

create policy "Public update access"
  on khoj_items for update
  using (true);

-- ===========================================================================
-- Admin authentication
-- ===========================================================================
-- Admin accounts are real Supabase Auth users. Being an auth user is NOT
-- enough to be an admin: the account's id must also appear in admin_users.
-- Rows here are created by hand from the Supabase dashboard (see README).

create table if not exists admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  created_at timestamp with time zone not null default now()
);

alter table admin_users enable row level security;

-- No policy exists for the anon role, so the public key can read nothing here.
-- A signed-in user may read ONLY their own row - that is how the app re-checks
-- its own admin status after a page refresh without exposing the allowlist.
drop policy if exists "Admins read own row" on admin_users;
create policy "Admins read own row"
  on admin_users for select
  to authenticated
  using (auth.uid() = id);

-- Ledger of login and password-reset attempts, used for rate limiting.
create table if not exists auth_throttle (
  id bigserial primary key,
  bucket text not null,       -- 'login' | 'reset'
  kind text not null,         -- 'email' | 'ip'
  subject text not null,      -- the lowercased email, or the client IP
  created_at timestamp with time zone not null default now()
);

create index if not exists auth_throttle_lookup
  on auth_throttle (bucket, kind, subject, created_at desc);

alter table auth_throttle enable row level security;
-- Deliberately NO policies: only the service role key, used server-side by
-- /api/admin-auth.js, may read or write this table.
