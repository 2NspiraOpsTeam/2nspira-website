"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // For now, simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStatus("success");
    setFormState({ name: "", email: "", organization: "", message: "" });

    // Clear success after 5 seconds
    setTimeout(() => setStatus("idle"), 5000);
  };

  const faqs = [
    { q: "How soon do you respond to inquiries?", a: "We typically respond within one business day." },
    { q: "Do you offer free consultations?", a: "Yes, we offer complimentary discovery calls to understand your needs." },
    { q: "What regions do you serve?", a: "We work with organizations globally, with a focus on mission-driven institutions." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-zinc-50 dark:bg-black" id="contact-page">
        {/* Hero */}
        <section className="bg-white py-24 dark:bg-black" aria-labelledby="contact-hero-heading">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h1 id="contact-hero-heading" className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Get in touch
            </h1>
            <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-300">
              Questions about our services? Ready to get started? Let’s talk.
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 sm:py-24" aria-labelledby="form-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50" aria-labelledby="form-heading" noValidate>
              <h2 id="form-heading" className="text-2xl font-bold text-zinc-900 dark:text-white">Send us a message</h2>

              {/* Name */}
              <div className="mt-6">
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Your name <span className="text-red-500" aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  value={formState.name}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={false}
                  className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-white sm:text-sm"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div className="mt-6">
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Email address <span className="text-red-500" aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={formState.email}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={false}
                  className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-white sm:text-sm"
                  placeholder="john@example.com"
                />
              </div>

              {/* Organization */}
              <div className="mt-6">
                <label htmlFor="organization" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Organization (optional)
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  autoComplete="organization"
                  value={formState.organization}
                  onChange={handleChange}
                  aria-required="false"
                  className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-white sm:text-sm"
                  placeholder="Your organization name"
                />
              </div>

              {/* Message */}
              <div className="mt-6">
                <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  How can we help? <span className="text-red-500" aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={false}
                  className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-white sm:text-sm"
                  placeholder="Tell us about your needs..."
                />
              </div>

              {/* Submit */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  aria-busy={status === "submitting"}
                  className={`inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-medium transition-colors ${
                    status === "success"
                      ? "bg-green-500 text-white"
                      : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 disabled:opacity-70"
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
                >
                  {status === "submitting" ? "Sending..." : status === "success" ? "Message sent!" : "Send message"}
                </button>
              </div>

              {/* Success state */}
              {status === "success" && (
                <p className="mt-4 text-sm text-green-600 dark:text-green-400" role="status">
                  Thanks! We’ll get back to you shortly.
                </p>
              )}

              {/* Live region for form status announcements */}
              <span className="sr-only" aria-live="polite">
                {status === "submitting" ? "Your message is being sent." : ""}
                {status === "success" ? "Your message was sent successfully." : ""}
              </span>
            </form>

            {/* Alternative contact methods */}
            <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950/50" role="complementary" aria-label="Alternative contact methods">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Prefer to email directly?</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Reach us at:{" "}
                <a href="mailto:info@2nspira.com" className="underline hover:text-zinc-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                  info@2nspira.com
                </a>
              </p>
            </div>

            {/* FAQ */}
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

      <Footer />
    </div>
  );
}
