import type { Metadata } from "next";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { CollectionNav } from "@/components/shop/ShopCollection";
import LittleHauntsCard from "@/components/shop/LittleHauntsCard";
import { h1, lead, pageHero, pageMain } from "@/components/ui";

const description = "Discover Little Haunts & Happy Plants, a cozy garden coloring paperback for adults and teens from 2Nspira Books. Explore 40 illustrations and buy on Amazon.";
const image = "https://2nspira.com/images/books/little-haunts-happy-plants.jpg";

export const metadata: Metadata = {
  title: "Coloring Books | Shop",
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
      <header className={`${pageHero} relative overflow-hidden text-center`}>
        <AmbientField />
        <div className="relative">
          <EyebrowPill>The 2Nspira shop</EyebrowPill>
          <h1 className={h1}>Coloring Books</h1>
          <p className={lead}>Friendly little worlds, a few favorite colors, and room for your imagination.</p>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <CollectionNav current="coloring" />
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-6 text-body">
          Physical paperback coloring books, not digital downloads. Purchases and fulfillment are handled on Amazon.
        </p>
        <div className="mt-10"><LittleHauntsCard headingLevel="h2" /></div>
      </div>
    </main>
  );
}
