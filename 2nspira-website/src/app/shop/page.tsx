import type { Metadata } from "next";
import Link from "next/link";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { CollectionNav, EtsyShopLink, ProductGrid } from "@/components/shop/ShopCollection";
import LittleHauntsCard from "@/components/shop/LittleHauntsCard";
import { artPrints, printables } from "@/content/shop/products";
import { h1, h2, lead, linkInline, pageHero, pageMain } from "@/components/ui";

const description = "Explore 2Nspira printable games, coloring pages, paperback coloring books, and art prints. Discover three collections and purchase on Etsy or Amazon.";
export const metadata: Metadata = {
  title: "Shop | Games, Coloring Books & Art Prints",
  description,
  alternates: { canonical: "/shop" },
  openGraph: { type: "website", siteName: "2Nspira", title: "A little clarity. A little creativity.", description, url: "https://2nspira.com/shop", images: [{ url: "https://2nspira.com/images/logo/og-image-v2.png", width: 1200, height: 630, alt: "2Nspira" }] },
  twitter: { card: "summary_large_image", title: "A little clarity. A little creativity.", description, images: ["https://2nspira.com/images/logo/og-image-v2.png"] },
};

export default function ShopPage() {
  return (
    <main id="main-content" className={pageMain}>
      <header className={`${pageHero} relative overflow-hidden text-center`}>
        <AmbientField />
        <div className="relative">
          <EyebrowPill>The 2Nspira shop</EyebrowPill>
          <h1 className={h1}>A little clarity.<br />A little creativity.</h1>
          <p className={lead}>Books to inspire. Games to gather around. Pages to color. Art to make space for what matters.</p>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <CollectionNav current="shop" />
        <p className="mt-6 text-center text-sm leading-6 text-body">Explore our three collections here. Complete your purchase on Etsy or Amazon.</p>
        <section aria-labelledby="printables-title" className="mt-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="printables-title" className={h2}>Printables &amp; Games</h2>
              <p className="mt-3 max-w-2xl leading-7 text-body">Shared laughter and creative calm. Download, print, and enjoy at your own pace.</p>
            </div>
            <Link href="/shop/printables-games" className={`${linkInline} min-h-[44px]`}>Explore Printables &amp; Games <span aria-hidden="true" className="ml-1">→</span></Link>
          </div>
          <ProductGrid products={printables} headingLevel="h3" />
        </section>
        <section aria-labelledby="coloring-books-title" className="mt-20 border-t border-line pt-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="coloring-books-title" className={h2}>Coloring Books</h2>
              <p className="mt-3 max-w-2xl leading-7 text-body">Cozy worlds to make your own. Paperback coloring books from 2Nspira Books, available on Amazon.</p>
            </div>
            <Link href="/shop/coloring-books" className={`${linkInline} min-h-[44px]`}>Explore Coloring Books <span aria-hidden="true" className="ml-1">→</span></Link>
          </div>
          <LittleHauntsCard />
        </section>
        <section aria-labelledby="art-title" className="mt-20 border-t border-line pt-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="art-title" className={h2}>Art Prints</h2>
              <p className="mt-3 max-w-2xl leading-7 text-body">Thoughtful physical artwork for the places where you pause, reflect, and think.</p>
            </div>
            <Link href="/shop/art-prints" className={`${linkInline} min-h-[44px]`}>Explore Art Prints <span aria-hidden="true" className="ml-1">→</span></Link>
          </div>
          <ProductGrid products={artPrints} headingLevel="h3" />
        </section>
        <EtsyShopLink />
      </div>
    </main>
  );
}
