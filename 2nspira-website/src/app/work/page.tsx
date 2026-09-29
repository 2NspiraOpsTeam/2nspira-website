import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import {
  buttonPrimary,
  card,
  h2,
  h3,
  lead,
  eyebrow,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Work — Operating-System Case Studies",
  description:
    "Case studies and evidence of 2Nspira's operating-system work for organizations.",
  alternates: {
    canonical: "/work",
  },
};

const manufacturingChallenge =
  "Reducing reliance on disconnected spreadsheets, paper logs, and manual handoffs in production control.";

const manufacturingOperationalShift =
  "Connected operations workspace giving manufacturing teams visibility across production, materials, quality, equipment, and accountability.";

const manufacturingCapabilities = [
  "Production control: schedules, priorities, work queues, blockers, throughput",
  "Materials & inventory: stock levels, shortages, purchasing, job readiness",
  "Quality & traceability: inspections, issues, evidence, ownership, job history",
  "Equipment & maintenance: downtime, service history, preventive maintenance, asset readiness",
  "Role‑based dashboards",
  "Audit‑ready records",
  "Workflow automation",
  "Real‑time reporting",
];

const manufacturingWhatThisDemonstrates =
  "A connected operations workspace that gives manufacturing teams visibility across production, materials, quality, equipment, and accountability — without relying on disconnected spreadsheets, paper logs, and manual handoffs.";

const waterbearChallenge =
  "Property operations modernization: from listing to signed lease.";

const waterbearOperationalShift =
  "AI‑assisted publishing (manual listings → AI‑assisted publishing), structured digital workflow (manual applicant review → structured digital workflow), digital lease generation and e‑signatures (paper lease agreements → digital lease generation and e‑signature), automated delivery (physical copies/manual distribution → automatic emailed signed copies).";

const waterbearCapabilities = [
  "AI‑assisted publishing",
  "Applicant review",
  "Digital leasing",
  "E‑signatures",
  "Automated delivery",
  "Operational visibility",
];

const waterbearWhatThisDemonstrates =
  "Property operations modernization: from listing to signed lease, using AI‑assisted publishing, structured applicant review, digital lease generation, e‑signatures, and automated delivery — with fewer handoffs, clearer status, and standardized records.";

const supportingProjects = [
  {
    name: "2Nspira",
    description:
      "Technology leadership, AI readiness, insights, and practical assessment tools in one clear digital home.",
    url: "https://2nspira.com",
  },
  {
    name: "GeVitals",
    description:
      "A bilingual clinic website combining migrated content, video, publishing, and local discovery.",
    url: "https://gevitals.com",
  },
  {
    name: "Open Goal Soccer",
    description:
      "An accessible digital archive preserving an inclusive youth soccer program's mission and community story.",
    url: "https://opengoalsoccer.com",
  },
  {
    name: "CalmLoop",
    description:
      "A low‑pressure companion offering gentle routine ideas for neurodivergent children and their families.",
    url: "https://calmloop.vercel.app",
  },
  {
    name: "Breadcrumb",
    description:
      "A fast OSINT challenge game engineered to run anywhere without a server or database.",
    url: "https://breadcrumb-challenge.vercel.app",
  },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-surface">
      {/* --- Hero Section --- */}
      <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/images/work/hero-modern.png"
            alt="People collaborating on industrial digital systems"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <Reveal>
              <eyebrow className="mb-6 text-accent">Case Studies & Evidence</eyebrow>
              <h2 className="mb-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Our Work: Operating‑System Case Studies
              </h2>
              <p className="text-xl leading-relaxed text-white/80">
                2Nspira builds operating systems for organizations — not just websites.
                The case studies below demonstrate how we connect systems, simplify
                workflows, and create capabilities that organizations can operate and
                scale.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24">
        {/* --- Featured: Manufacturing Operations Command Center --- */}
        <section className="mb-32">
          <Reveal>
            <div className="mb-12 flex flex-col gap-4">
              <eyebrow>Featured Case Study</eyebrow>
              <h3 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                Manufacturing Operations Command Center
              </h3>
            </div>
          </Reveal>
          
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-xl text-body">{manufacturingChallenge}</p>
              <p className="text-lg text-body/80">{manufacturingOperationalShift}</p>
              <div className="rounded-2xl border border-line bg-canvas/50 p-6 backdrop-blur-sm">
                <h4 className="mb-4 font-semibold text-ink">Core Capabilities</h4>
                <ul className="space-y-3 text-sm text-body">
                  {manufacturingCapabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-3">
                      <span className="mt-1 text-accent">•</span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="aspect-video w-full rounded-2xl border border-line bg-canvas shadow-sm sm:aspect-auto sm:h-full" />
            </div>
          </div>
          
          <Reveal className="mt-8">
            <p className="text-sm text-body/60 italic">
              {manufacturingWhatThisDemonstrates}
            </p>
          </Reveal>
        </section>

        {/* --- Featured: Water Bear Mecca --- */}
        <section className="mb-32">
          <Reveal>
            <div className="mb-12 flex flex-col gap-4">
              <eyebrow>Featured Case Study</eyebrow>
              <h3 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                Water Bear Mecca
              </h3>
            </div>
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1 flex items-center justify-center">
              <div className="aspect-video w-full rounded-2xl border border-line bg-canvas shadow-sm sm:aspect-auto sm:h-full" />
            </div>
            <div className="order-1 space-y-6 lg:order-2">
              <p className="text-xl text-body">{waterbearChallenge}</p>
              <p className="text-lg text-body/80">{waterbearOperationalShift}</p>
              <div className="rounded-2xl border border-line bg-canvas/50 p-6 backdrop-blur-sm">
                <h4 className="mb-4 font-semibold text-ink">Core Capabilities</h4>
                <ul className="space-y-3 text-sm text-body">
                  {waterbearCapabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-3">
                      <span className="mt-1 text-accent">•</span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Reveal className="mt-8">
            <p className="text-sm text-body/60 italic">
              {waterbearWhatThisDemonstrates}
            </p>
          </Reveal>
        </section>

        {/* --- Supporting projects grid --- */}
        <section className="mb-32">
          <Reveal>
            <div className="mb-12">
              <h3 className="mb-4 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                Supporting work
              </h3>
              <p className="text-lg text-body/60 max-w-2xl">
                The following projects demonstrate the range of digital platforms
                2Nspira has built — from mission‑driven archives to bilingual
                experiences and interactive tools.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {supportingProjects.map((project, idx) => (
              <Reveal key={project.name} delay={idx * 0.1}>
                <article
                  className={`group p-5 ${card} rounded-xl border border-line transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md mb-4 bg-accent-soft text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2l-2-2-2 2"
                      />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold tracking-tight text-ink">
                    {project.name}
                  </h4>
                  <p className="mt-2 text-xs text-body/60 leading-relaxed">
                    {project.description}
                  </p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-xs font-medium text-accent underline underline-offset-4 hover:text-accent/80 transition-colors"
                  >
                    Visit Project →
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* --- CTA Band --- */}
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-accent px-8 py-16 text-center sm:px-16">
            <div className="relative z-10">
              <h3 className="mb-4 text-2xl font-semibold text-white sm:text-3xl">
                Ready to modernize your operations?
              </h3>
              <p className="mb-8 text-white/80">
                Let's discuss how we can build the systems your organization needs to scale.
              </p>
              <Link href="/contact" className="inline-block rounded-full bg-ink px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-ink/90">
                Get in touch
              </Link>
            </div>
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
          </div>
        </Reveal>
      </div>
    </main>
  );
}

