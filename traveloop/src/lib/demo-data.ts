export type TripActivity = {
  category: string;
  cost: string;
  detail: string;
  time: string;
  title: string;
};

export type TripStop = {
  city: string;
  country: string;
  hotel: string;
  note: string;
  range: string;
  weather: string;
  activities: TripActivity[];
};

export type BudgetLine = {
  amount: number;
  label: string;
  note: string;
};

export type TripNote = {
  body: string;
  date: string;
  title: string;
};

export type DemoTrip = {
  budget: string;
  budgetBreakdown: BudgetLine[];
  dates: string;
  headline: string;
  heroImage: string;
  highlight: string;
  region: string;
  route: string[];
  shareSlug: string;
  slug: string;
  status: string;
  stops: TripStop[];
  summary: string;
  tags: string[];
  title: string;
  travelers: string;
  notes: TripNote[];
};

export const demoTrips: DemoTrip[] = [
  {
    slug: "aurora-loop",
    shareSlug: "aurora-loop-public",
    title: "Aurora Loop",
    headline: "Northern lights, design hotels, and midnight city energy.",
    summary:
      "A cinematic multi-city route built for travelers who want icy landscapes, warm interiors, and polished urban moments without losing the narrative of the trip.",
    heroImage:
      "https://images.unsplash.com/photo-1517821365201-7734f463f9b4?auto=format&fit=crop&w=1600&q=80",
    region: "Reykjavik to Copenhagen",
    dates: "Oct 10 - Oct 20",
    travelers: "2 travelers",
    budget: "$8,450",
    status: "Ready for takeoff",
    highlight: "Designed like one seamless chapter across three cities.",
    tags: ["Luxury route", "Autumn lights", "Design-forward"],
    route: ["Reykjavik", "Oslo", "Copenhagen"],
    budgetBreakdown: [
      { amount: 2850, label: "Flights + transfers", note: "Premium routes with room to breathe" },
      { amount: 2300, label: "Stay", note: "Boutique hotels and harbor suites" },
      { amount: 1420, label: "Experiences", note: "Tasting menus, boat nights, museum passes" },
      { amount: 980, label: "Food", note: "Slow breakfasts and reservation-led dinners" },
      { amount: 900, label: "Flex", note: "Last-minute finds and weather pivots" },
    ],
    notes: [
      {
        date: "Day 2",
        title: "Mood anchor",
        body: "Keep the first full Reykjavik day intentionally slow so the rest of the route feels expansive rather than packed.",
      },
      {
        date: "Day 5",
        title: "Story moment",
        body: "Book the fjord-facing dinner on the Oslo evening. It gives the trip a real midpoint crescendo.",
      },
      {
        date: "Day 8",
        title: "Share page hero",
        body: "Use the Copenhagen harbor suite photo as the public trip cover. It lands immediately on premium.",
      },
    ],
    stops: [
      {
        city: "Reykjavik",
        country: "Iceland",
        range: "Oct 10 - Oct 13",
        weather: "5°C / crisp skies",
        hotel: "Edition Harbor Loft",
        note: "Set the emotional tone with geothermal calm and northern-light pacing.",
        activities: [
          {
            time: "09:00",
            title: "Blue Lagoon arrival reset",
            category: "Wellness",
            detail: "Soft landing after arrival with private changing suite and brunch.",
            cost: "$220",
          },
          {
            time: "19:30",
            title: "Chef's table tasting",
            category: "Dining",
            detail: "A moody, amber-lit dinner close to the marina district.",
            cost: "$280",
          },
        ],
      },
      {
        city: "Oslo",
        country: "Norway",
        range: "Oct 13 - Oct 16",
        weather: "8°C / blue-hour evenings",
        hotel: "Fjordline Residence",
        note: "Shift from elemental landscapes into modern Scandinavian rhythm.",
        activities: [
          {
            time: "11:00",
            title: "Opera House + waterfront walk",
            category: "Culture",
            detail: "Editorial architecture, clean sight lines, slow photo moments.",
            cost: "$60",
          },
          {
            time: "20:15",
            title: "Fjord dinner cruise",
            category: "Experience",
            detail: "Glass-roofed dinner route with skyline reflections.",
            cost: "$340",
          },
        ],
      },
      {
        city: "Copenhagen",
        country: "Denmark",
        range: "Oct 16 - Oct 20",
        weather: "10°C / golden evenings",
        hotel: "Canal Atelier House",
        note: "Finish with bicycle ease, tactile design, and social energy.",
        activities: [
          {
            time: "10:30",
            title: "Design district coffee loop",
            category: "Lifestyle",
            detail: "Independent studios, furniture galleries, and hidden courtyards.",
            cost: "$75",
          },
          {
            time: "18:45",
            title: "Waterfront jazz night",
            category: "Nightlife",
            detail: "Intimate venue with shared plates and late harbor walks.",
            cost: "$140",
          },
        ],
      },
    ],
  },
  {
    slug: "atlas-summer",
    shareSlug: "atlas-summer-public",
    title: "Atlas Summer",
    headline: "Color, heat, and market-night momentum across North Africa and Europe.",
    summary:
      "A higher-energy route built around texture, movement, and social evenings, with enough white space to keep it luxury instead of hectic.",
    heroImage:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1600&q=80",
    region: "Lisbon to Marrakech",
    dates: "Jun 02 - Jun 11",
    travelers: "3 travelers",
    budget: "$7,980",
    status: "Shared with collaborators",
    highlight: "Warm weather route with strong nightlife and market energy.",
    tags: ["Summer", "Food route", "Social trip"],
    route: ["Lisbon", "Seville", "Marrakech"],
    budgetBreakdown: [
      { amount: 2400, label: "Flights + rail", note: "Short hops with premium timing" },
      { amount: 1960, label: "Stay", note: "Riads, terraces, and city-center suites" },
      { amount: 1480, label: "Experiences", note: "Guides, tastings, and hammam nights" },
      { amount: 920, label: "Food", note: "Chef-led dinners and market grazing" },
      { amount: 1220, label: "Flex", note: "Shopping and last-minute upgrades" },
    ],
    notes: [
      {
        date: "Day 1",
        title: "Arrival rhythm",
        body: "Keep the first Lisbon afternoon unstructured so the group naturally syncs before the faster middle of the route.",
      },
      {
        date: "Day 4",
        title: "Energy spike",
        body: "Seville rooftop dinner should happen before the late flamenco booking so the night feels layered, not rushed.",
      },
    ],
    stops: [
      {
        city: "Lisbon",
        country: "Portugal",
        range: "Jun 02 - Jun 05",
        weather: "23°C / coastal sun",
        hotel: "Miradouro House",
        note: "Start with bright architecture, ocean air, and warm city pacing.",
        activities: [
          {
            time: "12:00",
            title: "Tile workshop + lunch",
            category: "Culture",
            detail: "Hands-on atelier visit with terrace lunch.",
            cost: "$110",
          },
        ],
      },
      {
        city: "Seville",
        country: "Spain",
        range: "Jun 05 - Jun 07",
        weather: "31°C / sunset heat",
        hotel: "Casa Naranja",
        note: "Lean into color, late dinners, and rooftop-to-courtyard transitions.",
        activities: [
          {
            time: "21:30",
            title: "Flamenco night sequence",
            category: "Nightlife",
            detail: "Dinner, live show, then river walk.",
            cost: "$190",
          },
        ],
      },
      {
        city: "Marrakech",
        country: "Morocco",
        range: "Jun 07 - Jun 11",
        weather: "34°C / dry gold light",
        hotel: "Riad Saffron",
        note: "Finish with texture, lantern-light dinners, and a strong visual story.",
        activities: [
          {
            time: "17:00",
            title: "Hammam + mint tea reset",
            category: "Wellness",
            detail: "A slower pace before the final market night.",
            cost: "$95",
          },
        ],
      },
    ],
  },
  {
    slug: "pacific-edit",
    shareSlug: "pacific-edit-public",
    title: "Pacific Edit",
    headline: "Neon districts, quiet shrines, and cinematic city sequencing.",
    summary:
      "A polished East Asia route balancing high-energy design neighborhoods with slower cultural anchors and strong public-share visuals.",
    heroImage:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80",
    region: "Tokyo to Seoul",
    dates: "Sep 01 - Sep 13",
    travelers: "2 travelers",
    budget: "$10,240",
    status: "Curated preview",
    highlight: "Best used when the judges need a visually rich story route.",
    tags: ["City glow", "Design-heavy", "Public-ready"],
    route: ["Tokyo", "Kyoto", "Seoul"],
    budgetBreakdown: [
      { amount: 3120, label: "Flights + rail", note: "Fast routes and green car transfers" },
      { amount: 2840, label: "Stay", note: "Shibuya suite, Kyoto ryokan, Seoul penthouse" },
      { amount: 1810, label: "Experiences", note: "Reservations, private guide, gallery access" },
      { amount: 1240, label: "Food", note: "Late-night omakase and café runs" },
      { amount: 1230, label: "Flex", note: "Shopping and location pivots" },
    ],
    notes: [
      {
        date: "Day 3",
        title: "Visual pacing",
        body: "Place the Kyoto sequence right after peak Tokyo energy so the route breathes instead of feeling flat.",
      },
    ],
    stops: [
      {
        city: "Tokyo",
        country: "Japan",
        range: "Sep 01 - Sep 05",
        weather: "28°C / electric nights",
        hotel: "Shibuya Frame Hotel",
        note: "Start with momentum, density, and visual scale.",
        activities: [
          {
            time: "22:00",
            title: "Neon food crawl",
            category: "Dining",
            detail: "Short-hop bars and reservation-led dinner sequence.",
            cost: "$210",
          },
        ],
      },
      {
        city: "Kyoto",
        country: "Japan",
        range: "Sep 05 - Sep 08",
        weather: "25°C / calm mornings",
        hotel: "Gion Residence",
        note: "Slow the trip without lowering the design standard.",
        activities: [
          {
            time: "07:30",
            title: "Temple path sunrise",
            category: "Experience",
            detail: "Early route before the city crowds arrive.",
            cost: "$45",
          },
        ],
      },
      {
        city: "Seoul",
        country: "South Korea",
        range: "Sep 08 - Sep 13",
        weather: "26°C / warm night air",
        hotel: "Gangnam Atelier",
        note: "End with nightlife, fashion, and high-polish density.",
        activities: [
          {
            time: "20:00",
            title: "Late-night design district",
            category: "Lifestyle",
            detail: "Showrooms, cocktails, and city views.",
            cost: "$160",
          },
        ],
      },
    ],
  },
];

export function slugToTitle(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function createFallbackTrip(slug: string): DemoTrip {
  const base = demoTrips[0];
  const title = slugToTitle(slug);

  return {
    ...base,
    slug,
    shareSlug: `${slug}-public`,
    title,
    headline: `${title} is staged as a premium mock itinerary ready for live demo clicks.`,
    summary:
      "This fallback trip is generated from the selected title so the create-trip flow feels connected even before real persistence exists.",
    highlight: "Mock trip generated from the create page preview.",
    tags: ["Generated preview", "Demo connected", "Premium shell"],
  };
}

export function getTripBySlug(slug: string) {
  return demoTrips.find((trip) => trip.slug === slug) ?? createFallbackTrip(slug);
}

export function getTripByShareSlug(slug: string) {
  return demoTrips.find((trip) => trip.shareSlug === slug) ?? createFallbackTrip(slug.replace(/-public$/, ""));
}
