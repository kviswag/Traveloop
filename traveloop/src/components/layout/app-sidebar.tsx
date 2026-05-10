"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { ButtonLink } from "@/components/ui/button-link";
import { GlassCard } from "@/components/ui/glass-card";

export type SidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  active?: boolean;
};

type AppSidebarProps = {
  items: SidebarItem[];
};

export function AppSidebar({ items }: AppSidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[17.5rem] px-4 py-4 md:block">
      <motion.div
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-panel flex h-full flex-col rounded-[2rem] px-4 py-5"
      >
        <Link href="/" className="mb-6 flex items-center gap-3 px-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-[linear-gradient(135deg,rgba(242,248,255,1),rgba(191,238,255,0.94)_52%,rgba(231,198,138,0.9))] text-slate-950 shadow-[0_14px_34px_rgba(110,231,249,0.18)]">
            <span className="font-display text-xl font-semibold">T</span>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[-0.03em] text-white">
              Traveloop
            </p>
            <p className="text-xs text-white/42">Cinematic planner</p>
          </div>
        </Link>

        <div className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "group flex w-full items-center justify-between rounded-[1.25rem] px-3 py-3 text-left transition",
                  item.active
                    ? "bg-white/[0.09] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "text-white/58 hover:bg-white/[0.05] hover:text-white",
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border transition",
                      item.active
                        ? "border-white/10 bg-white/[0.08]"
                        : "border-white/8 bg-white/[0.04] group-hover:border-white/16 group-hover:bg-white/[0.08]",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium tracking-[-0.02em]">
                    {item.label}
                  </span>
                </span>

                {item.badge ? (
                  <span className="rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[0.7rem] text-white/50">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto pt-6">
          <GlassCard glow="teal" padding="md" variant="elevated">
            <p className="eyebrow">Atmosphere</p>
            <p className="mt-3 text-lg font-medium tracking-[-0.03em] text-white">
              Switch the product into cinematic mode for pitch-perfect demos.
            </p>
            <p className="mt-2 text-sm leading-7 text-white/56">
              Premium gradients, guided motion, and curated focus states are all
              already part of the UI foundation.
            </p>
            <ButtonLink
              href="/share/aurora-loop-public"
              variant="secondary"
              size="sm"
              className="mt-5 w-full justify-between"
              leftIcon={<Sparkles className="h-4 w-4" />}
              rightIcon={<ArrowUpRight className="h-4 w-4" />}
            >
              Public story preview
            </ButtonLink>
          </GlassCard>
        </div>
      </motion.div>
    </aside>
  );
}
