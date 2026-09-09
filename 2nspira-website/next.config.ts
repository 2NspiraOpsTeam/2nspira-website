import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

/**
 * Wix → new-site redirect map (release candidate, 2026-09-09).
 * Source of truth: Wix sitemaps (pages, pricing-plans, booking-services,
 * dynamic-insights, industries-categories, blog) + live page probes.
 *
 * Design decisions:
 * - 25 blog articles: same /post/<slug> paths exist in the new site (identity — no redirect).
 * - /blog and /our-story: handled by in-app redirect routes (preserved from prior work).
 * - Wix booking/"Book Now" flows → consolidated /contact flow (modernization, not widget reproduction).
 * - Wix pricing + FileMaker service detail → /services overview.
 * - Wix editor stubs (never published real content) → soft 302 to the closest live section.
 */
const redirects = [
  // Pricing & plans (Wix) → services overview
  { source: "/pricing-plans/list", destination: "/services", permanent: true },

  // Booking / inquiry flows (Wix) → consolidated contact flow
  { source: "/book-online", destination: "/contact", permanent: true },
  { source: "/service-page/ai-strategy-session", destination: "/contact", permanent: true },
  { source: "/service-page/schedule-a-strategic-cio-consultation", destination: "/contact", permanent: true },
  { source: "/service-page/claris-filemaker-support-packages", destination: "/services", permanent: true },
  { source: "/inquiry-services-page", destination: "/contact", permanent: true },

  // Legacy Wix insight stubs (no published content on Wix) → insights
  { source: "/insights/globalization-in-the-new-age", destination: "/insights", permanent: false },
  { source: "/insights/changing-pricing-strategy", destination: "/insights", permanent: false },
  { source: "/insights/how-social-media-affects-the-market", destination: "/insights", permanent: false },
  { source: "/insights/trust-analytics", destination: "/insights", permanent: false },
  { source: "/insights/mba-graduates:the-consultants-of-tomorrow", destination: "/insights", permanent: false },

  // Industry category stubs (no published content on Wix) → services
  { source: "/industries-categories/retail", destination: "/services", permanent: false },
  { source: "/industries-categories/security", destination: "/services", permanent: false },
  { source: "/industries-categories/food", destination: "/services", permanent: false },
  { source: "/industries-categories/healthcare", destination: "/services", permanent: false },
  { source: "/industries-categories/energy", destination: "/services", permanent: false },
  { source: "/industries-categories/cyber", destination: "/services", permanent: false },
  { source: "/industries-categories/technology", destination: "/services", permanent: false },
  { source: "/industries-categories/it", destination: "/services", permanent: false },
  { source: "/industries-categories/environment", destination: "/services", permanent: false },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: fileURLToPath(new URL(".", import.meta.url)),
  },
  async redirects() {
    return redirects;
  },
};

export default nextConfig;
