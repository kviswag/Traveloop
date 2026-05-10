"use client";

import { useEffect, useState } from "react";

import {
  demoTrips,
  slugToTitle,
  type BudgetLine,
  type DemoTrip,
  type TripActivity,
  type TripNote,
  type TripStop,
} from "@/lib/demo-data";

const STORAGE_KEY = "traveloop.local-trips.v1";
const LEGACY_STORAGE_KEYS = [STORAGE_KEY, "traveloop.local-trips", "traveloop.trips"];
const STORE_EVENT = "traveloop:trips-updated";

const curatedHeroImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1600&q=80",
];

const cityCountryLookup: Record<string, string> = {
  copenhagen: "Denmark",
  kyoto: "Japan",
  lisbon: "Portugal",
  marrakech: "Morocco",
  oslo: "Norway",
  reykjavik: "Iceland",
  seoul: "South Korea",
  seville: "Spain",
  tokyo: "Japan",
};

export type AppTrip = DemoTrip & {
  brief: string;
  budgetTotal: number;
  createdAt: string;
  endDate: string | null;
  isPublic: boolean;
  pacing: string;
  source: "demo" | "local";
  startDate: string | null;
  tripStyle: string;
  updatedAt: string;
};

export type CreateTripDraft = {
  budget: string;
  endDate: string | null;
  notes: string;
  pacing: string;
  region: string;
  startDate: string | null;
  title: string;
  travelers: string;
  tripStyle: string;
};

const seededTrips: AppTrip[] = demoTrips.map((trip, index) => ({
  ...trip,
  brief: trip.summary,
  budgetTotal: trip.budgetBreakdown.reduce((sum, line) => sum + line.amount, 0),
  createdAt: `2026-01-${String(index + 3).padStart(2, "0")}T08:00:00.000Z`,
  endDate: null,
  isPublic: true,
  pacing: "Balanced",
  source: "demo",
  startDate: null,
  tripStyle: trip.tags[0] ?? "Curated route",
  updatedAt: `2026-01-${String(index + 3).padStart(2, "0")}T08:00:00.000Z`,
}));

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseBudgetInput(value: string) {
  const normalized = value.replace(/[^0-9.]/g, "");
  const parsed = Number.parseFloat(normalized);

  return Number.isFinite(parsed) ? Math.max(parsed, 0) : 0;
}

export function formatBudgetTotal(total: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    currency,
    maximumFractionDigits: 0,
    style: "currency",
  }).format(total);
}

export function formatRouteLabel(route: string[]) {
  return route.join(" / ");
}

export function createBudgetBreakdown(total: number): BudgetLine[] {
  const safeTotal = total > 0 ? total : 6200;
  const templates = [
    { ratio: 0.28, label: "Flights + transfers", note: "Flexible movement with smoother timing." },
    { ratio: 0.32, label: "Stay", note: "Handpicked hotels with strong location value." },
    { ratio: 0.18, label: "Experiences", note: "One signature moment per city." },
    { ratio: 0.12, label: "Food", note: "Reservation-led dinners and coffee resets." },
    { ratio: 0.1, label: "Flex", note: "Room for upgrades, pivots, and surprises." },
  ];

  return templates.map((line, index) => {
    const isLastLine = index === templates.length - 1;
    const allocated = templates
      .slice(0, index)
      .reduce((sum, entry) => sum + Math.round(safeTotal * entry.ratio), 0);

    return {
      amount: isLastLine ? safeTotal - allocated : Math.round(safeTotal * line.ratio),
      label: line.label,
      note: line.note,
    };
  });
}

function hashValue(value: string) {
  return value.split("").reduce((sum, character) => sum + character.charCodeAt(0), 0);
}

function getHeroImage(slug: string) {
  return curatedHeroImages[hashValue(slug) % curatedHeroImages.length];
}

function sortTripsByUpdatedAt(trips: AppTrip[]) {
  return [...trips].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function pickValue(source: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    if (source[key] !== undefined && source[key] !== null) {
      return source[key];
    }
  }

  return undefined;
}

function pickString(source: Record<string, unknown>, ...keys: string[]) {
  const value = pickValue(source, ...keys);

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function pickStringArray(source: Record<string, unknown>, ...keys: string[]) {
  const value = pickValue(source, ...keys);

  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function pickNumber(source: Record<string, unknown>, ...keys: string[]) {
  const value = pickValue(source, ...keys);

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function pickBoolean(source: Record<string, unknown>, ...keys: string[]) {
  const value = pickValue(source, ...keys);

  return typeof value === "boolean" ? value : null;
}

function extractStoredTripCandidates(rawValue: string) {
  try {
    const parsed = JSON.parse(rawValue) as unknown;

    if (Array.isArray(parsed)) {
      return parsed;
    }

    if (isRecord(parsed) && Array.isArray(parsed.trips)) {
      return parsed.trips;
    }
  } catch {
    return [];
  }

  return [];
}

function normalizeBudgetBreakdown(value: unknown, budgetTotal: number) {
  if (!Array.isArray(value)) {
    return createBudgetBreakdown(budgetTotal);
  }

  const normalizedLines = value
    .map((entry) => {
      if (!isRecord(entry)) {
        return null;
      }

      const amount = pickNumber(entry, "amount");
      const label = pickString(entry, "label", "name");
      const note = pickString(entry, "note", "description");

      if (amount === null || !label || !note) {
        return null;
      }

      return { amount, label, note };
    })
    .filter((entry): entry is BudgetLine => entry !== null);

  return normalizedLines.length > 0 ? normalizedLines : createBudgetBreakdown(budgetTotal);
}

function normalizeActivities(value: unknown, city: string, tripStyle: string, pacing: string, index: number) {
  if (!Array.isArray(value)) {
    return createActivities(city, tripStyle, pacing, index);
  }

  const normalizedActivities = value
    .map((entry) => {
      if (!isRecord(entry)) {
        return null;
      }

      const title = pickString(entry, "title");
      const category = pickString(entry, "category");
      const detail = pickString(entry, "detail", "description");
      const time = pickString(entry, "time");
      const cost = pickString(entry, "cost");

      if (!title || !category || !detail || !time || !cost) {
        return null;
      }

      return { category, cost, detail, time, title };
    })
    .filter((entry): entry is TripActivity => entry !== null);

  return normalizedActivities.length > 0
    ? normalizedActivities
    : createActivities(city, tripStyle, pacing, index);
}

function normalizeTripNotes(value: unknown, title: string, route: string[], brief: string) {
  if (!Array.isArray(value)) {
    return createTripNotes(title, route, brief);
  }

  const normalizedNotes = value
    .map((entry, index) => {
      if (!isRecord(entry)) {
        return null;
      }

      const body = pickString(entry, "body", "note");
      const date = pickString(entry, "date") ?? `Beat ${index + 1}`;
      const noteTitle = pickString(entry, "title") ?? `Note ${index + 1}`;

      if (!body) {
        return null;
      }

      return { body, date, title: noteTitle };
    })
    .filter((entry): entry is TripNote => entry !== null);

  return normalizedNotes.length > 0 ? normalizedNotes : createTripNotes(title, route, brief);
}

function normalizeTripStops(
  value: unknown,
  route: string[],
  startDate: string | null,
  endDate: string | null,
  tripStyle: string,
  pacing: string,
) {
  if (!Array.isArray(value)) {
    return buildStops(route, startDate, endDate, tripStyle, pacing);
  }

  const fallbackStops = buildStops(route, startDate, endDate, tripStyle, pacing);

  const normalizedStops = value
    .map((entry, index) => {
      if (!isRecord(entry)) {
        return null;
      }

      const city = pickString(entry, "city") ?? route[index];
      const fallbackStop = fallbackStops[index] ?? fallbackStops[0];

      if (!city || !fallbackStop) {
        return null;
      }

      return {
        activities: normalizeActivities(
          pickValue(entry, "activities"),
          city,
          tripStyle,
          pacing,
          index,
        ),
        city,
        country: pickString(entry, "country") ?? fallbackStop.country,
        hotel: pickString(entry, "hotel", "stay_name", "stayName") ?? fallbackStop.hotel,
        note: pickString(entry, "note", "narrative") ?? fallbackStop.note,
        range: pickString(entry, "range") ?? fallbackStop.range,
        weather: pickString(entry, "weather", "weather_note", "weatherNote") ?? fallbackStop.weather,
      };
    })
    .filter((entry): entry is TripStop => entry !== null);

  return normalizedStops.length > 0 ? normalizedStops : fallbackStops;
}

function normalizeStoredTrip(value: unknown): AppTrip | null {
  if (!isRecord(value)) {
    return null;
  }

  const title = pickString(value, "title") ?? slugToTitle(pickString(value, "slug") ?? "");
  const slug = pickString(value, "slug") ?? (title ? slugify(title) : null);

  if (!title || !slug) {
    return null;
  }

  const region = pickString(value, "region") ?? "";
  const route = (() => {
    const directRoute = pickStringArray(value, "route", "routeCities", "route_cities");

    return directRoute.length > 0 ? directRoute : parseRoute(region, title);
  })();
  const tags = pickStringArray(value, "tags");
  const tripStyle = pickString(value, "tripStyle", "trip_style") ?? tags[0] ?? "Curated route";
  const pacing = pickString(value, "pacing") ?? "Balanced";
  const brief = pickString(value, "brief") ?? pickString(value, "summary") ?? "";
  const startDate = pickString(value, "startDate", "start_date");
  const endDate = pickString(value, "endDate", "end_date");
  const rawBudgetTotal = pickNumber(value, "budgetTotal", "budget_total");
  const fallbackBudgetTotal = parseBudgetInput(pickString(value, "budget") ?? "");
  const budgetTotal = rawBudgetTotal ?? fallbackBudgetTotal ?? 6200;
  const budgetBreakdown = normalizeBudgetBreakdown(
    pickValue(value, "budgetBreakdown", "budget_breakdown"),
    budgetTotal,
  );
  const shareSlug = pickString(value, "shareSlug", "share_slug") ?? `${slug}-public`;
  const summary =
    pickString(value, "summary") ??
    (brief || `A ${tripStyle.toLowerCase()} designed to move smoothly across ${route.join(", ")}.`);

  return {
    brief,
    budget: pickString(value, "budget") ?? formatBudgetTotal(budgetTotal),
    budgetBreakdown,
    budgetTotal,
    createdAt: pickString(value, "createdAt", "created_at") ?? new Date().toISOString(),
    dates: pickString(value, "dates") ?? formatDateLabel(startDate, endDate),
    endDate,
    headline:
      pickString(value, "headline") ??
      `A ${tripStyle.toLowerCase()} across ${route.join(", ")} with a clear shared-story finish.`,
    heroImage:
      pickString(value, "heroImage", "hero_image", "coverImage", "cover_image") ??
      getHeroImage(slug),
    highlight:
      pickString(value, "highlight") ??
      `Built around ${pacing.toLowerCase()} pacing and one signature moment per city.`,
    isPublic: pickBoolean(value, "isPublic", "is_public") ?? true,
    notes: normalizeTripNotes(pickValue(value, "notes"), title, route, brief),
    pacing,
    region: region || route.join(", "),
    route,
    shareSlug,
    slug,
    source: pickString(value, "source") === "demo" ? "demo" : "local",
    startDate,
    status: pickString(value, "status") ?? "Drafting route",
    stops: normalizeTripStops(pickValue(value, "stops"), route, startDate, endDate, tripStyle, pacing),
    summary,
    tags: tags.length > 0 ? tags : [tripStyle, pacing, "Your trip"],
    title,
    travelers:
      pickString(value, "travelers") ??
      (() => {
        const travelerCount = pickNumber(value, "travelerCount", "traveler_count");
        return travelerCount !== null ? `${travelerCount} travelers` : "2 travelers";
      })(),
    tripStyle,
    updatedAt:
      pickString(value, "updatedAt", "updated_at") ??
      pickString(value, "createdAt", "created_at") ??
      new Date().toISOString(),
  };
}

function readStoredTrips() {
  if (typeof window === "undefined") {
    return [];
  }

  const tripsBySlug = new Map<string, AppTrip>();

  for (const key of LEGACY_STORAGE_KEYS) {
    const rawValue = window.localStorage.getItem(key);

    if (!rawValue) {
      continue;
    }

    for (const candidate of extractStoredTripCandidates(rawValue)) {
      const normalizedTrip = normalizeStoredTrip(candidate);

      if (!normalizedTrip || normalizedTrip.source !== "local") {
        continue;
      }

      const existingTrip = tripsBySlug.get(normalizedTrip.slug);

      if (!existingTrip || normalizedTrip.updatedAt >= existingTrip.updatedAt) {
        tripsBySlug.set(normalizedTrip.slug, normalizedTrip);
      }
    }
  }

  return sortTripsByUpdatedAt([...tripsBySlug.values()]);
}

function writeStoredTrips(trips: AppTrip[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sortTripsByUpdatedAt(trips)));
  window.dispatchEvent(new Event(STORE_EVENT));
}

function mergeTrips(localTrips: AppTrip[]) {
  const reservedSlugs = new Set(localTrips.map((trip) => trip.slug));
  const reservedShareSlugs = new Set(localTrips.map((trip) => trip.shareSlug));

  return [
    ...sortTripsByUpdatedAt(localTrips),
    ...seededTrips.filter(
      (trip) => !reservedSlugs.has(trip.slug) && !reservedShareSlugs.has(trip.shareSlug),
    ),
  ];
}

function createUniqueSlug(baseSlug: string, existingTrips: AppTrip[]) {
  const normalizedBase = baseSlug || "new-journey";
  const usedSlugs = new Set(existingTrips.map((trip) => trip.slug));

  if (!usedSlugs.has(normalizedBase)) {
    return normalizedBase;
  }

  let suffix = 2;

  while (usedSlugs.has(`${normalizedBase}-${suffix}`)) {
    suffix += 1;
  }

  return `${normalizedBase}-${suffix}`;
}

function createUniqueShareSlug(baseSlug: string, existingTrips: AppTrip[]) {
  const shareBase = `${baseSlug}-public`;
  const usedShareSlugs = new Set(existingTrips.map((trip) => trip.shareSlug));

  if (!usedShareSlugs.has(shareBase)) {
    return shareBase;
  }

  let suffix = 2;

  while (usedShareSlugs.has(`${shareBase}-${suffix}`)) {
    suffix += 1;
  }

  return `${shareBase}-${suffix}`;
}

function parseRoute(region: string, title: string) {
  const parsed = region
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return parsed.length > 0 ? parsed : [slugToTitle(slugify(title || "new-journey"))];
}

function toUtcDate(value: string) {
  return new Date(`${value}T00:00:00Z`);
}

function formatSingleDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  }).format(toUtcDate(value));
}

function formatDateLabel(startDate: string | null, endDate: string | null) {
  if (startDate && endDate) {
    return `${formatSingleDate(startDate)} - ${formatSingleDate(endDate)}`;
  }

  if (startDate) {
    return `Starts ${formatSingleDate(startDate)}`;
  }

  if (endDate) {
    return `Ends ${formatSingleDate(endDate)}`;
  }

  return "Dates to be confirmed";
}

function addDays(isoDate: string, daysToAdd: number) {
  const date = toUtcDate(isoDate);
  date.setUTCDate(date.getUTCDate() + daysToAdd);
  return date.toISOString().slice(0, 10);
}

function buildStopRanges(stopCount: number, startDate: string | null, endDate: string | null) {
  if (!startDate || !endDate) {
    return Array.from({ length: stopCount }, () => "Flexible dates");
  }

  const start = toUtcDate(startDate);
  const end = toUtcDate(endDate);
  const totalDays = Math.max(
    1,
    Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1,
  );

  return Array.from({ length: stopCount }, (_, index) => {
    const startOffset = Math.floor((index * totalDays) / stopCount);
    const endOffset = Math.max(
      startOffset,
      Math.floor((((index + 1) * totalDays) / stopCount) - 1),
    );
    const segmentStart = addDays(startDate, startOffset);
    const segmentEnd = addDays(startDate, endOffset);

    if (segmentStart === segmentEnd) {
      return formatSingleDate(segmentStart);
    }

    return `${formatSingleDate(segmentStart)} - ${formatSingleDate(segmentEnd)}`;
  });
}

function createActivities(city: string, tripStyle: string, pacing: string, index: number): TripActivity[] {
  const arrivalWindows = ["09:00", "10:30", "11:45", "12:15"];
  const eveningWindows = ["18:30", "19:15", "20:00", "20:45"];

  return [
    {
      category: "Arrival",
      cost: `$${110 + (index * 20)}`,
      detail: `A soft first landing in ${city} tuned to ${tripStyle.toLowerCase()} energy.`,
      time: arrivalWindows[index % arrivalWindows.length],
      title: "Arrival ritual and neighborhood reset",
    },
    {
      category: pacing === "High-energy" ? "Nightlife" : "Experience",
      cost: `$${180 + (index * 35)}`,
      detail: `One signature moment that keeps the route feeling ${pacing.toLowerCase()} instead of generic.`,
      time: eveningWindows[index % eveningWindows.length],
      title: "Golden-hour signature booking",
    },
  ];
}

function createTripNotes(title: string, route: string[], notes: string) {
  const firstCity = route[0] ?? "the opening city";
  const finalCity = route[route.length - 1] ?? "the final city";

  return [
    {
      body: notes || `Use ${firstCity} to establish the emotional tone before the pace builds.`,
      date: "Opening beat",
      title: "Mood anchor",
    },
    {
      body: `Make ${finalCity} the visual crescendo so ${title} lands as a complete story when shared.`,
      date: "Final beat",
      title: "Public page cue",
    },
  ];
}

function buildStops(
  route: string[],
  startDate: string | null,
  endDate: string | null,
  tripStyle: string,
  pacing: string,
) {
  const ranges = buildStopRanges(route.length, startDate, endDate);

  return route.map((city, index): TripStop => {
    const normalizedKey = city.toLowerCase();

    return {
      activities: createActivities(city, tripStyle, pacing, index),
      city,
      country: cityCountryLookup[normalizedKey] ?? "Destination",
      hotel: `${city} Atelier House`,
      note: `This stop carries the ${tripStyle.toLowerCase()} tone while keeping the route ${pacing.toLowerCase()}.`,
      range: ranges[index] ?? "Flexible dates",
      weather: "Seasonal details pending",
    };
  });
}

export function createLocalTrip(draft: CreateTripDraft, existingTrips: AppTrip[]): AppTrip {
  const route = parseRoute(draft.region, draft.title);
  const baseSlug = slugify(draft.title);
  const slug = createUniqueSlug(baseSlug, existingTrips);
  const shareSlug = createUniqueShareSlug(slug, existingTrips);
  const budgetTotal = parseBudgetInput(draft.budget) || 6200;
  const budgetBreakdown = createBudgetBreakdown(budgetTotal);
  const now = new Date().toISOString();
  const region = route.join(", ");
  const dates = formatDateLabel(draft.startDate, draft.endDate);
  const title = draft.title.trim() || "New Journey";
  const summary =
    draft.notes.trim() ||
    `A ${draft.tripStyle.toLowerCase()} designed to move smoothly across ${route.join(", ")}.`;

  return {
    brief: draft.notes.trim(),
    budget: formatBudgetTotal(budgetTotal),
    budgetBreakdown,
    budgetTotal,
    createdAt: now,
    dates,
    endDate: draft.endDate,
    headline: `A ${draft.tripStyle.toLowerCase()} across ${route.join(", ")} with a clear shared-story finish.`,
    heroImage: getHeroImage(slug),
    highlight: `Built around ${draft.pacing.toLowerCase()} pacing and one signature moment per city.`,
    isPublic: true,
    notes: createTripNotes(title, route, draft.notes.trim()),
    pacing: draft.pacing,
    region,
    route,
    shareSlug,
    slug,
    source: "local",
    startDate: draft.startDate,
    status: "Drafting route",
    stops: buildStops(route, draft.startDate, draft.endDate, draft.tripStyle, draft.pacing),
    summary,
    tags: [draft.tripStyle, draft.pacing, "Your trip"],
    title,
    travelers: draft.travelers.trim() || "2 travelers",
    tripStyle: draft.tripStyle,
    updatedAt: now,
  };
}

export function updateLocalTrip(slug: string, patch: Omit<Partial<AppTrip>, "source">) {
  const storedTrips = readStoredTrips();
  let updatedTrip: AppTrip | null = null;

  const nextTrips = storedTrips.map((trip) => {
    if (trip.slug !== slug) {
      return trip;
    }

    updatedTrip = {
      ...trip,
      ...patch,
      source: "local" as const,
      updatedAt: new Date().toISOString(),
    };

    return updatedTrip;
  });

  if (!updatedTrip) {
    return null;
  }

  writeStoredTrips(nextTrips);
  return updatedTrip;
}

export function useTripStore() {
  const [localTrips, setLocalTrips] = useState<AppTrip[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const syncTrips = () => {
      setLocalTrips(readStoredTrips());
      setHasHydrated(true);
    };

    syncTrips();

    window.addEventListener("storage", syncTrips);
    window.addEventListener(STORE_EVENT, syncTrips as EventListener);

    return () => {
      window.removeEventListener("storage", syncTrips);
      window.removeEventListener(STORE_EVENT, syncTrips as EventListener);
    };
  }, []);

  const trips = mergeTrips(localTrips);

  return {
    createTrip(draft: CreateTripDraft) {
      const trip = createLocalTrip(draft, mergeTrips(readStoredTrips()));
      const nextTrips = sortTripsByUpdatedAt([trip, ...readStoredTrips()]);

      writeStoredTrips(nextTrips);
      setLocalTrips(nextTrips);

      return trip;
    },
    getTripByShareSlug(shareSlug: string) {
      return trips.find((trip) => trip.shareSlug === shareSlug);
    },
    getTripBySlug(slug: string) {
      return trips.find((trip) => trip.slug === slug);
    },
    hasHydrated,
    localTrips,
    seededTrips,
    trips,
    updateTrip(slug: string, patch: Omit<Partial<AppTrip>, "source">) {
      const updatedTrip = updateLocalTrip(slug, patch);

      if (!updatedTrip) {
        return null;
      }

      setLocalTrips(readStoredTrips());
      return updatedTrip;
    },
  };
}
