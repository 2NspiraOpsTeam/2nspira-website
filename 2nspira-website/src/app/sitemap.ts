import type { MetadataRoute } from "next";
import posts from "@/content/posts/index.json";

const siteDomain = process.env.NEXT_PUBLIC_SITE_URL || "https://2nspira.com";

const pages: Array<{
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
}> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/ai-enablement", priority: 0.8, changeFrequency: "monthly" },
  { path: "/websites", priority: 0.8, changeFrequency: "monthly" },
  { path: "/fractional-cio", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "monthly" },
  { path: "/terms-conditions", priority: 0.3, changeFrequency: "monthly" },
  { path: "/refund-cancellation", priority: 0.3, changeFrequency: "monthly" },
  { path: "/copyright", priority: 0.3, changeFrequency: "monthly" },
  { path: "/books", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog/categories/trust-is-the-operating-system", priority: 0.6, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.7, changeFrequency: "weekly" },
  { path: "/resources", priority: 0.9, changeFrequency: "monthly" },
  { path: "/resources/strength-profile", priority: 0.8, changeFrequency: "monthly" },
  { path: "/resources/ai-readiness-scorecard", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...pages.map(({ path, priority, changeFrequency }) => ({
    url: `${siteDomain}${path}`,
    changeFrequency,
    priority,
  })), ...posts.map(post => ({url: `${siteDomain}/post/${post.slug}`, lastModified: post.dateModified, changeFrequency: "monthly" as const, priority: 0.6}))];
}
