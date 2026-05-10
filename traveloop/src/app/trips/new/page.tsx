"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPinned, Wand2 } from "lucide-react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { getShellNavigation } from "@/components/layout/shell-navigation";
import { Button } from "@/components/ui/button";
import { Field, SelectInput, TextArea, TextInput } from "@/components/ui/form-controls";
import { GlassCard } from "@/components/ui/glass-card";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeader } from "@/components/ui/section-header";
import { createLocalTrip, useTripStore } from "@/lib/trip-store";

export default function CreateTripPage() {
  const router = useRouter();
  const { createTrip, localTrips, trips } = useTripStore();
  const [title, setTitle] = useState("Midnight Atlas");
  const [region, setRegion] = useState("Lisbon, Marrakech, Seville");
  const [travelers, setTravelers] = useState("2 travelers");
  const [budget, setBudget] = useState("$8,800");
  const [tripStyle, setTripStyle] = useState("Luxury city arc");
  const [pacing, setPacing] = useState("Balanced");
  const [startDate, setStartDate] = useState("2026-06-02");
  const [endDate, setEndDate] = useState("2026-06-11");
  const [notes, setNotes] = useState(
    "Focus on one standout experience per city for a memorable journey.",
  );

  const previewTrip = createLocalTrip(
    {
      budget,
      endDate,
      notes,
      pacing,
      region,
      startDate,
      title,
      travelers,
      tripStyle,
    },
    trips,
  );

  function handleCreateTrip(target: "builder" | "share") {
    const trip = createTrip({
      budget,
      endDate,
      notes,
      pacing,
      region,
      startDate,
      title,
      travelers,
      tripStyle,
    });

    router.push(target === "builder" ? `/trips/${trip.slug}` : `/share/${trip.shareSlug}`);
  }

  const latestSavedTrip = localTrips[0] ?? trips[0];

  const { navbarItems, sidebarItems } = getShellNavigation("create", {
    shareSlug: latestSavedTrip?.shareSlug,
    tripSlug: latestSavedTrip?.slug,
  });

  return (
    <DashboardLayout
      navbarItems={navbarItems}
      sidebarItems={sidebarItems}
      navbarActions={
        <Button size="sm" onClick={() => handleCreateTrip("builder")}>
          Save trip
        </Button>
      }
    >
      <PageContainer className="space-y-8 pb-10">
        <SectionHeader
          eyebrow="New trip"
          title="Plan your next adventure."
          description="Fill in the details below to create a personalized itinerary with budget tracking and a shareable trip page."
          actions={
            <>
              <Button
                rightIcon={<ArrowRight className="h-4 w-4" />}
                onClick={() => handleCreateTrip("builder")}
              >
                Save & open itinerary
              </Button>
              <Button variant="outline" onClick={() => handleCreateTrip("share")}>
                Save & preview
              </Button>
            </>
          }
        />

        <div className="grid gap-4 xl:grid-cols-[0.98fr_1.02fr]">
          <GlassCard glow="cyan" padding="lg" variant="elevated">
            <form
              className="space-y-6"
              onSubmit={(event) => {
                event.preventDefault();
                handleCreateTrip("builder");
              }}
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Trip name" hint="Give your trip a memorable name.">
                  <TextInput value={title} onChange={(event) => setTitle(event.target.value)} />
                </Field>
                <Field label="Trip style" hint="Sets the tone for your itinerary.">
                  <SelectInput
                    value={tripStyle}
                    onChange={(event) => setTripStyle(event.target.value)}
                  >
                    <option>Luxury city arc</option>
                    <option>Slow editorial escape</option>
                    <option>Food and nightlife route</option>
                    <option>Design-forward week</option>
                  </SelectInput>
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Destinations" hint="Comma-separated cities.">
                  <TextInput value={region} onChange={(event) => setRegion(event.target.value)} />
                </Field>
                <Field label="Travelers" hint="How many people are joining?">
                  <TextInput
                    value={travelers}
                    onChange={(event) => setTravelers(event.target.value)}
                  />
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Start date">
                  <TextInput
                    type="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                  />
                </Field>
                <Field label="End date">
                  <TextInput
                    type="date"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                  />
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Budget" hint="Your estimated total spend.">
                  <TextInput value={budget} onChange={(event) => setBudget(event.target.value)} />
                </Field>
                <Field label="Pacing" hint="How fast or relaxed is the trip?">
                  <SelectInput value={pacing} onChange={(event) => setPacing(event.target.value)}>
                    <option>Balanced</option>
                    <option>Slow and curated</option>
                    <option>High-energy</option>
                    <option>Luxury with white space</option>
                  </SelectInput>
                </Field>
              </div>

              <Field label="Notes" hint="Any special requests or ideas.">
                <TextArea value={notes} onChange={(event) => setNotes(event.target.value)} />
              </Field>

              <div className="flex flex-wrap gap-3">
                <Button
                  type="submit"
                  leftIcon={<Wand2 className="h-4 w-4" />}
                >
                  Generate itinerary
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleCreateTrip("share")}
                >
                  Save & share
                </Button>
              </div>
            </form>
          </GlassCard>

          <GlassCard
            glow="gold"
            padding="lg"
            variant="elevated"
            className="xl:sticky xl:top-28 xl:self-start"
          >
            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6">
                <p className="eyebrow">Live preview</p>
                <h2 className="mt-4 font-display text-5xl leading-none tracking-[-0.06em] text-white">
                  {previewTrip.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/62">{previewTrip.summary}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/42">Route</p>
                  <p className="mt-3 text-sm text-white/80">{previewTrip.region}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/42">Budget</p>
                  <p className="mt-3 text-sm text-white/80">{previewTrip.budget}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/42">Dates</p>
                  <p className="mt-3 text-sm text-white/80">{previewTrip.dates}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/42">Style</p>
                  <p className="mt-3 text-sm text-white/80">{tripStyle}</p>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/46">
                  <MapPinned className="h-3.5 w-3.5" />
                  Route details
                </div>
                <div className="mt-4 space-y-3">
                  <p className="text-sm leading-7 text-white/58">
                    Itinerary: <span className="text-white/80">{previewTrip.slug}</span>
                  </p>
                  <p className="text-sm leading-7 text-white/58">
                    Share link: <span className="text-white/80">{previewTrip.shareSlug}</span>
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </PageContainer>
    </DashboardLayout>
  );
}
