import ServiceEffects from "@/components/ServiceEffects";
import ClientServiceGrid from "@/components/ClientServiceGrid";
import BusinessProblems from "@/components/BusinessProblems";
import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { AccentRule, AmbientField, EyebrowPill } from "@/components/VisualAccents";
import Link from "next/link";
import {
  buttonPrimary,
  buttonSecondary,
  cardFlat,
  caption,
  h2,
  lead,
  pageMain,
  section,
  sectionBand,
} from "@/components/ui";

const homepageDescription =
  "Make your business work better with 2Nspira. Reduce manual work, improve operations, serve customers better, and support growth through practical technology.";
const homepageShareTitle =
  "Your business, working better. Technology with purpose.";
const homepageSocialImage = "https://2nspira.com/images/logo/og-image-v2.png";

export const metadata: Metadata = {
  title: { absolute: "Business Transformation for Practical Results | 2Nspira" },
  description: homepageDescription,
  alternates: { canonical: "https://2nspira.com/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://2nspira.com/",
    siteName: "2Nspira",
    title: homepageShareTitle,
    description: homepageDescription,
    images: [
      {
        url: homepageSocialImage,
        width: 1200,
        height: 630,
        alt: "2Nspira",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homepageShareTitle,
    description: homepageDescription,
    images: [homepageSocialImage],
  },
};

export default function Home() {
  const values = [
    { title: "Understand", text: "Learn your business, workflows, constraints, and goals before recommending technology." },
    { title: "Simplify", text: "Find unnecessary complexity, repeated work, and practical opportunities to improve." },
    { title: "Implement", text: "Introduce the right technologies, integrations, automation, and AI for the agreed priorities." },
    { title: "Improve", text: "Measure outcomes, refine processes, and support changing business needs within the agreed scope." },
  ];

  return (
    <main className={pageMain} id="main-content">
      <ServiceEffects>
      {/* Hero — B2 Split Advisory prototype (WAVE3-B2-STATIC-HERO) */}
      {/* Reversible design checkpoint; no motion; conceptual visual slot per Maya's spec. */}
      <section
        className="relative overflow-hidden border-b border-line bg-surface py-24 sm:py-32"
        aria-labelledby="hero-heading"
        data-prototype="B2-SPLIT-ADVISORY"
      >
        <AmbientField />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[55fr_45fr] lg:items-center lg:gap-16">
            {/* Left: typography / value proposition */}
            <div>
              <p className="animate-rise" style={{ animationDelay: "60ms" }}>
                <EyebrowPill>Practical technology expertise. Real business problems.</EyebrowPill>
              </p>
              <h1
                id="hero-heading"
                className="animate-rise mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-6xl"
                style={{ animationDelay: "140ms" }}
              >
                Your business has outgrown the way it works. Let&apos;s fix that.
              </h1>
              <p className={`animate-rise mt-6 max-w-2xl ${lead}`} style={{ animationDelay: "240ms" }}>
                Disconnected systems. Manual processes. Unclear AI opportunities.
                Technology decisions without a roadmap.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-body">
                2Nspira is your business transformation partner. We help reduce manual
                work, improve operations, serve customers better, and support
                growth—using technology to make practical improvements.
              </p>
              <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                <Link href="/contact#contact-message" className={buttonPrimary}>Let&apos;s Discuss Your Challenge</Link>
                <Link href="/work" className={buttonSecondary}>See Our Work <span aria-hidden="true">→</span></Link>
              </div>
            </div>

            {/* Portrait composition keeps the people and workflow visible at every breakpoint. */}
            <figure
              className="hero-settle group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-canvas shadow-[0_24px_70px_rgba(35,41,54,0.12)] lg:aspect-[4/5]"
              style={{ animationDelay: "220ms" }}
              aria-label="Strategy planning at the whiteboard"
            >
              <Image
                src="/images/advisory/whiteboard-strategy-4x5.webp"
                alt="A professional pointing at a whiteboard of charts and strategy notes while a client looks on."
                fill
                sizes="(min-width: 1152px) 461px, (min-width: 1024px) 42vw, calc(100vw - 32px)"
                unoptimized
                fetchPriority="high"
                className="object-cover object-center transition-transform duration-700 ease-gentle motion-safe:group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/10 via-transparent to-accent/15 opacity-70" aria-hidden="true" />
            </figure>
          </div>
        </div>
      </section>

      <BusinessProblems />

      {/* Capabilities */}
      <section
        id="find-the-right-service"
        className={`${sectionBand} scroll-mt-24`}
        aria-labelledby="services-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div>
            <h2 data-catalog-reveal id="services-heading" className={h2}>
              Practical expertise. Clear business outcomes.
            </h2>
            <p className={`mt-4 max-w-2xl ${lead}`}>
              We start with the operational challenge, then identify the right
              combination of guidance, integration, automation, and implementation.
            </p>
          </div>

          <ClientServiceGrid />
          <p className="mt-6 max-w-3xl text-sm leading-7 text-body">Start with what matters most. We agree the priorities, deliverables, and scope with you.</p>
        </div>
      </section>

      <section className={section} aria-labelledby="home-work-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="home-work-heading" className={h2}>A closer look at the work.</h2>
          <p className={`max-w-2xl ${lead}`}>Different organizations need different things. See the scope of two published website projects.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              { title: "GeVitals", image: "gevitals", text: "A bilingual clinic website bringing content, video, publishing, and local discovery together." },
              { title: "Open Goal Soccer", image: "open-goal", text: "An accessible archival redesign preserving a community program’s mission and story." },
            ].map(project => <article key={project.title} data-catalog-card className={`overflow-hidden ${cardFlat}`}>
              <Image src={`/images/pages/${project.image}-website-preview-20261021.jpg`} alt={`${project.title} public website preview`} width={1440} height={1000} sizes="(min-width: 768px) 560px, 100vw" className="h-auto w-full border-b border-line" />
              <div className="p-6"><h3 className="text-xl font-semibold text-ink">{project.title}</h3><p className="mt-3 leading-7 text-body">{project.text}</p></div>
            </article>)}
          </div>
          <Link href="/websites#our-work" className={`mt-6 ${buttonSecondary}`}>Explore these website projects <span aria-hidden="true"> →</span></Link>
        </div>
      </section>
      {/* Approach */}
      <section className={section} aria-labelledby="approach-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 id="approach-heading" className={h2}>
              How We Work
            </h2>
            <p className={`mt-6 max-w-2xl ${lead}`}>
              We understand how your organization works before recommending what
              to change. Technology is a means to better operations—not the goal.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
              role="list"
              aria-label="How we work"
            >
            {values.map((value) => (
              <div key={value.title} className={`group p-6 transition-all duration-300 motion-safe:hover:-translate-y-0.5 hover:bg-surface hover:shadow-soft ${cardFlat}`} role="listitem">
                <AccentRule className="mb-4 w-8" />
                <h3 className="text-base font-semibold text-ink">{value.title}</h3>
                <p className={`mt-2 ${caption}`}>{value.text}</p>
              </div>
            ))}
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-12">
            <Link href="/about" className={buttonSecondary}>
              Learn more about 2Nspira <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className={`${sectionBand} relative overflow-hidden`} aria-labelledby="cta-heading">
        <AmbientField />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 id="cta-heading" className={h2}>
              What is getting in the way?
            </h2>
            <p className={`mx-auto mt-6 max-w-xl ${lead}`}>
              Bring the challenge, idea, or decision in front of you. We’ll discuss
              your priorities and whether our services are a fit.
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-body">We partner with growing businesses, established organizations, and mission-driven leaders who need practical technology expertise without unnecessary complexity. Based in New York City, working with clients nationally and internationally.</p>
            <Link href="/contact#contact-message" className={`mt-8 ${buttonPrimary}`}>Let&apos;s Discuss Your Challenge</Link>
          </Reveal>
        </div>
      </section>
      </ServiceEffects>
    </main>
  );
}
