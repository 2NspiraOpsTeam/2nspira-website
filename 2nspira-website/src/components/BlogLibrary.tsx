"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import posts from "@/content/posts/index.json";
import { caption, card } from "./ui";

export default function BlogLibrary({ category }: { category?: string }) {
  const [query, setQuery] = useState("");
  const filtered = posts.filter(post => (!category || post.categories.includes(category)) && `${post.title} ${post.description}`.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" aria-label="Article library">
      <div className="mb-10 max-w-xl">
        <label htmlFor="article-search" className="block font-semibold text-ink">Find an article</label>
        <input
          id="article-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search AI, trust, leadership…"
          className="mt-3 w-full rounded-full border border-line bg-surface px-4 py-3 text-ink transition-colors duration-300 ease-gentle placeholder:text-muted focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
        <p className={`mt-3 ${caption}`} role="status">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        </p>
      </div>
      {filtered.length ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <article key={post.slug} className={`flex flex-col overflow-hidden ${card}`}>
              {post.image && (
                <Image
                  src={post.image}
                  alt=""
                  width={1200}
                  height={800}
                  unoptimized
                  className="aspect-[3/2] w-full object-cover"
                />
              )}
              <div className="flex flex-1 flex-col p-6">
                <time dateTime={post.datePublished} className={caption}>
                  {new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(post.datePublished))}
                </time>
                <h2 className="mt-3 text-xl font-semibold leading-7 text-ink">
                  <Link
                    href={`/post/${post.slug}`}
                    className="rounded transition-colors duration-300 ease-gentle hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-body">{post.description}</p>
                <p className={`mt-5 ${caption}`}>By {post.author}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-line bg-surface p-8">
          <h2 className="text-xl font-semibold text-ink">No matching articles</h2>
          <p className="mt-3 text-body">
            Try a different topic or{" "}
            <button
              onClick={() => setQuery("")}
              className="rounded font-semibold text-accent underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              clear your search
            </button>
            .
          </p>
        </div>
      )}
    </section>
  );
}
