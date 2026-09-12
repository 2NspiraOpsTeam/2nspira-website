export type Crumb = { name: string; url: string };

/**
 * BreadcrumbList structured data (schema.org) — SEO/semantic completeness.
 *
 * The site already emits per-post BlogPosting and site-level Organization /
 * WebSite JSON-LD; detail pages also carry visible back-links (e.g.
 * "← All insights", "← All resources") that establish a parent→child
 * hierarchy. This renders the matching BreadcrumbList so that hierarchy is
 * expressed in structured data too. Pure structured data: no visual change,
 * no new claims — only the page hierarchy already present in the navigation.
 *
 * URLs are emitted as canonical absolute URLs (https://2nspira.com),
 * matching the metadataBase used across the site.
 */
export default function BreadcrumbList({ items }: { items: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `https://2nspira.com${crumb.url}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
