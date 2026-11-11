import EditorialHero from "@/components/EditorialHero";
import CatalogEffects from "@/components/catalog/CatalogEffects";
import { posts } from "@/lib/posts";
import PageIdentity from "@/components/PageIdentity";
import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import Link from "next/link";
import BlogLibrary from "@/components/BlogLibrary";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { lead, linkInline, pageMain } from "@/components/ui";

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
    </CatalogEffects></main>
  );
}
