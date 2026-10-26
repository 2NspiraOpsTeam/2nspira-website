import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import rawGuides from "@/content/buying-guides/index.json";
import { pageMain, eyebrow, h1, lead, linkInline, buttonPrimary } from "@/components/ui";

type Guide = {
  slug: string; title: string; summary: string; category: string; updated: string;
  sections: { title: string; paragraphs: string[] }[];
  sources: { label: string; url: string }[];
  product: { label: string; url: string } | null;
};
const guides: Guide[] = rawGuides;
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find(item => item.slug === slug);
  if (!guide) return { title: "Guide not found" };
  return { title: guide.title, description: guide.summary, alternates: { canonical: `/buying-guides/${slug}` } };
}
export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find(item => item.slug === slug);
  if (!guide) notFound();
  return <main id="main-content" className={pageMain}>
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <Link href="/buying-guides" className={linkInline}>← All buying guides</Link>
      <p className={`mt-8 ${eyebrow}`}>{guide.category}</p>
      <h1 className={h1}>{guide.title}</h1>
      <p className={lead}>{guide.summary}</p>
      <p className="mt-5 text-sm text-body">By 2Nspira Editorial · Reviewed <time dateTime={guide.updated}>{guide.updated}</time> · Research-based guide</p>
      <aside aria-label="Affiliate disclosure" className="mt-7 rounded-xl border border-line bg-surface p-5 text-sm leading-6 text-body">As an Amazon Associate I earn from qualifying purchases. We may earn a commission through affiliate links at no extra cost to you. We have not hands-on tested the products discussed.</aside>
      <nav aria-label="In this guide" className="mt-8 border-y border-line py-5">
        <h2 className="font-semibold text-ink">In this guide</h2>
        <ul className="mt-3 space-y-2">{guide.sections.map((section, index) => <li key={section.title}><a className={linkInline} href={`#section-${index + 1}`}>{section.title}</a></li>)}</ul>
      </nav>
      {guide.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.title} className="mt-10 scroll-mt-28">
        <h2 className="text-2xl font-semibold text-ink">{section.title}</h2>
        {section.paragraphs.map(paragraph => <p key={paragraph} className="mt-4 leading-8 text-body">{paragraph}</p>)}
      </section>)}
      {guide.product && <aside className="mt-10 rounded-2xl border border-line bg-surface p-6">
        <h2 className="text-xl font-semibold text-ink">Check the exact model</h2>
        <p className="my-4 leading-7 text-body">Compare current availability, condition, seller terms, and compatibility before buying. This is an affiliate link.</p>
        <a href={guide.product.url} rel="sponsored nofollow" className={buttonPrimary}>{guide.product.label} on Amazon →</a>
      </aside>}
      <section className="mt-12 border-t border-line pt-7">
        <h2 className="text-xl font-semibold text-ink">Sources and editorial notes</h2>
        <ul className="mt-4 space-y-3">{guide.sources.map(source => <li key={source.url}><a className={linkInline} href={source.url}>{source.label}</a></li>)}</ul>
        <p className="mt-4 text-sm leading-7 text-body">Sources checked {guide.updated}. Specifications are manufacturer claims, not independent performance measurements. We do not display live prices or stock claims. Tell us about a correction through our <Link className={linkInline} href="/contact">contact page</Link>.</p>
      </section>
      <nav aria-label="Related guides" className="mt-10"><h2 className="text-xl font-semibold text-ink">Keep planning your setup</h2>{guides.filter(item => item.slug !== slug).map(item => <p key={item.slug} className="mt-4"><Link className={linkInline} href={`/buying-guides/${item.slug}`}>{item.title}</Link></p>)}</nav>
    </article>
  </main>;
}
