create extension if not exists pgcrypto;

create table if not exists public.vlogs (
  id uuid primary key default gen_random_uuid(),
  location text not null,
  description text not null,
  image_url text not null,
  visit_date text,
  tall boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.vlogs enable row level security;

drop policy if exists "Public can read vlogs" on public.vlogs;
create policy "Public can read vlogs"
  on public.vlogs
  for select
  using (true);

create index if not exists idx_vlogs_created_at on public.vlogs (created_at desc);
