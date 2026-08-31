import { type MetadataRoute } from "next";

const siteDomain = process.env.NEXT_PUBLIC_SITE_URL || "https://www.2nspira.com";

// All public pages that should be indexed
const pages: { path: string; priority: number; changeFreq: "daily" | "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFreq: "weekly" },
  { path: "/services", priority: 0.9, changeFreq: "monthly" },
  { path: "/about", priority: 0.8, changeFreq: "monthly" },
  { path: "/insights", priority: 0.7, changeFreq: "weekly" },
  { path: "/contact", priority: 0.8, changeFreq: "monthly" },
];

export function GET(): Response {
  const sitemapEntries = pages.map(
    ({ path: href, priority, changeFreq }) => {
      const url = `${siteDomain}${href}`;
      return `
    <url>
      <loc>${url}</loc>
      <changefreq>${changeFreq}</changefreq>
      <priority>${priority.toFixed(1)}</priority>
    </url>`;
    }
  ).join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}

// Force Next.js to re-generate the sitemap every hour
export const revalidate = 3600;
