"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "rise" | "fade" | "scale";
};

/** Progressive enhancement: server-rendered content is never hidden by CSS. */
export default function Reveal({ children, className = "", delay = 0, variant = "rise" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined" || typeof matchMedia === "undefined" || typeof el.animate !== "function") return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      el.classList.add("is-visible");
      if (preference.matches) return;
      const transform = variant === "fade" ? "none" : variant === "scale" ? "translateY(6px) scale(.99)" : "translateY(10px)";
      animation = el.animate([
        { opacity: .65, transform },
        { opacity: 1, transform: "none" },
      ], { duration: 560, delay: Math.min(Math.max(delay, 0), 240), easing: "cubic-bezier(.2,.65,.3,1)" });
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
    const stop = () => { if (preference.matches) { observer.disconnect(); animation?.cancel(); } };
    preference.addEventListener("change", stop);
    observer.observe(el);
    return () => { observer.disconnect(); animation?.cancel(); preference.removeEventListener("change", stop); };
  }, [delay, variant]);

  return <div ref={ref} className={`reveal reveal-${variant} ${className}`}>{children}</div>;
}
