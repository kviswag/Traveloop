"use client";

import {
  Compass,
  LayoutDashboard,
  MapPinned,
  PenSquare,
  Share2,
} from "lucide-react";

import type { NavbarItem } from "@/components/layout/app-navbar";
import type { SidebarItem } from "@/components/layout/app-sidebar";

type ActiveView = "create" | "dashboard" | "itinerary" | "share";

type NavigationContext = {
  shareSlug?: string;
  tripSlug?: string;
};

export function getShellNavigation(active: ActiveView, context?: NavigationContext) {
  const itineraryHref = `/trips/${context?.tripSlug ?? "aurora-loop"}`;
  const shareHref = `/share/${context?.shareSlug ?? "aurora-loop-public"}`;

  const navbarItems: NavbarItem[] = [
    { href: "/dashboard", label: "Dashboard", active: active === "dashboard" },
    { href: "/trips/new", label: "Create Trip", active: active === "create" },
    { href: itineraryHref, label: "Itinerary", active: active === "itinerary" },
    { href: shareHref, label: "Shared Page", active: active === "share" },
  ];

  const sidebarItems: SidebarItem[] = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      active: active === "dashboard",
    },
    {
      href: "/trips/new",
      icon: PenSquare,
      label: "Create Trip",
      badge: "Flow",
      active: active === "create",
    },
    {
      href: itineraryHref,
      icon: MapPinned,
      label: "Itinerary",
      badge: "Demo",
      active: active === "itinerary",
    },
    {
      href: shareHref,
      icon: Share2,
      label: "Shared Page",
      active: active === "share",
    },
    {
      href: "/",
      icon: Compass,
      label: "Landing",
      active: false,
    },
  ];

  return { navbarItems, sidebarItems };
}
