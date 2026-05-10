"use client";

import type { BudgetLine } from "@/lib/demo-data";

import { GlassCard } from "@/components/ui/glass-card";
import { DisplayTitle, Eyebrow } from "@/components/ui/typography";

type BudgetBreakdownCardProps = {
  budget: string;
  lines: BudgetLine[];
  title?: string;
};

export function BudgetBreakdownCard({
  budget,
  lines,
  title = "Budget breakdown",
}: BudgetBreakdownCardProps) {
  const total = lines.reduce((sum, line) => sum + line.amount, 0);

  return (
    <GlassCard glow="gold" interactive padding="lg" variant="elevated" className="overflow-hidden">
      <div className="space-y-6">
        <div className="space-y-3">
          <Eyebrow>Budget view</Eyebrow>
          <DisplayTitle size="md">{title}</DisplayTitle>
          <p className="text-sm leading-7 text-white/58">
            High-clarity budget storytelling with enough structure to feel
            productized even before real calculations land.
          </p>
        </div>

        <div className="rounded-[1.65rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <p className="text-sm text-white/44">Projected total</p>
          <p className="mt-2 text-[2.8rem] font-semibold tracking-[-0.06em] text-white">
            {budget}
          </p>
        </div>

        <div className="space-y-4">
          {lines.map((line) => {
            const width = `${Math.max(16, (line.amount / total) * 100)}%`;

            return (
              <div key={line.label} className="space-y-2.5">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <p className="text-white/78">{line.label}</p>
                  <p className="text-white/56">${line.amount.toLocaleString()}</p>
                </div>
                <div className="h-2.5 rounded-full bg-white/[0.05]">
                  <div
                    className="h-2.5 rounded-full bg-[linear-gradient(90deg,rgba(191,238,255,0.95),rgba(231,198,138,0.88))] shadow-[0_0_22px_rgba(110,231,249,0.14)]"
                    style={{ width }}
                  />
                </div>
                <p className="text-xs leading-6 text-white/42">{line.note}</p>
              </div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}
