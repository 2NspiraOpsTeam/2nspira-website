"use client";
import { useState } from "react";
import {
  publicStudio,
  itemUrl,
  type Item,
  type Studio,
} from "@/lib/studio/model";
import {
  buttonPrimary,
  buttonSecondary,
  card,
  h1,
  h2,
  lead,
} from "@/components/ui";
export function StudioCard({
  item,
  large = false,
}: {
  item: Item;
  large?: boolean;
}) {
  const href = itemUrl(item),
    external = href.startsWith("https://"),
    channel = item.type.toLowerCase() === "channel";
  const label = channel
    ? "Watch on YouTube"
    : item.type.toLowerCase() === "book" && item.url === item.purchaseUrl
      ? "View book & purchase"
      : item.type.toLowerCase() === "product"
        ? "View product"
        : item.type.toLowerCase() === "collection"
          ? "Explore collection"
          : "Explore";
  const props = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <article
      className={`${card} overflow-hidden min-w-0 ${large ? "grid md:grid-cols-2" : "flex flex-col"}`}
    >
      {item.image && (
        <a
          href={href}
          {...props}
          aria-label={`${item.title}${external ? " (opens in a new tab)" : ""}`}
          className="block overflow-hidden bg-canvas-deep focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-4px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.imageAlt}
            loading={large ? "eager" : "lazy"}
            className={`w-full ${large ? "h-full min-h-56 object-cover" : "aspect-[16/10] object-contain"}`}
            width={960}
            height={600}
          />
        </a>
      )}
      <div
        className={`flex flex-col p-6 ${large ? "sm:p-9 justify-center" : "grow"}`}
      >
        <p className="text-xs uppercase tracking-widest text-body">
          {item.type}
        </p>
        <h3
          className={`mt-3 font-semibold leading-snug text-ink ${large ? "text-3xl" : "text-xl"}`}
        >
          {item.title}
        </h3>
        <p className="mt-4 text-body leading-7">{item.description}</p>
        <div className="mt-auto pt-6">
          <a
            href={href}
            {...props}
            className={large ? buttonPrimary : buttonSecondary}
          >
            {label}
            <span aria-hidden="true">{external ? " ↗" : " →"}</span>
          </a>
          {external && (
            <p className="mt-3 text-xs text-body">
              {channel ? "YouTube opens" : "Opens"} in a new tab.
            </p>
          )}
          {item.purchaseUrl && item.purchaseUrl !== href && (
            <a
              href={item.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block underline text-accent"
            >
              Purchase this book{" "}
              <span className="sr-only">(opens in a new tab)</span>↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
export default function StudioContent({
  content,
  initialCategory = "",
}: {
  content: Studio;
  initialCategory?: string;
}) {
  const c = publicStudio(content);
  const [category, setCategory] = useState(
    c.categories.some((cat) => cat.id === initialCategory)
      ? initialCategory
      : "",
  );
  const [format, setFormat] = useState("");
  const types = [...new Set(c.items.map((i) => i.type))];
  const items = c.items.filter(
    (i) =>
      (!category || i.categoryIds.includes(category)) &&
      (!format || i.type === format),
  );
  function chooseCategory(value: string) {
    setCategory(value);
    if (
      typeof window !== "undefined" &&
      !window.location.pathname.startsWith("/admin")
    ) {
      const u = new URL(window.location.href);
      if (value) u.searchParams.set("category", value);
      else u.searchParams.delete("category");
      u.hash = "collections";
      window.history.replaceState(null, "", u);
    }
  }
  return (
    <div>
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm uppercase tracking-widest text-body">
            Ideas, imagination & things to make your own
          </p>
          <h1 className={`mt-5 ${h1}`}>Creative Studio</h1>
          <p className={`max-w-3xl ${lead}`}>{c.intro}</p>
          <nav
            aria-label="Creative Studio groups"
            className="mt-8 flex flex-wrap gap-3"
          >
            {c.groups.map((g) => (
              <a key={g.id} href={`#${g.id}`} className={buttonSecondary}>
                {g.name} <span aria-hidden="true">↓</span>
              </a>
            ))}
          </nav>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {c.groups.map((g) => {
          const cats = c.categories.filter((cat) =>
            cat.groupIds.includes(g.id),
          );
          const relevant = c.items.filter((i) =>
            i.categoryIds.some((id) => cats.some((cat) => cat.id === id)),
          );
          const channel = relevant.find(
            (i) => i.type.toLowerCase() === "channel" && i.featured,
          );
          const featured = relevant
            .filter((i) => i.featured && i !== channel)
            .slice(0, 3);
          return (
            <section
              key={g.id}
              id={g.id}
              className="scroll-mt-24 border-b border-line pb-12 mb-12"
              aria-labelledby={`heading-${g.id}`}
            >
              <p className="text-xs uppercase tracking-widest text-body">
                Creative Studio
              </p>
              <h2 id={`heading-${g.id}`} className={`mt-3 ${h2}`}>
                {g.name}
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-body">
                {g.description}
              </p>
              {channel && (
                <div className="mt-8">
                  <StudioCard item={channel} large />
                </div>
              )}
              {featured.length > 0 && (
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {featured.map((i) => (
                    <StudioCard key={i.id} item={i} />
                  ))}
                </div>
              )}
              <nav
                aria-label={`${g.name} categories`}
                className="mt-7 flex flex-wrap gap-3"
              >
                {cats.map((cat) => (
                  <a
                    key={cat.id}
                    href={`?category=${cat.id}#collections`}
                    onClick={(e) => {
                      e.preventDefault();
                      chooseCategory(cat.id);
                      setFormat("");
                      document.getElementById("collections")?.scrollIntoView();
                    }}
                    className={buttonSecondary}
                  >
                    {cat.name} <span aria-hidden="true">→</span>
                  </a>
                ))}
              </nav>
            </section>
          );
        })}
        <section
          id="collections"
          className="scroll-mt-24"
          aria-labelledby="collections-heading"
        >
          <h2 id="collections-heading" className={h2}>
            Explore the studio
          </h2>
          <p className="mt-4 text-body">
            Find your next idea, creative pause, or discovery. Browse by
            category or content type.
          </p>
          <div className="my-7 grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
            <label className="text-sm font-medium text-ink">
              Category
              <select
                aria-label="Category"
                value={category}
                onChange={(e) => chooseCategory(e.target.value)}
                className="mt-2 min-h-12 w-full rounded-xl border border-line bg-canvas px-3"
              >
                {" "}
                <option value="">All categories</option>
                {c.categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium text-ink">
              Content type
              <select
                aria-label="Content type"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="mt-2 min-h-12 w-full rounded-xl border border-line bg-canvas px-3"
              >
                <option value="">All types</option>
                {types.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <button
              type="button"
              className={`self-end ${buttonSecondary}`}
              disabled={!category && !format}
              onClick={() => {
                chooseCategory("");
                setFormat("");
              }}
            >
              Clear filters
            </button>
          </div>
          <p role="status" className="mb-6 text-sm text-body">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
          {items.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((i) => (
                <StudioCard key={i.id} item={i} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-line p-7 text-body">
              No items match these filters. Clear the filters to explore
              everything.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
