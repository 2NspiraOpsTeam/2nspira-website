"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import TeamContent from "@/components/team/TeamContent";
import {
  publicationGaps,
  type TeamContent as Content,
  type Person,
  type Agent,
  type Project,
} from "@/lib/team/model";
import { buttonPrimary, field } from "@/components/ui";
const secondary =
  "min-h-11 rounded-lg border border-line px-4 py-2 disabled:opacity-50";
export default function TeamAdmin() {
  const router = useRouter();
  const [content, setContent] = useState<Content | null>(null);
  const [saved, setSaved] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [preview, setPreview] = useState(false);
  const [published, setPublished] = useState(false);
  const lock = useRef(false);
  const dirty = !!content && JSON.stringify(content) !== saved;
  const api = useCallback(
    async (options: RequestInit = {}) => {
      const r = await fetch("/api/admin/team-delivery", {
        ...options,
        cache: "no-store",
        headers: { "Content-Type": "application/json", ...options.headers },
      });
      if (r.status === 401) {
        router.push("/portal/login");
        throw Error("Please sign in as an administrator.");
      }
      const d = await r.json();
      if (!r.ok)
        throw Error(
          d.error || "Unable to save. Your changes remain in this form.",
        );
      return d;
    },
    [router],
  );
  const load = useCallback(async () => {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      const d = await api();
      setContent(d.content);
      setSaved(JSON.stringify(d.content));
      setPublished(d.published);
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
  async function save(publish = false) {
    if (lock.current || !content) return;
    lock.current = true;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const d = await api({
        method: "PUT",
        body: JSON.stringify({
          ...content,
          status: publish ? "published" : "draft",
        }),
      });
      setContent(d.content);
      setSaved(JSON.stringify(d.content));
      setPublished(d.published);
      setNotice(
        publish
          ? "Page published."
          : "Draft saved. Existing public content is unchanged.",
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  async function uploadPortrait(personId: string, file: File) {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      if (
        !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
        file.size > 10000000
      )
        throw Error("Choose a JPG, PNG, or WebP portrait up to 10 MB.");
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(1, 800 / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const context = canvas.getContext("2d");
      if (!context)
        throw Error("Photo processing unavailable in this browser.");
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close();
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
          (v) =>
            v ? resolve(v) : reject(Error("Could not prepare the photo.")),
          "image/webp",
          0.85,
        ),
      );
      if (blob.size > 524288)
        throw Error("Photo is too detailed. Choose a smaller portrait.");
      const r = await fetch("/api/admin/team-delivery/photo", {
        method: "POST",
        headers: { "Content-Type": "image/webp" },
        body: blob,
      });
      if (r.status === 401) {
        router.push("/portal/login");
        throw Error("Please sign in as an administrator.");
      }
      const d = await r.json();
      if (!r.ok)
        throw Error(
          d.error || "Photo upload failed. Existing photo unchanged.",
        );
      setContent((current) =>
        current
          ? {
              ...current,
              people: current.people.map((p) =>
                p.id === personId ? { ...p, photo: d.url, approved: false } : p,
              ),
            }
          : current,
      );
      setNotice(
        "Photo uploaded to this draft. Review photo permission and save the draft to keep the profile change.",
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  function update<K extends keyof Content>(key: K, value: Content[K]) {
    if (content) setContent({ ...content, [key]: value });
  }
  function text(
    label: string,
    value: string,
    onChange: (s: string) => void,
    multiline = false,
  ) {
    return (
      <label className="block text-sm font-medium">
        {label}
        {multiline ? (
          <textarea
            className={field}
            rows={4}
            maxLength={5000}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <input
            className={field}
            maxLength={5000}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </label>
    );
  }
  const gaps = content ? publicationGaps(content) : [];
  return (
    <AdminShell admin={null}>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold">Team &amp; Delivery</h1>
          <p className="mt-3">
            Edit people, AI assistants, evidence, and human delivery ownership.
            Save a draft without changing the public page.
          </p>
          <p className="mt-2 text-sm">
            {published
              ? "A published version is available."
              : "Not published. Draft profiles are private."}{" "}
            {dirty ? "Unsaved changes." : ""}
          </p>
        </header>
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-900"
          >
            {error}
          </p>
        )}
        {notice && (
          <p
            role="status"
            className="rounded-xl bg-green-50 p-4 text-green-900"
          >
            {notice}
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <button
            className={secondary}
            disabled={busy}
            onClick={() => {
              if (
                !dirty ||
                confirm("Discard unsaved changes and reload saved content?")
              )
                void load();
            }}
          >
            Reload saved content
          </button>
          {content && (
            <button
              className={secondary}
              disabled={busy}
              onClick={() => setPreview(!preview)}
            >
              {preview ? "Return to editor" : "Preview draft"}
            </button>
          )}
        </div>
        {!content ? (
          <p role="status">
            {busy
              ? "Loading page content…"
              : "Content could not be loaded. Use Reload saved content to retry."}
          </p>
        ) : (
          <>
            <details
              className="rounded-xl border border-line p-5"
              open={gaps.length > 0}
            >
              <summary className="font-semibold">
                Before publication: {gaps.length} items to resolve
              </summary>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {gaps.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm">
                Check biographies, photo reuse permission, actual project
                attribution, and responsibilities with the people involved. Do
                not use LinkedIn education claims as verified qualifications
                without supporting evidence.
              </p>
            </details>
            {preview ? (
              <div className="overflow-hidden rounded-2xl border border-line">
                <p className="bg-amber-50 p-4 font-semibold text-amber-900">
                  Private draft preview — incomplete profiles shown for review
                </p>
                <TeamContent content={content} preview />
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void save();
                }}
                className="space-y-6"
              >
                <fieldset
                  disabled={busy}
                  className="space-y-6 disabled:opacity-60"
                >
                  <section className="space-y-4 rounded-xl border border-line p-5">
                    <h2 className="text-xl font-semibold">Page introduction</h2>
                    {text(
                      "Client-focused introduction",
                      content.intro,
                      (v) => update("intro", v),
                      true,
                    )}
                  </section>
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                      Our people — human profiles
                    </h2>
                    {content.people.map((p, i) => (
                      <details
                        key={p.id}
                        className="rounded-xl border border-line p-5"
                      >
                        <summary className="font-semibold">
                          {p.name || "New person"}
                          {!p.approved ? " · Draft" : ""}
                        </summary>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <label className="block text-sm font-medium sm:col-span-2">
                            Upload portrait (JPG, PNG, WebP; up to 10 MB)
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              className={`${field} file:mr-4 file:rounded-lg file:border-0 file:p-2`}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                e.target.value = "";
                                if (file) void uploadPortrait(p.id, file);
                              }}
                            />
                            <span className="mt-2 block text-xs text-body">
                              Automatically resized for the website. Uploading
                              does not publish the photo or confirm permission
                              to reuse it.
                            </span>
                          </label>
                          {(
                            [
                              "name",
                              "role",
                              "bio",
                              "photo",
                              "linkedin",
                              "skills",
                              "evidence",
                            ] as const
                          ).map((k) =>
                            text(
                              {
                                name: "Full name",
                                role: "Role",
                                bio: "Short biography",
                                photo: "Approved photo URL or site image path",
                                linkedin: "LinkedIn URL",
                                skills: "Relevant skills",
                                evidence:
                                  "Supporting evidence / work example URL",
                              }[k],
                              p[k],
                              (v) =>
                                update(
                                  "people",
                                  content.people.map((r, j) =>
                                    j === i
                                      ? { ...r, [k]: v, approved: false }
                                      : r,
                                  ),
                                ),
                              k === "bio",
                            ),
                          )}
                          <label className="flex min-h-11 items-center gap-3">
                            <input
                              type="checkbox"
                              checked={p.approved}
                              onChange={(e) =>
                                update(
                                  "people",
                                  content.people.map((r, j) =>
                                    j === i
                                      ? { ...r, approved: e.target.checked }
                                      : r,
                                  ),
                                )
                              }
                            />
                            Biography, role, evidence, and photo reuse approved
                          </label>
                        </div>
                      </details>
                    ))}
                    <button
                      type="button"
                      className={secondary}
                      onClick={() =>
                        update("people", [
                          ...content.people,
                          {
                            id: crypto.randomUUID(),
                            name: "",
                            role: "",
                            bio: "",
                            photo: "",
                            linkedin: "",
                            skills: "",
                            evidence: "",
                            approved: false,
                          } satisfies Person,
                        ])
                      }
                    >
                      Add person
                    </button>
                  </section>
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                      Delivery responsibilities
                    </h2>
                    {content.responsibilities.map((r, i) => (
                      <div
                        key={r.area}
                        className="space-y-4 rounded-xl border border-line p-5"
                      >
                        <h3 className="font-semibold">{r.area}</h3>
                        <label className="block text-sm font-medium">
                          Accountable human lead
                          <select
                            className={field}
                            value={r.personId}
                            onChange={(e) =>
                              update(
                                "responsibilities",
                                content.responsibilities.map((x, j) =>
                                  j === i
                                    ? { ...x, personId: e.target.value }
                                    : x,
                                ),
                              )
                            }
                          >
                            <option value="">Select a human lead</option>
                            {content.people.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </label>
                        {text(
                          "What this lead is responsible for",
                          r.detail,
                          (v) =>
                            update(
                              "responsibilities",
                              content.responsibilities.map((x, j) =>
                                j === i ? { ...x, detail: v } : x,
                              ),
                            ),
                          true,
                        )}
                        {text(
                          "Supporting contributors (identify AI assistants explicitly)",
                          r.support,
                          (v) =>
                            update(
                              "responsibilities",
                              content.responsibilities.map((x, j) =>
                                j === i ? { ...x, support: v } : x,
                              ),
                            ),
                        )}
                      </div>
                    ))}
                  </section>
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                      Project examples &amp; demonstrated capabilities
                    </h2>
                    {content.projects.map((p, i) => (
                      <details
                        key={p.id}
                        className="rounded-xl border border-line p-5"
                      >
                        <summary className="font-semibold">
                          {p.title || "New example"}
                        </summary>
                        <div className="mt-5 space-y-4">
                          {(
                            ["title", "summary", "url", "evidence"] as const
                          ).map((k) =>
                            text(
                              {
                                title: "Project title",
                                summary:
                                  "Problem, approach, and evidenced scope (no unsupported outcomes)",
                                url: "Project / case study URL",
                                evidence:
                                  "Evidence and sharing approval reference",
                              }[k],
                              p[k],
                              (v) =>
                                update(
                                  "projects",
                                  content.projects.map((r, j) =>
                                    j === i
                                      ? { ...r, [k]: v, approved: false }
                                      : r,
                                  ),
                                ),
                              k === "summary",
                            ),
                          )}
                          <label className="block">
                            Project type
                            <select
                              className={field}
                              value={p.kind}
                              onChange={(e) =>
                                update(
                                  "projects",
                                  content.projects.map((r, j) =>
                                    j === i
                                      ? { ...r, kind: e.target.value }
                                      : r,
                                  ),
                                )
                              }
                            >
                              {[
                                "Client project",
                                "Internal project",
                                "Internal demonstration",
                              ].map((k) => (
                                <option key={k}>{k}</option>
                              ))}
                            </select>
                          </label>
                          <label className="flex min-h-11 items-center gap-3">
                            <input
                              type="checkbox"
                              checked={p.approved}
                              onChange={(e) =>
                                update(
                                  "projects",
                                  content.projects.map((r, j) =>
                                    j === i
                                      ? { ...r, approved: e.target.checked }
                                      : r,
                                  ),
                                )
                              }
                            />
                            Evidence verified and permission to share confirmed
                          </label>
                        </div>
                      </details>
                    ))}
                    <button
                      type="button"
                      className={secondary}
                      onClick={() =>
                        update("projects", [
                          ...content.projects,
                          {
                            id: crypto.randomUUID(),
                            title: "",
                            kind: "Internal project",
                            summary: "",
                            url: "",
                            evidence: "",
                            approved: false,
                          } satisfies Project,
                        ])
                      }
                    >
                      Add project example
                    </button>
                  </section>
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                      AI delivery assistants — not human employees
                    </h2>
                    {text(
                      "How we use AI and its limitations",
                      content.ai,
                      (v) => update("ai", v),
                      true,
                    )}
                    {content.agents.map((a, i) => (
                      <details
                        key={a.id}
                        className="rounded-xl border border-dashed border-line-strong p-5"
                      >
                        <summary className="font-semibold">
                          {a.name || "New AI assistant"}
                        </summary>
                        <div className="mt-5 space-y-4">
                          {(["name", "role", "bio"] as const).map((k) =>
                            text(
                              {
                                name: "AI persona name",
                                role: "Actual support functions",
                                bio: "Functions, limitations, and human review",
                              }[k],
                              a[k],
                              (v) =>
                                update(
                                  "agents",
                                  content.agents.map((r, j) =>
                                    j === i
                                      ? { ...r, [k]: v, approved: false }
                                      : r,
                                  ),
                                ),
                              k === "bio",
                            ),
                          )}
                          <label className="flex min-h-11 items-center gap-3">
                            <input
                              type="checkbox"
                              checked={a.approved}
                              onChange={(e) =>
                                update(
                                  "agents",
                                  content.agents.map((r, j) =>
                                    j === i
                                      ? { ...r, approved: e.target.checked }
                                      : r,
                                  ),
                                )
                              }
                            />
                            Actual functions and limitations confirmed
                          </label>
                        </div>
                      </details>
                    ))}
                    <button
                      type="button"
                      className={secondary}
                      onClick={() =>
                        update("agents", [
                          ...content.agents,
                          {
                            id: crypto.randomUUID(),
                            name: "",
                            role: "",
                            bio: "",
                            approved: false,
                          } satisfies Agent,
                        ])
                      }
                    >
                      Add AI assistant
                    </button>
                  </section>
                  <section className="rounded-xl border border-line p-5">
                    {text(
                      "RFP / proposal reviewer note",
                      content.rfp,
                      (v) => update("rfp", v),
                      true,
                    )}
                  </section>
                </fieldset>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className={`${buttonPrimary} disabled:opacity-50`}
                    disabled={busy}
                  >
                    {busy ? "Saving…" : "Save draft"}
                  </button>
                  <button
                    type="button"
                    className={secondary}
                    disabled={busy || !dirty}
                    onClick={() => {
                      if (confirm("Discard unsaved edits?")) {
                        setContent(JSON.parse(saved));
                        setError("");
                        setNotice("Unsaved edits discarded.");
                      }
                    }}
                  >
                    Cancel edits
                  </button>
                  <button
                    type="button"
                    className={secondary}
                    disabled={busy || gaps.length > 0}
                    onClick={() => {
                      if (
                        confirm(
                          "Publish this reviewed page? This will update the public Team & Delivery page.",
                        )
                      )
                        void save(true);
                    }}
                  >
                    Publish reviewed page
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </AdminShell>
  );
}
