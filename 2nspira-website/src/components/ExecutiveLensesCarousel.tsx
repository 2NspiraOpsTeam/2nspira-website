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
  const moving = !reduced && !paused && !hovered && !focused;
  const viewport = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ first: 1, last: 1, start: true, end: false });
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const update = () => {
      const cards = Array.from(element.children) as HTMLElement[];
      const bounds = element.getBoundingClientRect();
      const visible = cards.flatMap((card, index) => {
        const rect = card.getBoundingClientRect();
        return rect.right > bounds.left + 10 && rect.left < bounds.right - 10 ? [index + 1] : [];
      });
      setPosition({ first: visible[0] || 1, last: visible.at(-1) || lenses.length, start: element.scrollLeft <= 2, end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 });
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => { element.removeEventListener("scroll", update); observer.disconnect(); };
  }, [lenses.length]);
  useEffect(() => {
    if (!moving || lenses.length < 2) return;
    const timer = window.setInterval(() => {
      const element = viewport.current;
      if (!element || document.hidden) return;
      const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 2;
      if (atEnd) element.scrollTo({ left: 0, behavior: "smooth" });
      else element.scrollBy({ left: element.clientWidth, behavior: "smooth" });
    }, 6000);
    return () => window.clearInterval(timer);
  }, [moving, lenses.length]);
  const move = (direction: number) => {
    setPaused(true);
    const element = viewport.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth, behavior: reduced ? "instant" : "smooth" });
  };
  return <div className="mt-7 min-w-0" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-body">{reduced ? "Explore all eight lenses. Swipe or use the arrows." : "Advances every 6 seconds. Pauses on hover or focus. Swipe or use the arrows."}</p>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-body" aria-live={moving ? "off" : "polite"} aria-atomic="true">{position.first}–{position.last} of {lenses.length}</span>
        {!reduced && <button type="button" aria-label={paused ? "Resume executive lenses carousel" : "Pause executive lenses carousel"} aria-controls="executive-lenses-track" onClick={() => setPaused(value => !value)} className={`${styles.control} gap-2 px-3 text-sm`}>{paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}{paused ? "Resume" : "Pause"}</button>}
        <button type="button" aria-label="Previous executive lenses" aria-controls="executive-lenses-track" disabled={position.start} onClick={() => move(-1)} className={styles.control}><ArrowLeft size={20} aria-hidden="true" /></button>
        <button type="button" aria-label="Next executive lenses" aria-controls="executive-lenses-track" disabled={position.end} onClick={() => move(1)} className={styles.control}><ArrowRight size={20} aria-hidden="true" /></button>
      </div>
    </div>
    <div ref={viewport} id="executive-lenses-track" className={styles.track} tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Eight executive lenses" onPointerDown={() => setPaused(true)} onKeyDown={event => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
      if (event.key === "Home" || event.key === "End") { event.preventDefault(); setPaused(true); const element = viewport.current; element?.scrollTo({ left: event.key === "Home" ? 0 : element.scrollWidth, behavior: "instant" }); }
    }}>
      {lenses.map((lens, index) => <article key={lens.title} className={`${styles.slide} ${cardFlat} p-5`} aria-label={`${index + 1} of ${lenses.length}: ${lens.title}`}><span className="text-sm font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span><h3 className={`mt-3 ${h3}`}>{lens.title}</h3><p className="mt-2 text-sm leading-6 text-body">{lens.text}</p></article>)}
    </div>
  </div>;
}
