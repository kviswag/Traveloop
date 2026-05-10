"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { fadeUp } from "@/lib/motion";

import { AppNavbar, type NavbarItem } from "@/components/layout/app-navbar";
import { AppSidebar, type SidebarItem } from "@/components/layout/app-sidebar";

type DashboardLayoutProps = {
  navbarItems: NavbarItem[];
  sidebarItems: SidebarItem[];
  navbarActions?: ReactNode;
  children: ReactNode;
};

export function DashboardLayout({
  children,
  navbarActions,
  navbarItems,
  sidebarItems,
}: DashboardLayoutProps) {
  return (
    <div className="page-shell pb-10">
      <AppSidebar items={sidebarItems} />
      <div className="relative min-h-dvh md:pl-[17.5rem]">
        <AppNavbar items={navbarItems} actions={navbarActions} />
        <motion.main
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative pt-4"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
