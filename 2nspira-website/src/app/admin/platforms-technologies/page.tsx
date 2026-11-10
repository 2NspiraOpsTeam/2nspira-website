"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { type Content, type Platform } from "@/lib/platforms/model";
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
      const r = await fetch("/api/admin/platforms-technologies", { cache: "no-store" });
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
      const r = await fetch("/api/admin/platforms-technologies", {
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
  function updateRow(index: number, patch: Partial<Platform>) {
    setC(old=>old ? {...old,platforms:old.platforms.map((r,i)=>i===index ? {...r,...patch}:r)}:old);
    setNotice("");
  }
  function move(index: number, offset: number) {
    if (!c) return;
    const rows=[...c.platforms];
    [rows[index],rows[index+offset]]=[rows[index+offset],rows[index]];
    setC({...c,platforms:rows});
  }
  return (
    <AdminShell
      admin={null}
      beforeNavigate={() =>
        !dirty || confirm("Leave without saving your edits?")
      }
    >
      <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-8">
        <h1 className="text-3xl font-semibold">Platforms & Technologies</h1>
        <p className="text-body">
          Edit the introduction and logo grid. Add official logo URLs or local image paths, record our experience, then show and order entries. Save Changes publishes visible entries. Prior versions are retained for recovery.
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
                <h2 className="text-2xl font-semibold">Platform logos</h2>
                <p className="text-sm leading-6">Use official, unmodified logos. Visible entries require a private experience reference and official logo source. Listing a technology does not imply partnership or certification. The order below is the public display order.</p>
                {!c.platforms.length && <p>No logos yet. Add a platform to begin; the public grid stays hidden until an entry is visible.</p>}
                {c.platforms.map((r,i)=><details key={r.id} className="rounded-2xl border border-line p-5">
                  <summary className="cursor-pointer font-semibold">{r.name || "New platform"}{!r.visible ? " — hidden" : ""}</summary>
                  <div className="mt-5 space-y-4">
                    {text("Platform name",r.name,v=>updateRow(i,{name:v}))}
                    {text("Official logo URL or image path",r.logo,v=>updateRow(i,{logo:v}))}
                    {text("Official logo source URL",r.source,v=>updateRow(i,{source:v}))}
                    {text("Private experience reference",r.evidence,v=>updateRow(i,{evidence:v}),true)}
                    <label className="flex min-h-11 items-center gap-3"><input type="checkbox" checked={r.visible} onChange={e=>updateRow(i,{visible:e.target.checked})}/>Visible on website</label>
                    <div className="flex flex-wrap gap-3">
                      <button type="button" className={secondary} disabled={i===0} onClick={()=>move(i,-1)}>Move up</button>
                      <button type="button" className={secondary} disabled={i===c.platforms.length-1} onClick={()=>move(i,1)}>Move down</button>
                      <button type="button" className={secondary} onClick={()=>{if(confirm(`Remove ${r.name || "this platform"}? Save Changes to publish the removal.`)) setC({...c,platforms:c.platforms.filter(p=>p.id!==r.id)});}}>Remove platform</button>
                    </div>
                  </div>
                </details>)}
                <button type="button" className={secondary} onClick={()=>setC({...c,platforms:[...c.platforms,{id:crypto.randomUUID(),name:"",logo:"",source:"",evidence:"",visible:false}]})}>Add platform</button>
              </section>
            </fieldset>
            <div className="flex flex-wrap gap-3">
              <button
                className={`${buttonPrimary} disabled:cursor-not-allowed disabled:opacity-50`}
                disabled={busy || !dirty}
              >
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
