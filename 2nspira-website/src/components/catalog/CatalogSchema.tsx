import { catalogPages, type CatalogPage } from "@/content/catalog/seo";
import { activityBooks, leadershipBooks, printables, artPrints, type ShopProduct } from "@/content/shop/products";
import { coloringBooks, type ColoringBook } from "@/content/shop/coloring-books";

const site = "https://2nspira.com";
function artworkOrPrintable(product: ShopProduct, page: "printables" | "art") {
  const url = `${site}${catalogPages[page].path}#${product.id}`;
  return {
    "@type": page === "art" ? "VisualArtwork" : "CreativeWork",
    "@id": url, url, name: product.title,
    description: `${product.description} ${product.format}. ${product.details}`,
    image: `${site}${product.image}`, sameAs: product.href,
    creator: { "@id": `${site}/#organization` },
  };
}
function paperback(book: ColoringBook) {
  const url = `${site}/shop/coloring-books#${book.id}`;
  return {
    "@type": "Book", "@id": url, url, name: book.title,
    description: book.paragraphs.join(" "), image: `${site}${book.image}`,
    author: { "@type": "Organization", name: "2Nspira Books" },
    bookFormat: "https://schema.org/Paperback", ...(book.href && !book.comingSoon ? { sameAs: book.href } : {}), inLanguage: "en",
  };
}

/** Describes the visible showcase, not an on-site store or an unverified offer. */
export default function CatalogSchema({ page }: { page: CatalogPage }) {
  const seo = catalogPages[page];
  const items = page === "shop"
    ? [...leadershipBooks.map(book => ({
        "@type": "Book", "@id": `${site}/shop#${book.id}`, url: `${site}/shop#${book.id}`,
        name: book.title, description: book.description, image: `${site}${book.image}`, sameAs: book.href,
        author: { "@type": "Person", name: "Jeffrey Cortez" },
        bookFormat: ["https://schema.org/Paperback", "https://schema.org/EBook"], inLanguage: "en",
      })), ...activityBooks.map(book => ({
        "@type": "Book", "@id": `${site}/shop#${book.id}`, url: `${site}/shop#${book.id}`,
        name: book.title, description: `${book.description} ${book.details}`,
        image: `${site}${book.image}`, sameAs: book.href,
        author: { "@type": "Organization", name: "2Nspira" },
        bookFormat: "https://schema.org/Paperback", inLanguage: "en",
      })), ...printables.map(p => artworkOrPrintable(p, "printables")), ...coloringBooks.map(paperback), ...artPrints.map(p => artworkOrPrintable(p, "art"))]
    : page === "printables" ? printables.map(p => artworkOrPrintable(p, "printables"))
    : page === "art" ? artPrints.map(p => artworkOrPrintable(p, "art"))
    : page === "coloring" ? coloringBooks.map(paperback) : [];
  const data = {
    "@context": "https://schema.org",
    "@type": page === "books" ? "WebPage" : "CollectionPage",
    "@id": `${site}${seo.path}#webpage`, url: `${site}${seo.path}`,
    name: seo.title, description: seo.description, inLanguage: "en",
    isPartOf: { "@id": `${site}/#website` },
    publisher: { "@id": `${site}/#organization` },
    mainEntity: page === "books" ? {
      "@type": "Book", "@id": `${site}/books#trust-is-the-operating-system`,
      url: `${site}/books#trust-is-the-operating-system`, name: "Trust Is the Operating System",
      description: "This book examines leadership in an AI-saturated world where efficiency has quietly replaced coherence—and trust has become invisible infrastructure.",
      author: { "@type": "Person", name: "Jeffrey Cortez" },
      image: `${site}/images/books/trust-is-the-operating-system.jpg`,
      sameAs: "https://amzn.to/4sVBcuF", inLanguage: "en",
      bookFormat: ["https://schema.org/Paperback", "https://schema.org/EBook"],
    } : {
      "@type": "ItemList", "@id": `${site}${seo.path}#catalog`, numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, item })),
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
