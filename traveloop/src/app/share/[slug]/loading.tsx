"use client";

import { MarketingNavbar } from "@/components/layout/marketing-navbar";
import { PageContainer } from "@/components/ui/page-container";
import { PanelSkeleton } from "@/components/ui/skeleton";

export default function SharedTripLoading() {
  return (
    <div className="page-shell pb-14">
      <MarketingNavbar activeItem="share" />
      <PageContainer className="space-y-10 pt-8">
        <PanelSkeleton lines={4} />
        <div className="grid gap-4 xl:grid-cols-[1fr_0.98fr]">
          <div className="space-y-4">
            <PanelSkeleton lines={6} />
            <PanelSkeleton lines={6} />
          </div>
          <div className="space-y-4">
            <PanelSkeleton lines={6} />
            <PanelSkeleton lines={4} />
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
