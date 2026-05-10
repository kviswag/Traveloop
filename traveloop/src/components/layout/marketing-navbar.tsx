"use client";

import Link from "next/link";
import { Compass } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { ButtonLink } from "@/components/ui/button-link";

type MarketingNavbarProps = {
  activeItem?: "create" | "dashboard" | "itinerary" | "share";
  className?: string;
  context?: {
    shareSlug?: string;
    tripSlug?: string;
  };
};

export function MarketingNavbar({ activeItem, className, context }: MarketingNavbarProps) {
  const items = [
    { active: activeItem === "dashboard", href: "/dashboard", label: "Dashboard" },
    { active: activeItem === "create", href: "/trips/new", label: "Create Trip" },
    {
      active: activeItem === "itinerary",
      href: `/trips/${context?.tripSlug ?? "aurora-loop"}`,
      label: "Itinerary",
    },
    {
      active: activeItem === "share",
      href: `/share/${context?.shareSlug ?? "aurora-loop-public"}`,
      label: "Shared Page",
    },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8", className)}
    >
      <div className="glass-nav flex flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(242,248,255,1),rgba(191,238,255,0.94)_52%,rgba(231,198,138,0.9))] text-slate-950 shadow-[0_16px_34px_rgba(110,231,249,0.18)]">
            <Compass className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[-0.03em] text-white">
              Traveloop
            </p>
            <p className="text-xs text-white/44">Smart multi-city travel</p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm text-white/60 transition hover:bg-white/[0.05] hover:text-white",
                item.active && "bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <ButtonLink href="/trips/new" size="sm">
          Plan a trip
        </ButtonLink>
      </div>
    </motion.header>
  );
}
