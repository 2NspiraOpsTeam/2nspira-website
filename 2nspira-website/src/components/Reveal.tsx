"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms (applied as transition-delay). */
  delay?: number;
};

/**
 * Restrained scroll-reveal (approved 2026-09-10): a single gentle rise when
 * the element first enters the viewport. No loops, no parallax, no bounce.
 *
 * Accessibility:
 * - Under `prefers-reduced-motion: reduce` the `.reveal` styles are not
 *   applied at all (see globals.css), so content is always fully visible.
 * - If `IntersectionObserver` is unavailable, the element is shown
 *   immediately — content is never left hidden.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
