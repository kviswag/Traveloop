"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowRight, Share2, Sparkles } from "lucide-react";

import {
  createBudgetBreakdown,
  formatBudgetTotal,
  formatRouteLabel,
  parseBudgetInput,
  useTripStore,
} from "@/lib/trip-store";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { getShellNavigation } from "@/components/layout/shell-navigation";
import { BudgetBreakdownCard } from "@/components/trips/budget-breakdown-card";
import { ItineraryStopCard } from "@/components/trips/itinerary-stop-card";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Field, SelectInput, TextArea, TextInput } from "@/components/ui/form-controls";
import { GlassCard } from "@/components/ui/glass-card";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeader } from "@/components/ui/section-header";
import { PanelSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function ItineraryBuilderPage() {
  const params = useParams<{ slug: string }>();
  const { getTripBySlug, hasHydrated, updateTrip } = useTripStore();
  const trip = getTripBySlug(params.slug);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [headline, setHeadline] = useState("");
  const [travelers, setTravelers] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("Drafting route");
  const [visibility, setVisibility] = useState("public");
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    if (!trip) {
      return;
    }

    setTitle(trip.title);
    setSummary(trip.summary);
    setHeadline(trip.headline);
    setTravelers(trip.travelers);
    setBudget(trip.budget);
    setStatus(trip.status);
    setVisibility(trip.isPublic ? "public" : "private");
  }, [trip]);

  const { navbarItems, sidebarItems } = getShellNavigation("itinerary", {
    shareSlug: trip?.shareSlug ?? `${params.slug}-public`,
    tripSlug: params.slug,
  });

  function handleSaveTrip() {
    if (!trip || trip.source !== "local") {
      return;
    }

    const budgetTotal = parseBudgetInput(budget) || trip.budgetTotal;

    updateTrip(trip.slug, {
      budget: formatBudgetTotal(budgetTotal),
      budgetBreakdown: createBudgetBreakdown(budgetTotal),
      budgetTotal,
      headline,
      isPublic: visibility === "public",
      status,
      summary,
      title,
      travelers,
    });
    setSaveMessage("Changes saved!");
  }

  if (!trip && !hasHydrated) {
    return (
      <DashboardLayout navbarItems={navbarItems} sidebarItems={sidebarItems}>
        <PageContainer className="space-y-6 pb-10 pt-4">
          <GlassCard glow="cyan" padding="lg" variant="elevated">
            <div className="space-y-5">
              <Skeleton className="h-4 w-32 rounded-full" />
              <Skeleton className="h-16 w-80 max-w-full rounded-[2rem]" />
              <Skeleton className="h-4 w-full max-w-2xl rounded-full" />
              <div className="grid gap-4 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-24 rounded-[1.4rem]" />
                ))}
              </div>
            </div>
          </GlassCard>
          <div className="grid gap-4 xl:grid-cols-[1.02fr_0.98fr]">
            <div className="space-y-4">
              <PanelSkeleton lines={5} />
              <PanelSkeleton lines={5} />
            </div>
            <div className="space-y-4">
              <PanelSkeleton lines={6} />
              <PanelSkeleton lines={4} />
            </div>
          </div>
        </PageContainer>
      </DashboardLayout>
    );
  }

  if (!trip) {
    return (
      <DashboardLayout navbarItems={navbarItems} sidebarItems={sidebarItems}>
        <PageContainer className="pb-10 pt-4">
          <GlassCard glow="gold" padding="lg" variant="elevated">
            <div className="space-y-4">
              <p className="eyebrow">Trip not found</p>
              <h2 className="text-4xl font-display tracking-[-0.05em] text-white">
                We couldn&apos;t find this trip.
              </h2>
              <p className="text-sm leading-7 text-white/58">
                It may have been removed or the link is incorrect. Create a new trip or browse your dashboard.
              </p>
              <ButtonLink href="/trips/new">Create a trip</ButtonLink>
            </div>
          </GlassCard>
        </PageContainer>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      navbarItems={navbarItems}
      sidebarItems={sidebarItems}
      navbarActions={
        <ButtonLink
          href={`/share/${trip.shareSlug}`}
          size="sm"
          leftIcon={<Share2 className="h-4 w-4" />}
        >
          Share
        </ButtonLink>
      }
    >
      <PageContainer className="space-y-10 pb-12">
        <GlassCard glow="cyan" padding="lg" variant="elevated" className="overflow-hidden">
          <div className="absolute -right-16 top-8 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(110,231,249,0.16),transparent_72%)] blur-3xl" />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{ backgroundImage: `url(${trip.heroImage})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(4,10,18,0.78),rgba(4,10,18,0.95)_58%,rgba(4,10,18,0.98))]" />
          <div className="relative z-10 space-y-6">
            <SectionHeader
              eyebrow="Itinerary"
              title={trip.title}
              description={trip.summary}
              actions={
                <>
                  <ButtonLink href="/trips/new" variant="outline">
                    New trip
                  </ButtonLink>
                  <ButtonLink
                    href={`/share/${trip.shareSlug}`}
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Share trip
                  </ButtonLink>
                </>
              }
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <p className="text-xs uppercase tracking-[0.24em] text-white/42">Route</p>
                <p className="mt-3 text-sm text-white/78">{formatRouteLabel(trip.route)}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <p className="text-xs uppercase tracking-[0.24em] text-white/42">Dates</p>
                <p className="mt-3 text-sm text-white/78">{trip.dates}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <p className="text-xs uppercase tracking-[0.24em] text-white/42">Travelers</p>
                <p className="mt-3 text-sm text-white/78">{trip.travelers}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <p className="text-xs uppercase tracking-[0.24em] text-white/42">Status</p>
                <p className="mt-3 text-sm text-white/78">{trip.status}</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="grid gap-4 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-4">
            {trip.stops.map((stop, index) => (
              <ItineraryStopCard key={`${trip.slug}-${stop.city}`} index={index} stop={stop} />
            ))}
          </div>

          <div className="space-y-4">
            <BudgetBreakdownCard budget={trip.budget} lines={trip.budgetBreakdown} />

            <GlassCard glow="teal" padding="lg" variant="elevated">
              {trip.source === "local" ? (
                <div className="space-y-5">
                  <div className="space-y-3">
                    <p className="eyebrow">Edit trip</p>
                    <h3 className="text-3xl font-display tracking-[-0.05em] text-white">
                      Update your trip details.
                    </h3>
                    <p className="text-sm leading-7 text-white/58">
                      Changes will be reflected on your shared trip page immediately.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Trip name">
                      <TextInput value={title} onChange={(event) => setTitle(event.target.value)} />
                    </Field>
                    <Field label="Travelers">
                      <TextInput
                        value={travelers}
                        onChange={(event) => setTravelers(event.target.value)}
                      />
                    </Field>
                  </div>

                  <Field label="Summary">
                    <TextArea
                      className="min-h-28"
                      value={summary}
                      onChange={(event) => setSummary(event.target.value)}
                    />
                  </Field>

                  <Field label="Share headline">
                    <TextArea
                      className="min-h-24"
                      value={headline}
                      onChange={(event) => setHeadline(event.target.value)}
                    />
                  </Field>

                  <div className="grid gap-5 md:grid-cols-3">
                    <Field label="Budget">
                      <TextInput value={budget} onChange={(event) => setBudget(event.target.value)} />
                    </Field>
                    <Field label="Status">
                      <SelectInput value={status} onChange={(event) => setStatus(event.target.value)}>
                        <option>Drafting route</option>
                        <option>Ready for takeoff</option>
                        <option>Shared with collaborators</option>
                        <option>Curated preview</option>
                      </SelectInput>
                    </Field>
                    <Field label="Visibility">
                      <SelectInput
                        value={visibility}
                        onChange={(event) => setVisibility(event.target.value)}
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </SelectInput>
                    </Field>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button onClick={handleSaveTrip}>Save changes</Button>
                    <ButtonLink href={`/share/${trip.shareSlug}`} variant="outline">
                      View shared page
                    </ButtonLink>
                    {saveMessage ? (
                      <p className="text-sm text-emerald-100/80">{saveMessage}</p>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <p className="eyebrow">Curated trip</p>
                  <h3 className="text-3xl font-display tracking-[-0.05em] text-white">
                    This is a sample trip.
                  </h3>
                  <p className="text-sm leading-7 text-white/58">
                    Sample trips are read-only. Create your own trip to customize every detail.
                  </p>
                  <ButtonLink href="/trips/new" variant="secondary">
                    Create your own trip
                  </ButtonLink>
                </div>
              )}
            </GlassCard>

            <GlassCard glow="gold" padding="lg" variant="elevated">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs uppercase tracking-[0.24em] text-white/56">
                  <Sparkles className="h-3.5 w-3.5" />
                  Tip
                </div>
                <p className="text-2xl font-display tracking-[-0.05em] text-white">
                  Share your trip as a beautiful travel story.
                </p>
                <p className="text-sm leading-7 text-white/58">
                  Your shared page presents your itinerary in a stunning
                  visual format — perfect for sending to travel companions.
                </p>
                <ButtonLink href={`/share/${trip.shareSlug}`} variant="secondary">
                  View shared page
                </ButtonLink>
              </div>
            </GlassCard>
          </div>
        </div>
      </PageContainer>
    </DashboardLayout>
  );
}
