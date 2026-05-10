"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type FieldProps = {
  children: ReactNode;
  hint?: string;
  label: string;
};

export function Field({ children, hint, label }: FieldProps) {
  return (
    <label className="flex flex-col gap-3">
      <span className="text-sm font-medium tracking-[-0.02em] text-white/84">
        {label}
      </span>
      {children}
      {hint ? <span className="text-xs leading-6 text-white/42">{hint}</span> : null}
    </label>
  );
}

const controlClassName =
  "w-full rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/26 focus:border-white/20 focus:bg-white/[0.07]";

export function TextInput({
  className,
  ...props
}: ComponentPropsWithoutRef<"input">) {
  return <input className={cn(controlClassName, className)} {...props} />;
}

export function TextArea({
  className,
  ...props
}: ComponentPropsWithoutRef<"textarea">) {
  return <textarea className={cn(controlClassName, "min-h-32 resize-none", className)} {...props} />;
}

export function SelectInput({
  className,
  ...props
}: ComponentPropsWithoutRef<"select">) {
  return <select className={cn(controlClassName, "appearance-none", className)} {...props} />;
}
