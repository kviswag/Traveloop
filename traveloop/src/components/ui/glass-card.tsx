"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

const cardVariants = cva("glass-panel glass-card relative isolate", {
  variants: {
    variant: {
      default: "bg-white/[0.03]",
      elevated: "bg-white/[0.05] shadow-[0_32px_96px_rgba(0,0,0,0.3)]",
      subtle: "bg-white/[0.025]",
    },
    padding: {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
    glow: {
      none: "",
      cyan: "card-glow card-glow-cyan",
      gold: "card-glow card-glow-gold",
      teal: "card-glow card-glow-teal",
    },
    interactive: {
      true: "will-change-transform transition-[transform,box-shadow,border-color,background-color] duration-500",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
    glow: "none",
    interactive: false,
  },
});

export type GlassCardProps = HTMLMotionProps<"div"> &
  VariantProps<typeof cardVariants> & {
    children?: React.ReactNode;
    contentClassName?: string;
  };

export function GlassCard({
  children,
  className,
  contentClassName,
  glow,
  interactive,
  padding,
  variant,
  whileHover,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={interactive ? whileHover ?? { y: -8, scale: 1.012 } : whileHover}
      className={cn(
        cardVariants({ glow, interactive, padding, variant }),
        className,
      )}
      {...props}
    >
      <div className={cn("relative z-10", contentClassName)}>{children}</div>
    </motion.div>
  );
}
