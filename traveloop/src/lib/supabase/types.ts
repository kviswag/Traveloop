import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database";

export type AppSupabaseClient = SupabaseClient<Database>;

export type ChecklistItemRow = Database["public"]["Tables"]["checklist_items"]["Row"];
export type ChecklistItemInsert =
  Database["public"]["Tables"]["checklist_items"]["Insert"];
export type ItineraryStopRow = Database["public"]["Tables"]["itinerary_stops"]["Row"];
export type ItineraryStopInsert =
  Database["public"]["Tables"]["itinerary_stops"]["Insert"];
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export type TripNoteRow = Database["public"]["Tables"]["trip_notes"]["Row"];
export type TripNoteInsert = Database["public"]["Tables"]["trip_notes"]["Insert"];
export type TripRow = Database["public"]["Tables"]["trips"]["Row"];
export type TripInsert = Database["public"]["Tables"]["trips"]["Insert"];
export type TripUpdate = Database["public"]["Tables"]["trips"]["Update"];

export type TripBundle = {
  checklist: ChecklistItemRow[];
  notes: TripNoteRow[];
  stops: ItineraryStopRow[];
  trip: TripRow;
};
