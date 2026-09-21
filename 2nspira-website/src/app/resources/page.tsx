import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AiReadinessCard from "@/components/Resources/AiReadinessCard";
import StrengthProfileCard from "@/components/Resources/StrengthProfileCard";
import Reveal from "@/components/Reveal";
import { AccentRule, AmbientField, EyebrowPill } from "@/components/VisualAccents";
import {
  card,
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
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <AmbientField />
        <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
          <p><EyebrowPill>2Nspira Resources</EyebrowPill></p>
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

      <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6">
      <figure className="group relative overflow-hidden rounded-[2rem] border border-line shadow-[0_20px_60px_rgba(35,41,54,0.10)]">
        <Image
          src="/images/pages/resources-decision-support.webp"
          alt="Conceptual minimalist illustration of a checklist card and compass symbolizing clear decision support."
          width={1344}
          height={768}
          className="h-auto w-full transition-transform duration-700 ease-gentle group-hover:scale-[1.015]"
        />
      </figure>
      </div>

      <section
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
        aria-label="Featured assessments"
      >
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal><StrengthProfileCard /></Reveal>
          <Reveal delay={100}><AiReadinessCard /></Reveal>
        </div>

        <Reveal className="mt-12"><div className={`group relative overflow-hidden p-6 sm:p-8 ${card}`}>
          <AccentRule className="mb-6" />
          <h2 className={h2}>Designed for practical use</h2>
          <p className="mt-4 leading-8 text-body">
            Use these tools to support career reflection, coaching
            conversations, team development, and responsible AI planning. Each
            assessment gives you a starting point for a better conversation.
          </p>
          <Link href="/contact" className={`mt-6 ${linkInline}`}>
            Talk through your next steps with 2Nspira →
          </Link>
        </div></Reveal>
      </section>
    </main>
  );
}
