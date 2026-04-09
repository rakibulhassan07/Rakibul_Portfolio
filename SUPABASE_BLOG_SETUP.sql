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

create table if not exists public.vlog_images (
  id uuid primary key default gen_random_uuid(),
  vlog_id uuid not null references public.vlogs(id) on delete cascade,
  image_url text not null,
  position int not null,
  created_at timestamptz not null default now(),
  constraint vlog_images_position_check check (position between 1 and 6),
  constraint vlog_images_unique_position unique (vlog_id, position)
);

alter table public.vlogs enable row level security;
alter table public.vlog_images enable row level security;

drop policy if exists "Public can read vlogs" on public.vlogs;
create policy "Public can read vlogs"
  on public.vlogs
  for select
  using (true);

drop policy if exists "Public can read vlog images" on public.vlog_images;
create policy "Public can read vlog images"
  on public.vlog_images
  for select
  using (true);

create index if not exists idx_vlogs_created_at on public.vlogs (created_at desc);
create index if not exists idx_vlog_images_vlog_id on public.vlog_images (vlog_id);
