"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type MarketingWindow = Window & { dataLayer?: unknown[] };
const services = new Set(["/services", "/websites", "/automation-systems-optimization", "/ai-enablement", "/fractional-cio", "/coaching"]);
/** Intent signals only: no form values, free text, query strings, or visitor identifiers. */
export default function MarketingEvents() {
  const pathname = usePathname();
  useEffect(() => {
    const emit = (event: string, destination?: string) => {
      const target = window as MarketingWindow;
      (target.dataLayer ??= []).push({ event, page_path: pathname, ...(destination ? { destination } : {}) });
    };
    if (services.has(pathname)) emit("service_page_view");
    const click = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest("a") : null;
      if (!anchor) return;
      const url = new URL(anchor.href, location.href);
      if (url.hostname === "calendar.google.com" || url.hostname === "calendar.app.google") emit("booking_click", "booking");
      else if (url.pathname.includes("ai-readiness") || url.hostname === "scorecard.2nspira.com") emit("assessment_click", "ai_readiness");
      else if (url.hostname === "strength.2nspira.com") emit("assessment_click", "professional_strengths");
      else if (pathname === "/work" && url.origin !== location.origin && ["http:", "https:"].includes(url.protocol)) emit("project_outbound_click", url.hostname);
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, [pathname]);
  return null;
}
