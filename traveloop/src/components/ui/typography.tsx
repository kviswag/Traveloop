import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const displayVariants = cva("font-display tracking-[-0.05em] text-white", {
  variants: {
    size: {
      hero: "type-hero",
      xl: "type-display",
      lg: "text-[2rem] leading-[0.94] md:text-[3.5rem]",
      md: "text-[1.8rem] leading-[0.96] md:text-[3rem]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type DisplayTitleProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof displayVariants> & {
    as?: "h1" | "h2" | "h3";
  };

export function DisplayTitle({
  as: Component = "h2",
  className,
  size,
  ...props
}: DisplayTitleProps) {
  return <Component className={cn(displayVariants({ size }), className)} {...props} />;
}

export function Eyebrow({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("eyebrow", className)} {...props} />;
}

export function Lead({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("type-lead max-w-3xl text-balance", className)} {...props} />;
}

export function MetricValue({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-[2.4rem] font-semibold tracking-[-0.06em] text-white md:text-[3.6rem]",
        className,
      )}
      {...props}
    />
  );
}
