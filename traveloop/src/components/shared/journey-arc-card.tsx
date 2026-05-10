"use client";

import { Clock3, Sparkles } from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";
import { DisplayTitle, Eyebrow } from "@/components/ui/typography";

type JourneyStop = {
  city: string;
  country: string;
  note: string;
};

type JourneyArcCardProps = {
  stops: JourneyStop[];
};

export function JourneyArcCard({ stops }: JourneyArcCardProps) {
  return (
    <GlassCard
      glow="gold"
      interactive
      padding="lg"
      variant="elevated"
      className="min-h-[28rem] overflow-hidden"
    >
      <div className="absolute left-8 top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(110,231,249,0.16),transparent_68%)] blur-3xl" />
      <div className="absolute bottom-6 right-8 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(231,198,138,0.14),transparent_72%)] blur-3xl" />
      <div className="flex h-full flex-col gap-8 md:gap-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <Eyebrow>Multi-city visual system</Eyebrow>
            <DisplayTitle size="lg" className="max-w-xl">
              A dashboard shell with movement, depth, and destination energy.
            </DisplayTitle>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-white/66 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <Sparkles className="h-4 w-4 text-[#e7c68a]" />
            Experience-first design language
          </div>
        </div>

        <div className="relative flex-1">
          <div className="travel-dots absolute inset-0 rounded-[1.75rem] opacity-35" />
          <div className="absolute left-[12%] right-[12%] top-[44%] hidden h-px bg-gradient-to-r from-transparent via-white/25 to-transparent md:block" />
          <div className="grid gap-4 md:grid-cols-3">
            {stops.map((stop, index) => (
              <div
                key={stop.city}
                className="group relative rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.16)] backdrop-blur-xl transition duration-500 hover:-translate-y-1"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.08] text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                    0{index + 1}
                  </div>
                  <div>
                    <p className="text-[1.45rem] font-medium tracking-[-0.04em] text-white">
                      {stop.city}
                    </p>
                    <p className="text-sm text-white/52">{stop.country}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-px w-full bg-gradient-to-r from-white/16 via-white/6 to-transparent" />
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.22em] text-white/50">
                    <Clock3 className="h-3.5 w-3.5" />
                    Route cue
                  </div>
                  <p className="max-w-[24ch] text-sm leading-7 text-white/60">{stop.note}</p>
                </div>
                <div className="absolute -top-2 left-1/2 hidden h-4 w-4 -translate-x-1/2 rounded-full border border-white/18 bg-[#c7efff] shadow-[0_0_18px_rgba(110,231,249,0.55)] transition-transform duration-500 group-hover:scale-110 md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
