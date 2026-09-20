"use client";

import { useState, useRef, useCallback, type ReactNode } from "react";

type SubmitState =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "delivered" }
  | { kind: "draft"; to: string; subject: string; body: string }
  | { kind: "error"; detail: string };

const CONTACT_EMAIL = "hello@2nspira.com";

import {
  buttonPrimary,
  card,
  cardFlat,
  caption,
  field,
  label,
  lead,
  pageMain,
} from "@/components/ui";
import Image from "next/image";
import Reveal from "@/components/Reveal";

/* ------------------------------------------------------------------ */
/*  Enhanced field wrapper — label lift, ring, depth on focus         */
/* ------------------------------------------------------------------ */

type FieldGroupProps = {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  delay?: number;
  id: string;
  "aria-describedby"?: string;
};

function FieldGroup({
  label,
  hint,
  required = false,
  children,
  delay = 0,
  id,
  ...rest
}: FieldGroupProps) {
  return (
    <Reveal delay={delay}>
      <div className="group/field">
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-ink transition-colors duration-300 ease-gentle group-focus-within/field:text-accent`}
        >
          {label}{" "}
          {required && (
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          )}
          {required && <span className="sr-only">(required)</span>}
        </label>

        <div className="relative mt-1">
          {children}
          {/* Subtle background fill on focus — brand tint */}
          <span
            className="pointer-events-none absolute inset-0 rounded-lg bg-accent-soft opacity-0 transition-opacity duration-300 ease-gentle group-focus-within/field:opacity-100"
            aria-hidden="true"
          />
        </div>

        {hint && (
          <p
            className={`mt-1.5 text-xs text-muted transition-colors duration-300 ease-gentle group-focus-within/field:text-accent/70`}
            id={`${id}-hint`}
          >
            {hint}
          </p>
        )}
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Staggered FAQ entries                                             */
/* ------------------------------------------------------------------ */

function FAQItem({
  q,
  a,
  index,
}: {
  q: string;
  a: string;
  index: number;
}) {
  return (
    <Reveal delay={index * 100}>
      <div>
        <dt className="font-medium text-ink">{q}</dt>
        <dd className={`mt-1 ${caption}`}>{a}</dd>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact page (primary)                                            */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const [submitted, setSubmitted] = useState<{
    name: string;
    email: string;
    organization: string;
    message: string;
  } | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const compose = (f: typeof formState) => {
    const subject = `Website inquiry from ${f.name}${
      f.organization ? ` (${f.organization})` : ""
    }`;
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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
          ok: boolean;
          status?: "delivered" | "draft";
          to?: string;
          subject?: string;
          body?: string;
          error?: string;
        };
        if (res.ok && data.status === "delivered") {
          setSubmitted({ ...formState });
          setState({ kind: "delivered" });
          return;
        }
        if (data.status === "draft" && data.subject && data.body) {
          setSubmitted({ ...formState });
          setState({
            kind: "draft",
            to: data.to ?? CONTACT_EMAIL,
            subject: data.subject,
            body: data.body,
          });
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
    },
    [state.kind, formState],
  );

  const handleReset = useCallback(() => {
    setFormState({ name: "", email: "", organization: "", message: "" });
    setSubmitted(null);
    setState({ kind: "idle" });
    formRef.current?.focus();
  }, []);

  const faqs = [
    {
      q: "How soon do you respond to inquiries?",
      a: "We typically respond within one business day.",
    },
    {
      q: "Do you offer free consultations?",
      a: "Yes, we offer complimentary discovery calls to understand your needs.",
    },
    {
      q: "What regions do you serve?",
      a:
        "We work with organizations globally, with a focus on mission-driven institutions.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const isTerminal =
    state.kind === "delivered" || state.kind === "draft";

  return (
    <main className={pageMain} id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* ── Hero section ── */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <Reveal>
            <h1
              id="contact-hero-heading"
              className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
            >
              Get in touch
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className={`mx-auto mt-6 max-w-xl ${lead}`}>
              Questions about our services? Ready to get started? Let&rsquo;s
              talk.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Hero image with gradient overlay (matches /websites treatment) ── */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <figure className="group relative overflow-hidden sm:-mx-6 lg:-mx-8">
          <div
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-white/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden="true"
          />
          <Image
            src="/images/pages/contact-environmental.webp"
            alt="Conceptual visualization of a calm, minimal meeting corner beside a window."
            width={1344}
            height={768}
            className="h-auto w-full transition-transform duration-700 ease-gentle group-hover:scale-[1.01]"
          />
        </figure>
      </div>

      {/* ── Contact section with ambient orbs (matching /websites sectionBand depth) ── */}
      <section
        className="relative bg-canvas-deep py-16 sm:py-24"
        aria-labelledby="form-heading"
      >
        {/* Ambient background orbs — same treatment as /websites */}
        <div
          className="pointer-events-none absolute -left-28 top-32 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-32 bottom-40 h-80 w-80 rounded-full bg-accent-soft/70 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* ---- Success / Draft states ---- */}
          {state.kind === "delivered" && submitted ? (
            <div
              className="rounded-2xl border border-green-200 bg-green-50 p-8"
              role="status"
            >
              <h2 className="text-2xl font-bold text-green-900">
                Message sent
              </h2>
              <p className="mt-3 text-sm leading-6 text-green-800">
                Thanks, {submitted.name}. Your inquiry was delivered to{" "}
                {CONTACT_EMAIL}. We typically respond within one business day.
              </p>
              <div className="mt-6 rounded-lg border border-green-200 bg-white p-5 text-sm text-zinc-700">
                <p>
                  <span className="font-semibold">Your message:</span>{" "}
                  {submitted.message}
                </p>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleReset}
                  className={`${buttonPrimary} bg-ink text-white hover:bg-ink/90 focus-visible:ring-offset-canvas`}
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : state.kind === "draft" && submitted ? (
            <div
              className="rounded-2xl border border-amber-200 bg-amber-50 p-8"
              role="status"
            >
              <h2 className="text-2xl font-bold text-amber-900">
                Your email app should have opened
              </h2>
              <p className="mt-3 text-sm leading-6 text-amber-800">
                Your message was composed with the following content. If your
                email app did not open, copy the text below and email{" "}
                <a
                  href={`mailto:${state.to}`}
                  className="font-semibold underline"
                >
                  {state.to}
                </a>{" "}
                directly.
              </p>
              <div className="mt-6 rounded-lg border border-amber-200 bg-white p-5 font-mono text-xs leading-5 text-zinc-700">
                <p className="font-sans text-sm font-semibold text-ink">
                  Subject: {state.subject}
                </p>
                <pre className="mt-3 whitespace-pre-wrap font-mono">
                  {state.body}
                </pre>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleReset}
                  className={`${buttonPrimary} bg-ink text-white hover:bg-ink/90 focus-visible:ring-offset-canvas`}
                >
                  Try again
                </button>
              </div>
            </div>
          ) : (
            /* ---- Contact form ---- */
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className={`p-8 ${card} shadow-[0_20px_60px_rgba(35,41,54,0.08)] transition-[box-shadow] duration-500 hover:shadow-[0_28px_70px_rgba(35,41,54,0.12)]`}
              aria-labelledby="form-heading"
              noValidate={false}
            >
              {/* Accent top-line reveal (matching /websites card treatment) */}
              <div
                className="absolute -top-px left-8 right-8 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover/form-card:scale-x-100"
                aria-hidden="true"
              />
              <h2 id="form-heading" className="text-2xl font-bold text-ink">
                Send us a message
              </h2>
              <p
                className={`mt-3 ${caption}`}
              >
                Your inquiry is delivered to our team. If direct delivery is
                temporarily unavailable, we will open a pre-composed draft in
                your email app — review and press send there.
              </p>

              <div className="mt-6">
                <FieldGroup
                  label="Your name"
                  required
                  id="name"
                  delay={0}
                >
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    value={formState.name}
                    onChange={handleChange}
                    aria-required="true"
                    className={field}
                    placeholder="John Doe"
                  />
                </FieldGroup>
              </div>

              <div className="mt-6">
                <FieldGroup
                  label="Email address"
                  required
                  id="email"
                  delay={100}
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={formState.email}
                    onChange={handleChange}
                    aria-required="true"
                    className={field}
                    placeholder="john@example.com"
                  />
                </FieldGroup>
              </div>

              <div className="mt-6">
                <FieldGroup
                  label="Organization (optional)"
                  hint="Company, nonprofit, or school name"
                  id="organization"
                  delay={200}
                >
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    autoComplete="organization"
                    value={formState.organization}
                    onChange={handleChange}
                    aria-required={false}
                    className={field}
                    placeholder="Your organization name"
                  />
                </FieldGroup>
              </div>

              <div className="mt-6">
                <FieldGroup
                  label="How can we help?"
                  required
                  id="message"
                  hint="Please describe your project, timeline, or questions."
                  delay={300}
                >
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    aria-required="true"
                    className={field}
                    placeholder="Tell us about your needs..."
                  />
                </FieldGroup>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <Reveal delay={400}>
                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={state.kind === "sending"}
                      className={`${buttonPrimary} disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                      {state.kind === "sending" ? (
                        <>
                          <span
                            className="mr-2 inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white"
                            aria-hidden="true"
                          />
                          Sending…
                        </>
                      ) : (
                        "Send message"
                      )}
                    </button>
                    {/* Accessibility: visible hint for button */}
                    <span
                      className="text-xs text-muted"
                      aria-hidden="true"
                    >
                      (or use Ctrl+Enter to submit)
                    </span>
                  </div>
                </Reveal>
              </div>
            </form>
          )}

          {/* ---- Contact card (always visible) ── enhanced with badge + hover + accent line ── */}
          <Reveal delay={0}>
            <div
              className={`group relative mt-12 overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift ${cardFlat}`}
              role="complementary"
              aria-label="Alternative contact methods"
            >
              {/* Accent top-line */}
              <div
                className="absolute -top-px left-8 right-8 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <div className="p-8">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-ink">
                    Prefer to email directly?
                  </h3>
                  {/* Badge pill (matching /websites tag styling) */}
                  <span className="shrink-0 rounded-full border border-line bg-canvas/80 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-body">
                    Direct
                  </span>
                </div>
                <p className={`mt-3 ${caption}`}>
                  Reach us at:{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-300 ease-gentle hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
                <p className={`mt-2 ${caption}`}>
                  Phone:{" "}
                  <a
                    href="tel:+16465430199"
                    className="font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-300 ease-gentle hover:decoration-accent"
                  >
                    +1 (646) 543-0199
                  </a>
                </p>
                <p className={`mt-2 ${caption}`}>
                  11215 72nd Rd, Forest Hills, NY
                </p>
              </div>
            </div>
          </Reveal>

          {/* ---- FAQ card ── enhanced with badge + hover + accent line ── */}
          <Reveal delay={100}>
            <div
              className={`group relative mt-8 overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift ${cardFlat}`}
              role="complementary"
              aria-label="Frequently asked questions"
            >
              {/* Accent top-line */}
              <div
                className="absolute -top-px left-8 right-8 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <div className="p-8">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-ink">
                    Common questions
                  </h3>
                  {/* Badge pill */}
                  <span className="shrink-0 rounded-full border border-line bg-canvas/80 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-body">
                    FAQ
                  </span>
                </div>
                <dl className="mt-4 space-y-4">
                  {faqs.map((item, i) => (
                    <FAQItem key={i} q={item.q} a={item.a} index={i} />
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
