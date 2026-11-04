import EditorialHero from "@/components/EditorialHero";
import CatalogEffects from "@/components/catalog/CatalogEffects";
import CatalogBreadcrumbs from "@/components/catalog/CatalogBreadcrumbs";
import CatalogSchema from "@/components/catalog/CatalogSchema";
import CatalogFaq from "@/components/catalog/CatalogFaq";
import { catalogPages } from "@/content/catalog/seo";
import type { Metadata } from "next";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { CollectionNav } from "@/components/shop/ShopCollection";
import ColoringBookCard from "@/components/shop/ColoringBookCard";
import { coloringBooks } from "@/content/shop/coloring-books";
import { h1, lead, pageMain } from "@/components/ui";

const description = catalogPages.coloring.description;
const image = "https://2nspira.com/images/books/little-haunts-happy-plants.jpg";

export const metadata: Metadata = {
  title: catalogPages.coloring.title,
  description,
  alternates: { canonical: "/shop/coloring-books" },
  openGraph: {
    type: "website", siteName: "2Nspira", title: "A cozy world, ready for your colors", description,
    url: "https://2nspira.com/shop/coloring-books",
    images: [{ url: image, width: 1000, height: 1000, alt: "Little Haunts & Happy Plants coloring book cover" }],
  },
  twitter: { card: "summary_large_image", title: "A cozy world, ready for your colors", description, images: [image] },
};

export default function ColoringBooksPage() {
  return (
    <main id="main-content" className={pageMain}>
      <CatalogEffects headings>
      <CatalogBreadcrumbs page="coloring" />
      <CatalogSchema page="coloring" />
      <header className="relative overflow-hidden border-b border-line bg-surface mb-10">
        <AmbientField />
        <EditorialHero image="/images/books/little-haunts-happy-plants.jpg" alt="Little Haunts and Happy Plants coloring book cover." contain>
          <EyebrowPill>The 2Nspira shop</EyebrowPill>
          <h1 className={h1}>Coloring Books</h1>
          <p className={lead}>Friendly little worlds, a few favorite colors, and room for your imagination.</p>
        </EditorialHero>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <CollectionNav current="coloring" />
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-6 text-body">
          Physical paperback coloring books, not digital downloads. All four titles are available on Amazon. Check each Amazon listing for current availability and delivery options.
        </p>
        <div className="mt-10 space-y-10">{coloringBooks.map(book => <ColoringBookCard key={book.id} {...book} headingLevel="h2" />)}</div>
        <CatalogFaq page="coloring" />
      </div>
      </CatalogEffects>
    </main>
  );
}
