"use client";

import { useState } from "react";

type SubmitState =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "delivered" }
  | { kind: "draft"; to: string; subject: string; body: string }
  | { kind: "error"; detail: string };

const CONTACT_EMAIL = "hello@2nspira.com";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const [submitted, setSubmitted] = useState<{ name: string; email: string; organization: string; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const compose = (f: typeof formState) => {
    const subject = `Website inquiry from ${f.name}${f.organization ? ` (${f.organization})` : ""}`;
    const body = [
      `Name: ${f.name}`,
      `Email: ${f.email}`,
      `Organization: ${f.organization || "Not provided"}`,
      "",
      f.message,
      "",
      `— Submitted via 2nspira.com on ${new Date().toISOString()}`,
    ].join("\n");
    return { subject, body };
  };

  const openMailto = (subject: string, body: string) => {
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.kind === "sending") return;
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = (await res.json()) as {
        ok: boolean; status?: "delivered" | "draft"; to?: string; subject?: string; body?: string; error?: string;
      };
      if (res.ok && data.status === "delivered") {
        setSubmitted({ ...formState });
        setState({ kind: "delivered" });
        return;
      }
      if (data.status === "draft" && data.subject && data.body) {
        setSubmitted({ ...formState });
        setState({ kind: "draft", to: data.to ?? CONTACT_EMAIL, subject: data.subject, body: data.body });
        openMailto(data.subject, data.body);
        return;
      }
      const { subject, body } = compose(formState);
      setSubmitted({ ...formState });
      setState({ kind: "draft", to: CONTACT_EMAIL, subject, body });
      openMailto(subject, body);
    } catch {
      const { subject, body } = compose(formState);
      setSubmitted({ ...formState });
      setState({ kind: "draft", to: CONTACT_EMAIL, subject, body });
      openMailto(subject, body);
    }
  };

  const faqs = [
    { q: "How soon do you respond to inquiries?", a: "We typically respond within one business day." },
    { q: "Do you offer free consultations?", a: "Yes, we offer complimentary discovery calls to understand your needs." },
    { q: "What regions do you serve?", a: "We work with organizations globally, with a focus on mission-driven institutions." },
  ];

  return (
    <main className="flex-1 bg-zinc-50 dark:bg-black" id="contact-page">
      <section className="bg-white py-24 dark:bg-black" aria-labelledby="contact-hero-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 id="contact-hero-heading" className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">Get in touch</h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-300">Questions about our services? Ready to get started? Let&rsquo;s talk.</p>
        </div>
      </section>

      <section className="py-16 sm:py-24" aria-labelledby="form-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {state.kind === "delivered" && submitted ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-8 dark:border-green-900 dark:bg-green-950/40" role="status">
              <h2 className="text-2xl font-bold text-green-900 dark:text-green-200">Message sent</h2>
              <p className="mt-3 text-sm leading-6 text-green-800 dark:text-green-300">
                Thanks, {submitted.name}. Your inquiry was delivered to {CONTACT_EMAIL}. We typically respond within one business day.
              </p>
              <div className="mt-6 rounded-lg border border-green-200 bg-white p-5 text-sm text-zinc-700 dark:border-green-900 dark:bg-zinc-950 dark:text-zinc-300">
                <p><span className="font-semibold">Your message:</span> {submitted.message}</p>
              </div>
            </div>
          ) : state.kind === "draft" && submitted ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 dark:border-amber-900 dark:bg-amber-950/40" role="status">
              <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-200">Your email app should have opened</h2>
              <p className="mt-3 text-sm leading-6 text-amber-800 dark:text-amber-300">
                Your message was composed with the following content. If your email app did not open, copy the text below and email <a href={`mailto:${state.to}`} className="font-semibold underline">{state.to}</a> directly.
              </p>
              <div className="mt-6 rounded-lg border border-amber-200 bg-white p-5 font-mono text-xs leading-5 text-zinc-700 dark:border-amber-900 dark:bg-zinc-950 dark:text-zinc-300">
                <p className="font-sans text-sm font-semibold text-zinc-900 dark:text-white">Subject: {state.subject}</p>
                <pre className="mt-3 whitespace-pre-wrap font-mono">{state.body}</pre>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50" aria-labelledby="form-heading" noValidate={false}>
              <h2 id="form-heading" className="text-2xl font-bold text-zinc-900 dark:text-white">Send us a message</h2>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                Your inquiry is delivered to our team. If direct delivery is temporarily unavailable, we will open a pre-composed draft in your email app — review and press send there.
              </p>

              <div className="mt-6">
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Your name <span className="text-red-500" aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input type="text" id="name" name="name" required autoComplete="name" value={formState.name} onChange={handleChange} aria-required="true"
                  className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-white sm:text-sm" placeholder="John Doe" />
              </div>

              <div className="mt-6">
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Email address <span className="text-red-500" aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input type="email" id="email" name="email" required autoComplete="email" value={formState.email} onChange={handleChange} aria-required="true"
                  className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-white sm:text-sm" placeholder="john@example.com" />
              </div>

              <div className="mt-6">
                <label htmlFor="organization" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Organization (optional)</label>
                <input type="text" id="organization" name="organization" autoComplete="organization" value={formState.organization} onChange={handleChange} aria-required="false"
                  className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-white sm:text-sm" placeholder="Your organization name" />
              </div>

              <div className="mt-6">
                <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  How can we help? <span className="text-red-500" aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <textarea id="message" name="message" required rows={4} value={formState.message} onChange={handleChange} aria-required="true"
                  className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-white sm:text-sm" placeholder="Tell us about your needs..." />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button type="submit" disabled={state.kind === "sending"}
                  className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-base font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                  {state.kind === "sending" ? "Sending…" : "Send message"}
                </button>
              </div>
            </form>
          )}

          <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950/50" role="complementary" aria-label="Alternative contact methods">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Prefer to email directly?</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Reach us at:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-zinc-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">{CONTACT_EMAIL}</a>
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Phone: <a href="tel:+16465430199" className="underline">+1 (646) 543-0199</a>
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              11215 72nd Rd, Forest Hills, NY
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950/50" role="complementary" aria-label="Frequently asked questions">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Common questions</h3>
            <dl className="mt-4 space-y-4">
              {faqs.map((item, i) => (
                <div key={i}>
                  <dt className="font-medium text-zinc-900 dark:text-white">{item.q}</dt>
                  <dd className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
