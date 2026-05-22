import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono rounded-full",
      "border border-brand-500/25 text-brand-400 bg-brand-500/8",
      "shadow-[0_0_12px_rgba(74,222,128,0.06)]",
      className
    )}>
      {children}
    </span>
  );
}
