import { type NextRequest } from "next/server";

const siteDomain = process.env.NEXT_PUBLIC_SITE_URL || "https://www.2nspira.com";

export async function GET(_request: NextRequest) {
  const sitemapUrl = `${siteDomain}/sitemap.xml`;

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/

# Sitemap
Sitemap: ${sitemapUrl}
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
