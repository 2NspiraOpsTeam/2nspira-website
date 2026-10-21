import ServiceEffects from "@/components/ServiceEffects";
import ClientServiceGrid from "@/components/ClientServiceGrid";
import ServiceConversation from "@/components/ServiceConversation";
import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { AccentRule, AmbientField, EyebrowPill } from "@/components/VisualAccents";
import Link from "next/link";
import {
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
  "Practical AI consulting, systems automation, website design, fractional CIO leadership, and entrepreneur coaching. Find support for your next business challenge.";
const homepageShareTitle =
  "Clearer technology decisions. Stronger business leadership.";
const homepageSocialImage = "https://2nspira.com/images/logo/og-image-v2.png";

export const metadata: Metadata = {
  title: { absolute: "2Nspira | AI Consulting, Technology & Business Coaching" },
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
    { title: "People First", text: "Technology serves people, never the reverse." },
    { title: "Process Clarity", text: "Work flows your team can follow without a manual." },
    { title: "Data Integrity", text: "Decisions grounded in information you can trust." },
    { title: "Practical AI", text: "Adoption measured in outcomes, not pilots." },
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
                <EyebrowPill>For leaders of small and mission-driven organizations</EyebrowPill>
              </p>
              <h1
                id="hero-heading"
                className="animate-rise mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-6xl"
                style={{ animationDelay: "140ms" }}
              >
                Technology that works the way your people do.
              </h1>
              <p className={`animate-rise mt-6 max-w-2xl ${lead}`} style={{ animationDelay: "240ms" }}>
                Connect your systems. Make clearer technology decisions. Build a
                business you can lead with confidence. We help organizations and
                entrepreneurs turn everyday challenges into practical next steps—
                through AI, automation, websites, technology leadership, and coaching.
              </p>
              <ServiceConversation />
              <a href="#find-the-right-service" className={`mt-3 ${buttonSecondary}`}>Find the right service <span aria-hidden="true">↓</span></a>
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

      {/* Capabilities */}
      <section
        id="find-the-right-service"
        className={`${sectionBand} scroll-mt-24`}
        aria-labelledby="services-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div>
            <h2 data-catalog-reveal id="services-heading" className={h2}>
              What we do
            </h2>
            <p className={`mt-4 max-w-2xl ${lead}`}>
              Start with what you want to change. Find the support that fits your
              organization—or the next stage of your business.
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
              Our approach
            </h2>
            <p className={`mt-6 max-w-2xl ${lead}`}>
              Technology must serve people — not the other way around. Our
              human-centered philosophy ensures that AI systems, workflow changes,
              and technology implementations are designed for actual use.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
              role="list"
              aria-label="Our core values"
            >
            {values.map((value) => (
              <div key={value.title} className={`group p-6 transition-all duration-300 motion-safe:hover:-translate-y-0.5 hover:bg-surface hover:shadow-soft ${cardFlat}`} role="listitem">
                <AccentRule className="mb-4 w-8" />
                <p className="text-base font-semibold text-ink">{value.title}</p>
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
              What would you like to move forward?
            </h2>
            <p className={`mx-auto mt-6 max-w-xl ${lead}`}>
              Bring the challenge, idea, or decision in front of you. We’ll discuss
              your priorities and whether our services are a fit.
            </p>
            <ServiceConversation centered />
          </Reveal>
        </div>
      </section>
      </ServiceEffects>
    </main>
  );
}
