import type { Metadata } from "next";
import Link from "next/link";
import BlogLibrary from "@/components/BlogLibrary";
import { lead, linkInline, pageMain } from "@/components/ui";

export const metadata: Metadata = {
  title: "Trust Is the Operating System",
  description:
    "Selected essays on trust, judgment, and organizational resilience by Jeffrey Cortez.",
  alternates: { canonical: "/blog/categories/trust-is-the-operating-system" },
};

export default function Page() {
  return (
    <main className={pageMain} id="main-content">
      <header className="mx-auto max-w-4xl px-4 pt-16 sm:px-6">
        <Link href="/insights" className={linkInline}>
          ← All insights
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink">
          Trust Is the Operating System
        </h1>
        <p className={lead}>
          Selected essays on the invisible infrastructure of leadership.
        </p>
      </header>
      <BlogLibrary category="trust-is-the-operating-system" />
    </main>
  );
}
