"use client";

import { useEffect, useRef } from "react";
import {
  emailValid,
  type Job,
  type Question,
  type Settings,
} from "@/lib/careers/model";

const control =
  "mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-base font-normal leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100";
const secondary =
  "rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50";
const sections = [
  "Job basics",
  "Job description",
  "Application requirements",
  "Review & save",
];
const basics = [
  {
    key: "title",
    label: "Job title",
    hint: "The title applicants will see on the careers page.",
    placeholder: "e.g. Business Development Lead",
  },
  {
    key: "location",
    label: "Work location",
    hint: "Include eligible states and whether the role is remote, hybrid, or on-site.",
    placeholder: "e.g. New Jersey / Connecticut · Hybrid",
  },
  {
    key: "employmentType",
    label: "Employment type",
    hint: "Describe the working arrangement, such as full-time or part-time.",
    placeholder: "e.g. Full-time employee",
  },
  {
    key: "compensation",
    label: "Pay & incentives",
    hint: "Include currency, pay period, base pay or range, and any incentives.",
    placeholder: "e.g. USD annual base + target incentives",
  },
] as const;
const descriptions = [
  {
    key: "description",
    label: "About the role",
    hint: "Introduce the opportunity, its purpose, and who will thrive in it.",
    rows: 6,
  },
  {
    key: "responsibilities",
    label: "What this person will do",
    hint: "List the main responsibilities. Use a new line for each item.",
    rows: 7,
  },
  {
    key: "qualifications",
    label: "Skills & experience",
    hint: "Describe required skills and experience; separate any nice-to-haves.",
    rows: 7,
  },
  {
    key: "additionalDetails",
    label: "Benefits & other details",
    hint: "Optional: benefits, success measures, incentive-plan details, or other useful information.",
    rows: 6,
  },
] as const;

export default function OpeningEditor({
  job,
  onChange,
  onSave,
  onCancel,
  busy,
  settings,
  ready,
  error,
  notice,
}: {
  job: Job;
  onChange: (job: Job) => void;
  onSave: () => void;
  onCancel: () => void;
  busy: boolean;
  settings: Settings;
  ready: { mail: boolean; uploads: boolean; emailVerified: boolean };
  error: string;
  notice: string;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [job.id]);
  const updateQuestion = (id: string, patch: Partial<Question>) =>
    onChange({
      ...job,
      questions: job.questions.map((q) =>
        q.id === id ? { ...q, ...patch } : q,
      ),
    });
  const checks = [
    {
      label: "Job details completed",
      ok: [
        ...basics,
        ...descriptions.filter((x) => x.key !== "additionalDetails"),
      ].every((x) => job[x.key]?.trim()),
    },
    { label: "Hiring email added", ok: emailValid(job.hiringEmail) },
    {
      label: "Location-specific posting review confirmed",
      ok: job.postingReviewed,
    },
    {
      label: "Applicant privacy & retention settings ready",
      ok:
        emailValid(settings.privacyEmail) &&
        emailValid(settings.accommodationEmail) &&
        settings.retentionStatus === "approved" &&
        settings.retentionDays > 0 &&
        Boolean(settings.retentionBasis?.trim()),
    },
    {
      label: "Private uploads & email delivery ready",
      ok: ready.mail && ready.uploads && ready.emailVerified,
    },
  ];
  const missing = checks.filter((x) => !x.ok);
  return (
    <section
      aria-labelledby="opening-editor-title"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm"
    >
      <header className="border-b border-slate-200 bg-slate-50 px-5 py-6 sm:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <h2
            ref={heading}
            tabIndex={-1}
            id="opening-editor-title"
            className="scroll-mt-24 text-2xl font-semibold tracking-tight focus:outline-none"
          >
            {job.revision ? "Edit opening" : "New opening"}
          </h2>
          <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold">
            {job.status === "draft"
              ? "Draft · private"
              : job.status === "published"
                ? "Published · live"
                : "Closed"}{" "}
            on save
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Build a clear job posting, choose what applicants need to submit, then
          review before saving. Changes are not saved automatically.
        </p>
        <nav
          aria-label="Opening editor sections"
          className="mt-5 flex flex-wrap gap-2"
        >
          {sections.map((name, i) => (
            <a
              key={name}
              href={`#opening-section-${i}`}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-blue-400 hover:text-blue-700"
            >
              {i + 1}. {name}
            </a>
          ))}
        </nav>
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
      >
        <fieldset disabled={busy} className="min-w-0 disabled:opacity-70">
          <div className="space-y-10 px-5 py-7 sm:px-8">
            <section
              id="opening-section-0"
              className="scroll-mt-24"
              aria-labelledby="opening-basics"
            >
              <h3 id="opening-basics" className="text-xl font-semibold">
                1. Job basics
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                These details appear at the top of the public posting. A job
                title is required to save; the other details can be completed
                before publishing.
              </p>
              <div className="mt-6 grid gap-6 xl:grid-cols-2">
                {basics.map((f) => (
                  <div key={f.key}>
                    <label
                      htmlFor={`opening-${f.key}`}
                      className="block text-sm font-semibold"
                    >
                      {f.label}
                      {f.key === "title" ? " (required)" : ""}
                    </label>
                    <p
                      id={`opening-${f.key}-hint`}
                      className="mt-1 text-sm leading-6 text-slate-600"
                    >
                      {f.hint}
                    </p>
                    <input
                      id={`opening-${f.key}`}
                      aria-describedby={`opening-${f.key}-hint`}
                      required={f.key === "title"}
                      maxLength={300}
                      value={job[f.key]}
                      placeholder={f.placeholder}
                      onChange={(e) =>
                        onChange({ ...job, [f.key]: e.target.value })
                      }
                      className={control}
                    />
                  </div>
                ))}
              </div>
            </section>
            <section
              id="opening-section-1"
              className="scroll-mt-24 border-t border-slate-200 pt-8"
              aria-labelledby="opening-description-heading"
            >
              <h3
                id="opening-description-heading"
                className="text-xl font-semibold"
              >
                2. Job description
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Write for applicants in plain language. The first three fields
                are needed to publish.
              </p>
              <div className="mt-6 space-y-7">
                {descriptions.map((f) => (
                  <div key={f.key}>
                    <label
                      htmlFor={`opening-${f.key}`}
                      className="block text-sm font-semibold"
                    >
                      {f.label}
                      {f.key === "additionalDetails" ? " (optional)" : ""}
                    </label>
                    <p
                      id={`opening-${f.key}-hint`}
                      className="mt-1 text-sm leading-6 text-slate-600"
                    >
                      {f.hint}
                    </p>
                    <textarea
                      id={`opening-${f.key}`}
                      aria-describedby={`opening-${f.key}-hint`}
                      rows={f.rows}
                      maxLength={f.key === "additionalDetails" ? 30000 : 20000}
                      value={job[f.key] || ""}
                      onChange={(e) =>
                        onChange({ ...job, [f.key]: e.target.value })
                      }
                      className={`${control} resize-y`}
                    />
                  </div>
                ))}
              </div>
            </section>
            <section
              id="opening-section-2"
              className="scroll-mt-24 border-t border-slate-200 pt-8"
              aria-labelledby="opening-application"
            >
              <h3 id="opening-application" className="text-xl font-semibold">
                3. Application requirements
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Choose the documents and questions applicants will see.
              </p>
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <label
                  htmlFor="opening-hiringEmail"
                  className="block text-sm font-semibold"
                >
                  Hiring notification email
                </label>
                <p
                  id="opening-email-hint"
                  className="mt-1 text-sm leading-6 text-slate-600"
                >
                  Internal only. New-application alerts go here; this is not
                  displayed as a job detail. Required to publish.
                </p>
                <input
                  id="opening-hiringEmail"
                  aria-describedby="opening-email-hint"
                  type="email"
                  maxLength={300}
                  value={job.hiringEmail}
                  onChange={(e) =>
                    onChange({ ...job, hiringEmail: e.target.value })
                  }
                  className={control}
                  placeholder="hiring@example.com"
                />
                <div className="mt-6 space-y-5">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      className="mt-1 h-4 w-4 shrink-0 accent-blue-700"
                      type="checkbox"
                      checked={Boolean(job.resumeOrProfile)}
                      onChange={(e) =>
                        onChange({ ...job, resumeOrProfile: e.target.checked })
                      }
                    />
                    <span>
                      <span className="block text-sm font-semibold">
                        Allow a professional profile instead of a résumé
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-slate-600">
                        When enabled, applicants may provide a profile URL or a
                        résumé PDF. Otherwise, a résumé PDF is required.
                      </span>
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      className="mt-1 h-4 w-4 shrink-0 accent-blue-700"
                      type="checkbox"
                      checked={job.coverRequired}
                      onChange={(e) =>
                        onChange({ ...job, coverRequired: e.target.checked })
                      }
                    />
                    <span>
                      <span className="block text-sm font-semibold">
                        Require a cover letter
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-slate-600">
                        Applicants must enter cover-letter text or upload a PDF.
                      </span>
                    </span>
                  </label>
                </div>
              </div>
              <h4 className="mt-8 text-lg font-semibold">
                Screening questions{" "}
                <span className="text-sm font-normal text-slate-600">
                  ({job.questions.length}/25)
                </span>
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Ask job-relevant questions only. Do not request confidential
                client information, protected personal details, or unpaid custom
                strategy work.
              </p>
              <div className="mt-5 space-y-5">
                {job.questions.map((q, i) => (
                  <fieldset
                    key={q.id}
                    className="min-w-0 space-y-4 rounded-xl border border-slate-200 p-4 sm:p-5"
                  >
                    <legend className="px-2 text-sm font-semibold">
                      Question {i + 1}
                    </legend>
                    <label className="block text-sm font-semibold">
                      Question text (required)
                      <textarea
                        required
                        rows={3}
                        maxLength={1500}
                        value={q.label}
                        className={control}
                        onChange={(e) =>
                          updateQuestion(q.id, { label: e.target.value })
                        }
                      />
                    </label>
                    <label className="block text-sm font-semibold">
                      Answer format
                      <select
                        value={q.type}
                        className={control}
                        onChange={(e) =>
                          updateQuestion(q.id, {
                            type: e.target.value as Question["type"],
                          })
                        }
                      >
                        <option value="short">Short answer</option>
                        <option value="long">Long answer</option>
                        <option value="choice">Choose one option</option>
                        <option value="checkbox">
                          Choose multiple options
                        </option>
                      </select>
                    </label>
                    {["choice", "checkbox"].includes(q.type) && (
                      <label className="block text-sm font-semibold">
                        Answer options
                        <span className="mt-1 block font-normal text-slate-600">
                          Enter at least two different options, one per line.
                        </span>
                        <textarea
                          required
                          rows={4}
                          value={q.options.join("\n")}
                          className={control}
                          onChange={(e) =>
                            updateQuestion(q.id, {
                              options: e.target.value.split("\n"),
                            })
                          }
                        />
                      </label>
                    )}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <label className="flex items-center gap-3 text-sm">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-blue-700"
                          checked={q.required}
                          onChange={(e) =>
                            updateQuestion(q.id, { required: e.target.checked })
                          }
                        />
                        Answer required
                      </label>
                      <button
                        type="button"
                        className={secondary}
                        aria-label={`Remove question ${i + 1}`}
                        onClick={() =>
                          onChange({
                            ...job,
                            questions: job.questions.filter(
                              (x) => x.id !== q.id,
                            ),
                          })
                        }
                      >
                        Remove question
                      </button>
                    </div>
                  </fieldset>
                ))}
              </div>
              {!job.questions.length && (
                <p className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                  No screening questions. Applicants will only complete the
                  standard application fields.
                </p>
              )}
              <button
                type="button"
                disabled={job.questions.length >= 25}
                className={`mt-5 ${secondary}`}
                onClick={() =>
                  onChange({
                    ...job,
                    questions: [
                      ...job.questions,
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
                + Add screening question
              </button>
            </section>
            <section
              id="opening-section-3"
              className="scroll-mt-24 border-t border-slate-200 pt-8"
              aria-labelledby="opening-review"
            >
              <h3 id="opening-review" className="text-xl font-semibold">
                4. Review & save
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Saving a draft does not publish it. Choose Published below only
                when the opening is ready.
              </p>
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h4 className="font-semibold">Posting review</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Confirm eligible work locations and applicable pay, benefits,
                  classification, equal-opportunity, accommodation, privacy,
                  deadline, and recordkeeping requirements. Do not ask for
                  salary history or protected personal information.
                </p>
                <label className="mt-4 flex items-start gap-3 text-sm font-medium">
                  <input
                    className="mt-1 h-4 w-4 shrink-0 accent-blue-700"
                    type="checkbox"
                    checked={job.postingReviewed}
                    onChange={(e) =>
                      onChange({ ...job, postingReviewed: e.target.checked })
                    }
                  />
                  I have confirmed this posting meets the requirements for its
                  eligible work locations.
                </label>
              </div>
              <div className="mt-5 rounded-xl border border-slate-200 p-5">
                <h4 className="font-semibold">Publishing checklist</h4>
                <ul className="mt-3 space-y-3 text-sm">
                  {checks.map((c) => (
                    <li key={c.label} className="flex items-start gap-3">
                      <span
                        className={
                          c.ok
                            ? "font-semibold text-green-800"
                            : "font-semibold text-amber-800"
                        }
                      >
                        {c.ok ? "✓" : "○"}
                      </span>
                      <span>
                        {c.label}
                        <span
                          className={`ml-2 text-xs font-semibold ${c.ok ? "text-green-800" : "text-amber-800"}`}
                        >
                          {c.ok ? "Ready" : "Needed"}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {missing.length
                    ? "You can save a draft while items are incomplete. Applicant settings are managed above the Openings list."
                    : "These publishing checks are ready. Saving will also validate your content and screening questions."}
                </p>
              </div>
              <label
                htmlFor="opening-status"
                className="mt-6 block text-sm font-semibold"
              >
                Visibility after saving
              </label>
              <select
                id="opening-status"
                value={job.status}
                className={control}
                onChange={(e) =>
                  onChange({ ...job, status: e.target.value as Job["status"] })
                }
              >
                <option value="draft">Draft — only admins can see it</option>
                <option value="published">
                  Published — visible and accepting applications
                </option>
                <option value="closed">
                  Closed — not accepting applications
                </option>
              </select>
              {job.status === "published" && missing.length > 0 && (
                <p className="mt-3 text-sm font-medium text-amber-900">
                  Publishing is blocked by the checklist items marked Needed.
                  Choose Draft to save your progress.
                </p>
              )}
            </section>
          </div>
          <footer className="border-t border-slate-200 bg-slate-50 px-5 py-5 sm:px-8">
            {error && (
              <p
                role="alert"
                className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900"
              >
                {error} Your edits are still here.
              </p>
            )}
            {notice && (
              <p
                role="status"
                className="mb-4 text-sm font-semibold text-green-800"
              >
                {notice}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3">
              <button
                disabled={
                  busy || (job.status === "published" && missing.length > 0)
                }
                className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy
                  ? "Saving…"
                  : job.status === "draft"
                    ? "Save draft"
                    : job.status === "published"
                      ? "Save & publish"
                      : "Save closed opening"}
              </button>
              <button
                type="button"
                disabled={busy}
                className={secondary}
                onClick={onCancel}
              >
                Close editor
              </button>
              <span className="text-xs leading-5 text-slate-600">
                {busy
                  ? "Please wait while your changes are saved."
                  : "Changes take effect only after you save."}
              </span>
            </div>
          </footer>
        </fieldset>
      </form>
    </section>
  );
}
