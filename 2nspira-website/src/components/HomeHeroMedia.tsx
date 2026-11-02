"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** A silent motion treatment of the approved photo; the photo remains the fallback. */
export default function HomeHeroMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const wantsPlayback = useRef(false);
  const inView = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    setEnhanced(true);
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    wantsPlayback.current = !motion.matches && !connection?.saveData;
    const sync = () => {
      if (!wantsPlayback.current || !inView.current || document.hidden) { el.pause(); return; }
      if (!el.getAttribute("src")) el.src = "/videos/strategy-header-loop.mp4";
      void el.play().catch(() => setPlaying(false));
    };
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
      sync();
    }, { threshold: 0.05 });
    observer?.observe(el);
    if (!observer) sync();
    const preferenceChanged = () => {
      if (motion.matches) { wantsPlayback.current = false; el.pause(); }
    };
    motion.addEventListener("change", preferenceChanged);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer?.disconnect();
      el.pause();
      motion.removeEventListener("change", preferenceChanged);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  function toggle() {
    const el = video.current;
    if (!el) return;
    if (!el.paused) { wantsPlayback.current = false; el.pause(); return; }
    wantsPlayback.current = true;
    if (!el.getAttribute("src")) el.src = "/videos/strategy-header-loop.mp4";
    void el.play().catch(() => { wantsPlayback.current = false; setPlaying(false); });
  }

  return <figure className="hero-settle relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-canvas shadow-[0_24px_70px_rgba(35,41,54,0.12)]" style={{ animationDelay: "220ms" }} aria-label="Strategy planning at the whiteboard">
    <Image src="/images/advisory/whiteboard-strategy-4x5.webp" alt="A professional pointing at a whiteboard of charts and strategy notes while a client looks on." fill sizes="(min-width: 1152px) 461px, (min-width: 1024px) 42vw, calc(100vw - 32px)" unoptimized fetchPriority="high" className="object-cover object-center" />
    <video ref={video} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} className={`absolute inset-0 h-full w-full object-cover ${ready && !failed ? "opacity-100" : "opacity-0"}`} onPlaying={() => { setReady(true); setPlaying(true); }} onPause={() => setPlaying(false)} onError={() => { wantsPlayback.current = false; setFailed(true); setPlaying(false); }} />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/10 via-transparent to-accent/15 opacity-70" aria-hidden="true" />
    {enhanced && !failed && <button type="button" onClick={toggle} aria-label={playing ? "Pause header motion" : "Play header motion"} className="absolute bottom-4 right-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-ink/85 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
      {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}{playing ? "Pause" : "Play"}
    </button>}
  </figure>;
}
