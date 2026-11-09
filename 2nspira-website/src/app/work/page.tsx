import CatalogEffects from "@/components/catalog/CatalogEffects";
import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import styles from "./work.module.css";
import {
  buttonPrimary,
  card,
} from "@/components/ui";

export const metadata: Metadata = publicPageMetadata({
  title: "Technology Consulting Projects & Engineering Portfolio",
  shareTitle: "See practical responses to real business challenges.",
  description: "See how 2Nspira approaches disconnected workflows and customer-facing websites. Explore published projects and operational showcases with clear scope and status.",
  path: "/work"
});

const teamsChallenge =
  "Help prospective residents and businesses discover the right property and reach the right team.";



const teamsCapabilities = [
  "Residential and retail property discovery",
  "Property galleries and media management",
  "Maps, locations, and directions",
  "Rental inquiries and contact journeys",
  "Tenant service entry points",
  "Authorized content and property administration",
];



const supportingProjects = [
  {
    name: "2Nspira Books",
    description:
      "An in-house storefront preview for collectible books. Checkout and operational features remain development scope, not a claim of live payment readiness.",
    url: "https://2nspira-books-preview.jcortez-36a.workers.dev/",
    image: "/images/work/live-books-20261105.jpg",
  },
  {
    name: "2Nspira",
    description:
      "Technology leadership, AI readiness, insights, and practical assessment tools in one clear digital home.",
    url: "https://2nspira.com",
    image: "/images/work/live-2nspira-20261105.jpg",
  },
  {
    name: "GeVitals",
    description:
      "A bilingual clinic website combining migrated content, video, publishing, and local discovery.",
    url: "https://gevitals.com",
    image: "/images/work/live-gevitals-20261105.jpg",
  },
  {
    name: "Open Goal Soccer",
    description:
      "An accessible digital archive preserving an inclusive youth soccer program's mission and community story.",
    url: "https://opengoalsoccer.com",
    image: "/images/work/live-soccer-20261105.jpg",
  },
  {
    name: "CalmLoop",
    description:
      "A low‑pressure companion offering gentle routine ideas for neurodivergent children and their families.",
    url: "https://calmloop.2nspira.com",
    image: "/images/work/live-calmloop-20261105.jpg",
  },
  {
    name: "Breadcrumb",
    description:
      "A fast OSINT challenge game engineered to run anywhere without a server or database.",
    url: "",
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
            src="/images/advisory/focused-collaboration.webp"
            alt="Professionals reviewing a digital project together"
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
              <h1 className="mb-6  font-medium tracking-tight text-white  text-[length:var(--type-display)] leading-[1.08] tracking-[-0.04em]">
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
        <nav aria-label="Explore evidence by type" className="mb-12 flex flex-wrap gap-3">
          {[['#teams-management', 'Client projects'], ['#internal-engineering', '2Nspira engineering'], ['#concepts-prototypes', 'Platform engineering']].map(([href, label]) => <a key={href} href={href} className="inline-flex min-h-11 items-center rounded-full border border-line px-5 py-3 font-medium text-accent focus-visible:outline-2 focus-visible:outline-accent">{label}</a>)}
        </nav>
        {/* --- Featured: Teams Management --- */}
        <section id="teams-management" className="mb-32 scroll-mt-24" aria-labelledby="teams-management-heading">
          <Reveal>
            <div className="mb-12 flex flex-col gap-4">
              <span>Client projects · Published website</span>
              <h2 id="teams-management-heading" className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                Teams Management
              </h2>
            </div >
          </Reveal>

          <div className="grid gap-10">
            <div>
              <Image
                src="/images/work/live-teams-20261105.jpg"
                alt="Teams Management public website with property discovery and tenant services"
                width={1440}
                height={900}
                className="w-full h-auto rounded-2xl border border-line shadow-sm"
                sizes="(min-width: 1152px) 1104px, calc(100vw - 32px)"
              />
            </div >
            <div className={styles.showcaseDetails}>
              <p className="text-sm font-semibold text-accent">Status: Published website</p>
              <a href="https://www.teamsmanagement.com/" target="_blank" rel="noopener noreferrer" className={`${buttonPrimary} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent`}>Visit Teams Management <span className="sr-only">(opens in a new tab)</span><span aria-hidden="true">↗</span></a>
              <p className="text-xl text-body"><strong>Challenge: </strong>{teamsChallenge}</p>
              <p className="text-lg text-body/80"><strong>Approach: </strong>Bring property pages, photography, maps, inquiries, and tenant service entry points into one clear website.</p>
              <p className="leading-7 text-body">A public-facing property experience for Teams Management, supported by structured content and authorized staff tools.</p>
              <div className="rounded-2xl border border-line bg-canvas/50 p-6 backdrop-blur-sm">
                <h3 className="mb-4 font-semibold text-ink">Website Highlights</h3>
                <ul className="space-y-3 text-sm text-body">
                  {teamsCapabilities.map((cap) => (
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
              Explore the published public website. Tenant and Admin workflows require authorized access and are not public demos.
            </p>
          </Reveal>
        </section>

        {/* --- Supporting projects grid --- */}
        <section id="digital-projects" className="mb-24 scroll-mt-24">
          <Reveal>
            <div className="mb-12">
              <h2 className="mb-4 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                More published digital work
              </h2>
              <p className="text-lg text-body max-w-2xl">
                Explore a bilingual clinic website and a community archive. These published experiences demonstrate delivery scope; no measured client outcome is implied.
              </p>
            </div >
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {supportingProjects.filter(project => ["GeVitals", "Open Goal Soccer"].includes(project.name)).map((project, idx) => (
              <Reveal key={project.name} delay={idx * 0.1}>
                <article
                  className={`group p-0 ${card} rounded-xl border border-line transition-all duration-300 motion-safe:hover:-translate-y-1 hover:shadow-lg hover:border-accent overflow-hidden`}
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-canvas/50">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(min-width: 768px) 540px, calc(100vw - 32px)"
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

        <section id="internal-engineering" className="mb-24 scroll-mt-24" aria-labelledby="engineering-heading">
          <h2 id="engineering-heading" className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">2Nspira engineering</h2>
          <p className="mt-4 max-w-3xl leading-8 text-body">Our own platforms and engineering experiments make our approach inspectable. They are internal work, not independent client endorsements or evidence of client return on investment.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article data-catalog-card className={`${styles.engineeringCard} ${styles.featured} overflow-hidden rounded-2xl border border-line bg-canvas`}>
              <div className={styles.featuredImage}>
                <Image src="/images/advisory/focused-collaboration.webp" alt="Professionals reviewing work together at a laptop" fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <p className="text-sm font-semibold text-accent">Field notes · Internal AI experiment</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Multi-agent AI workflow</h3>
                <p className="mt-4 leading-7 text-body">Jeffrey’s field notes examine coordination, local and cloud models, and the importance of human oversight in an internal AI environment.</p>
                <Link href="/post/building-ai-team-multi-agent-workflow-lessons" className={styles.projectLink}>Explore the engineering lessons <span aria-hidden="true">→</span></Link>
              </div>
            </article>
            {supportingProjects.filter(project => ["2Nspira", "2Nspira Books", "Breadcrumb", "CalmLoop"].includes(project.name)).map(project => {
              const visuals: Record<string, { image: string; alt: string; label: string }> = {
                "2Nspira Books": { image: "/images/work/live-books-20261105.jpg", alt: "2Nspira Books storefront preview featuring collectible editions", label: "Storefront preview" },
                "2Nspira": { image: "/images/work/live-2nspira-20261105.jpg", alt: "2Nspira public website homepage", label: "Our digital platform" },
                "Breadcrumb": { image: "/images/work/project-breadcrumb.png", alt: "Breadcrumb project artwork featuring an investigation workspace", label: "OSINT challenge game" },
                "CalmLoop": { image: "/images/work/live-calmloop-20261105.jpg", alt: "CalmLoop companion application start screen", label: "Family-focused companion" },
              };
              const visual = visuals[project.name];
              return <article key={project.name} data-catalog-card className={`${styles.engineeringCard} flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-canvas`}>
                <div className="relative aspect-video overflow-hidden bg-surface">
                  <Image src={visual.image} alt={visual.alt} fill sizes="(min-width: 1152px) 548px, (min-width: 768px) 48vw, calc(100vw - 32px)" className="object-contain" />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="text-sm font-semibold text-accent">{visual.label} · Internal project</p>
                  <h3 className="mt-3 text-xl font-semibold text-ink">{project.name}</h3>
                  <p className="mt-3 flex-1 leading-7 text-body">{project.description}</p>
                  {project.url ? <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>Explore {project.name}<span className="sr-only"> (opens in a new tab)</span><span aria-hidden="true">↗</span></a> : <p className="mt-4 text-sm text-muted">Demo currently offline.</p>}
                </div>
              </article>;
            })}
          </div>
          <p className="mt-6 text-sm leading-7 text-body">Relevant to <Link href="/ai-enablement" className="text-accent underline">AI enablement</Link>, <Link href="/websites" className="text-accent underline">digital platforms</Link>, and <Link href="/fractional-cio" className="text-accent underline">technology leadership</Link>. Scope and applicability differ by engagement.</p>
        </section>
        <section id="concepts-prototypes" className="mb-24 scroll-mt-24" aria-labelledby="concepts-heading">
          <p className="text-sm font-semibold text-accent">2Nspira platform engineering · Internal project</p>
          <h2 id="concepts-heading" className="mt-4 text-3xl font-medium tracking-tight text-ink sm:text-4xl">Connected manufacturing operations</h2>
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-2">
            <Image src="/images/work/northstar-manufacturing-demo.webp" alt="2Nspira’s fictional manufacturing platform showing linked operational dashboards" width={1600} height={1000} className="h-auto w-full rounded-2xl border border-line" sizes="(min-width: 1024px) 540px, calc(100vw - 32px)" />
            <div><p className="leading-8 text-body">An internal engineering build connecting order intake, production stages, material movements, quality gates, and fulfillment through one transactional workflow.</p><p className="mt-4 text-sm leading-7 text-muted">Built with fictional data to demonstrate implementation choices—not a client deployment or a claim of measured business outcomes. Interactive workflows and their limitations now live in Demos.</p><Link href="/demos/manufacturing" className={`mt-6 ${buttonPrimary}`}>View the demo overview →</Link></div>
          </div>
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
