import type { MetadataRoute } from "next";

const siteDomain = process.env.NEXT_PUBLIC_SITE_URL || "https://www.2nspira.com";

const pages: Array<{
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
}> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.7, changeFrequency: "weekly" },
  { path: "/resources", priority: 0.9, changeFrequency: "monthly" },
  { path: "/resources/strength-profile", priority: 0.8, changeFrequency: "monthly" },
  { path: "/resources/ai-readiness-scorecard", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${siteDomain}${path}`,
    changeFrequency,
    priority,
  }));
}
