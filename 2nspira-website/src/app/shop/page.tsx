import CatalogEffects from "@/components/catalog/CatalogEffects";
import CatalogBreadcrumbs from "@/components/catalog/CatalogBreadcrumbs";
import CatalogSchema from "@/components/catalog/CatalogSchema";
import CatalogFaq from "@/components/catalog/CatalogFaq";
import { catalogPages } from "@/content/catalog/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { CollectionNav, EtsyShopLink, ProductGrid } from "@/components/shop/ShopCollection";
import LittleCocoaCard from "@/components/shop/LittleCocoaCard";
import LittleHauntsCard from "@/components/shop/LittleHauntsCard";
import { artPrints, printables } from "@/content/shop/products";
import { h1, h2, lead, linkInline, pageHero, pageMain } from "@/components/ui";

const description = catalogPages.shop.description;
export const metadata: Metadata = {
  title: catalogPages.shop.title,
  description,
  alternates: { canonical: "/shop" },
  openGraph: { type: "website", siteName: "2Nspira", title: "A little clarity. A little creativity.", description, url: "https://2nspira.com/shop", images: [{ url: "https://2nspira.com/images/logo/og-image-v2.png", width: 1200, height: 630, alt: "2Nspira" }] },
  twitter: { card: "summary_large_image", title: "A little clarity. A little creativity.", description, images: ["https://2nspira.com/images/logo/og-image-v2.png"] },
};

export default function ShopPage() {
  return (
    <main id="main-content" className={pageMain}>
      <CatalogEffects headings>
      <CatalogBreadcrumbs page="shop" />
      <CatalogSchema page="shop" />
      <header className={`${pageHero} relative overflow-hidden text-center`}>
        <AmbientField />
        <div className="relative" data-catalog-reveal>
          <EyebrowPill>The 2Nspira shop</EyebrowPill>
          <h1 className={h1}>A little clarity.<br />A little creativity.</h1>
          <p className={lead}>Books to inspire. Games to gather around. Pages to color. Art to make space for what matters.</p>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <CollectionNav current="shop" />
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-body">Explore printable family games, cozy coloring books and pages, and thoughtful wall art from 2Nspira. Choose a collection, then complete your purchase on Etsy or Amazon.</p>
        <section aria-labelledby="printables-title" className="mt-14">
          <div data-catalog-reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="printables-title" className={h2}>Printables &amp; Games</h2>
              <p className="mt-3 max-w-2xl leading-7 text-body">Shared laughter and creative calm. Download, print, and enjoy at your own pace.</p>
            </div>
            <Link href="/shop/printables-games" className={`${linkInline} min-h-[44px]`}>Explore Printables &amp; Games <span aria-hidden="true" className="ml-1">→</span></Link>
          </div>
          <ProductGrid products={printables} headingLevel="h3" />
        </section>
        <section aria-labelledby="coloring-books-title" className="mt-20 border-t border-line pt-14">
          <div data-catalog-reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="coloring-books-title" className={h2}>Coloring Books</h2>
              <p className="mt-3 max-w-2xl leading-7 text-body">Cozy worlds to make your own. Paperback coloring books from 2Nspira Books, available on Amazon.</p>
            </div>
            <Link href="/shop/coloring-books" className={`${linkInline} min-h-[44px]`}>Explore Coloring Books <span aria-hidden="true" className="ml-1">→</span></Link>
          </div>
          <div className="space-y-10"><LittleHauntsCard /><LittleCocoaCard /></div>
        </section>
        <section aria-labelledby="art-title" className="mt-20 border-t border-line pt-14">
          <div data-catalog-reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="art-title" className={h2}>Art Prints</h2>
              <p className="mt-3 max-w-2xl leading-7 text-body">Digital art to print yourself and physical prints for the places where you pause, reflect, and think.</p>
            </div>
            <Link href="/shop/art-prints" className={`${linkInline} min-h-[44px]`}>Explore Art Prints <span aria-hidden="true" className="ml-1">→</span></Link>
          </div>
          <ProductGrid products={artPrints} headingLevel="h3" />
        </section>
        <CatalogFaq page="shop" />
        <EtsyShopLink />
      </div>
      </CatalogEffects>
    </main>
  );
}
