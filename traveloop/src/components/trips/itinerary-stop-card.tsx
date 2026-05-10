"use client";

import { Clock3, Hotel, MapPinned } from "lucide-react";

import type { TripStop } from "@/lib/demo-data";

import { GlassCard } from "@/components/ui/glass-card";

type ItineraryStopCardProps = {
  index: number;
  stop: TripStop;
};

export function ItineraryStopCard({ index, stop }: ItineraryStopCardProps) {
  return (
    <GlassCard interactive padding="lg" variant="elevated" className="relative overflow-hidden">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(110,231,249,0.12),transparent_72%)] blur-3xl" />
      <div className="absolute left-8 top-20 hidden h-[calc(100%-4.5rem)] w-px bg-gradient-to-b from-white/18 via-white/8 to-transparent md:block" />
      <div className="relative z-10 space-y-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.08] text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="max-w-[34rem]">
              <p className="text-sm text-white/50">{stop.country}</p>
              <h3 className="mt-1 text-[2rem] font-semibold tracking-[-0.05em] text-white">
                {stop.city}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/60">{stop.note}</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[24rem]">
            <div className="rounded-[1.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/42">
                <MapPinned className="h-3.5 w-3.5" />
                Stay
              </div>
              <p className="mt-2 text-sm text-white/78">{stop.range}</p>
            </div>
            <div className="rounded-[1.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/42">
                <Hotel className="h-3.5 w-3.5" />
                Hotel
              </div>
              <p className="mt-2 text-sm text-white/78">{stop.hotel}</p>
            </div>
            <div className="rounded-[1.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/42">
                <Clock3 className="h-3.5 w-3.5" />
                Weather
              </div>
              <p className="mt-2 text-sm text-white/78">{stop.weather}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {stop.activities.map((activity) => (
            <div
              key={`${stop.city}-${activity.time}-${activity.title}`}
              className="rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.035))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition duration-500 hover:-translate-y-0.5"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/46">
                    <span>{activity.time}</span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.62rem] text-white/64">
                      {activity.category}
                    </span>
                  </div>
                  <p className="text-lg font-medium tracking-[-0.04em] text-white">
                    {activity.title}
                  </p>
                  <p className="text-sm leading-7 text-white/60">{activity.detail}</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                  {activity.cost}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
