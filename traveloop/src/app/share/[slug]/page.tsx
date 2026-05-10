"use client";

import { useParams } from "next/navigation";
import { ArrowRight, Compass, Globe2, Wallet } from "lucide-react";
import { motion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/lib/motion";
import { formatRouteLabel, useTripStore } from "@/lib/trip-store";

import { MarketingNavbar } from "@/components/layout/marketing-navbar";
import { BudgetBreakdownCard } from "@/components/trips/budget-breakdown-card";
import { ItineraryStopCard } from "@/components/trips/itinerary-stop-card";
import { ButtonLink } from "@/components/ui/button-link";
import { GlassCard } from "@/components/ui/glass-card";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeader } from "@/components/ui/section-header";
import { PanelSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function SharedTripPage() {
  const params = useParams<{ slug: string }>();
  const { getTripByShareSlug, hasHydrated } = useTripStore();
  const trip = getTripByShareSlug(params.slug);

  if (!trip && !hasHydrated) {
    return (
      <div className="page-shell pb-14">
        <MarketingNavbar activeItem="share" />
        <PageContainer className="space-y-6 pt-8">
          <GlassCard glow="cyan" padding="lg" variant="elevated">
            <div className="space-y-5">
              <Skeleton className="h-4 w-32 rounded-full" />
              <Skeleton className="h-16 w-80 max-w-full rounded-[2rem]" />
              <Skeleton className="h-4 w-full max-w-2xl rounded-full" />
              <div className="grid gap-4 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-24 rounded-[1.45rem]" />
                ))}
              </div>
            </div>
          </GlassCard>
          <div className="grid gap-4 xl:grid-cols-[1fr_0.98fr]">
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
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="page-shell pb-14">
        <MarketingNavbar activeItem="share" />
        <PageContainer className="pt-8">
          <GlassCard glow="gold" padding="lg" variant="elevated">
            <div className="space-y-4">
              <p className="eyebrow">Not available</p>
              <h2 className="text-4xl font-display tracking-[-0.05em] text-white">
                This trip is not available.
              </h2>
              <p className="text-sm leading-7 text-white/58">
                The link may be incorrect or the trip has been removed. Go back to the dashboard to find your trips.
              </p>
              <ButtonLink href="/dashboard">Back to dashboard</ButtonLink>
            </div>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }

  if (!trip.isPublic) {
    return (
      <div className="page-shell pb-14">
        <MarketingNavbar
          activeItem="share"
          context={{ shareSlug: trip.shareSlug, tripSlug: trip.slug }}
        />
        <PageContainer className="pt-8">
          <GlassCard glow="teal" padding="lg" variant="elevated">
            <div className="space-y-4">
              <p className="eyebrow">Private trip</p>
              <h2 className="text-4xl font-display tracking-[-0.05em] text-white">
                {trip.title} is set to private.
              </h2>
              <p className="text-sm leading-7 text-white/58">
                You can make this trip public from the itinerary builder to share it with others.
              </p>
              <ButtonLink href={`/trips/${trip.slug}`}>Open itinerary</ButtonLink>
            </div>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="page-shell pb-14">
      <MarketingNavbar
        activeItem="share"
        context={{ shareSlug: trip.shareSlug, tripSlug: trip.slug }}
      />
      <PageContainer className="space-y-10 pt-8">
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-4 xl:grid-cols-[1.02fr_0.98fr]"
        >
          <motion.div variants={fadeUp}>
            <GlassCard glow="gold" padding="lg" variant="elevated" className="min-h-[32rem] overflow-hidden">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(231,198,138,0.16),transparent_72%)] blur-3xl" />
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: `url(${trip.heroImage})` }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,9,15,0.28),rgba(3,9,15,0.7)_45%,rgba(3,9,15,0.95)_100%)]" />
              <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                <SectionHeader
                  eyebrow="Trip story"
                  title={trip.title}
                  description={trip.headline}
                />

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-[1.45rem] border border-white/10 bg-black/18 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/42">Route</p>
                    <p className="mt-3 text-sm text-white/80">{formatRouteLabel(trip.route)}</p>
                  </div>
                  <div className="rounded-[1.45rem] border border-white/10 bg-black/18 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/42">Dates</p>
                    <p className="mt-3 text-sm text-white/80">{trip.dates}</p>
                  </div>
                  <div className="rounded-[1.45rem] border border-white/10 bg-black/18 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/42">Budget</p>
                    <p className="mt-3 text-sm text-white/80">{trip.budget}</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            <GlassCard glow="cyan" padding="lg" variant="elevated">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs uppercase tracking-[0.24em] text-white/56">
                  <Globe2 className="h-3.5 w-3.5" />
                  Shared trip
                </div>
                <h2 className="text-4xl font-display tracking-[-0.05em] text-white">
                  A journey told as a travel story.
                </h2>
                <p className="text-sm leading-7 text-white/58">{trip.summary}</p>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/trips/new" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Plan your own
                  </ButtonLink>
                  <ButtonLink href={`/trips/${trip.slug}`} variant="outline">
                    View itinerary
                  </ButtonLink>
                </div>
              </div>
            </GlassCard>

            <GlassCard glow="teal" padding="lg" variant="elevated">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                  <Compass className="h-4 w-4 text-white/68" />
                  <p className="mt-3 text-sm text-white/44">Travelers</p>
                  <p className="mt-1 text-lg text-white">{trip.travelers}</p>
                </div>
                <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                  <Wallet className="h-4 w-4 text-white/68" />
                  <p className="mt-3 text-sm text-white/44">Budget</p>
                  <p className="mt-1 text-lg text-white">{trip.budget}</p>
                </div>
                <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                  <Globe2 className="h-4 w-4 text-white/68" />
                  <p className="mt-3 text-sm text-white/44">Status</p>
                  <p className="mt-1 text-lg text-white">{trip.status}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.section>

        <div className="grid gap-4 xl:grid-cols-[1fr_0.98fr]">
          <div className="space-y-4">
            {trip.stops.map((stop, index) => (
              <ItineraryStopCard key={`${trip.shareSlug}-${stop.city}`} index={index} stop={stop} />
            ))}
          </div>

          <div className="space-y-4">
            <BudgetBreakdownCard
              budget={trip.budget}
              lines={trip.budgetBreakdown}
              title="Budget breakdown"
            />

            <GlassCard glow="gold" padding="lg" variant="elevated">
              <div className="space-y-4">
                <p className="eyebrow">Travel notes</p>
                <h3 className="text-3xl font-display tracking-[-0.05em] text-white">
                  Highlights & memories.
                </h3>
                {trip.notes.map((note) => (
                  <div
                    key={`${trip.shareSlug}-${note.title}`}
                    className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-white/42">
                      {note.date}
                    </p>
                    <p className="mt-2 text-lg font-medium tracking-[-0.03em] text-white">
                      {note.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/58">{note.body}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
