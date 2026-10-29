import CatalogEffects from "@/components/catalog/CatalogEffects";
import type { Metadata } from "next";
import Link from "next/link";
import guides from "@/content/buying-guides/index.json";
import { pageMain, pageHero, eyebrow, h1, lead, card, linkInline } from "@/components/ui";

export const metadata: Metadata = {
  title: "Practical Buying Guides",
  description: "Research-based buying guides for a more useful home office and simpler paperless workflows. Understand the tradeoffs before you buy.",
  alternates: { canonical: "/buying-guides" },
};
export default function BuyingGuides() {
  return <main id="main-content" className={pageMain}><CatalogEffects headings>
    <section className={pageHero}>
      <p className={eyebrow}>Tools that earn their place</p>
      <h1 className={h1}>Buy for the work.<br />Not the hype.</h1>
      <p className={lead}>Practical decision guides for a better home office and less paperwork. Start with the problem, understand the tradeoffs, and keep what already works.</p>
      <p className="mt-6 text-sm leading-6 text-body">As an Amazon Associate I earn from qualifying purchases. We may earn a commission when you buy through an affiliate link, at no extra cost to you.</p>
    </section>
    <section aria-label="Buying guides" className="mx-auto grid max-w-5xl gap-6 px-4 pb-16 sm:px-6 md:grid-cols-2">
      {guides.map(guide => <article key={guide.slug} className={`${card} p-7`}>
        <p className={eyebrow}>{guide.category}</p>
        <h2 className="mt-4 text-2xl font-semibold text-ink"><Link href={`/buying-guides/${guide.slug}`} className="rounded focus-visible:outline-2 focus-visible:outline-accent">{guide.title}</Link></h2>
        <p className="mt-4 leading-7 text-body">{guide.summary}</p>
        <Link className={`mt-6 ${linkInline}`} href={`/buying-guides/${guide.slug}`}>Read the guide →</Link>
      </article>)}
    </section>
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-semibold text-ink">How we choose what to cover</h2>
        <p className="mt-4 leading-8 text-body">We prioritize real workflow questions, manufacturer documentation, compatibility, and reasons not to buy. These are research-based guides, not hands-on product tests. We do not invent ratings, claim testing we have not performed, or rank products by commission.</p>
        <p className="mt-4 leading-8 text-body">Product details can change. Each guide includes its review date and sources. Check the exact model, condition, compatibility, and current seller terms before ordering.</p>
      </div>
    </section>
  </CatalogEffects></main>;
}
