"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { getShellNavigation } from "@/components/layout/shell-navigation";
import { PageContainer } from "@/components/ui/page-container";
import { PanelSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function ItineraryLoading() {
  const { navbarItems, sidebarItems } = getShellNavigation("itinerary");

  return (
    <DashboardLayout navbarItems={navbarItems} sidebarItems={sidebarItems}>
      <PageContainer className="space-y-10 pb-12">
        <PanelSkeleton lines={3} />
        <div className="grid gap-4 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-4">
            <PanelSkeleton lines={6} />
            <PanelSkeleton lines={6} />
          </div>
          <div className="space-y-4">
            <div className="space-y-4 rounded-[1.75rem] border border-white/8 bg-white/[0.04] p-5">
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="h-10 w-40 rounded-2xl" />
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full rounded-full" />
                ))}
              </div>
            </div>
            <PanelSkeleton lines={4} />
          </div>
        </div>
      </PageContainer>
    </DashboardLayout>
  );
}
