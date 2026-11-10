"use client";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { publicContent } from "@/lib/platforms/model";
import styles from "./PlatformCarousel.module.css";
const subscribe = (notify: () => void) => {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", notify);
  return () => preference.removeEventListener("change", notify);
};
const reducedSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverSnapshot = () => true;
type Platforms = (ReturnType<typeof publicContent>["platforms"][number] & { darkBackground?: boolean })[];
export default function PlatformCarousel({ platforms, description = "Platforms and technologies our team has worked with.", label = "Platform logos", listLabel = "Platforms and technologies", notice = "Names and logos belong to their respective owners; inclusion does not imply partnership, endorsement or certification." }: { platforms: Platforms; description?: string; label?: string; listLabel?: string; notice?: string }) {
  const reduced = useSyncExternalStore(subscribe, reducedSnapshot, serverSnapshot);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const firstList = useRef<HTMLUListElement>(null);
  const canMove = !reduced && platforms.length > 1;
  const moving = canMove && !paused && !hovered && !focused;
  useEffect(() => {
    if (!moving || !viewport.current || !firstList.current) return;
    const frame = viewport.current;
    const list = firstList.current;
    let width = list.getBoundingClientRect().width;
    const observer = new ResizeObserver(() => { width = list.getBoundingClientRect().width; });
    observer.observe(list);
    let previous = 0, request = 0;
    const tick = (time: number) => {
      if (previous && width > 0 && !document.hidden) {
        const next = frame.scrollLeft + Math.min(time - previous, 80) * 0.035;
        frame.scrollLeft = next >= width ? next % width : next;
      }
      previous = time;
      request = requestAnimationFrame(tick);
    };
    request = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(request); observer.disconnect(); };
  }, [moving]);
  if (!platforms.length) return null;
  const logos = () => platforms.map(p => <li key={p.id} className={styles.logo}>
    <Image src={p.logo} alt="" width={156} height={64} unoptimized loading="eager" className={`${styles.image} ${p.darkBackground ? styles.imageDark : ""}`} />
    <span className="text-center text-sm font-medium text-ink">{p.name}</span>
  </li>);
  return <div className="mt-7 min-w-0">
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm leading-6 text-body">{description}</p>
      {canMove && <button type="button" onClick={() => setPaused(p => !p)} aria-label={paused ? "Resume logo carousel" : "Pause logo carousel"} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-4 py-2 text-sm font-medium text-ink focus-visible:outline-2 focus-visible:outline-accent">
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}{paused ? "Resume motion" : "Pause motion"}
      </button>}
    </div>
    <div ref={viewport} className={styles.viewport} data-moving={moving} tabIndex={0} role="region" aria-label={`${label}. Use arrow keys or swipe to explore.`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onPointerDown={() => setPaused(true)}>
      <div className={styles.track}>
        <ul ref={firstList} className={styles.list} aria-label={listLabel}>{logos()}</ul>
        {canMove && <ul className={styles.list} aria-hidden="true">{logos()}</ul>}
      </div>
    </div>
    <p className="mt-4 text-xs leading-6 text-muted">{reduced ? "Motion reduced. Swipe or scroll to explore. " : "Pauses on hover or keyboard focus. Swipe or scroll to explore. "}{notice}</p>
  </div>;
}
