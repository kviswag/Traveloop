"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";
import { MetricValue } from "@/components/ui/typography";

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  glow?: "cyan" | "gold" | "teal";
  trend?: string;
};

export function MetricCard({
  detail,
  glow = "cyan",
  icon: Icon,
  label,
  trend,
  value,
}: MetricCardProps) {
  return (
    <GlassCard glow={glow} interactive padding="md" variant="elevated" className="overflow-hidden">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
      <div className="flex h-full flex-col justify-between gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-4">
            <p className="text-sm text-white/50">{label}</p>
            <MetricValue>{value}</MetricValue>
          </div>
          <div className="space-y-3 text-right">
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-white/10 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <Icon className="h-5 w-5 text-white/78" />
            </div>
            {trend ? (
              <div className="inline-flex items-center gap-1 rounded-full border border-emerald-300/10 bg-emerald-300/8 px-2.5 py-1 text-xs text-emerald-100/80">
                <ArrowUpRight className="h-3 w-3" />
                {trend}
              </div>
            ) : null}
          </div>
        </div>
        <p className="max-w-[24ch] text-sm leading-7 text-white/60">{detail}</p>
      </div>
    </GlassCard>
  );
}
