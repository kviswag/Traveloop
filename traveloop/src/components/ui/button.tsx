"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "button-shine group relative inline-flex items-center justify-center overflow-hidden rounded-full border text-sm font-medium tracking-[-0.02em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-white/20 bg-[linear-gradient(135deg,rgba(244,249,255,1),rgba(203,241,255,0.96)_48%,rgba(231,198,138,0.94))] text-slate-950 shadow-[0_22px_52px_rgba(110,231,249,0.22)]",
        secondary:
          "glass-nav border-white/10 bg-white/[0.07] text-white hover:border-white/18 hover:bg-white/[0.12]",
        ghost:
          "border-transparent bg-transparent text-white/78 hover:bg-white/[0.06] hover:text-white",
        outline:
          "border-white/12 bg-white/[0.045] text-white hover:border-white/24 hover:bg-white/[0.09]",
      },
      size: {
        sm: "h-10 gap-2 px-4",
        md: "h-12 gap-2.5 px-5",
        lg: "h-14 gap-3 px-6 text-[0.95rem]",
      },
      glow: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        glow: true,
        className: "shadow-[0_24px_60px_rgba(110,231,249,0.24)]",
      },
      {
        variant: "outline",
        glow: true,
        className: "shadow-[0_14px_34px_rgba(0,0,0,0.18)]",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      glow: true,
    },
  },
);

export type ButtonProps = Omit<HTMLMotionProps<"button">, "size"> &
  VariantProps<typeof buttonVariants> & {
    children?: React.ReactNode;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      glow,
      leftIcon,
      rightIcon,
      size,
      type = "button",
      variant,
      whileHover,
      whileTap,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        whileHover={whileHover ?? { y: -3, scale: 1.012 }}
        whileTap={whileTap ?? { scale: 0.985 }}
        className={cn(buttonVariants({ glow, size, variant }), className)}
        {...props}
      >
        <span className="relative z-10 inline-flex items-center gap-2.5">
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </span>
      </motion.button>
    );
  },
);

Button.displayName = "Button";
