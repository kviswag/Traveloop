create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  summary text,
  cover_image text,
  status text not null default 'draft',
  start_date date,
  end_date date,
  traveler_count integer not null default 1,
  route_cities text[] not null default '{}',
  budget_total numeric(10,2) not null default 0,
  budget_currency text not null default 'USD',
  budget_breakdown jsonb not null default '[]'::jsonb,
  is_public boolean not null default false,
  share_slug text not null unique default substring(replace(gen_random_uuid()::text, '-', '') from 1 for 12),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.itinerary_stops (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  city text not null,
  country text,
  arrival_date date,
  departure_date date,
  stop_order integer not null default 0,
  stay_name text,
  weather_note text,
  narrative text,
  activities jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.checklist_items (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  label text not null,
  category text not null default 'Essentials',
  is_checked boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trip_notes (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  title text,
  body text not null default '',
  note_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_trips_user_id on public.trips(user_id);
create index if not exists idx_trips_share_slug on public.trips(share_slug);
create index if not exists idx_itinerary_stops_trip_id on public.itinerary_stops(trip_id, stop_order);
create index if not exists idx_checklist_items_trip_id on public.checklist_items(trip_id, sort_order);
create index if not exists idx_trip_notes_trip_id on public.trip_notes(trip_id, note_order);

drop trigger if exists set_trips_updated_at on public.trips;
create trigger set_trips_updated_at
before update on public.trips
for each row
execute function public.set_updated_at();

drop trigger if exists set_itinerary_stops_updated_at on public.itinerary_stops;
create trigger set_itinerary_stops_updated_at
before update on public.itinerary_stops
for each row
execute function public.set_updated_at();

drop trigger if exists set_checklist_items_updated_at on public.checklist_items;
create trigger set_checklist_items_updated_at
before update on public.checklist_items
for each row
execute function public.set_updated_at();

drop trigger if exists set_trip_notes_updated_at on public.trip_notes;
create trigger set_trip_notes_updated_at
before update on public.trip_notes
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.trips enable row level security;
alter table public.itinerary_stops enable row level security;
alter table public.checklist_items enable row level security;
alter table public.trip_notes enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "trips_owner_crud" on public.trips;
create policy "trips_owner_crud"
on public.trips
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "trips_public_read" on public.trips;
create policy "trips_public_read"
on public.trips
for select
using (is_public = true);

drop policy if exists "itinerary_owner_crud" on public.itinerary_stops;
create policy "itinerary_owner_crud"
on public.itinerary_stops
for all
using (
  exists (
    select 1
    from public.trips
    where trips.id = itinerary_stops.trip_id
      and trips.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.trips
    where trips.id = itinerary_stops.trip_id
      and trips.user_id = auth.uid()
  )
);

drop policy if exists "itinerary_public_read" on public.itinerary_stops;
create policy "itinerary_public_read"
on public.itinerary_stops
for select
using (
  exists (
    select 1
    from public.trips
    where trips.id = itinerary_stops.trip_id
      and trips.is_public = true
  )
);

drop policy if exists "checklist_owner_crud" on public.checklist_items;
create policy "checklist_owner_crud"
on public.checklist_items
for all
using (
  exists (
    select 1
    from public.trips
    where trips.id = checklist_items.trip_id
      and trips.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.trips
    where trips.id = checklist_items.trip_id
      and trips.user_id = auth.uid()
  )
);

drop policy if exists "trip_notes_owner_crud" on public.trip_notes;
create policy "trip_notes_owner_crud"
on public.trip_notes
for all
using (
  exists (
    select 1
    from public.trips
    where trips.id = trip_notes.trip_id
      and trips.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.trips
    where trips.id = trip_notes.trip_id
      and trips.user_id = auth.uid()
  )
);

drop policy if exists "trip_notes_public_read" on public.trip_notes;
create policy "trip_notes_public_read"
on public.trip_notes
for select
using (
  exists (
    select 1
    from public.trips
    where trips.id = trip_notes.trip_id
      and trips.is_public = true
  )
);
