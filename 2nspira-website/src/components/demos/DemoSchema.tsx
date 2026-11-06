export default function DemoSchema({
  path,
  title,
  description,
  image,
}: {
  path: string;
  title: string;
  description: string;
  image: string;
}) {
  const url = `https://2nspira.com${path}`;
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${url}#page`,
      url,
      name: title,
      description,
      image: `https://2nspira.com${image}`,
      isPartOf: { "@id": "https://2nspira.com/#website" },
      about: { "@id": "https://2nspira.com/#organization" },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://2nspira.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Demos",
          item: "https://2nspira.com/demos",
        },
        ...(path === "/demos"
          ? []
          : [{ "@type": "ListItem", position: 3, name: title, item: url }]),
      ],
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
