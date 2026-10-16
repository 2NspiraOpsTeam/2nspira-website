import Image from "next/image";
import Link from "next/link";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { buttonPrimary, card, h1, lead, pageHero, pageMain } from "@/components/ui";
import { etsyShopUrl, type ShopProduct } from "@/content/shop/products";

export function CollectionNav({ current }: { current: "shop" | "printables" | "art" }) {
  const collections = [
    { id: "shop", title: "All collections", href: "/shop" },
    { id: "printables", title: "Printables & Games", href: "/shop/printables-games" },
    { id: "art", title: "Art Prints", href: "/shop/art-prints" },
  ];
  return (
    <nav aria-label="Shop collections" className="flex flex-wrap justify-center gap-2">
      {collections.map(({ id, title, href }) => (
        <Link key={id} href={href} aria-current={current === id ? "page" : undefined}
          className={`inline-flex min-h-[44px] items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${current === id ? "border-accent bg-accent-soft text-ink" : "border-line text-body"}`}>
          {title}
        </Link>
      ))}
    </nav>
  );
}

export function EtsyShopLink() {
  return (
    <div className="mt-14 text-center">
      <p className="mb-4 text-sm text-body">Explore the full collection and current options on Etsy.</p>
      <a href={etsyShopUrl} className={`${buttonPrimary} min-h-[44px]`}>Visit our Etsy shop <span aria-hidden="true" className="ml-1">↗</span></a>
    </div>
  );
}

export default function ShopCollection({ title, description, current, products }: {
  title: string;
  description: string;
  current: "printables" | "art";
  products: ShopProduct[];
}) {
  return (
    <main id="main-content" className={pageMain}>
      <header className={`${pageHero} relative overflow-hidden text-center`}>
        <AmbientField />
        <div className="relative">
          <EyebrowPill>The 2Nspira shop</EyebrowPill>
          <h1 className={h1}>{title}</h1>
          <p className={lead}>{description}</p>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <CollectionNav current={current} />
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-6 text-body">
          {current === "printables" ? "Download and print at home. No physical item is shipped." : "A physical artwork for your space, printed and shipped to you."}
          {" "}Purchases and fulfillment are handled on Etsy.
        </p>
        <div className="mt-10"><ProductGrid products={products} /></div>
        <EtsyShopLink />
      </div>
    </main>
  );
}

export function ProductGrid({ products, headingLevel = "h2" }: { products: ShopProduct[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className={`grid gap-8 ${products.length > 1 ? "md:grid-cols-2 lg:grid-cols-3" : "mx-auto max-w-4xl"}`}>
          {products.map((product) => (
            <article key={product.id} aria-labelledby={`${product.id}-title`}
              className={`${card} overflow-hidden ${products.length === 1 ? "grid md:grid-cols-2" : "flex flex-col"}`}>
              <div className="bg-canvas-deep p-5 sm:p-6">
                <Image src={product.image} alt={product.imageAlt} width={1080} height={1080}
                  unoptimized className="aspect-square h-auto w-full rounded-xl object-contain" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-medium text-accent">{product.format}</p>
                <Heading id={`${product.id}-title`} className="mt-3 text-2xl font-semibold tracking-tight text-ink">{product.title}</Heading>
                <p className="mt-4 leading-7 text-body">{product.description}</p>
                <p className="mt-4 text-sm leading-6 text-body">{product.details}</p>
                <div className="mt-auto pt-6">
                  <a href={product.href} className={`${buttonPrimary} min-h-[44px] w-full sm:w-auto`} aria-label={`Shop on Etsy: ${product.title}`}>
                    Shop on Etsy <span aria-hidden="true" className="ml-2">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
  );
}
