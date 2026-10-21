type Props = {
  type: "AboutPage" | "CollectionPage";
  name: string;
  path: string;
  items?: { name: string; path: string }[];
};

/** Describes only the page and links that are present in its visible content. */
export default function PageIdentity({ type, name, path, items }: Props) {
  const origin = "https://2nspira.com";
  const data = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${origin}${path}#webpage`,
    url: `${origin}${path}`,
    name,
    inLanguage: "en-US",
    isPartOf: { "@id": `${origin}/#website` },
    about: { "@id": `${origin}/#organization` },
    ...(items?.length ? { mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem", position: index + 1, name: item.name, url: `${origin}${item.path}`,
      })),
    } } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
