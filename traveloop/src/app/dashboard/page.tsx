"use client";

import { ArrowRight, Compass, Share2, Sparkles, TimerReset, Wallet } from "lucide-react";
import { motion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/lib/motion";
import { useTripStore } from "@/lib/trip-store";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { getShellNavigation } from "@/components/layout/shell-navigation";
import { JourneyArcCard } from "@/components/shared/journey-arc-card";
import { MetricCard } from "@/components/shared/metric-card";
import { BudgetBreakdownCard } from "@/components/trips/budget-breakdown-card";
import { TripOverviewCard } from "@/components/trips/trip-overview-card";
import { ButtonLink } from "@/components/ui/button-link";
import { GlassCard } from "@/components/ui/glass-card";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeader } from "@/components/ui/section-header";

export default function DashboardPage() {
  const { localTrips, trips } = useTripStore();
  const featuredTrip = localTrips[0] ?? trips[0];
  const publicTrips = trips.filter((trip) => trip.isPublic).length;
  const totalBudget = trips.reduce((sum, trip) => sum + trip.budgetTotal, 0);
  const shareReadiness = trips.length > 0 ? Math.round((publicTrips / trips.length) * 100) : 0;
  const savedTrips = localTrips.slice(0, 3);
  const curatedTrips = trips.filter((trip) => trip.source === "demo").slice(0, 3);
  const { navbarItems, sidebarItems } = getShellNavigation("dashboard", {
    shareSlug: featuredTrip?.shareSlug,
    tripSlug: featuredTrip?.slug,
  });

  return (
    <DashboardLayout
      navbarItems={navbarItems}
      sidebarItems={sidebarItems}
      navbarActions={
        <div className="flex items-center gap-2">
          <ButtonLink href="/trips/new" size="sm">
            New Trip
          </ButtonLink>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.08] text-sm font-medium text-white">
            TL
          </div>
        </div>
      }
    >
      <PageContainer className="space-y-10 pb-12">
        <GlassCard glow="cyan" padding="lg" variant="elevated" className="overflow-hidden">
          <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(110,231,249,0.2),transparent_72%)] blur-3xl" />
          <div className="absolute bottom-0 left-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(231,198,138,0.12),transparent_72%)] blur-3xl" />
          <SectionHeader
            eyebrow="Welcome back"
            title="Your travel hub."
            description="Manage your trips, track budgets, and share your journeys — all in one place."
            actions={
              <>
                <ButtonLink href="/trips/new" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Create new trip
                </ButtonLink>
                {featuredTrip ? (
                  <ButtonLink href={`/share/${featuredTrip.shareSlug}`} variant="outline">
                    View shared trip
                  </ButtonLink>
                ) : null}
              </>
            }
          />
        </GlassCard>

        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-4 lg:grid-cols-3"
        >
          <motion.div variants={fadeUp}>
            <MetricCard
              label="Active trips"
              value={String(trips.length).padStart(2, "0")}
              detail={`${localTrips.length} saved by you · ${trips.length - localTrips.length} curated`}
              icon={Compass}
              glow="cyan"
              trend={localTrips.length > 0 ? "Saved" : "Curated"}
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <MetricCard
              label="Total budget"
              value={new Intl.NumberFormat("en-US", {
                currency: "USD",
                maximumFractionDigits: 0,
                notation: totalBudget >= 100000 ? "compact" : "standard",
                style: "currency",
              }).format(totalBudget)}
              detail="Combined budget across all your planned trips."
              icon={Wallet}
              glow="gold"
              trend="Tracked"
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <MetricCard
              label="Shared publicly"
              value={`${shareReadiness}%`}
              detail="Percentage of your trips shared with others."
              icon={Share2}
              glow="teal"
              trend="Shareable"
            />
          </motion.div>
        </motion.section>

        {featuredTrip ? (
          <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <JourneyArcCard
              stops={featuredTrip.stops.map((stop) => ({
                city: stop.city,
                country: stop.country,
                note: stop.note,
              }))}
            />
            <BudgetBreakdownCard
              budget={featuredTrip.budget}
              lines={featuredTrip.budgetBreakdown}
              title="Budget overview"
            />
          </div>
        ) : null}

        <section className="space-y-5">
          <SectionHeader
            eyebrow="Your trips"
            title={savedTrips.length > 0 ? "Trips you have created." : "No saved trips yet."}
            description={
              savedTrips.length > 0
                ? "Your custom trips with full itinerary and sharing features."
                : "Create your first trip and it will appear here instantly."
            }
          />
          {savedTrips.length > 0 ? (
            <div className="grid gap-4 xl:grid-cols-3">
              {savedTrips.map((trip) => (
                <TripOverviewCard key={trip.slug} trip={trip} compact />
              ))}
            </div>
          ) : (
            <GlassCard glow="teal" padding="lg" variant="elevated">
              <div className="space-y-4">
                <p className="eyebrow">Get started</p>
                <h3 className="text-3xl font-display tracking-[-0.05em] text-white">
                  Create your first trip to personalize your dashboard.
                </h3>
                <p className="text-sm leading-7 text-white/58">
                  Plan a multi-city itinerary, set a budget, and share
                  your journey with friends.
                </p>
                <ButtonLink href="/trips/new" variant="secondary">
                  Create a trip
                </ButtonLink>
              </div>
            </GlassCard>
          )}
        </section>

        <section className="space-y-5">
          <SectionHeader
            eyebrow="Explore"
            title="Curated travel inspiration."
            description="Handpicked routes to help spark your next adventure."
          />
          <div className="grid gap-4 xl:grid-cols-3">
            {curatedTrips.map((trip) => (
              <TripOverviewCard key={trip.slug} trip={trip} compact />
            ))}
          </div>
        </section>

        {featuredTrip ? (
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <GlassCard glow="teal" padding="lg" variant="elevated">
              <div className="space-y-5">
                <p className="eyebrow">Quick actions</p>
                <h3 className="text-3xl font-display tracking-[-0.05em] text-white">
                  Jump to any part of your journey.
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <ButtonLink href="/trips/new" variant="secondary" className="justify-between">
                    New trip
                  </ButtonLink>
                  <ButtonLink
                    href={`/trips/${featuredTrip.slug}`}
                    variant="secondary"
                    className="justify-between"
                  >
                    Itinerary builder
                  </ButtonLink>
                  <ButtonLink
                    href={`/share/${featuredTrip.shareSlug}`}
                    variant="secondary"
                    className="justify-between"
                  >
                    Shared trip page
                  </ButtonLink>
                  <ButtonLink href="/" variant="secondary" className="justify-between">
                    Home
                  </ButtonLink>
                </div>
              </div>
            </GlassCard>

            <GlassCard glow="cyan" padding="lg" variant="elevated">
              <div className="space-y-5">
                <p className="eyebrow">How it works</p>
                <h3 className="text-3xl font-display tracking-[-0.05em] text-white">
                  Three steps to your perfect trip.
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      icon: Sparkles,
                      title: "Create your trip",
                      body: "Add destinations, dates, and set your budget in minutes.",
                    },
                    {
                      icon: TimerReset,
                      title: "Build your itinerary",
                      body: "Customize stops, activities, and fine-tune every detail.",
                    },
                    {
                      icon: Share2,
                      title: "Share your journey",
                      body: "Generate a beautiful public page to share with friends and family.",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.07]">
                            <Icon className="h-4 w-4 text-white/76" />
                          </div>
                          <div>
                            <p className="text-base font-medium tracking-[-0.02em] text-white">
                              {item.title}
                            </p>
                            <p className="mt-1 text-sm leading-7 text-white/58">{item.body}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </GlassCard>
          </div>
        ) : null}
      </PageContainer>
    </DashboardLayout>
  );
}
