/**
 * Shared UI primitives — 2Nspira approved visual direction (2026-09).
 *
 * Single source of truth for cross-page styling. Pages compose these
 * tokens rather than restyling per component. Tokens resolve to
 * globals.css design variables (warm off-white canvas #FAFAF9,
 * warm indigo accent #4A6FA5, restrained shadows, gentle 300ms motion,
 * reduced-motion aware).
 */

/* Buttons */
export const buttonPrimary =
  "inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors duration-300 ease-gentle hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

export const buttonSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-ink transition-colors duration-300 ease-gentle hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

/* Cards */
export const card =
  "rounded-2xl border border-line bg-surface shadow-soft transition-[box-shadow] duration-300 ease-gentle hover:shadow-lift";

export const cardFlat =
  "rounded-2xl border border-line bg-surface transition-colors duration-300 ease-gentle hover:border-line-strong";

/* Page shells */
export const pageMain = "flex-1 bg-canvas";

/* Section bands — alternate warm canvas depths, never heavy blocks */
export const section = "py-20 sm:py-28";
export const sectionBand =
  "border-y border-line bg-canvas-deep py-20 sm:py-28";

/* Page hero (sub-pages) */
export const pageHero =
  "mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24";

/* Type scale */
export const eyebrow =
  "text-sm font-semibold uppercase tracking-widest text-accent";
export const h1 =
  "mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl";
export const h2 =
  "text-3xl font-semibold tracking-tight text-ink sm:text-4xl";
export const h3 = "text-xl font-semibold tracking-tight text-ink";
export const lead = "mt-6 text-lg leading-8 text-body";
export const body = "text-base leading-8 text-body";
export const caption = "text-sm text-muted";

/* Form controls */
export const label =
  "block text-sm font-medium text-ink";
export const field =
  "mt-1 block w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-ink transition-colors duration-300 ease-gentle placeholder:text-muted focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-sm";

/* Inline links */
export const linkInline =
  "inline-flex items-center rounded font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-300 ease-gentle hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";
