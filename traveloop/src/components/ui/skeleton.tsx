import { cn } from "@/lib/utils";

export function Skeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "skeleton-shimmer rounded-2xl border border-white/6 bg-white/[0.05]",
        className,
      )}
    />
  );
}

export function MetricSkeleton() {
  return (
    <div className="space-y-4 rounded-[1.75rem] border border-white/8 bg-white/[0.04] p-5">
      <Skeleton className="h-4 w-24 rounded-full" />
      <Skeleton className="h-10 w-32 rounded-2xl" />
      <Skeleton className="h-4 w-40 rounded-full" />
    </div>
  );
}

export function PanelSkeleton({
  lines = 4,
}: {
  lines?: number;
}) {
  return (
    <div className="space-y-4 rounded-[1.75rem] border border-white/8 bg-white/[0.04] p-5">
      <Skeleton className="h-5 w-28 rounded-full" />
      <Skeleton className="h-24 w-full rounded-[1.5rem]" />
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full rounded-full last:w-2/3" />
        ))}
      </div>
    </div>
  );
}
