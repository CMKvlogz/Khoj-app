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
