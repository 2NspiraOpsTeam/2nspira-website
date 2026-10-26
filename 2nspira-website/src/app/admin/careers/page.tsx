"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import OpeningEditor from "@/components/careers/OpeningEditor";
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
  expiresAt: string | null;
  legalHold?: boolean;
  holdHistory?: { held: boolean; reason: string; at: string; actor: string }[];
  decisionHistory?: { status: string; at: string; actor: string }[];
};
export default function CareersAdmin() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]),
    [draft, setDraft] = useState<Job | null>(null),
    [settings, setSettings] = useState<Settings>({
      privacyEmail: "",
      accommodationEmail: "",
      retentionDays: 0,
      retentionStatus: "pending",
      retentionBasis: "",
    }),
    [privacy, setPrivacy] = useState<Settings | null>(null),
    [ready, setReady] = useState({
      mail: false,
      uploads: false,
      emailVerified: false,
    }),
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
      setReady({
        mail: d.mailReady,
        uploads: d.uploadsReady,
        emailVerified: d.emailVerified,
      });
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
                  ? ready.emailVerified
                    ? "external delivery and replies verified"
                    : "configured — external delivery/replies NOT verified"
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
                    Retention policy status
                    <select
                      value={privacy.retentionStatus || "pending"}
                      onChange={(e) =>
                        setPrivacy({
                          ...privacy,
                          retentionStatus: e.target.value as
                            "pending" | "approved",
                        })
                      }
                      className={input}
                    >
                      <option value="pending">
                        Pending — preserve records; no automatic deletion
                      </option>
                      <option value="approved">
                        Approved after applicability review
                      </option>
                    </select>
                  </label>
                  <label className="block">
                    Minimum retention period (days; leave 0 while pending)
                    <input
                      type="number"
                      required
                      min={0}
                      max={3650}
                      value={privacy.retentionDays}
                      onChange={(e) =>
                        setPrivacy({
                          ...privacy,
                          retentionDays: Number(e.target.value),
                        })
                      }
                      className={input}
                    />
                  </label>
                  <label className="block">
                    Documented requirements and approval basis
                    <textarea
                      rows={5}
                      maxLength={10000}
                      value={privacy.retentionBasis || ""}
                      onChange={(e) =>
                        setPrivacy({
                          ...privacy,
                          retentionBasis: e.target.value,
                        })
                      }
                      className={input}
                    />
                  </label>
                  <p className="text-sm">
                    Do not approve a period until employer coverage and
                    federal/state requirements are determined. Pending policies
                    block deletion and publication. Legal holds override
                    deletion. Retention applies to applications, documents,
                    answers and hiring decision history, measured from the later
                    record/action. No automated deletion runs.
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
                            setError("");
                            setNotice("");
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
              <OpeningEditor
                job={draft}
                onChange={(next) => {
                  setDraft(next);
                  setNotice("");
                }}
                busy={busy}
                settings={settings}
                ready={ready}
                error={error}
                notice={notice}
                onCancel={() => {
                  if (dirty()) setDraft(null);
                }}
                onSave={() =>
                  void action(async () => {
                    const d = await api("/jobs", {
                      method: "PUT",
                      body: JSON.stringify(draft),
                    });
                    setDraft(d.job);
                    await load();
                    setNotice(
                      d.job.status === "draft"
                        ? "Draft saved. This opening is not visible to visitors."
                        : d.job.status === "published"
                          ? "Opening saved and published."
                          : "Opening saved as closed.",
                    );
                  })
                }
              />
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
                        await show(candidate.id);
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
                <section className="space-y-3 border-t border-line pt-4">
                  <h3 className="font-semibold">Retention and legal hold</h3>
                  <p>
                    {candidate.expiresAt
                      ? `Earliest retention review: ${new Date(candidate.expiresAt).toLocaleDateString()}. Later hiring actions can extend this date.`
                      : "Retention pending — preserve records; no automatic deletion."}
                  </p>
                  <p>
                    {candidate.legalHold
                      ? "LEGAL HOLD — deletion blocked"
                      : "No legal hold recorded"}
                  </p>
                  <button
                    className={button}
                    disabled={busy}
                    onClick={() => {
                      const reason = window.prompt(
                        candidate.legalHold
                          ? "Reason for releasing this legal hold (do not include medical/accommodation details)"
                          : "Legal hold reason (do not include medical/accommodation details)",
                      );
                      if (reason?.trim())
                        void action(async () => {
                          await api(`/applications/${candidate.id}/hold`, {
                            method: "PATCH",
                            body: JSON.stringify({
                              legalHold: !candidate.legalHold,
                              reason,
                            }),
                          });
                          await show(candidate.id);
                          setNotice("Legal hold updated.");
                        });
                    }}
                  >
                    {candidate.legalHold
                      ? "Release legal hold"
                      : "Place legal hold"}
                  </button>
                  <h4 className="font-semibold">Hiring decision history</h4>
                  {(candidate.decisionHistory || []).map((event, i) => (
                    <p key={i} className="text-sm">
                      {event.status} · {new Date(event.at).toLocaleString()} ·{" "}
                      {event.actor}
                    </p>
                  ))}
                  {(candidate.holdHistory || []).map((event, i) => (
                    <p key={`hold-${i}`} className="text-sm">
                      {event.held ? "Hold placed" : "Hold released"} ·{" "}
                      {new Date(event.at).toLocaleString()} · {event.actor}:{" "}
                      {event.reason}
                    </p>
                  ))}
                  <p className="text-sm">
                    Accommodation requests belong in the private hiring mailbox,
                    not in candidate evaluation records.
                  </p>
                </section>
                <button
                  className={`${button} text-red-800`}
                  disabled={
                    busy ||
                    candidate.legalHold ||
                    settings.retentionStatus !== "approved"
                  }
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
