import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { DisplayTitle, Eyebrow, Lead } from "./typography";

type SectionHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: string;
  actions?: ReactNode;
  className?: string;
  centered?: boolean;
};

export function SectionHeader({
  actions,
  centered = false,
  className,
  description,
  eyebrow,
  title,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8",
        centered && "items-center text-center md:items-center",
        className,
      )}
    >
      <div className={cn("space-y-3.5", centered && "flex max-w-3xl flex-col items-center")}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <DisplayTitle as="h1" size="xl" className="max-w-4xl text-balance">
          {title}
        </DisplayTitle>
        {description ? <Lead className="max-w-3xl">{description}</Lead> : null}
      </div>
      {actions ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:justify-end">
          {actions}
        </div>
      ) : null}
    </div>
  );
}
