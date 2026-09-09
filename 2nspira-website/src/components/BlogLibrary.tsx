"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import posts from "@/content/posts/index.json";

export default function BlogLibrary({ category }: { category?: string }) {
  const [query, setQuery] = useState("");
  const filtered = posts.filter(post => (!category || post.categories.includes(category)) && `${post.title} ${post.description}`.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" aria-label="Article library">
      <div className="mb-10 max-w-xl">
        <label htmlFor="article-search" className="block font-semibold text-zinc-900 dark:text-white">Find an article</label>
        <input id="article-search" type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search AI, trust, leadership…" className="mt-3 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white" />
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400" role="status">{filtered.length} {filtered.length === 1 ? "article" : "articles"}</p>
      </div>
      {filtered.length ? <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{filtered.map(post=><article key={post.slug} className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        {post.image && <Image src={post.image} alt="" width={1200} height={800} unoptimized className="aspect-[3/2] w-full object-cover" />}
        <div className="flex flex-1 flex-col p-6">
          <time dateTime={post.datePublished} className="text-sm text-zinc-600 dark:text-zinc-400">{new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(post.datePublished))}</time>
          <h2 className="mt-3 text-xl font-semibold leading-7 text-zinc-900 dark:text-white"><Link href={`/post/${post.slug}`} className="rounded hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">{post.title}</Link></h2>
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{post.description}</p>
          <p className="mt-5 text-sm text-zinc-600 dark:text-zinc-400">By {post.author}</p>
        </div>
      </article>)}</div> : <div className="rounded-xl border border-zinc-200 p-8 dark:border-zinc-800"><h2 className="text-xl font-semibold">No matching articles</h2><p className="mt-3">Try a different topic or <button onClick={()=>setQuery("")} className="rounded font-semibold text-blue-700 underline dark:text-blue-400">clear your search</button>.</p></div>}
    </section>
  );
}
