import type { ReactNode } from "react";

export function AmbientField({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute -left-28 top-12 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-accent-soft/80 blur-3xl" />
    </div>
  );
}

export function AccentRule({ className = "" }: { className?: string }) {
  return (
    <span
      className={`block h-0.5 w-12 origin-left bg-accent transition-transform duration-500 ease-gentle group-hover:scale-x-125 ${className}`}
      aria-hidden="true"
    />
  );
}

export function EyebrowPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-accent/15 bg-accent-soft/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
      {children}
    </span>
  );
}
