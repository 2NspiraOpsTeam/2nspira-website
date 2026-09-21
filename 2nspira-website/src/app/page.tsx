import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { AccentRule, AmbientField, EyebrowPill } from "@/components/VisualAccents";
import Link from "next/link";
import {
  buttonPrimary,
  buttonSecondary,
  card,
  cardFlat,
  caption,
  h2,
  h3,
  lead,
  pageMain,
  section,
  sectionBand,
} from "@/components/ui";

const homepageDescription =
  "AI enablement, systems optimization, and fractional technology leadership for organizations navigating practical AI adoption.";
const homepageShareTitle =
  "Human-centered technology transformation and practical AI adoption";
const homepageSocialImage = "https://2nspira.com/images/logo/og-image-v2.png";

export const metadata: Metadata = {
  title: { absolute: "2Nspira" },
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
        alt: "2Nspira — human-centered technology transformation and practical AI adoption",
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
  const services = [
    {
      title: "AI Enablement & Governance",
      description:
        "Pragmatic AI strategy and governance frameworks for responsible implementation — readiness, guardrails, and workflows your people will actually use.",
      benefit: "Outcome: a clear, responsible path to AI adoption your teams can follow.",
      href: "/ai-enablement",
      linkLabel: "Explore AI enablement",
    },
    {
      title: "Systems & Process Optimization",
      description:
        "Streamlined operations powered by appropriate technology — mapping friction, designing efficient workflows, and building sustainable improvements.",
      benefit: "Outcome: less friction in day-to-day operations, and processes that hold up over time.",
      href: null,
      linkLabel: null,
    },
    {
      title: "Websites & Web Applications",
      description:
        "We design and build websites and web applications that work for your business — from bilingual marketing sites to internal tools, with an honest build-vs-buy call before you spend.",
      benefit:
        "Outcome: a site or tool that reflects how your business actually operates — and stays maintainable.",
      href: "/websites",
      linkLabel: "See what we've built",
    },
    {
      title: "Technology Leadership",
      description:
        "Fractional CTO guidance, architecture reviews, and transformation pathways that align technology investment with business outcomes.",
      benefit: "Outcome: technology decisions that follow your business priorities, not the other way around.",
      href: "/fractional-cio",
      linkLabel: "Explore fractional leadership",
    },
  ];

  const values = [
    { title: "People First", text: "Technology serves people, never the reverse." },
    { title: "Process Clarity", text: "Work flows your team can follow without a manual." },
    { title: "Data Integrity", text: "Decisions grounded in information you can trust." },
    { title: "Practical AI", text: "Adoption measured in outcomes, not pilots." },
  ];

  return (
    <main className={pageMain} id="main-content">
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
                2Nspira helps you turn technology change into durable outcomes —
                practical AI enablement, process optimization, and fractional
                technology leadership, built so your teams trust their systems
                instead of managing them.
              </p>
              <div
                className="animate-rise mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-x-6"
                style={{ animationDelay: "340ms" }}
              >
                <Link href="/contact" className={buttonPrimary}>
                  Start a conversation <span aria-hidden="true">→</span>
                </Link>
                <Link href="/services" className={buttonSecondary}>
                  Explore our services
                </Link>
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
                className="object-cover object-center transition-transform duration-700 ease-gentle group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/10 via-transparent to-accent/15 opacity-70" aria-hidden="true" />
            </figure>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section
        className={sectionBand}
        aria-labelledby="services-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 id="services-heading" className={h2}>
              What we do
            </h2>
            <p className={`mt-4 max-w-2xl ${lead}`}>
              Four integrated capabilities designed to work together or
              independently.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-14">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((feature) => (
              <article
                key={feature.title}
                className={`group relative flex flex-col overflow-hidden p-8 hover:-translate-y-1 ${card}`}
              >
                <AccentRule className="absolute inset-x-0 top-0 w-full scale-x-0 group-hover:scale-x-100" />
                <h3 className={h3}>{feature.title}</h3>
                <p className={`mt-3 flex-1 text-sm leading-7 text-body`}>
                  {feature.description}
                </p>
                <p className="mt-3 text-sm font-medium leading-6 text-ink">
                  {feature.benefit}
                </p>
                {feature.href && feature.linkLabel && (
                  <Link
                    href={feature.href}
                    className="mt-6 inline-flex items-center rounded text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-300 ease-gentle hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                  >
                    {feature.linkLabel} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </article>
            ))}
            </div>
          </Reveal>
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
              <div key={value.title} className={`group p-6 transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface hover:shadow-soft ${cardFlat}`} role="listitem">
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
              Ready to explore how 2Nspira can help?
            </h2>
            <p className={`mx-auto mt-6 max-w-xl ${lead}`}>
              Schedule a discovery call. No commitments required.
            </p>
            <div className="mt-10 flex justify-center">
              <Link href="/contact" className={buttonPrimary}>
                Get in touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
