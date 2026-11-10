"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import {
  type Content,
  type Industry,
  type Organization,
} from "@/lib/audiences/model";
import { field, buttonPrimary } from "@/components/ui";
const secondary =
  "min-h-11 rounded-xl border border-line px-4 py-2 disabled:opacity-50";
export default function Page() {
  const [c, setC] = useState<Content | null>(null),
    [saved, setSaved] = useState(""),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [busy, setBusy] = useState(false);
  const lock = useRef(false),
    operation = useRef<{ body: string; id: string } | null>(null);
  const dirty = !!c && JSON.stringify(c) !== saved;
  const load = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/admin/who-we-serve", { cache: "no-store" });
      const d = await r.json();
      if (!r.ok) throw Error(d.error || "Unable to load content.");
      setC(d.content);
      setSaved(JSON.stringify(d.content));
      operation.current = null;
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }, []);
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
    const click = (e: MouseEvent) => {
      const a = (e.target as Element).closest("a");
      if (
        dirty &&
        a?.href &&
        !a.getAttribute("href")?.startsWith("#") &&
        !confirm("Leave without saving your edits?")
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("beforeunload", warn);
    document.addEventListener("click", click, true);
    return () => {
      window.removeEventListener("beforeunload", warn);
      document.removeEventListener("click", click, true);
    };
  }, [dirty]);
  async function save() {
    if (!c || lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    setNotice("");
    const body = JSON.stringify({ ...c, operationId: "" });
    if (operation.current?.body !== body)
      operation.current = { body, id: crypto.randomUUID() };
    try {
      const r = await fetch("/api/admin/who-we-serve", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...c, operationId: operation.current.id }),
      });
      const d = await r.json();
      if (!r.ok)
        throw Error(d.error || "Save failed. Your edits are still here.");
      setC(d.content);
      setSaved(JSON.stringify(d.content));
      operation.current = null;
      setNotice("Saved. Visible content is updated on the website.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  const text = (
    label: string,
    value: string,
    change: (v: string) => void,
    multi = false,
  ) => (
    <label key={label} className="block text-sm font-medium">
      {label}
      {multi ? (
        <textarea
          className={field}
          rows={3}
          maxLength={3000}
          value={value}
          onChange={(e) => change(e.target.value)}
        />
      ) : (
        <input
          className={field}
          maxLength={3000}
          value={value}
          onChange={(e) => change(e.target.value)}
        />
      )}
    </label>
  );
  function updateRow<T extends Industry | Organization>(
    key: "industries" | "organizations",
    index: number,
    patch: Partial<T>,
  ) {
    setC((old) =>
      old
        ? {
            ...old,
            [key]: old[key].map((r, i) =>
              i === index ? { ...r, ...patch } : r,
            ),
          }
        : old,
    );
    setNotice("");
  }
  function move(
    key: "industries" | "organizations",
    index: number,
    offset: number,
  ) {
    if (!c) return;
    const rows = [...c[key]];
    [rows[index], rows[index + offset]] = [rows[index + offset], rows[index]];
    setC({ ...c, [key]: rows });
  }
  return (
    <AdminShell
      admin={null}
      beforeNavigate={() =>
        !dirty || confirm("Leave without saving your edits?")
      }
    >
      <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-8">
        <h1 className="text-3xl font-semibold">Who We Serve</h1>
        <p className="text-body">
          Edit wording, links and display order. Save Changes updates visible
          content directly. Hidden organizations stay private. Prior saved
          versions are retained for recovery.
        </p>
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-800"
          >
            {error} Your unsaved edits have not been replaced.
          </p>
        )}
        {notice && (
          <p role="status" className="rounded-xl bg-accent-soft p-4">
            {notice}
          </p>
        )}
        {!c ? (
          <>
            <p role="status">
              {busy ? "Loading content…" : "Content unavailable."}
            </p>
            <button
              className={secondary}
              disabled={busy}
              onClick={() => void load()}
            >
              Retry loading
            </button>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void save();
            }}
            className="space-y-8"
          >
            <fieldset disabled={busy} className="space-y-8 disabled:opacity-60">
              <section className="space-y-4">
                {text("Page heading", c.heading, (v) =>
                  setC({ ...c, heading: v }),
                )}
                {text(
                  "Page introduction",
                  c.intro,
                  (v) => setC({ ...c, intro: v }),
                  true,
                )}
              </section>
              <section className="space-y-5">
                <h2 className="text-2xl font-semibold">Industries</h2>
                {c.industries.map((r, i) => (
                  <details
                    key={r.id}
                    className="rounded-2xl border border-line p-5"
                  >
                    <summary className="cursor-pointer font-semibold">
                      {r.title || "New industry"}
                      {!r.visible ? " — hidden" : ""}
                    </summary>
                    <div className="mt-5 space-y-4">
                      {(
                        [
                          "title",
                          "challenges",
                          "help",
                          "outcomes",
                          "linkLabel",
                          "href",
                          "exampleLabel",
                          "exampleHref",
                        ] as const
                      ).map((k) =>
                        text(
                          {
                            title: "Industry title",
                            challenges: "Everyday challenges",
                            help: "How we can help",
                            outcomes: "Practical outcomes",
                            linkLabel: "Next-step label",
                            href: "Next-step link",
                            exampleLabel:
                              "Example label (identify internal projects)",
                            exampleHref: "Example link",
                          }[k],
                          r[k],
                          (v) => updateRow("industries", i, { [k]: v }),
                          ["challenges", "help", "outcomes"].includes(k),
                        ),
                      )}
                      <label className="flex min-h-11 items-center gap-3">
                        <input
                          type="checkbox"
                          checked={r.visible}
                          onChange={(e) =>
                            updateRow("industries", i, {
                              visible: e.target.checked,
                            })
                          }
                        />
                        Visible on website
                      </label>
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          className={secondary}
                          disabled={i === 0}
                          onClick={() => move("industries", i, -1)}
                        >
                          Move up
                        </button>
                        <button
                          type="button"
                          className={secondary}
                          disabled={i === c.industries.length - 1}
                          onClick={() => move("industries", i, 1)}
                        >
                          Move down
                        </button>
                      </div>
                    </div>
                  </details>
                ))}
                <button
                  type="button"
                  className={secondary}
                  onClick={() =>
                    setC({
                      ...c,
                      industries: [
                        ...c.industries,
                        {
                          id: crypto.randomUUID(),
                          title: "",
                          challenges: "",
                          help: "",
                          outcomes: "",
                          linkLabel: "",
                          href: "",
                          exampleLabel: "",
                          exampleHref: "",
                          visible: false,
                        },
                      ],
                    })
                  }
                >
                  Add industry
                </button>
              </section>
              <section className="space-y-5">
                <h2 className="text-2xl font-semibold">
                  Clients & project relationships
                </h2>
                <p className="text-sm leading-6">
                  Only approved organizations may be visible. Record the actual
                  relationship, evidence and permission to display the logo.
                  Founder experience, predecessor-company work, volunteer work
                  and partnerships must be labeled accurately. Use an approved
                  HTTPS logo URL or site asset path; no developer is needed to
                  add an organization.
                </p>
                <label className="flex min-h-11 items-center gap-3">
                  <input
                    type="checkbox"
                    checked={c.showOrganizations}
                    onChange={(e) =>
                      setC({ ...c, showOrganizations: e.target.checked })
                    }
                  />
                  Show organization section on Work when approved entries are
                  available
                </label>
                {c.organizations.length === 0 && (
                  <p>
                    No organizations yet. The public logo section remains
                    hidden.
                  </p>
                )}
                {c.organizations.map((r, i) => (
                  <details
                    key={r.id}
                    className="rounded-2xl border border-line p-5"
                  >
                    <summary className="cursor-pointer font-semibold">
                      {r.name || "New organization"}
                      {!r.visible ? " — hidden" : ""}
                    </summary>
                    <div className="mt-5 space-y-4">
                      {(
                        [
                          "name",
                          "relationship",
                          "logo",
                          "href",
                          "evidence",
                          "permission",
                        ] as const
                      ).map((k) =>
                        text(
                          {
                            name: "Organization name",
                            relationship: "Actual relationship and scope",
                            logo: "Approved logo URL",
                            href: "Project page link (optional)",
                            evidence:
                              "Private relationship verification reference",
                            permission: "Private logo permission reference",
                          }[k],
                          r[k],
                          (v) =>
                            updateRow("organizations", i, {
                              [k]: v,
                              approved: false,
                            }),
                          ["relationship", "evidence", "permission"].includes(
                            k,
                          ),
                        ),
                      )}
                      <label className="flex min-h-11 items-center gap-3">
                        <input
                          type="checkbox"
                          checked={r.approved}
                          onChange={(e) =>
                            updateRow("organizations", i, {
                              approved: e.target.checked,
                            })
                          }
                        />
                        Relationship verified and logo display permission
                        confirmed
                      </label>
                      <label className="flex min-h-11 items-center gap-3">
                        <input
                          type="checkbox"
                          checked={r.visible}
                          onChange={(e) =>
                            updateRow("organizations", i, {
                              visible: e.target.checked,
                            })
                          }
                        />
                        Visible on website
                      </label>
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          className={secondary}
                          disabled={i === 0}
                          onClick={() => move("organizations", i, -1)}
                        >
                          Move up
                        </button>
                        <button
                          type="button"
                          className={secondary}
                          disabled={i === c.organizations.length - 1}
                          onClick={() => move("organizations", i, 1)}
                        >
                          Move down
                        </button>
                      </div>
                    </div>
                  </details>
                ))}
                <button
                  type="button"
                  className={secondary}
                  onClick={() =>
                    setC({
                      ...c,
                      organizations: [
                        ...c.organizations,
                        {
                          id: crypto.randomUUID(),
                          name: "",
                          relationship: "",
                          logo: "",
                          href: "",
                          evidence: "",
                          permission: "",
                          approved: false,
                          visible: false,
                        },
                      ],
                    })
                  }
                >
                  Add organization
                </button>
              </section>
            </fieldset>
            <div className="flex flex-wrap gap-3">
              <button className={buttonPrimary} disabled={busy || !dirty}>
                {busy ? "Saving…" : "Save Changes"}
              </button>
              <button
                type="button"
                className={secondary}
                disabled={busy || !dirty}
                onClick={() => {
                  if (confirm("Discard unsaved edits?")) {
                    setC(JSON.parse(saved));
                    setError("");
                    setNotice("Edits discarded.");
                  }
                }}
              >
                Cancel edits
              </button>
              <button
                type="button"
                className={secondary}
                disabled={busy}
                onClick={() => {
                  if (
                    !dirty ||
                    confirm("Discard unsaved edits and reload saved content?")
                  )
                    void load();
                }}
              >
                Reload saved content
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminShell>
  );
}
