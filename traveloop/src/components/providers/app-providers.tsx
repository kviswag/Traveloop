"use client";

import type { PropsWithChildren } from "react";
import { MotionConfig } from "framer-motion";

import { defaultTransition } from "@/lib/motion";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <MotionConfig reducedMotion="user" transition={defaultTransition}>
      {children}
    </MotionConfig>
  );
}
