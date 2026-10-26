"use client";
import { useRef, useState } from "react";
import { buttonPrimary } from "@/components/ui";
import type { Job, Settings } from "@/lib/careers/model";
const input =
  "mt-2 block w-full rounded-lg border border-line bg-white p-3 text-ink focus:outline-2 focus:outline-accent";
export default function ApplicationForm({
  job,
  privacy,
}: {
  job: Pick<
    Job,
    | "id"
    | "title"
    | "revision"
    | "questions"
    | "coverRequired"
    | "resumeOrProfile"
  >;
  privacy: Settings;
}) {
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [receipt, setReceipt] = useState("");
  const key = useRef("");
  const errorRef = useRef<HTMLDivElement>(null);
  const lock = useRef(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const answers: Record<string, unknown> = {};
    for (const q of job.questions)
      answers[q.id] =
        q.type === "checkbox"
          ? form.getAll(`question-${q.id}`)
          : String(form.get(`question-${q.id}`) || "");
    form.set("answers", JSON.stringify(answers));
    form.set("revision", String(job.revision));
    if (!key.current) key.current = crypto.randomUUID();
    try {
      const r = await fetch(`/api/careers/${job.id}/apply`, {
        method: "POST",
        headers: { "Idempotency-Key": key.current },
        body: form,
      });
      const d = await r.json();
      if (!r.ok)
        throw Error(d.error || "We could not submit your application.");
      setReceipt(d.id);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Connection failed. Your entries are still here; please try again.",
      );
      setTimeout(() => errorRef.current?.focus(), 0);
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  if (receipt)
    return (
      <section
        id="apply"
        className="mt-14 rounded-2xl border border-line p-6"
        role="status"
      >
        <h2 className="text-2xl font-semibold">Application received</h2>
        <p className="mt-4">
          Thank you for applying for {job.title}. Your application has been
          saved. A confirmation email will follow; check your spam folder too.
        </p>
        <p className="mt-3 break-all text-sm">Reference: {receipt}</p>
        <p className="mt-3">
          This confirms receipt, not an offer or interview.
        </p>
      </section>
    );
  return (
    <section id="apply" className="mt-14 border-t border-line pt-10">
      <h2 className="text-2xl font-semibold">Apply for this role</h2>
      <p className="mt-3">
        Fields marked * are required. Résumé and uploaded cover letters must be
        PDF, up to 3 MB each.
      </p>
      <p className="mt-3">
        Please share only job-relevant information. Do not include confidential
        client information, government IDs, financial details or sensitive
        personal information. We do not request unpaid custom strategy work.
      </p>
      <p className="mt-3">
        Need an application accommodation?{" "}
        <a className="underline" href={`mailto:${privacy.accommodationEmail}`}>
          Contact our hiring team
        </a>
        .
      </p>
      <form className="mt-7 space-y-6" onSubmit={submit}>
        {error && (
          <div
            ref={errorRef}
            tabIndex={-1}
            role="alert"
            className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-900"
          >
            {error}
          </div>
        )}
        <fieldset disabled={busy} className="space-y-6 disabled:opacity-60">
          <legend className="sr-only">Application details</legend>
          <label className="block font-medium">
            Name *
            <input
              required
              name="name"
              autoComplete="name"
              maxLength={150}
              className={input}
            />
          </label>
          <label className="block font-medium">
            Email *
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              maxLength={254}
              className={input}
            />
          </label>
          <label className="block font-medium">
            Phone (optional)
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              maxLength={60}
              className={input}
            />
          </label>
          <label className="block font-medium">
            LinkedIn or portfolio URL{" "}
            {job.resumeOrProfile ? "(required if no résumé)" : "(optional)"}
            <input
              type="url"
              name="link"
              placeholder="https://"
              maxLength={1000}
              className={input}
            />
          </label>
          <label className="block font-medium">
            Résumé PDF{" "}
            {job.resumeOrProfile ? "(optional with professional profile)" : "*"}
            <input
              required={!job.resumeOrProfile}
              type="file"
              name="resume"
              accept=".pdf,application/pdf"
              className={input}
            />
          </label>
          <fieldset className="space-y-3 rounded-xl border border-line p-4">
            <legend className="px-2 font-medium">
              Cover letter {job.coverRequired ? "*" : "(optional)"}
            </legend>
            <p className="text-sm">
              Enter text or attach a PDF.{" "}
              {job.coverRequired ? "At least one is required." : ""}
            </p>
            <label className="block">
              Cover letter text
              <textarea
                name="cover"
                rows={6}
                maxLength={15000}
                className={input}
              />
            </label>
            <label className="block">
              Cover letter PDF
              <input
                type="file"
                name="coverFile"
                accept=".pdf,application/pdf"
                className={input}
              />
            </label>
          </fieldset>
          <fieldset className="space-y-6">
            <legend className="mb-5 text-xl font-semibold">
              Role questionnaire
            </legend>
            {job.questions.map((q) => (
              <div key={q.id}>
                {q.type === "checkbox" ? (
                  <fieldset>
                    <legend className="font-medium">
                      {q.label} {q.required ? "*" : "(optional)"}
                    </legend>
                    <p className="mt-1 text-sm">
                      {q.required
                        ? "Choose at least one."
                        : "Choose any that apply."}
                    </p>
                    {q.options.map((o) => (
                      <label key={o} className="mt-3 flex items-start gap-3">
                        <input
                          className="mt-1 h-5 w-5 shrink-0"
                          name={`question-${q.id}`}
                          type="checkbox"
                          value={o}
                        />
                        <span>{o}</span>
                      </label>
                    ))}
                  </fieldset>
                ) : (
                  <label className="block font-medium">
                    {q.label} {q.required ? "*" : "(optional)"}
                    {q.type === "long" ? (
                      <textarea
                        name={`question-${q.id}`}
                        required={q.required}
                        rows={5}
                        maxLength={6000}
                        className={input}
                      />
                    ) : q.type === "choice" ? (
                      <select
                        required={q.required}
                        name={`question-${q.id}`}
                        className={input}
                      >
                        <option value="">Select an answer</option>
                        {q.options.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        required={q.required}
                        name={`question-${q.id}`}
                        maxLength={500}
                        className={input}
                      />
                    )}
                  </label>
                )}
              </div>
            ))}
          </fieldset>
          <aside
            className="rounded-xl border border-line bg-surface p-5"
            aria-labelledby="privacy-heading"
          >
            <h3 id="privacy-heading" className="font-semibold">
              Applicant privacy
            </h3>
            <p className="mt-3 text-sm leading-7">
              2Nspira uses your contact details, documents and answers to
              evaluate this application and communicate about recruitment.
              Access is restricted to authorized administrators. Our website,
              storage and email providers process this information to support
              recruitment. Application records are scheduled for retention
              review after {privacy.retentionDays} days and deleted when no
              longer needed, subject to applicable legal recordkeeping
              requirements. We do not sell applicant information. For access,
              correction or deletion requests, contact{" "}
              <a className="underline" href={`mailto:${privacy.privacyEmail}`}>
                {privacy.privacyEmail}
              </a>
              . Please do not submit sensitive personal information.
            </p>
          </aside>
          <label className="flex items-start gap-3">
            <input
              required
              type="checkbox"
              name="privacy"
              value="yes"
              className="mt-1 h-5 w-5 shrink-0"
            />
            <span>I have read the applicant privacy information. *</span>
          </label>
          <div className="hidden" aria-hidden="true">
            <label>
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <button
            disabled={busy}
            className={`${buttonPrimary} disabled:opacity-50`}
            type="submit"
          >
            {busy ? "Submitting…" : "Submit application"}
          </button>
        </fieldset>
      </form>
    </section>
  );
}
