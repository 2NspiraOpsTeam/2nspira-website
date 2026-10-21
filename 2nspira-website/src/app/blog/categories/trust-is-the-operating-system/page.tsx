import CatalogEffects from "@/components/catalog/CatalogEffects";
import { posts } from "@/lib/posts";
import PageIdentity from "@/components/PageIdentity";
import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import Link from "next/link";
import BlogLibrary from "@/components/BlogLibrary";
import { lead, linkInline, pageMain } from "@/components/ui";

export const metadata: Metadata = publicPageMetadata({
  "title": "Trust Is the Operating System",
  "description": "Read Trust Is the Operating System essays by Jeffrey Cortez on organizational trust, leadership judgment, resilience, AI, and the human side of change.",
  "path": "/blog/categories/trust-is-the-operating-system"
});

export default function Page() {
  return (
    <main className={pageMain} id="main-content"><CatalogEffects headings>
      <PageIdentity type="CollectionPage" name="Trust Is the Operating System" path="/blog/categories/trust-is-the-operating-system" items={posts.filter((post) => post.categories.includes("trust-is-the-operating-system")).map((post) => ({ name: post.title, path: `/post/${post.slug}` }))} />
      <header className="mx-auto max-w-4xl px-4 pt-16 sm:px-6">
        <Link href="/insights" className={linkInline}>
          ← All insights
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink">
          Trust Is the Operating System
        </h1>
        <p className={lead}>
          Selected essays on the invisible infrastructure of leadership.
        </p>
      </header>
      <BlogLibrary category="trust-is-the-operating-system" />
    </CatalogEffects></main>
  );
}
