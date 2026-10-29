"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./CatalogEffects.module.css";

/** Opt-in public-page polish. Content is never hidden; existing Reveal scopes retain ownership. */
export default function CatalogEffects({ children, headings = false }: { children: ReactNode; headings?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined" || typeof window.matchMedia !== "function") return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    const active = new Map<Element, Animation>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (seen.has(entry.target) || motion.matches) continue;
        seen.add(entry.target);
        const target = entry.target as HTMLElement;
        if (typeof target.animate !== "function" || target.contains(document.activeElement)) continue;
        // Cards fade only, so entrance transforms never override hover feedback.
        const heading = target.hasAttribute("data-catalog-reveal") || (headings && target.matches("h1, h2"));
        const animation = target.animate(
          heading
            ? [{ opacity: 0.6, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }]
            : [{ opacity: 0.65 }, { opacity: 1 }],
          { duration: 520, delay: Math.min(Array.from(target.parentElement?.children ?? []).indexOf(target) * 55, 165), easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
        );
        animations.add(animation);
        active.set(target, animation);
        animation.onfinish = () => { animations.delete(animation); active.delete(target); };
      }
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

    // No opacity/visibility gate: no-JS, unsupported APIs, and focused controls
    // remain usable. Each entrance runs once, without loops or layout shifts.
    if (!motion.matches) {
      const explicit = '[data-catalog-reveal], [data-catalog-card], [data-catalog-fade], .effect-card';
      el.querySelectorAll(headings ? `${explicit}, h1, h2` : explicit).forEach((target) => {
        // Nested effects wrappers own their descendants. Never layer a heading
        // entrance over an existing Reveal, CSS hero, card or grouped entrance.
        if (target.closest("[data-page-effects]") !== el) return;
        if (target.closest(".reveal, .animate-rise, .hero-settle, [data-coaching-step], .article-body, form") ||
          target.parentElement?.closest(explicit)) return;
        observer.observe(target);
      });
    }
    // Keyboard interaction always takes priority over decorative entrances.
    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      for (const [target, animation] of active) {
        if (!target.contains(event.target)) continue;
        animation.cancel();
        animations.delete(animation);
        active.delete(target);
      }
    };
    el.addEventListener("focusin", focus);
    const stopMotion = () => {
      if (!motion.matches) return;
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      active.clear();
    };
    motion.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      el.removeEventListener("focusin", focus);
      motion.removeEventListener("change", stopMotion);
      animations.forEach((animation) => animation.cancel());
    };
  }, [headings]);

  return <div ref={root} className={styles.catalog} data-page-effects={headings ? "headings" : "catalog"}>{children}</div>;
}
