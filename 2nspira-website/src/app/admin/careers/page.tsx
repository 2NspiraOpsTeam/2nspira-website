"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import type { Job, Settings, Question } from "@/lib/careers/model";
const blankJob: Job = {
  id: "",
  title: "",
  location: "",
  employmentType: "",
  compensation: "",
  description: "",
  responsibilities: "",
  qualifications: "",
  hiringEmail: "",
  coverRequired: false,
  resumeOrProfile: false,
  questions: [],
  status: "draft",
  revision: 0,
  postingReviewed: false,
};
const input =
  "mt-2 block w-full rounded-lg border border-line bg-white p-3 text-ink";
const button =
  "rounded-lg border border-line px-4 py-2 font-medium disabled:opacity-50";
type Summary = {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
};
type Candidate = Summary & {
  jobId: string;
  jobTitle: string;
  phone: string;
  link: string;
  cover: string;
  questions: Question[];
  answers: Record<string, string | string[]>;
  resume: boolean;
  coverFile: boolean;
  expiresAt: string;
};
export default function CareersAdmin() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]),
    [draft, setDraft] = useState<Job | null>(null),
    [settings, setSettings] = useState<Settings>({
      privacyEmail: "",
      accommodationEmail: "",
      retentionDays: 0,
    }),
    [privacy, setPrivacy] = useState<Settings | null>(null),
    [ready, setReady] = useState({ mail: false, uploads: false }),
    [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [role, setRole] = useState(""),
    [candidates, setCandidates] = useState<Summary[]>([]),
    [candidate, setCandidate] = useState<Candidate | null>(null),
    [notifications, setNotifications] = useState<
      { kind: string; status: string }[]
    >([]),
    [statusFilter, setStatusFilter] = useState("All");
  const lock = useRef(false);
  const api = useCallback(
    async (path = "", options: RequestInit = {}) => {
      const r = await fetch(`/api/admin/careers${path}`, {
        ...options,
        headers: { "Content-Type": "application/json", ...options.headers },
        cache: "no-store",
      });
      if (r.status === 401) {
        router.push("/portal/login");
        throw Error("Please sign in.");
      }
      const d = await r.json();
      if (!r.ok) throw Error(d.error || "Unable to complete request.");
      return d;
    },
    [router],
  );
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await api();
      setJobs(d.jobs);
      setSettings(d.settings);
      setReady({ mail: d.mailReady, uploads: d.uploadsReady });
      setError("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [api]);
  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);
  async function action(run: () => Promise<void>) {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await run();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  async function list(id: string) {
    setRole(id);
    setCandidate(null);
    setCandidates([]);
    const d = await api(`/applications?role=${encodeURIComponent(id)}`);
    setCandidates(d.applications);
  }
  async function show(id: string) {
    const d = await api(`/applications/${id}`);
    setCandidate(d.application);
    setNotifications(d.notifications);
  }
  const dirty = () =>
    !draft || window.confirm("Discard unsaved opening changes?");
  return (
    <AdminShell admin={null}>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold">Careers</h1>
          <p className="mt-3">
            Manage openings and applications. Drafts are never visible to
            visitors.
          </p>
        </header>
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-900"
          >
            {error}{" "}
            <button className="underline" onClick={() => void load()}>
              Reload
            </button>
          </div>
        )}
        {notice && (
          <p
            role="status"
            className="rounded-lg bg-green-50 p-4 text-green-900"
          >
            {notice}
          </p>
        )}
        {loading ? (
          <p role="status">Loading careers…</p>
        ) : (
          <>
            <section className="rounded-xl border border-line p-5">
              <h2 className="text-xl font-semibold">
                Applicant privacy and delivery
              </h2>
              <p className="mt-3">
                Private uploads:{" "}
                {ready.uploads ? "configured" : "not configured"} · Confirmation
                emails:{" "}
                {ready.mail
                  ? "configured (delivery must be tested)"
                  : "not configured"}
              </p>
              <p className="mt-3 text-sm">
                Publishing requires privacy and accommodation contacts, an
                approved retention period, secure storage and email
                configuration.
              </p>
              <button
                className={`mt-4 ${button}`}
                onClick={() => setPrivacy({ ...settings })}
              >
                Edit applicant settings
              </button>
              {privacy && (
                <form
                  className="mt-5 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    void action(async () => {
                      await api("/settings", {
                        method: "PUT",
                        body: JSON.stringify(privacy),
                      });
                      setSettings(privacy);
                      setPrivacy(null);
                      setNotice("Applicant settings saved.");
                    });
                  }}
                >
                  <label className="block">
                    Applicant privacy email *
                    <input
                      required
                      type="email"
                      value={privacy.privacyEmail}
                      onChange={(e) =>
                        setPrivacy({ ...privacy, privacyEmail: e.target.value })
                      }
                      className={input}
                    />
                  </label>
                  <label className="block">
                    Application accommodation email *
                    <input
                      required
                      type="email"
                      value={privacy.accommodationEmail}
                      onChange={(e) =>
                        setPrivacy({
                          ...privacy,
                          accommodationEmail: e.target.value,
                        })
                      }
                      className={input}
                    />
                  </label>
                  <label className="block">
                    Approved retention period (days) *
                    <input
                      type="number"
                      required
                      min={1}
                      max={730}
                      value={privacy.retentionDays || ""}
                      onChange={(e) =>
                        setPrivacy({
                          ...privacy,
                          retentionDays: Number(e.target.value),
                        })
                      }
                      className={input}
                    />
                  </label>
                  <p className="text-sm">
                    Choose a policy consistent with applicable hiring
                    recordkeeping requirements. Applicant deletion is available
                    from each candidate record. Expired records are flagged for
                    review, not automatically deleted.
                  </p>
                  <button disabled={busy} className={button}>
                    Save applicant settings
                  </button>{" "}
                  <button
                    type="button"
                    disabled={busy}
                    className={button}
                    onClick={() => setPrivacy(null)}
                  >
                    Cancel
                  </button>
                </form>
              )}
            </section>
            <section>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold">Openings</h2>
                <button
                  disabled={busy}
                  className={button}
                  onClick={() => {
                    if (dirty())
                      setDraft({
                        ...blankJob,
                        id: crypto.randomUUID(),
                        title: "",
                        questions: [],
                        revision: 0,
                      });
                  }}
                >
                  Create opening
                </button>
              </div>
              {!jobs.length && (
                <div className="mt-5 rounded-xl border border-line p-5">
                  <p>No openings yet.</p>
                  <button
                    disabled={busy}
                    className={`mt-3 ${button}`}
                    onClick={() =>
                      void action(async () => {
                        await api("", { method: "POST" });
                        await load();
                        setNotice(
                          "Business Development Lead draft created with six role questions.",
                        );
                      })
                    }
                  >
                    Create Business Development Lead draft
                  </button>
                </div>
              )}
              <ul className="mt-5 grid gap-3">
                {jobs.map((j) => (
                  <li className="rounded-xl border border-line p-5" key={j.id}>
                    <h3 className="font-semibold">{j.title}</h3>
                    <p className="mt-2 capitalize">{j.status}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        className={button}
                        disabled={busy}
                        onClick={() => {
                          if (dirty()) {
                            setDraft(structuredClone(j));
                            setCandidate(null);
                          }
                        }}
                      >
                        Edit opening
                      </button>
                      <button
                        className={button}
                        disabled={busy}
                        onClick={() => void action(() => list(j.id))}
                      >
                        View applications
                      </button>
                      {j.status === "published" && (
                        <a
                          className={button}
                          href={`/careers/${j.id}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View public role
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            {draft && (
              <section className="rounded-xl border border-line p-5">
                <h2 className="text-2xl font-semibold">
                  {draft.revision ? "Edit opening" : "New opening"}
                </h2>
                <p className="mt-3">
                  Save unfinished content as a draft. To publish, complete every
                  job detail and the posting review.
                </p>
                <form
                  className="mt-6 space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    void action(async () => {
                      const d = await api("/jobs", {
                        method: "PUT",
                        body: JSON.stringify(draft),
                      });
                      setDraft(d.job);
                      await load();
                      setNotice("Opening saved.");
                    });
                  }}
                >
                  {(
                    [
                      "title",
                      "location",
                      "employmentType",
                      "compensation",
                      "hiringEmail",
                    ] as const
                  ).map((k) => (
                    <label key={k} className="block font-medium">
                      {
                        {
                          title: "Job title",
                          location:
                            "Location / remote arrangement and eligible locations",
                          employmentType: "Employment / engagement type",
                          compensation:
                            "Compensation range, currency and pay period",
                          hiringEmail: "Hiring notification email",
                        }[k]
                      }{" "}
                      {k === "title" ? "*" : "(required to publish)"}
                      <input
                        required={k === "title"}
                        type={k === "hiringEmail" ? "email" : "text"}
                        value={draft[k]}
                        maxLength={300}
                        onChange={(e) =>
                          setDraft({ ...draft, [k]: e.target.value })
                        }
                        className={input}
                      />
                    </label>
                  ))}
                  {(
                    [
                      "description",
                      "responsibilities",
                      "qualifications",
                    ] as const
                  ).map((k) => (
                    <label className="block font-medium capitalize" key={k}>
                      {k} (required to publish)
                      <textarea
                        rows={7}
                        maxLength={20000}
                        value={draft[k]}
                        onChange={(e) =>
                          setDraft({ ...draft, [k]: e.target.value })
                        }
                        className={input}
                      />
                    </label>
                  ))}
                  <label className="block font-medium">
                    Additional role details (success measures, benefits,
                    compensation plan)
                    <textarea
                      rows={10}
                      maxLength={30000}
                      value={draft.additionalDetails || ""}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          additionalDetails: e.target.value,
                        })
                      }
                      className={input}
                    />
                  </label>
                  <label className="flex gap-3">
                    <input
                      type="checkbox"
                      checked={Boolean(draft.resumeOrProfile)}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          resumeOrProfile: e.target.checked,
                        })
                      }
                    />
                    Accept a professional profile URL instead of a résumé PDF
                  </label>
                  <label className="flex gap-3">
                    <input
                      type="checkbox"
                      checked={draft.coverRequired}
                      onChange={(e) =>
                        setDraft({ ...draft, coverRequired: e.target.checked })
                      }
                    />
                    Require a cover letter (text or PDF)
                  </label>
                  <fieldset className="space-y-5">
                    <legend className="mb-3 text-xl font-semibold">
                      Role questionnaire
                    </legend>
                    <p className="text-sm">
                      Ask only job-relevant questions. Do not request
                      confidential client details, protected characteristics or
                      unpaid custom strategy work.
                    </p>
                    {draft.questions.map((q, i) => (
                      <fieldset
                        className="space-y-3 rounded-xl border border-line p-4"
                        key={q.id}
                      >
                        <legend className="px-2">Question {i + 1}</legend>
                        <label className="block">
                          Question text *
                          <textarea
                            required
                            value={q.label}
                            maxLength={1500}
                            className={input}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                questions: draft.questions.map((x) =>
                                  x.id === q.id
                                    ? { ...x, label: e.target.value }
                                    : x,
                                ),
                              })
                            }
                          />
                        </label>
                        <label className="block">
                          Response type
                          <select
                            value={q.type}
                            className={input}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                questions: draft.questions.map((x) =>
                                  x.id === q.id
                                    ? {
                                        ...x,
                                        type: e.target
                                          .value as Question["type"],
                                      }
                                    : x,
                                ),
                              })
                            }
                          >
                            <option value="short">Short answer</option>
                            <option value="long">Long response</option>
                            <option value="choice">
                              Multiple choice (one selection)
                            </option>
                            <option value="checkbox">
                              Checkboxes (multiple selections)
                            </option>
                          </select>
                        </label>
                        {["choice", "checkbox"].includes(q.type) && (
                          <label className="block">
                            Choices (one per line; at least two)
                            <textarea
                              required
                              value={q.options.join("\n")}
                              className={input}
                              onChange={(e) =>
                                setDraft({
                                  ...draft,
                                  questions: draft.questions.map((x) =>
                                    x.id === q.id
                                      ? {
                                          ...x,
                                          options: e.target.value.split("\n"),
                                        }
                                      : x,
                                  ),
                                })
                              }
                            />
                          </label>
                        )}
                        <label className="flex gap-3">
                          <input
                            type="checkbox"
                            checked={q.required}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                questions: draft.questions.map((x) =>
                                  x.id === q.id
                                    ? { ...x, required: e.target.checked }
                                    : x,
                                ),
                              })
                            }
                          />
                          Required answer
                        </label>
                        <button
                          className={button}
                          type="button"
                          onClick={() =>
                            setDraft({
                              ...draft,
                              questions: draft.questions.filter(
                                (x) => x.id !== q.id,
                              ),
                            })
                          }
                        >
                          Remove question
                        </button>
                      </fieldset>
                    ))}
                    <button
                      type="button"
                      disabled={draft.questions.length >= 25}
                      className={button}
                      onClick={() =>
                        setDraft({
                          ...draft,
                          questions: [
                            ...draft.questions,
                            {
                              id: crypto.randomUUID(),
                              label: "",
                              type: "long",
                              required: false,
                              options: [],
                            },
                          ],
                        })
                      }
                    >
                      Add question
                    </button>
                  </fieldset>
                  <aside className="rounded-xl border border-line bg-surface p-4">
                    <h3 className="font-semibold">
                      Location-specific posting review
                    </h3>
                    <p className="mt-3 text-sm">
                      Before publishing, finalize eligible work locations and
                      check applicable pay transparency (range, benefits and
                      other compensation), contractor classification, equal
                      opportunity/accommodation wording, privacy notices,
                      application deadlines and record-retention requirements.
                      Remote roles can trigger requirements where applicants may
                      work. Do not request salary history or protected personal
                      information.
                    </p>
                    <label className="mt-4 flex gap-3">
                      <input
                        type="checkbox"
                        checked={draft.postingReviewed}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            postingReviewed: e.target.checked,
                          })
                        }
                      />
                      <span>
                        I have confirmed the posting meets requirements for its
                        eligible locations.
                      </span>
                    </label>
                  </aside>
                  <label className="block font-medium">
                    Opening status
                    <select
                      value={draft.status}
                      className={input}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          status: e.target.value as Job["status"],
                        })
                      }
                    >
                      <option value="draft">Draft — private</option>
                      <option value="published">
                        Published — accepts applications
                      </option>
                      <option value="closed">
                        Closed — no new applications
                      </option>
                    </select>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button disabled={busy} className={button}>
                      {busy ? "Saving…" : "Save opening"}
                    </button>
                    <button
                      disabled={busy}
                      type="button"
                      className={button}
                      onClick={() => {
                        if (dirty()) setDraft(null);
                      }}
                    >
                      Cancel / close editor
                    </button>
                  </div>
                </form>
              </section>
            )}
            {role && (
              <section className="rounded-xl border border-line p-5">
                <h2 className="text-2xl font-semibold">
                  Applications — {jobs.find((j) => j.id === role)?.title}
                </h2>
                <label className="mt-4 block">
                  Filter status
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={input}
                  >
                    {["All", "New", "Reviewing", "Interviewing", "Closed"].map(
                      (s) => (
                        <option key={s}>{s}</option>
                      ),
                    )}
                  </select>
                </label>
                <p className="mt-3 text-sm">
                  Showing up to 200 most recent applications for this role.
                </p>
                {!candidates.length && (
                  <p className="mt-4">No applications yet.</p>
                )}
                <ul className="mt-4 space-y-3">
                  {candidates
                    .filter(
                      (c) =>
                        statusFilter === "All" || c.status === statusFilter,
                    )
                    .map((c) => (
                      <li
                        key={c.id}
                        className="rounded-lg border border-line p-4"
                      >
                        <button
                          className="font-semibold underline"
                          disabled={busy}
                          onClick={() => void action(() => show(c.id))}
                        >
                          {c.name}
                        </button>
                        <p className="mt-2 break-all">
                          {c.email} · {c.status}
                        </p>
                        <p className="mt-1 text-sm">
                          {new Date(c.createdAt).toLocaleString()}
                        </p>
                      </li>
                    ))}
                </ul>
              </section>
            )}
            {candidate && (
              <section className="space-y-5 rounded-xl border border-line p-5">
                <h2 className="text-2xl font-semibold">{candidate.name}</h2>
                <p>{candidate.jobTitle}</p>
                <p className="break-all">
                  {candidate.email} {candidate.phone && `· ${candidate.phone}`}
                </p>
                {candidate.link && (
                  <a
                    className="block break-all underline"
                    target="_blank"
                    rel="noreferrer"
                    href={candidate.link}
                  >
                    LinkedIn / portfolio (external site)
                  </a>
                )}
                <div className="flex flex-wrap gap-4">
                  {candidate.resume && (
                    <a
                      className="underline"
                      href={`/api/admin/careers/applications/${candidate.id}/file?kind=resume`}
                    >
                      Download résumé PDF
                    </a>
                  )}
                  {candidate.coverFile && (
                    <a
                      className="underline"
                      href={`/api/admin/careers/applications/${candidate.id}/file?kind=cover`}
                    >
                      Download cover letter PDF
                    </a>
                  )}
                </div>
                <p className="text-sm">
                  Treat uploaded files and external links as untrusted.
                  Documents download rather than render inside Admin.
                </p>
                <h3 className="text-lg font-semibold">Cover letter</h3>
                <p className="whitespace-pre-wrap">
                  {candidate.cover || "No cover letter text provided."}
                </p>
                <h3 className="text-lg font-semibold">
                  Questionnaire at time of application
                </h3>
                {candidate.questions.map((q) => (
                  <div key={q.id}>
                    <h4 className="font-semibold">{q.label}</h4>
                    <p className="mt-2 whitespace-pre-wrap">
                      {Array.isArray(candidate.answers[q.id])
                        ? (candidate.answers[q.id] as string[]).join(", ")
                        : candidate.answers[q.id] || "No answer provided."}
                    </p>
                  </div>
                ))}
                <label className="block font-medium">
                  Application status
                  <select
                    disabled={busy}
                    value={candidate.status}
                    className={input}
                    onChange={(e) => {
                      const status = e.target.value;
                      void action(async () => {
                        await api(`/applications/${candidate.id}`, {
                          method: "PATCH",
                          body: JSON.stringify({ status }),
                        });
                        setCandidate({ ...candidate, status });
                        setCandidates(
                          candidates.map((c) =>
                            c.id === candidate.id ? { ...c, status } : c,
                          ),
                        );
                        setNotice("Application status saved.");
                      });
                    }}
                  >
                    {["New", "Reviewing", "Interviewing", "Closed"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <div>
                  <h3 className="font-semibold">Email notifications</h3>
                  {notifications.map((n) => (
                    <p key={n.kind}>
                      {n.kind}:{" "}
                      {n.status === "sent"
                        ? "accepted by email provider (inbox delivery not confirmed)"
                        : n.status}
                    </p>
                  ))}
                  <p className="mt-2 text-sm">
                    Pending messages can be retried. Unknown/sending outcomes
                    require delivery review before any resend.
                  </p>
                  <button
                    className={`mt-3 ${button}`}
                    disabled={
                      busy || !notifications.some((n) => n.status === "pending")
                    }
                    onClick={() =>
                      void action(async () => {
                        await api(
                          `/applications/${candidate.id}/notifications`,
                          { method: "POST" },
                        );
                        await show(candidate.id);
                      })
                    }
                  >
                    Retry pending notifications
                  </button>
                </div>
                <p className="text-sm">
                  Retention review date:{" "}
                  {new Date(candidate.expiresAt).toLocaleDateString()}
                  {new Date(candidate.expiresAt) < new Date()
                    ? " — review retention and delete unless legally required."
                    : ""}
                </p>
                <button
                  className={`${button} text-red-800`}
                  disabled={busy}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Permanently delete this application and its documents? This cannot be undone.",
                      )
                    )
                      void action(async () => {
                        await api(`/applications/${candidate.id}`, {
                          method: "DELETE",
                        });
                        setCandidate(null);
                        await list(role);
                        setNotice("Application and documents deleted.");
                      });
                  }}
                >
                  Delete application and documents
                </button>
              </section>
            )}
          </>
        )}
      </div>
    </AdminShell>
  );
}
