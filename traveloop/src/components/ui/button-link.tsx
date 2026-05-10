"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

type ButtonLinkProps = VariantProps<typeof buttonVariants> & {
  children: ReactNode;
  className?: string;
  href: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function ButtonLink({
  children,
  className,
  glow,
  href,
  leftIcon,
  rightIcon,
  size,
  variant,
}: ButtonLinkProps) {
  const isFullWidth = className?.split(/\s+/).includes("w-full");

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.012 }}
      whileTap={{ scale: 0.985 }}
      className={cn(isFullWidth ? "w-full" : "inline-flex")}
    >
      <Link
        href={href}
        className={cn(buttonVariants({ glow, size, variant }), className)}
      >
        <span className="relative z-10 inline-flex items-center gap-2.5">
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </span>
      </Link>
    </motion.div>
  );
}
