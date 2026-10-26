import CatalogEffects from "@/components/catalog/CatalogEffects";
import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import {
  card,
} from "@/components/ui";

export const metadata: Metadata = publicPageMetadata({
  "title": "Our Work — Projects & Operational Showcases",
  "description": "Explore published websites and operational showcases. See the challenge, approach, demonstrated scope, and status without unsupported performance claims.",
  "path": "/work"
});

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
  "Structured records and ownership",
  "Workflow automation",
  "Reporting workspace",
];



const waterbearChallenge =
  "Property information, resident access, and operational records spread across disconnected processes.";



const waterbearCapabilities = [
  "Portfolio content and property media",
  "Scoped administration",
  "Resident portal access",
  "Contacts and rent-roll records",
  "Maintenance records",
  "Operational visibility",
];



const supportingProjects = [
  {
    name: "2Nspira Books",
    description:
      "A collector-focused bookstore bringing together collectible editions, original books, coloring books, and printable activities.",
    url: "https://books.2nspira.com",
    image: "/images/work/project-books.png",
  },
  {
    name: "2Nspira",
    description:
      "Technology leadership, AI readiness, insights, and practical assessment tools in one clear digital home.",
    url: "https://2nspira.com",
    image: "/images/work/project-2nspira.png",
  },
  {
    name: "GeVitals",
    description:
      "A bilingual clinic website combining migrated content, video, publishing, and local discovery.",
    url: "https://gevitals.com",
    image: "/images/work/project-gevitals.png",
  },
  {
    name: "Open Goal Soccer",
    description:
      "An accessible digital archive preserving an inclusive youth soccer program's mission and community story.",
    url: "https://opengoalsoccer.com",
    image: "/images/work/project-soccer.png",
  },
  {
    name: "CalmLoop",
    description:
      "A low‑pressure companion offering gentle routine ideas for neurodivergent children and their families.",
    url: "https://calmloop.vercel.app",
    image: "/images/work/project-calmloop.png",
  },
  {
    name: "Breadcrumb",
    description:
      "A fast OSINT challenge game engineered to run anywhere without a server or database.",
    url: "https://breadcrumb-challenge.vercel.app",
    image: "/images/work/project-breadcrumb.png",
  },
];

export default function WorkPage() {
  return (
    <main id="main-content" className="min-h-screen bg-surface"><CatalogEffects headings>
      {/* --- Hero Section --- */}
      <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/images/work/hero-new.png"
            alt="Illustrative connected operations workspace"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        </div >

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <Reveal>
              <span className="mb-6 text-accent">Case Studies & Evidence</span>
              <h1 className="mb-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Our Work: Practical Problems, Connected Solutions
              </h1>
              <p className="text-xl leading-relaxed text-white/80">
                Explore published digital projects alongside operational workflow showcases. Each describes the problem and approach; showcase features are not a claim of completed client deployment or measured business results.
              </p>
            </Reveal>
          </div >
        </div >
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24">
        {/* --- Featured: Manufacturing Operations Command Center --- */}
        <section className="mb-32">
          <Reveal>
            <div className="mb-12 flex flex-col gap-4">
              <span>Operational Showcase</span>
              <h2 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                Manufacturing Operations Command Center
              </h2>
            </div >
          </Reveal>
          
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-sm font-semibold text-accent">Status: Concept showcase</p>
              <p className="text-xl text-body"><strong>Challenge: </strong>{manufacturingChallenge}</p>
              <p className="text-lg text-body/80"><strong>Approach: </strong>{manufacturingOperationalShift}</p>
              <p className="leading-7 text-body">This visual concept explores a shared manufacturing workspace. The capabilities below describe the proposed scope, not a verified production deployment or client outcome.</p>
              <div className="rounded-2xl border border-line bg-canvas/50 p-6 backdrop-blur-sm">
                <h3 className="mb-4 font-semibold text-ink">Showcase Scope</h3>
                <ul className="space-y-3 text-sm text-body">
                  {manufacturingCapabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-3">
                      <span className="mt-1 text-accent">•</span>
                      <span>{cap}</span>
                    </li >
                  ))}
                </ul >
              </div >
            </div >
            <div className="flex items-center justify-center">
              <Image
                src="/images/work/manufacturing-command-center.png"
                alt="Manufacturing Operations Command Center"
                width={1600}
                height={900}
                className="w-full h-auto rounded-2xl border border-line shadow-sm"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div >
          </div >
          
          <Reveal className="mt-8">
            <p className="text-sm text-body italic">
              The concept shows how production, materials, quality, and equipment information could share a common workspace. No quantified improvement or production adoption is claimed.
            </p>
          </Reveal>
        </section>

        {/* --- Featured: Water Bear Mecca --- */}
        <section className="mb-32">
          <Reveal>
            <div className="mb-12 flex flex-col gap-4">
              <span>Operational Showcase</span>
              <h2 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                Water Bear Mecca
              </h2>
            </div >
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1 flex items-center justify-center">
              <Image
                src="/images/work/water-bear-mecca.png"
                alt="Water Bear Mecca"
                width={1600}
                height={900}
                className="w-full h-auto rounded-2xl border border-line shadow-sm"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div >
            <div className="order-1 space-y-6 lg:order-2">
              <p className="text-sm font-semibold text-accent">Status: Implemented in an isolated development environment</p>
              <p className="text-xl text-body"><strong>Challenge: </strong>{waterbearChallenge}</p>
              <p className="text-lg text-body/80"><strong>Approach: </strong>Connect portfolio content, scoped administration, resident access, and operational records in a phased property-operations platform.</p>
              <p className="leading-7 text-body">The capabilities below have been implemented and tested in an isolated development environment. Production rollout and remaining acceptance checks are separate; this is not a claim of completed production adoption.</p>
              <div className="rounded-2xl border border-line bg-canvas/50 p-6 backdrop-blur-sm">
                <h3 className="mb-4 font-semibold text-ink">Showcase Scope</h3>
                <ul className="space-y-3 text-sm text-body">
                  {waterbearCapabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-3">
                      <span className="mt-1 text-accent">•</span>
                      <span>{cap}</span>
                    </li >
                  ))}
                </ul >
              </div >
            </div >
          </div >

          <Reveal className="mt-8">
            <p className="text-sm text-body italic">
              The development platform brings property information and operational records into a shared workflow with scoped access. It creates a foundation for clearer ownership and fewer disconnected handoffs; no measured efficiency improvement is claimed.
            </p>
          </Reveal>
        </section>

        {/* --- Supporting projects grid --- */}
        <section className="mb-32">
          <Reveal>
            <div className="mb-12">
              <h2 className="mb-4 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                Supporting work
              </h2>
              <p className="text-lg text-body max-w-2xl">
                The following projects demonstrate the range of digital platforms
                2Nspira has built — from mission‑driven archives to bilingual
                experiences and interactive tools.
              </p>
            </div >
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supportingProjects.map((project, idx) => (
              <Reveal key={project.name} delay={idx * 0.1}>
                <article
                  className={`group p-0 ${card} rounded-xl border border-line transition-all duration-300 motion-safe:hover:-translate-y-1 hover:shadow-lg hover:border-accent overflow-hidden`}
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-canvas/50">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                    />
                  </div >
                  <div className="p-5">
                    <h3 className="text-sm font-semibold tracking-tight text-ink">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-xs text-body leading-relaxed">
                      {project.description}
                    </p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center text-xs font-medium text-accent underline underline-offset-4 hover:text-accent/80 transition-colors"
                    >
                      <span className="sr-only">{project.name}: </span>Visit Project →
                    </a>
                  </div >
                </article>
              </Reveal>
            ))}
          </div >
        </section>

        {/* --- CTA Band --- */}
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-accent px-8 py-16 text-center sm:px-16">
            <div className="relative z-10">
              <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl">
                Ready to modernize your operations?
              </h2>
              <p className="mb-8 text-white">
                Let&apos;s discuss how we can build the systems your organization needs to scale.
              </p>
              <Link href="/contact" className="inline-block rounded-full bg-ink px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-ink/90">
                Let&apos;s Discuss Your Challenge
              </Link>
            </div >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
          </div >
        </Reveal>
      </div >
    </CatalogEffects></main>
  );
}