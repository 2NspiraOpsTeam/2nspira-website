import StudioTrail from "@/components/studio/StudioTrail";
import EditorialHero from "@/components/EditorialHero";
import CatalogEffects from "@/components/catalog/CatalogEffects";
import CatalogBreadcrumbs from "@/components/catalog/CatalogBreadcrumbs";
import CatalogSchema from "@/components/catalog/CatalogSchema";
import CatalogFaq from "@/components/catalog/CatalogFaq";
import { catalogPages } from "@/content/catalog/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { EtsyShopLink, ProductGrid } from "@/components/shop/ShopCollection";
import ColoringBookCard from "@/components/shop/ColoringBookCard";
import { coloringBooks } from "@/content/shop/coloring-books";
import { activityBooks, artPrints, leadershipBooks, printables } from "@/content/shop/products";
import { buttonPrimary, h1, h2, lead, linkInline, pageMain } from "@/components/ui";

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
      <div className="mx-auto max-w-6xl px-4 pb-6"><StudioTrail active="shop" /></div>
      <CatalogSchema page="shop" />
      <header className="relative overflow-hidden border-b border-line bg-surface mb-10">
        <AmbientField />
        <EditorialHero image="/images/shop/reduce-the-noise.jpg" alt="Reduce the Noise. Strengthen the Signal. art print." contain>
          <EyebrowPill>Creative Studio · Shop</EyebrowPill>
          <h1 className={h1}>A little clarity.<br />A little creativity.</h1>
          <p className={lead}>Books to inspire. Games to gather around. Pages to color. Art to make space for what matters.</p>
        </EditorialHero>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <aside data-catalog-fade className="mb-10 grid items-center gap-7 rounded-2xl border border-line bg-accent-soft p-6 sm:p-8 lg:grid-cols-2 lg:gap-10" aria-labelledby="shop-bookstore-title">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-body">The collector’s shelf · Briarcrypt Books</p>
            <h2 id="shop-bookstore-title" className={h2}>Rare & collectible books.</h2>
            <p className="mt-3 leading-7 text-body">Discover an independent collection of rare collectible books, including signed and limited editions. Explore photographs of the actual copies, individual condition details, and the stories behind each edition at Briarcrypt Books.</p>
            <a href="https://briarcrypt.com" className={`mt-5 min-h-[48px] ${buttonPrimary}`}>Explore rare collectibles <span aria-hidden="true" className="ml-2">→</span></a>
          </div>
          <a href="https://briarcrypt.com" data-catalog-card className="block overflow-hidden rounded-xl border border-line bg-white shadow-lg transition-shadow hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent" aria-label="Visit Briarcrypt Books rare collectible bookstore">
            <div className="flex items-center gap-2 border-b border-line bg-white px-4 py-3 text-xs text-body" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-slate-300" />
              <span className="h-2 w-2 rounded-full bg-slate-300" />
              <span className="h-2 w-2 rounded-full bg-slate-300" />
              <span className="ml-2">briarcrypt.com</span>
            </div>
            <Image src="/images/shop/rare-books-website.webp" alt="Briarcrypt Books website featuring a signed limited edition of Stephen King’s Bag of Bones" width={1440} height={724} sizes="(min-width: 1024px) 500px, 100vw" className="h-auto w-full" />
            <p className="border-t border-line px-4 py-3 text-sm font-semibold text-body">Explore Briarcrypt Books <span aria-hidden="true">↗</span></p>
          </a>
        </aside>
        <nav aria-label="Shop departments" className="flex flex-wrap gap-3">{[{name:"Our published books",href:"#published-books"},{name:"Rare & collectible books",href:"#shop-bookstore-title"},{name:"Other creative products",href:"#creative-products"}].map(link=><a key={link.href} href={link.href} className={buttonPrimary}>{link.name}</a>)}</nav>
        <h2 id="published-books" className={`mt-14 scroll-mt-24 ${h2}`}>Our published books</h2>
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-body">Explore all our books in one place: leadership, family activities, and cozy coloring—plus printable games and thoughtful wall art. Choose a collection, then complete your purchase on Etsy or Amazon.</p>
        <section aria-labelledby="leadership-books-title" className="mt-14">
          <div data-catalog-reveal className="mb-8">
            <h3 id="leadership-books-title" className={h2}>Leadership Books</h3>
            <p className="mt-3 max-w-2xl leading-7 text-body">Ideas for human-centered leadership in an AI-saturated world. <Link href="/books" className={linkInline}>Explore the book and selected excerpts →</Link></p>
          </div>
          <ProductGrid products={leadershipBooks} headingLevel="h3" />
        </section>
        <section aria-labelledby="family-activity-books-title" className="mt-14">
          <div data-catalog-reveal className="mb-8">
            <h2 id="family-activity-books-title" className={h2}>Family Activity Books</h2>
            <p className="mt-3 max-w-2xl leading-7 text-body">Make a little time for play. Share stories, solve puzzles, and draw together with paperback activity books for ages 8+ and adults. Order on Amazon—no printing required.</p>
          </div>
          <ProductGrid products={activityBooks} headingLevel="h3" />
        </section>
        <section aria-labelledby="coloring-books-title" className="mt-20 border-t border-line pt-14">
          <div data-catalog-reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="coloring-books-title" className={h2}>Coloring Books</h2>
              <p className="mt-3 max-w-2xl leading-7 text-body">Cozy worlds to make your own. Paperback coloring books from 2Nspira Books. Shop released titles on Amazon and preview what’s coming next.</p>
            </div>
            <Link href="/shop/coloring-books" className={`${linkInline} min-h-[44px]`}>Explore Coloring Books <span aria-hidden="true" className="ml-1">→</span></Link>
          </div>
          <div className="space-y-10">{coloringBooks.map(book => <ColoringBookCard key={book.id} {...book} />)}</div>
        </section>
        <h2 id="creative-products" className={`mt-16 scroll-mt-24 ${h2}`}>Other creative products</h2>
        <section aria-labelledby="printables-title" className="mt-20 border-t border-line pt-14">
          <div data-catalog-reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="printables-title" className={h2}>Printables &amp; Games</h2>
              <p className="mt-3 max-w-2xl leading-7 text-body">Shared laughter and creative calm. Download, print, and enjoy at your own pace.</p>
            </div>
            <Link href="/shop/printables-games" className={`${linkInline} min-h-[44px]`}>Explore Printables &amp; Games <span aria-hidden="true" className="ml-1">→</span></Link>
          </div>
          <ProductGrid products={printables} headingLevel="h3" />
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
