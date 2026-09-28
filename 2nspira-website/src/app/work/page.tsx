import type { Metadata } from "next";
import Link from "next/link";
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <section className="mb-16">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-ink">
            Our Work: Operating‑System Case Studies
          </h2>
          <p className="text-body/60 max-w-2xl">
            2Nspira builds operating systems for organizations — not just websites.
            The case studies below demonstrate how we connect systems, simplify
            workflows, and create capabilities that organizations can operate and
            scale.
          </p>
        </section>

        {/* --- Featured: Manufacturing Operations Command Center --- */}
        <section className="mb-16">
          <h3 className="mb-4 text-2xl font-medium tracking-tight text-ink">
            Manufacturing Operations Command Center
          </h3>
          <p className="mb-4">{manufacturingChallenge}</p>
          <p className="mb-6">{manufacturingOperationalShift}</p>
          <ul className="space-y-2 text-sm text-body">
            {manufacturingCapabilities.map((cap) => (
              <li key={cap} className="flex items-center gap-2">
                <span className="text-accent">•</span>{cap}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-body/60">{manufacturingWhatThisDemonstrates}</p>
        </section>

        {/* --- Featured: Water Bear Mecca --- */}
        <section className="mb-16">
          <h3 className="mb-4 text-2xl font-medium tracking-tight text-ink">
            Water Bear Mecca
          </h3>
          <p className="mb-4">{waterbearChallenge}</p>
          <p className="mb-6">{waterbearOperationalShift}</p>
          <ul className="space-y-2 text-sm text-body">
            {waterbearCapabilities.map((cap) => (
              <li key={cap} className="flex items-center gap-2">
                <span className="text-accent">•</span>{cap}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-body/60">{waterbearWhatThisDemonstrates}</p>
        </section>

        {/* --- Supporting projects grid --- */}
        <section className="mb-16">
          <h3 className="mb-4 text-2xl font-medium tracking-tight text-ink">
            Supporting work
          </h3>
          <p className="text-body/60 mb-6 max-w-2xl">
            The following projects demonstrate the range of digital platforms
            2Nspira has built — from mission‑driven archives to bilingual
            experiences and interactive tools.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {supportingProjects.map((project) => (
              <article
                key={project.name}
                className={`group p-4 ${card} rounded-xl border border-line transition-all duration-300 hover:shadow-md hover:border-accent`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md mb-4">
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
                <h4 className="mt-2 text-sm font-medium tracking-tight text-ink">
                  {project.name}
                </h4>
                <p className="mt-1 text-xs text-body/60">
                  {project.description}
                </p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-3 text-accent underline underline-offset-2 hover:text-accent/90 transition-colors`}
                >
                  Visit →
                </a>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
