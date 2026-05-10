# Minimal Supabase Setup

## Tables

- `profiles`: app-level user record linked to `auth.users`
- `trips`: top-level trip metadata, budget fields, and public share state
- `itinerary_stops`: one row per city/stop, including lightweight activity JSON
- `checklist_items`: packing/checklist rows for a trip
- `trip_notes`: journal/notes rows for a trip

## Relationships

- `profiles.id -> auth.users.id`
- `trips.user_id -> profiles.id`
- `itinerary_stops.trip_id -> trips.id`
- `checklist_items.trip_id -> trips.id`
- `trip_notes.trip_id -> trips.id`

## Quick Setup

1. Create a new Supabase project.
2. Enable Email auth in `Authentication -> Providers`.
3. Open `SQL Editor` and run [schema.sql](./schema.sql).
4. In the app root, copy `.env.example` to `.env.local`.
5. Set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
6. Restart the Next.js app.

## Notes

- The schema is intentionally flat and lightweight.
- Budget data lives on `trips` to avoid a separate budget table.
- Per-stop activities live in `itinerary_stops.activities` as JSON to avoid a separate activities table.
- Public share pages work through `trips.is_public` + `trips.share_slug`.
