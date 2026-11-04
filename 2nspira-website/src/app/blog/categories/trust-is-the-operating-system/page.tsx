import EditorialHero from "@/components/EditorialHero";
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
<header className="border-b border-line bg-surface"><EditorialHero image="/images/books/trust-is-the-operating-system.jpg" alt="Trust Is the Operating System book cover by Jeffrey Cortez." contain>
        <Link href="/insights" className={linkInline}>
          ← All insights
        </Link>
        <h1 className="mt-6  font-medium tracking-tight text-ink text-[length:var(--type-display)] leading-[1.08] tracking-[-0.04em]">
          Trust Is the Operating System
        </h1>
        <p className={lead}>
          Selected essays on the invisible infrastructure of leadership.
        </p>
      </EditorialHero></header>      <BlogLibrary category="trust-is-the-operating-system" />
    </CatalogEffects></main>
  );
}
