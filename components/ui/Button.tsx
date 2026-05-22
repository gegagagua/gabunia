import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "glow";
  size?: "sm" | "md" | "lg";
}

export function Button({ variant = "primary", size = "md", className, children, ...props }: Props) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none tracking-wide",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        variant === "primary" && [
          "bg-brand-500 text-white",
          "hover:bg-brand-400 hover:shadow-[0_0_24px_rgba(74,222,128,0.35)]",
          "active:scale-[0.98]",
        ],
        variant === "glow" && [
          "bg-brand-500/10 text-brand-400 border border-brand-500/30",
          "hover:bg-brand-500/20 hover:border-brand-400/60 hover:shadow-[0_0_24px_rgba(74,222,128,0.2)]",
          "active:scale-[0.98]",
        ],
        variant === "outline" && [
          "border border-white/15 text-white/80 bg-white/[0.03]",
          "hover:border-brand-500/50 hover:text-white hover:bg-white/[0.06]",
          "active:scale-[0.98]",
        ],
        variant === "ghost" && [
          "text-brand-400 hover:text-brand-300 hover:bg-brand-400/10",
        ],
        size === "sm" && "px-4 py-2 text-sm gap-1.5",
        size === "md" && "px-6 py-3 text-sm gap-2",
        size === "lg" && "px-8 py-4 text-base gap-2.5",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
