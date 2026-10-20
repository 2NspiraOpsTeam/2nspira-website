"use client";

import { useEffect, useRef, type ReactNode } from "react";
import CatalogEffects from "@/components/catalog/CatalogEffects";

/** Optional polish only: native disclosures and all content work without JS. */
export default function CoachingEffects({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || typeof window.matchMedia !== "function") return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Map<HTMLElement, Animation>();
    const animate = (target: HTMLElement, delay = 0) => {
      if (motion.matches || typeof target.animate !== "function") return;
      animations.get(target)?.cancel();
      const animation = target.animate(
        [{ opacity: 0.7, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }],
        { duration: 360, delay, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
      );
      animations.set(target, animation);
      animation.onfinish = () => animations.delete(target);
    };
    // Small grouped entrances bring the leadership and support rows into focus
    // once. There is no CSS visibility gate, scroll listener, or looping motion.
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach((entry, index) => {
        observer?.unobserve(entry.target);
        animate(entry.target as HTMLElement, Math.min(index * 45, 135));
      });
    }, { threshold: 0.15 });
    if (!motion.matches) el.querySelectorAll("[data-coaching-step]").forEach(target => observer?.observe(target));

    const onToggle = (event: Event) => {
      const details = event.target;
      if (!(details instanceof HTMLDetailsElement)) return;
      const content = Array.from(details.children).filter((child): child is HTMLElement => child instanceof HTMLElement && child.tagName !== "SUMMARY");
      content.forEach((child, index) => {
        animations.get(child)?.cancel();
        animations.delete(child);
        if (details.open) animate(child, Math.min(index * 35, 70));
      });
    };
    const stopMotion = () => {
      if (!motion.matches) return;
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
    };
    el.addEventListener("toggle", onToggle, true);
    motion.addEventListener("change", stopMotion);
    return () => {
      observer?.disconnect();
      el.removeEventListener("toggle", onToggle, true);
      motion.removeEventListener("change", stopMotion);
      animations.forEach(animation => animation.cancel());
    };
  }, []);

  return <div ref={root}><CatalogEffects>{children}</CatalogEffects></div>;
}
