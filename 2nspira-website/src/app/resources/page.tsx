import type { Metadata } from "next";
import Link from "next/link";
import AiReadinessCard from "@/components/Resources/AiReadinessCard";
import StrengthProfileCard from "@/components/Resources/StrengthProfileCard";
import {
  card,
  eyebrow,
  h2,
  lead,
  linkInline,
  pageMain,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Resources | Assessments and Practical Tools",
  description:
    "Explore free 2Nspira strengths assessments and AI readiness scorecards for clearer decisions and practical next steps.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <main className={pageMain} id="main-content">
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
          <p className={eyebrow}>2Nspira Resources</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Practical tools. Clearer next steps.
          </h1>
          <p className={`mt-6 max-w-3xl ${lead}`}>
            Explore free assessments built to help professionals, teams, and
            organizations understand their strengths, evaluate readiness, and
            move forward with confidence.
          </p>
        </div>
      </section>

      <section
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
        aria-label="Featured assessments"
      >
        <div className="grid gap-8 md:grid-cols-2">
          <StrengthProfileCard />
          <AiReadinessCard />
        </div>

        <div className={`mt-12 p-6 sm:p-8 ${card}`}>
          <h2 className={h2}>Designed for practical use</h2>
          <p className="mt-4 leading-8 text-body">
            Use these tools to support career reflection, coaching
            conversations, team development, and responsible AI planning. Each
            assessment gives you a starting point for a better conversation.
          </p>
          <Link href="/contact" className={`mt-6 ${linkInline}`}>
            Talk through your next steps with 2Nspira →
          </Link>
        </div>
      </section>
    </main>
  );
}
