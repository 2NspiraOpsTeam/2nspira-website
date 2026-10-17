"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./ShopEffects.module.css";

/** Shop-only progressive enhancement: server-rendered content is never hidden. */
export default function ShopEffects({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (seen.has(entry.target) || motion.matches) continue;
        seen.add(entry.target);
        const target = entry.target as HTMLElement;
        if (typeof target.animate !== "function") continue;
        // Cards fade only, so entrance transforms never override hover feedback.
        const heading = target.hasAttribute("data-shop-reveal");
        const animation = target.animate(
          heading
            ? [{ opacity: 0.6, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }]
            : [{ opacity: 0.65 }, { opacity: 1 }],
          { duration: 520, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: 0.08 });

    // No opacity/visibility gate: no-JS, unsupported APIs, and focused controls
    // remain usable. Each entrance runs once, without loops or layout shifts.
    if (!motion.matches) {
      el.querySelectorAll('[data-shop-reveal], article, section[aria-labelledby="little-haunts-title"]')
        .forEach((target) => observer.observe(target));
    }
    const stopMotion = () => {
      if (!motion.matches) return;
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    motion.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", stopMotion);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return <div ref={root} className={styles.shop}>{children}</div>;
}
