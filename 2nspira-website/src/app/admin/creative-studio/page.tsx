"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import StudioContent from "@/components/studio/StudioContent";
import { validateStudio, type Studio, type Item } from "@/lib/studio/model";
import { buttonPrimary, buttonSecondary, field } from "@/components/ui";
const sections = ["Content", "Groups", "Categories", "Navigation"] as const;
type Section = (typeof sections)[number];
export default function StudioAdmin() {
  const [content, setContent] = useState<Studio | null>(null),
    [saved, setSaved] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [section, setSection] = useState<Section>("Content"),
    [preview, setPreview] = useState(false),
    [query, setQuery] = useState("");
  const lock = useRef(false),
    dirty = !!content && JSON.stringify(content) !== saved;
  const api = useCallback(async (options: RequestInit = {}) => {
    const r = await fetch("/api/admin/creative-studio", {
      ...options,
      cache: "no-store",
      headers: { "Content-Type": "application/json", ...options.headers },
    });
    const d = await r.json();
    if (!r.ok)
      throw Error(
        d.error ||
          "Unable to complete this request. Your changes remain in the form.",
      );
    return d;
  }, []);
  const load = useCallback(async () => {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      const d = await api();
      setContent(d.content);
      setSaved(JSON.stringify(d.content));
      setNotice("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }, [api]);
  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  async function save(publish: boolean) {
    if (lock.current || !content) return;
    setError("");
    setNotice("");
    let data: Studio;
    try {
      data = validateStudio({
        ...content,
        status: publish ? "published" : "draft",
      });
    } catch (e) {
      setError((e as Error).message);
      return;
    }
    lock.current = true;
    setBusy(true);
    try {
      const d = await api({ method: "PUT", body: JSON.stringify(data) });
      setContent(d.content);
      setSaved(JSON.stringify(d.content));
      setNotice(
        publish
          ? "Creative Studio published. Public navigation and collections use this version."
          : "Draft saved. Public content is unchanged.",
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  const update = (patch: Partial<Studio>) => {
    setContent((c) => (c ? { ...c, ...patch } : c));
    setNotice("");
  };
  const text = (
    label: string,
    value: string,
    onChange: (v: string) => void,
    multiline = false,
    readOnly = false,
  ) => (
    <label className="block text-sm font-medium text-ink">
      {label}
      {multiline ? (
        <textarea
          aria-label={label}
          className={`mt-2 min-h-28 ${field}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
        />
      ) : (
        <input
          aria-label={label}
          className={`mt-2 ${field}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
        />
      )}
    </label>
  );
  const toggle = (
    label: string,
    value: boolean,
    onChange: (v: boolean) => void,
  ) => (
    <label className="flex min-h-11 items-center gap-3 text-sm text-ink">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
  function move(
    key: "groups" | "categories" | "links" | "items",
    index: number,
    delta: number,
  ) {
    if (!content) return;
    const rows = [...content[key]];
    [rows[index], rows[index + delta]] = [rows[index + delta], rows[index]];
    update({ [key]: rows });
  }
  function remove(
    key: "groups" | "categories" | "links" | "items",
    id: string,
  ) {
    if (!content) return;
    if (
      key === "groups" &&
      (content.categories.some((c) => c.groupIds.includes(id)) ||
        content.links.some((l) => l.groupId === id))
    ) {
      setError(
        "Reassign this group’s categories and navigation links before removing it. You can hide it instead.",
      );
      return;
    }
    if (
      key === "categories" &&
      (content.items.some((i) => i.categoryIds.includes(id)) ||
        content.links.some((l) => l.categoryId === id))
    ) {
      setError(
        "Reassign this category’s content and navigation links before removing it. You can hide it instead.",
      );
      return;
    }
    if (
      !window.confirm(
        "Remove this record from the draft? Nothing changes publicly until you publish.",
      )
    )
      return;
    update({ [key]: content[key].filter((r) => r.id !== id) });
  }
  const actions = (
    key: "groups" | "categories" | "links" | "items",
    index: number,
    id: string,
  ) => (
    <div className="flex flex-wrap gap-2 pt-4">
      <button
        type="button"
        className={buttonSecondary}
        disabled={index === 0}
        onClick={() => move(key, index, -1)}
      >
        Move up
      </button>
      <button
        type="button"
        className={buttonSecondary}
        disabled={!content || index === content[key].length - 1}
        onClick={() => move(key, index, 1)}
      >
        Move down
      </button>
      <button
        type="button"
        className={buttonSecondary}
        onClick={() => remove(key, id)}
      >
        Remove
      </button>
    </div>
  );
  const options = (
    label: string,
    values: string[],
    rows: { id: string; name: string }[],
    onChange: (v: string[]) => void,
  ) => (
    <fieldset className="rounded-xl border border-line p-4">
      <legend className="px-1 text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-x-6">
        {rows.map((r) => (
          <div key={r.id}>
            {toggle(r.name, values.includes(r.id), (v) =>
              onChange(
                v ? [...values, r.id] : values.filter((x) => x !== r.id),
              ),
            )}
          </div>
        ))}
      </div>
    </fieldset>
  );
  const id = () => `new-${crypto.randomUUID()}`;
  const patchItem = (index: number, patch: Partial<Item>) => {
    if (content)
      update({
        items: content.items.map((i, n) =>
          n === index ? { ...i, ...patch } : i,
        ),
      });
  };
  async function upload(file: File, index: number) {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      if (file.size > 10000000 || !file.type.startsWith("image/"))
        throw Error("Choose an image up to 10 MB.");
      const bitmap = await createImageBitmap(file);
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);
      canvas
        .getContext("2d")!
        .drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close();
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/webp", 0.85),
      );
      if (!blob || blob.size > 524288)
        throw Error(
          "Choose a smaller image; the optimized upload must be below 512 KB.",
        );
      const r = await fetch("/api/admin/creative-studio/image", {
        method: "POST",
        headers: { "Content-Type": "image/webp" },
        body: blob,
      });
      const d = await r.json();
      if (!r.ok) throw Error(d.error || "Image upload failed.");
      patchItem(index, { image: d.url });
      setNotice(
        "Image uploaded to the draft. Add a description and save or publish when ready.",
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  return (
    <AdminShell admin={null}>
      <section
        aria-labelledby="studio-admin-heading"
        id="main-content"
        className="min-w-0 flex-1 p-4 sm:p-8"
      >
        <h1
          id="studio-admin-heading"
          className="text-3xl font-semibold text-ink"
        >
          Creative Studio
        </h1>
        <p className="mt-3 max-w-3xl leading-7 text-body">
          Manage one record per article, channel, book, or product. Assign it to
          multiple categories without copying its page or purchase listing. Only
          published content in visible, populated categories appears publicly.
        </p>
        <div className="my-5 flex flex-wrap gap-3">
          <a
            href="/creative-studio"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonSecondary}
          >
            View public studio ↗
          </a>
          <a href="/admin/login" className={buttonSecondary}>
            Admin sign in
          </a>
        </div>
        {error && (
          <p
            role="alert"
            className="my-5 rounded-xl border border-red-300 bg-red-50 p-4 text-red-900"
          >
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="my-5 rounded-xl border border-line p-4">
            {notice}
          </p>
        )}
        {!content ? (
          <div>
            <p role="status">
              {busy ? "Loading saved content…" : "Content could not be loaded."}
            </p>
            <button
              className={buttonSecondary}
              disabled={busy}
              onClick={() => void load()}
            >
              Retry loading
            </button>
          </div>
        ) : (
          <>
            <div className="sm:sticky sm:top-16 z-10 my-6 flex flex-wrap items-center gap-3 border border-line bg-canvas p-4 rounded-xl">
              <button
                className={buttonSecondary}
                disabled={busy || !dirty}
                onClick={() => void save(false)}
              >
                Save draft
              </button>
              <button
                className={buttonPrimary}
                disabled={busy}
                onClick={() => {
                  if (
                    window.confirm(
                      "Publish this version of Creative Studio, including its navigation and all items marked published?",
                    )
                  )
                    void save(true);
                }}
              >
                Publish changes
              </button>
              <button
                className={buttonSecondary}
                disabled={busy}
                onClick={() => setPreview(!preview)}
              >
                {preview ? "Close preview" : "Preview draft"}
              </button>
              <button
                className={buttonSecondary}
                disabled={busy || !dirty}
                onClick={() => {
                  if (
                    window.confirm(
                      "Discard unsaved changes and reload the saved draft?",
                    )
                  )
                    void load();
                }}
              >
                Cancel changes
              </button>
              <span role="status" className="text-sm text-body">
                {busy
                  ? "Working…"
                  : dirty
                    ? "Unsaved changes"
                    : `Saved revision ${content.revision}`}
              </span>
            </div>
            {preview ? (
              <section className="border border-line rounded-xl overflow-hidden">
                <p className="bg-accent-soft p-4 font-medium">
                  Draft preview — only items marked published appear here.
                  Public content is unchanged until you publish.
                </p>
                <StudioContent content={content} />
                <div className="p-5">
                  {content.items
                    .filter((i) => i.status === "draft" && !i.url)
                    .map((i) => (
                      <details key={i.id} className="border-t border-line py-4">
                        <summary>Draft page: {i.title}</summary>
                        <h2 className="mt-5 text-2xl font-semibold">
                          {i.title}
                        </h2>
                        <p className="mt-3">{i.description}</p>
                        <p className="mt-4 whitespace-pre-wrap">{i.body}</p>
                      </details>
                    ))}
                </div>
              </section>
            ) : (
              <fieldset disabled={busy} className="min-w-0 disabled:opacity-60">
                <div className="mb-6">
                  {text(
                    "Studio introduction",
                    content.intro,
                    (v) => update({ intro: v }),
                    true,
                  )}
                </div>
                <nav
                  aria-label="Studio editor sections"
                  className="my-6 flex flex-wrap gap-2"
                >
                  {sections.map((s) => (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={section === s}
                      className={
                        section === s ? buttonPrimary : buttonSecondary
                      }
                      onClick={() => setSection(s)}
                    >
                      {s}
                    </button>
                  ))}
                </nav>
                {section === "Groups" && (
                  <section>
                    <h2 className="text-xl font-semibold">Groups</h2>
                    <p className="my-3 text-body">
                      Add future formats such as Listen here. Groups remain
                      hidden until their visible categories contain published
                      content. Identifiers stay fixed so section links remain
                      stable.
                    </p>
                    {content.groups.map((g, n) => (
                      <div
                        key={g.id}
                        className="my-5 space-y-4 rounded-xl border border-line p-5"
                      >
                        {text("Group name", g.name, (v) =>
                          update({
                            groups: content.groups.map((r, k) =>
                              k === n ? { ...r, name: v } : r,
                            ),
                          }),
                        )}
                        {text(
                          "Description",
                          g.description,
                          (v) =>
                            update({
                              groups: content.groups.map((r, k) =>
                                k === n ? { ...r, description: v } : r,
                              ),
                            }),
                          true,
                        )}
                        {toggle("Visible when populated", g.visible, (v) =>
                          update({
                            groups: content.groups.map((r, k) =>
                              k === n ? { ...r, visible: v } : r,
                            ),
                          }),
                        )}
                        <p className="text-xs break-all text-body">
                          Permanent identifier: {g.id}
                        </p>
                        {actions("groups", n, g.id)}
                      </div>
                    ))}
                    <button
                      type="button"
                      className={buttonSecondary}
                      onClick={() =>
                        update({
                          groups: [
                            ...content.groups,
                            {
                              id: id(),
                              name: "New group",
                              description: "",
                              visible: false,
                            },
                          ],
                        })
                      }
                    >
                      Add group
                    </button>
                  </section>
                )}
                {section === "Categories" && (
                  <section>
                    <h2 className="text-xl font-semibold">Categories</h2>
                    <p className="my-3 text-body">
                      A category can belong to more than one group. Hidden or
                      empty categories never appear publicly.
                    </p>
                    {content.categories.map((cat, n) => {
                      const patch = (p: Partial<typeof cat>) =>
                        update({
                          categories: content.categories.map((r, k) =>
                            k === n ? { ...r, ...p } : r,
                          ),
                        });
                      return (
                        <div
                          key={cat.id}
                          className="my-5 space-y-4 rounded-xl border border-line p-5"
                        >
                          {text("Category name", cat.name, (v) =>
                            patch({ name: v }),
                          )}
                          {options(
                            "Groups",
                            cat.groupIds,
                            content.groups,
                            (v) => patch({ groupIds: v }),
                          )}
                          {toggle("Visible when populated", cat.visible, (v) =>
                            patch({ visible: v }),
                          )}
                          <p className="text-xs break-all text-body">
                            Permanent identifier: {cat.id}
                          </p>
                          {actions("categories", n, cat.id)}
                        </div>
                      );
                    })}
                    <button
                      type="button"
                      className={buttonSecondary}
                      disabled={!content.groups.length}
                      onClick={() =>
                        update({
                          categories: [
                            ...content.categories,
                            {
                              id: id(),
                              name: "New category",
                              groupIds: [content.groups[0].id],
                              visible: false,
                            },
                          ],
                        })
                      }
                    >
                      Add category
                    </button>
                  </section>
                )}
                {section === "Navigation" && (
                  <section>
                    <h2 className="text-xl font-semibold">Navigation links</h2>
                    <p className="my-3 text-body">
                      Keep this concise. Use a group destination or a category.
                      Leave the label blank to follow its name automatically.
                      Desktop, mobile, and footer share this list; Explore
                      Creative Studio is always included.
                    </p>
                    {content.links.map((l, n) => {
                      const patch = (p: Partial<typeof l>) =>
                        update({
                          links: content.links.map((r, k) =>
                            k === n ? { ...r, ...p } : r,
                          ),
                        });
                      return (
                        <div
                          key={l.id}
                          className="my-5 space-y-4 rounded-xl border border-line p-5"
                        >
                          {text("Label override (optional)", l.name, (v) =>
                            patch({ name: v }),
                          )}
                          <label className="block text-sm">
                            Group
                            <select
                              className={`mt-2 ${field}`}
                              aria-label="Group"
                              value={l.groupId}
                              onChange={(e) =>
                                patch({
                                  groupId: e.target.value,
                                  categoryId: "",
                                })
                              }
                            >
                              {content.groups.map((g) => (
                                <option key={g.id} value={g.id}>
                                  {g.name}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label className="block text-sm">
                            Destination
                            <select
                              className={`mt-2 ${field}`}
                              aria-label="Destination"
                              value={l.categoryId}
                              onChange={(e) =>
                                patch({ categoryId: e.target.value, url: "" })
                              }
                            >
                              <option value="">Group section</option>
                              {content.categories
                                .filter((c) => c.groupIds.includes(l.groupId))
                                .map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name}
                                  </option>
                                ))}
                            </select>
                          </label>
                          {text(
                            "Custom destination URL (optional)",
                            l.url,
                            (v) => patch({ url: v }),
                          )}
                          {toggle(
                            "Show when its group/category has published content",
                            l.visible,
                            (v) => patch({ visible: v }),
                          )}
                          {actions("links", n, l.id)}
                        </div>
                      );
                    })}
                    <button
                      type="button"
                      className={buttonSecondary}
                      disabled={
                        !content.groups.length || content.links.length >= 12
                      }
                      onClick={() =>
                        update({
                          links: [
                            ...content.links,
                            {
                              id: id(),
                              name: "",
                              groupId: content.groups[0].id,
                              categoryId: "",
                              url: "",
                              visible: false,
                            },
                          ],
                        })
                      }
                    >
                      Add navigation link
                    </button>
                  </section>
                )}
                {section === "Content" && (
                  <section>
                    <div className="flex flex-wrap justify-between gap-4">
                      <h2 className="text-xl font-semibold">
                        Content & products
                      </h2>
                      <button
                        type="button"
                        className={buttonSecondary}
                        disabled={!content.categories.length}
                        onClick={() => {
                          update({
                            items: [
                              {
                                id: id(),
                                title: "New item",
                                description: "",
                                type: "Article",
                                categoryIds: [content.categories[0].id],
                                status: "draft",
                                featured: false,
                                image: "",
                                imageAlt: "",
                                url: "",
                                purchaseUrl: "",
                                body: "",
                                author: "",
                              },
                              ...content.items,
                            ],
                          });
                          setQuery("");
                        }}
                      >
                        Add content
                      </button>
                    </div>
                    <p className="my-3 text-body">
                      Existing pages keep their current URLs. For new articles
                      or book overviews, leave the existing URL empty and write
                      the full content below. For products, link to the existing
                      purchase listing—no second inventory or checkout is
                      created. Use Channel for YouTube and future channels,
                      Playlist for playlists, or another content type as needed.
                    </p>
                    {text("Find content", query, setQuery)}
                    {content.items.map((i, n) =>
                      !`${i.title} ${i.type}`
                        .toLowerCase()
                        .includes(query.toLowerCase()) ? null : (
                        <details
                          key={i.id}
                          className="my-4 rounded-xl border border-line p-5"
                        >
                          <summary className="cursor-pointer font-medium text-ink">
                            {i.title}{" "}
                            <span className="font-normal text-sm">
                              — {i.type} · {i.status}
                              {i.featured ? " · Featured" : ""}
                            </span>
                          </summary>
                          <div className="mt-5 space-y-4">
                            {text("Title", i.title, (v) =>
                              patchItem(n, { title: v }),
                            )}
                            {text(
                              "Short description",
                              i.description,
                              (v) => patchItem(n, { description: v }),
                              true,
                            )}
                            {text("Content type", i.type, (v) =>
                              patchItem(n, { type: v }),
                            )}
                            {text("Author (optional)", i.author, (v) =>
                              patchItem(n, { author: v }),
                            )}
                            {options(
                              "Categories",
                              i.categoryIds,
                              content.categories,
                              (v) => patchItem(n, { categoryIds: v }),
                            )}
                            <label className="block text-sm">
                              Publication status
                              <select
                                className={`mt-2 ${field}`}
                                aria-label="Publication status"
                                value={i.status}
                                onChange={(e) =>
                                  patchItem(n, {
                                    status: e.target.value as Item["status"],
                                  })
                                }
                              >
                                <option value="draft">
                                  Draft (hidden from Studio)
                                </option>
                                <option value="published">Published</option>
                              </select>
                            </label>
                            {toggle(
                              "Featured on landing page (first three per group, in content order)",
                              i.featured,
                              (v) => patchItem(n, { featured: v }),
                            )}
                            {text(
                              i.type.toLowerCase() === "channel"
                                ? "Channel URL"
                                : "Existing primary page or listing URL (blank creates a Studio page)",
                              i.url,
                              (v) => patchItem(n, { url: v }),
                            )}
                            {text(
                              "Direct purchase URL (required for published books)",
                              i.purchaseUrl,
                              (v) => patchItem(n, { purchaseUrl: v }),
                            )}
                            {text("Image URL or site path", i.image, (v) =>
                              patchItem(n, { image: v }),
                            )}
                            <label className="block text-sm">
                              Upload image
                              <input
                                type="file"
                                accept="image/*"
                                className="mt-2 block w-full min-h-11"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) void upload(file, n);
                                  e.target.value = "";
                                }}
                              />
                            </label>
                            {text("Image description", i.imageAlt, (v) =>
                              patchItem(n, { imageAlt: v }),
                            )}
                            {text(
                              "Full page content (paragraphs separated by a blank line; not needed for an existing destination)",
                              i.body,
                              (v) => patchItem(n, { body: v }),
                              true,
                            )}
                            <p className="text-xs break-all text-body">
                              Primary page:{" "}
                              {i.url || `/creative-studio/${i.id}`} · Permanent
                              identifier: {i.id}
                            </p>
                            {actions("items", n, i.id)}
                          </div>
                        </details>
                      ),
                    )}
                  </section>
                )}
              </fieldset>
            )}
          </>
        )}
      </section>
    </AdminShell>
  );
}
