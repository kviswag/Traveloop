import type { Transition, Variants } from "framer-motion";

export const defaultTransition = {
  duration: 0.62,
  ease: [0.22, 1, 0.36, 1],
} satisfies Transition;

export const fadeUp = {
  hidden: {
    filter: "blur(10px)",
    opacity: 0,
    y: 22,
  },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
} satisfies Variants;

export const scaleIn = {
  hidden: {
    filter: "blur(8px)",
    opacity: 0,
    scale: 0.965,
    y: 18,
  },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    scale: 1,
    y: 0,
    transition: defaultTransition,
  },
} satisfies Variants;

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
} satisfies Variants;

export const gentleFloat = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 8.5,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
    },
  },
} satisfies Variants;
