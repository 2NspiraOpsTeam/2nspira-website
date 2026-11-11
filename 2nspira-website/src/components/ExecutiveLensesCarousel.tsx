"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { cardFlat, h3 } from "@/components/ui";
import styles from "./ExecutiveLensesCarousel.module.css";

const subscribeToMotion = (notify: () => void) => {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", notify);
  return () => preference.removeEventListener("change", notify);
};
const motionSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverMotionSnapshot = () => true;
type Lens = { title: string; text: string };

export default function ExecutiveLensesCarousel({ lenses }: { lenses: Lens[] }) {
  const reduced = useSyncExternalStore(subscribeToMotion, motionSnapshot, serverMotionSnapshot);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const canMove = !reduced && lenses.length > 1;
  const moving = canMove && !paused && !hovered && !focused;

  useEffect(() => {
    const element = viewport.current;
    if (!element || !canMove) return;
    // The second copy has no accessible content. Wrap by one complete set,
    // preserving the visual position as the identical copy comes into view.
    const normalize = () => {
      const first = element.children[0] as HTMLElement | undefined;
      const duplicate = element.children[lenses.length] as HTMLElement | undefined;
      const cycle = first && duplicate ? duplicate.offsetLeft - first.offsetLeft : 0;
      if (cycle > 0 && element.scrollLeft >= cycle) element.scrollLeft %= cycle;
    };
    element.addEventListener("scroll", normalize, { passive: true });
    return () => element.removeEventListener("scroll", normalize);
  }, [canMove, lenses.length]);

  useEffect(() => {
    const element = viewport.current;
    if (!element || !moving) return;
    let previous = 0, frame = 0, remainder = 0;
    const tick = (time: number) => {
      if (previous && !document.hidden) {
        const first = element.children[0] as HTMLElement | undefined;
        const duplicate = element.children[lenses.length] as HTMLElement | undefined;
        const cycle = first && duplicate ? duplicate.offsetLeft - first.offsetLeft : 0;
        if (cycle > 0) {
          const next = element.scrollLeft + Math.min(time - previous, 80) * 0.024 + remainder;
          const target = next >= cycle ? next % cycle : next;
          element.scrollLeft = target;
          remainder = target - element.scrollLeft;
        }
      }
      previous = time;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [moving, lenses.length]);

  const move = (direction: number) => {
    setPaused(true);
    const element = viewport.current;
    if (!element) return;
    const first = element.children[0] as HTMLElement | undefined;
    const duplicate = element.children[lenses.length] as HTMLElement | undefined;
    const cycle = first && duplicate ? duplicate.offsetLeft - first.offsetLeft : 0;
    let target = element.scrollLeft + direction * element.clientWidth;
    if (cycle > 0) target = (target + cycle) % cycle;
    element.scrollTo({ left: target, behavior: reduced ? "instant" : "smooth" });
  };
  const content = (lens: Lens, index: number) => <><span className="text-sm font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span><h3 className={`mt-3 ${h3}`}>{lens.title}</h3><p className="mt-2 text-sm leading-6 text-body">{lens.text}</p></>;

  return <div className="mt-7 min-w-0" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-body">{reduced ? "Explore all eight lenses. Swipe or use the arrows." : "A connected view, always in motion. Pauses on hover or focus. Swipe or use the arrows."}</p>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-body">{lenses.length} executive lenses</span>
        {canMove && <button type="button" aria-label={paused ? "Resume executive lenses carousel" : "Pause executive lenses carousel"} aria-controls="executive-lenses-track" onClick={() => setPaused(value => !value)} className={`${styles.control} gap-2 px-3 text-sm`}>{paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}{paused ? "Resume" : "Pause"}</button>}
        <button type="button" aria-label="Previous executive lenses" aria-controls="executive-lenses-track" onClick={() => move(-1)} className={styles.control}><ArrowLeft size={20} aria-hidden="true" /></button>
        <button type="button" aria-label="Next executive lenses" aria-controls="executive-lenses-track" onClick={() => move(1)} className={styles.control}><ArrowRight size={20} aria-hidden="true" /></button>
      </div>
    </div>
    <div ref={viewport} id="executive-lenses-track" className={styles.track} data-moving={moving} tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Eight executive lenses" onPointerDown={() => setPaused(true)} onKeyDown={event => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
      if (event.key === "Home" || event.key === "End") { event.preventDefault(); setPaused(true); const element = viewport.current; const last = element?.children[lenses.length - 1] as HTMLElement | undefined; const first = element?.children[0] as HTMLElement | undefined; element?.scrollTo({ left: event.key === "Home" ? 0 : last && first ? last.offsetLeft - first.offsetLeft : 0, behavior: "instant" }); }
    }}>
      {lenses.map((lens, index) => <article key={lens.title} className={`${styles.slide} ${cardFlat} p-5`} aria-label={`${index + 1} of ${lenses.length}: ${lens.title}`}>{content(lens, index)}</article>)}
      {canMove && lenses.map((lens, index) => <div key={`copy-${lens.title}`} aria-hidden="true" className={`${styles.slide} ${cardFlat} p-5`}>{content(lens, index)}</div>)}
    </div>
  </div>;
}
