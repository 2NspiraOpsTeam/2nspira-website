import type { MetadataRoute } from "next";

const siteDomain = process.env.NEXT_PUBLIC_SITE_URL || "https://www.2nspira.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${siteDomain}/sitemap.xml`,
  };
}
