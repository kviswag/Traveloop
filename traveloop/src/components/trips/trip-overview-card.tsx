"use client";

import Link from "next/link";
import { ArrowUpRight, MapPinned, Wallet } from "lucide-react";
import { motion } from "framer-motion";

import type { DemoTrip } from "@/lib/demo-data";

import { formatRouteLabel } from "@/lib/trip-store";
import { cn } from "@/lib/utils";

type TripOverviewCardProps = {
  trip: DemoTrip;
  compact?: boolean;
  href?: string;
};

export function TripOverviewCard({
  compact = false,
  href,
  trip,
}: TripOverviewCardProps) {
  const target = href ?? `/trips/${trip.slug}`;

  return (
    <motion.div whileHover={{ y: -8, scale: 1.012 }} className="h-full">
      <Link
        href={target}
        className="glass-panel glass-card group relative flex h-full min-h-[23rem] flex-col justify-end overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_28px_82px_rgba(0,0,0,0.22)]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${trip.heroImage})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,14,0.04),rgba(2,8,14,0.42)_38%,rgba(2,8,14,0.95)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(110,231,249,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(231,198,138,0.16),transparent_24%)]" />

        <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-2">
            {trip.tags.slice(0, compact ? 2 : 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/12 bg-black/18 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-white/82 backdrop-blur-xl"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-white/60">{trip.region}</p>
              <h3
                className={cn(
                  "mt-2 font-display leading-none tracking-[-0.05em] text-white",
                  compact ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl",
                )}
              >
                {trip.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/70">
                {trip.headline}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.07] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/48">
                  <MapPinned className="h-3.5 w-3.5" />
                  Route
                </div>
                <p className="mt-2 text-sm text-white/78">{formatRouteLabel(trip.route)}</p>
              </div>
              <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.07] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/48">
                  <Wallet className="h-3.5 w-3.5" />
                  Budget
                </div>
                <p className="mt-2 text-sm text-white/78">{trip.budget}</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/16 px-4 py-2 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
              <span>Open itinerary</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
