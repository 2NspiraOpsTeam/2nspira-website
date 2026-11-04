import EditorialHero from "@/components/EditorialHero";
import CatalogEffects from "@/components/catalog/CatalogEffects";
import { posts } from "@/lib/posts";
import PageIdentity from "@/components/PageIdentity";
import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import Link from "next/link";
import BlogLibrary from "@/components/BlogLibrary";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { buttonPrimary, h2, lead, linkInline, pageMain } from "@/components/ui";

export const metadata: Metadata = publicPageMetadata({
  title: "Practical Insights for Better Business Operations",
  shareTitle: "Ideas to help your business work better.",
  description: "Explore practical perspectives on reducing operational friction, leading change, building trust, and using AI to support better business decisions.",
  path: "/insights"
});

export default function InsightsPage() {
  return (
    <main className={pageMain} id="main-content"><CatalogEffects headings>
      <PageIdentity type="CollectionPage" name="Executive Insights" path="/insights" items={posts.map((post) => ({ name: post.title, path: `/post/${post.slug}` }))} />
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <AmbientField />
        <EditorialHero image="/images/pages/insights-editorial.webp" alt="Conceptual editorial still life of a notebook, pen, and coffee beside a window.">
          <p><EyebrowPill>Ideas for leaders</EyebrowPill></p>
          <h1 className="mt-4  font-medium tracking-tight text-ink  text-[length:var(--type-display)] leading-[1.08] tracking-[-0.04em]">
            Executive Insights
          </h1>
          <p className={lead}>
            Where technology strategy meets human intent. Essays and
            reflections on cutting through systemic noise to establish trust as
            the operating system.
          </p>
          <Link
            href="/blog/categories/trust-is-the-operating-system"
            className={`mt-6 ${linkInline}`}
          >
            Explore Trust Is the Operating System →
          </Link>
        </EditorialHero>
      </section>

      <BlogLibrary />
      <section className="border-t border-line bg-canvas-deep px-4 py-16 sm:px-6" aria-labelledby="insights-coaching-heading">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">From reflection to action</p>
          <h2 id="insights-coaching-heading" className={`mt-4 ${h2}`}>Work through your own leadership questions.</h2>
          <p className={`max-w-2xl ${lead}`}>Bring your business idea, difficult decision, or team challenge to Entrepreneur Mentoring &amp; Coaching. We match you with a coach aligned with your industry for practical guidance, mindset, and leadership support.</p>
          <Link href="/coaching" className={`mt-6 min-h-11 ${buttonPrimary}`}>Explore Entrepreneur Mentoring &amp; Coaching →</Link>
        </div>
      </section>
    </CatalogEffects></main>
  );
}
