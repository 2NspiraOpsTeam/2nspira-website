"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    organization: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // For now, simulate submission
    // Replace with actual form handler when backend is ready
    await new Promise(resolve => setTimeout(resolve, 1000));

    setStatus("success");
    setFormState({ name: "", email: "", organization: "", message: "" });

    // Clear success after 5 seconds
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Hero */}
      <section className="bg-white py-24 dark:bg-black">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-300">
            Questions about our services? Ready to get started? Let’s talk.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Send us a message</h2>

            {/* Name */}
            <div className="mt-6">
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formState.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-white sm:text-sm"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div className="mt-6">
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formState.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-white sm:text-sm"
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
                value={formState.organization}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-white sm:text-sm"
                placeholder="Your organization name"
              />
            </div>

            {/* Message */}
            <div className="mt-6">
              <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                How can we help?
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formState.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-white sm:text-sm"
                placeholder="Tell us about your needs..."
              />
            </div>

            {/* Submit */}
            <div className="mt-6 flex items-center justify-between">
              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className={`inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-medium transition-colors ${
                  status === "success"
                    ? "bg-green-500 text-white"
                    : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 disabled:opacity-70"
                }`}
              >
                {status === "submitting" ? "Sending..." : status === "success" ? "Message sent!" : "Send message"}
              </button>
            </div>

            {/* Success/Error states */}
            {status === "success" && (
              <p className="mt-4 text-sm text-green-600 dark:text-green-400">
                Thanks! We’ll get back to you shortly.
              </p>
            )}
          </form>

          {/* Alternative contact methods */}
          <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950/50">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Prefer to email directly?</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Reach us at: info@2nspira.com
            </p>
          </div>

          {/* FAQ */}
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950/50">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Common questions</h3>
            <ul className="mt-4 space-y-4">
              {[
                {
                  q: "How soon do you respond to inquiries?",
                  a: "We typically respond within one business day."
                },
                {
                  q: "Do you offer free consultations?",
                  a: "Yes, we offer complimentary discovery calls to understand your needs."
                },
                {
                  q: "What regions do you serve?",
                  a: "We work with organizations globally, with a focus on mission-driven institutions."
                }
              ].map((item, i) => (
                <li key={i}>
                  <p className="font-medium text-zinc-900 dark:text-white">{item.q}</p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{item.a}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
