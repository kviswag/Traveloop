"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { getShellNavigation } from "@/components/layout/shell-navigation";
import { MetricSkeleton, PanelSkeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/ui/page-container";

export default function DashboardLoading() {
  const { navbarItems, sidebarItems } = getShellNavigation("dashboard");

  return (
    <DashboardLayout navbarItems={navbarItems} sidebarItems={sidebarItems}>
      <PageContainer className="space-y-10 pb-12">
        <PanelSkeleton lines={3} />
        <div className="grid gap-4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <MetricSkeleton key={index} />
          ))}
        </div>
        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <PanelSkeleton lines={5} />
          <PanelSkeleton lines={6} />
        </div>
        <div className="grid gap-4 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <PanelSkeleton key={index} lines={5} />
          ))}
        </div>
      </PageContainer>
    </DashboardLayout>
  );
}
