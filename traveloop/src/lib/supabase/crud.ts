import type { Json } from "@/types/database";

import type {
  AppSupabaseClient,
  ChecklistItemRow,
  ItineraryStopRow,
  ChecklistItemInsert,
  ItineraryStopInsert,
  TripBundle,
  TripInsert,
  TripNoteInsert,
  TripNoteRow,
  TripRow,
  TripUpdate,
} from "@/lib/supabase/types";

type CreateTripInput = {
  budgetBreakdown?: Json;
  budgetCurrency?: string;
  budgetTotal?: number;
  coverImage?: string | null;
  endDate?: string | null;
  isPublic?: boolean;
  routeCities?: string[];
  shareSlug?: string;
  startDate?: string | null;
  status?: string;
  summary?: string | null;
  title: string;
  travelerCount?: number;
  userId: string;
};

type UpdateTripInput = Omit<CreateTripInput, "title" | "userId"> & {
  title?: string;
};

function toTripInsert(input: CreateTripInput): TripInsert {
  return {
    budget_breakdown: input.budgetBreakdown ?? [],
    budget_currency: input.budgetCurrency ?? "USD",
    budget_total: input.budgetTotal ?? 0,
    cover_image: input.coverImage ?? null,
    end_date: input.endDate ?? null,
    is_public: input.isPublic ?? false,
    route_cities: input.routeCities ?? [],
    share_slug: input.shareSlug,
    start_date: input.startDate ?? null,
    status: input.status ?? "draft",
    summary: input.summary ?? null,
    title: input.title,
    traveler_count: input.travelerCount ?? 1,
    user_id: input.userId,
  };
}

function toTripUpdate(input: UpdateTripInput): TripUpdate {
  return {
    budget_breakdown: input.budgetBreakdown,
    budget_currency: input.budgetCurrency,
    budget_total: input.budgetTotal,
    cover_image: input.coverImage,
    end_date: input.endDate,
    is_public: input.isPublic,
    route_cities: input.routeCities,
    share_slug: input.shareSlug,
    start_date: input.startDate,
    status: input.status,
    summary: input.summary,
    title: input.title,
    traveler_count: input.travelerCount,
  };
}

async function unwrapSingle<T>(
  promise: PromiseLike<{ data: T | null; error: { message: string } | null }>,
) {
  const { data, error } = await promise;

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Expected a record but none was returned.");
  }

  return data;
}

async function unwrapMany<T>(
  promise: PromiseLike<{ data: T[] | null; error: { message: string } | null }>,
) {
  const { data, error } = await promise;

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function listTrips(client: AppSupabaseClient): Promise<TripRow[]> {
  return unwrapMany(
    client
      .from("trips")
      .select("*")
      .order("created_at", { ascending: false }),
  );
}

export async function getTrip(
  client: AppSupabaseClient,
  tripId: string,
): Promise<TripRow> {
  return unwrapSingle(
    client.from("trips").select("*").eq("id", tripId).single(),
  );
}

export async function getSharedTrip(
  client: AppSupabaseClient,
  shareSlug: string,
): Promise<TripRow> {
  return unwrapSingle(
    client
      .from("trips")
      .select("*")
      .eq("share_slug", shareSlug)
      .eq("is_public", true)
      .single(),
  );
}

export async function createTrip(client: AppSupabaseClient, input: CreateTripInput) {
  return unwrapSingle(
    client.from("trips").insert(toTripInsert(input)).select("*").single(),
  );
}

export async function updateTrip(
  client: AppSupabaseClient,
  tripId: string,
  input: UpdateTripInput,
) {
  return unwrapSingle(
    client
      .from("trips")
      .update(toTripUpdate(input))
      .eq("id", tripId)
      .select("*")
      .single(),
  );
}

export async function deleteTrip(client: AppSupabaseClient, tripId: string) {
  const { error } = await client.from("trips").delete().eq("id", tripId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function listItineraryStops(
  client: AppSupabaseClient,
  tripId: string,
): Promise<ItineraryStopRow[]> {
  return unwrapMany(
    client
      .from("itinerary_stops")
      .select("*")
      .eq("trip_id", tripId)
      .order("stop_order", { ascending: true }),
  );
}

export async function upsertItineraryStop(
  client: AppSupabaseClient,
  input: ItineraryStopInsert,
) {
  return unwrapSingle(
    client
      .from("itinerary_stops")
      .upsert(input)
      .select("*")
      .single(),
  );
}

export async function deleteItineraryStop(
  client: AppSupabaseClient,
  stopId: string,
) {
  const { error } = await client.from("itinerary_stops").delete().eq("id", stopId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function listChecklistItems(
  client: AppSupabaseClient,
  tripId: string,
): Promise<ChecklistItemRow[]> {
  return unwrapMany(
    client
      .from("checklist_items")
      .select("*")
      .eq("trip_id", tripId)
      .order("sort_order", { ascending: true }),
  );
}

export async function createChecklistItem(
  client: AppSupabaseClient,
  input: ChecklistItemInsert,
) {
  return unwrapSingle(
    client
      .from("checklist_items")
      .insert(input)
      .select("*")
      .single(),
  );
}

export async function updateChecklistItem(
  client: AppSupabaseClient,
  itemId: string,
  patch: Partial<ChecklistItemInsert>,
) {
  return unwrapSingle(
    client
      .from("checklist_items")
      .update(patch)
      .eq("id", itemId)
      .select("*")
      .single(),
  );
}

export async function deleteChecklistItem(
  client: AppSupabaseClient,
  itemId: string,
) {
  const { error } = await client.from("checklist_items").delete().eq("id", itemId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function listTripNotes(
  client: AppSupabaseClient,
  tripId: string,
): Promise<TripNoteRow[]> {
  return unwrapMany(
    client
      .from("trip_notes")
      .select("*")
      .eq("trip_id", tripId)
      .order("note_order", { ascending: true }),
  );
}

export async function upsertTripNote(
  client: AppSupabaseClient,
  input: TripNoteInsert,
) {
  return unwrapSingle(
    client.from("trip_notes").upsert(input).select("*").single(),
  );
}

export async function deleteTripNote(
  client: AppSupabaseClient,
  noteId: string,
) {
  const { error } = await client.from("trip_notes").delete().eq("id", noteId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getTripBundle(
  client: AppSupabaseClient,
  tripId: string,
): Promise<TripBundle> {
  const [trip, stops, checklist, notes] = await Promise.all([
    getTrip(client, tripId),
    listItineraryStops(client, tripId),
    listChecklistItems(client, tripId),
    listTripNotes(client, tripId),
  ]);

  return { checklist, notes, stops, trip };
}

export async function getSharedTripBundle(
  client: AppSupabaseClient,
  shareSlug: string,
): Promise<TripBundle> {
  const trip = await getSharedTrip(client, shareSlug);
  const [stops, notes] = await Promise.all([
    listItineraryStops(client, trip.id),
    listTripNotes(client, trip.id),
  ]);

  return {
    checklist: [],
    notes,
    stops,
    trip,
  };
}
