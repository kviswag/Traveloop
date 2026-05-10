"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Compass, Search } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export type NavbarItem = {
  label: string;
  href: string;
  active?: boolean;
};

type AppNavbarProps = {
  items: NavbarItem[];
  actions?: ReactNode;
  className?: string;
};

export function AppNavbar({ actions, className, items }: AppNavbarProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8", className)}
    >
      <div className="glass-nav flex min-h-[4.5rem] items-center justify-between px-3 py-3 md:px-5">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(191,238,255,0.9),rgba(110,231,249,0.25))] text-slate-950 shadow-[0_14px_34px_rgba(110,231,249,0.22)]">
              <Compass className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[-0.03em] text-white">
                Traveloop
              </p>
              <p className="text-xs text-white/45">Premium travel operating system</p>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-1.5 lg:flex">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm text-white/60 transition hover:text-white",
                item.active && "bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden min-w-[16.5rem] items-center gap-2 rounded-full border border-white/8 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white/45 xl:flex">
            <Search className="h-4 w-4" />
            <span className="truncate whitespace-nowrap">Search journeys, routes, memories...</span>
          </div>
          {actions}
        </div>
      </div>

      <nav className="mt-3 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "glass-nav shrink-0 px-4 py-2 text-sm text-white/62",
              item.active && "bg-white/[0.08] text-white",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}
