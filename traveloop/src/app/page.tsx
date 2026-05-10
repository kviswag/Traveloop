"use client";

import { ArrowRight, MapPinned, Share2, Sparkles, Wallet } from "lucide-react";
import { motion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/lib/motion";
import { useTripStore } from "@/lib/trip-store";

import { MarketingNavbar } from "@/components/layout/marketing-navbar";
import { JourneyArcCard } from "@/components/shared/journey-arc-card";
import { MetricCard } from "@/components/shared/metric-card";
import { TripOverviewCard } from "@/components/trips/trip-overview-card";
import { ButtonLink } from "@/components/ui/button-link";
import { GlassCard } from "@/components/ui/glass-card";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeader } from "@/components/ui/section-header";
import { DisplayTitle, Eyebrow, Lead } from "@/components/ui/typography";

export default function LandingPage() {
  const { localTrips, trips } = useTripStore();
  const featuredTrip = localTrips[0] ?? trips[0];
  const showcaseTrips = trips.slice(0, 3);
  const combinedBudget = showcaseTrips.reduce((sum, trip) => sum + trip.budgetTotal, 0);
  const publicTrips = showcaseTrips.filter((trip) => trip.isPublic).length;

  const highlightMetrics = [
    {
      label: "Active trips",
      value: String(trips.length).padStart(2, "0"),
      detail: "All your planned and in-progress trips in one place.",
      icon: MapPinned,
      glow: "cyan" as const,
      trend: localTrips.length > 0 ? "Live" : "Ready",
    },
    {
      label: "Total budget",
      value: new Intl.NumberFormat("en-US", {
        currency: "USD",
        maximumFractionDigits: 0,
        notation: combinedBudget >= 100000 ? "compact" : "standard",
        style: "currency",
      }).format(combinedBudget),
      detail: "Combined budget across all your planned journeys.",
      icon: Wallet,
      glow: "gold" as const,
      trend: "On track",
    },
    {
      label: "Shared trips",
      value: `${Math.round((publicTrips / Math.max(showcaseTrips.length, 1)) * 100)}%`,
      detail: "Trips you have shared publicly with friends and family.",
      icon: Share2,
      glow: "teal" as const,
      trend: "Shareable",
    },
  ];

  return (
    <div className="page-shell pb-14">
      <MarketingNavbar
        context={{
          shareSlug: featuredTrip?.shareSlug,
          tripSlug: featuredTrip?.slug,
        }}
      />
      <PageContainer className="space-y-8 pt-8">
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]"
        >
          <motion.div variants={fadeUp} className="flex flex-col justify-center">
            <GlassCard
              glow="cyan"
              padding="lg"
              variant="elevated"
              className="h-full min-h-[32rem] overflow-hidden md:min-h-[34rem]"
            >
              <div className="absolute -right-16 top-8 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(110,231,249,0.18),transparent_70%)] blur-3xl" />
              <div className="absolute bottom-6 left-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(231,198,138,0.12),transparent_72%)] blur-3xl" />
              <div className="flex h-full flex-col justify-between gap-6">
                <div className="space-y-4">
                  <Eyebrow>Smart travel planning</Eyebrow>
                  <DisplayTitle size="hero" className="max-w-[9.5ch] text-balance">
                    Plan across cities like one seamless story.
                  </DisplayTitle>
                  <Lead className="max-w-xl">
                    Create multi-city itineraries, manage budgets, and share
                    beautiful trip pages — all from a single platform.
                  </Lead>
                </div>

                <div className="flex flex-wrap gap-3">
                  <ButtonLink
                    href="/dashboard"
                    size="lg"
                    leftIcon={<Sparkles className="h-4 w-4" />}
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Get started
                  </ButtonLink>
                  <ButtonLink href="/trips/new" variant="outline" size="lg">
                    Plan a new trip
                  </ButtonLink>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    "Multi-city itineraries",
                    "Smart budget tracking",
                    "Share with anyone",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    >
                      <p className="text-sm leading-7 text-white/66">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {featuredTrip ? (
            <motion.div variants={fadeUp}>
              <JourneyArcCard
                stops={featuredTrip.stops.map((stop) => ({
                  city: stop.city,
                  country: stop.country,
                  note: stop.note,
                }))}
              />
            </motion.div>
          ) : null}
        </motion.section>

        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-4 md:grid-cols-3"
        >
          {highlightMetrics.map((metric) => (
            <motion.div key={metric.label} variants={fadeUp}>
              <MetricCard {...metric} />
            </motion.div>
          ))}
        </motion.section>

        <section className="space-y-5">
          <SectionHeader
            eyebrow="Featured destinations"
            title="Explore inspiring travel routes."
            description="Discover curated journeys and start planning your next adventure."
            actions={
              featuredTrip ? (
                <ButtonLink href={`/share/${featuredTrip.shareSlug}`} variant="secondary">
                  View trip story
                </ButtonLink>
              ) : null
            }
          />

          <div className="grid gap-4 xl:grid-cols-3">
            {showcaseTrips.map((trip) => (
              <TripOverviewCard key={trip.slug} trip={trip} compact />
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <GlassCard glow="gold" padding="lg" variant="elevated">
            <div className="space-y-4">
              <Eyebrow>Why Traveloop</Eyebrow>
              <DisplayTitle size="lg">
                Beautiful trips, effortlessly planned.
              </DisplayTitle>
              <Lead className="max-w-none">
                From initial inspiration to a shareable travel story, Traveloop
                brings your entire journey together in one premium experience.
              </Lead>
            </div>
          </GlassCard>

          <GlassCard glow="teal" padding="lg" variant="elevated">
            <div className="space-y-4">
              <Eyebrow>Start planning</Eyebrow>
              <DisplayTitle size="md">
                Create a trip, build your itinerary, and share with the world.
              </DisplayTitle>
              <p className="text-sm leading-7 text-white/58">
                Three simple steps to turn your travel ideas into a polished,
                shareable journey.
              </p>
              <ButtonLink href="/trips/new" className="mt-2">
                Create your trip
              </ButtonLink>
            </div>
          </GlassCard>
        </section>
      </PageContainer>
    </div>
  );
}
