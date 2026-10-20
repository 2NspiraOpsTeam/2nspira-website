import { publicPageMetadata } from "@/lib/pageMetadata";
import EntrepreneurMentoringCard from "@/components/EntrepreneurMentoringCard";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ServiceEffects from "@/components/ServiceEffects";
import { Sparkles, Workflow, PanelsTopLeft, Compass } from "lucide-react";
import { AccentRule, AmbientField, EyebrowPill } from "@/components/VisualAccents";
import {
  buttonPrimary,
  card,
  cardFlat,
  caption,
  h2,
  h3,
  lead,
  linkInline,
  pageMain,
  section,
  sectionBand,
} from "@/components/ui";

export const metadata: Metadata = publicPageMetadata({
  "title": "Technology Services & Entrepreneur Mentoring",
  "description": "Explore 2Nspira services for responsible AI adoption, systems optimization, workflow automation, digital platforms, fractional CIO leadership, and entrepreneur mentoring.",
  "path": "/services"
});

const capabilities = [
  {
    icon: Sparkles,
    id: "service-heading-1",
    title: "AI Enablement",
    description:
      "Pragmatic AI strategy and governance frameworks. We help organizations evaluate readiness, establish responsible workflows, and implement practical solutions — not hype-driven pilots.",
    benefit:
      "You get: a clear adoption path, guardrails your teams can follow, and AI work that supports your priorities.",
    points: ["AI readiness assessment", "Governance frameworks", "Responsible implementation paths"],
    href: "/ai-enablement",
    linkLabel: "Explore AI enablement",
  },
  {
    icon: Workflow,
    id: "service-heading-2",
    title: "Automation & Systems Optimization",
    description:
      "Operating-model improvement across strategy, infrastructure, platforms, systems, data, processes, people, and governance — followed by integration, automation, and AI where they add practical value.",
    benefit:
      "You get: connected, governed operations that reduce workarounds and scale without unnecessary rip-and-replace.",
    points: [
      "Process mapping & optimization",
      "Workflow automation",
      "Integration architecture",
      "Build vs. buy guidance",
    ],
    href: "/automation-systems-optimization",
    linkLabel: "Explore systems optimization",
  },
  {
    icon: PanelsTopLeft,
    id: "service-heading-3",
    title: "Websites & Digital Platforms",
    description:
      "Digital foundations that connect the customer experience to business data, workflows, automation, portals, payments, and future services.",
    benefit:
      "You get: a platform that supports how your business operates now and can grow without being replaced later.",
    points: [
      "Customer-facing experiences",
      "Portals, payments & integrations",
      "Automation & AI-ready architecture",
      "Performance, accessibility & discoverability",
    ],
    href: "/websites",
    linkLabel: "Explore digital platforms",
  },
  {
    icon: Compass,
    id: "service-heading-4",
    title: "Fractional CIO / Technology Leadership",
    description:
      "Executive direction and accountability for technology decisions and execution, aligned with your business priorities.",
    benefit:
      "You get: senior technology judgment on demand, aligned to your business outcomes — without a full-time executive hire.",
    points: ["Technology strategy & planning", "Fractional leadership", "Team enablement & mentoring"],
    href: "/fractional-cio",
    linkLabel: "Explore fractional CIO advisory",
  },
];

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://2nspira.com/services#webpage",
      url: "https://2nspira.com/services",
      name: "Technology Services & Entrepreneur Mentoring",
      about: { "@id": "https://2nspira.com/#organization" },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [
          ...capabilities.map(item => ({ name: item.title, url: `https://2nspira.com${item.href}` })),
          { name: "Entrepreneur Mentoring & Coaching", url: "https://2nspira.com/coaching" },
        ].map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })),
      },
    },
    {
      "@type": "Service",
      "@id": "https://2nspira.com/services#ai-enablement",
      name: "AI Enablement",
      description:
        "Pragmatic AI strategy and governance frameworks. We help organizations evaluate readiness, establish responsible workflows, and implement practical solutions.",
      url: "https://2nspira.com/ai-enablement",
      provider: { "@id": "https://2nspira.com/#organization" },
      areaServed: "Worldwide",
    },
    {
      "@type": "Service",
      "@id": "https://2nspira.com/automation-systems-optimization#service",
      name: "Automation & Systems Optimization",
      description:
        "Operating-model optimization across strategy, infrastructure, platforms, systems, data, processes, people, and governance, followed by practical integration, automation, and AI implementation.",
      url: "https://2nspira.com/automation-systems-optimization",
      provider: { "@id": "https://2nspira.com/#organization" },
      areaServed: "Worldwide",
    },
    {
      "@type": "Service",
      "@id": "https://2nspira.com/services#websites",
      name: "Websites & Digital Platforms",
      description:
        "Digital foundations that connect customer-facing experiences to business systems, data, workflows, automation, APIs, AI, portals, and payments.",
      url: "https://2nspira.com/websites",
      provider: { "@id": "https://2nspira.com/#organization" },
      areaServed: "Worldwide",
    },
    {
      "@type": "Service",
      "@id": "https://2nspira.com/services#fractional-leadership",
      name: "Fractional CIO / Technology Leadership",
      description:
        "Strategic technology leadership when you need it most. Fractional CIO guidance, architecture reviews, team enablement, and transformation pathways.",
      url: "https://2nspira.com/fractional-cio",
      provider: { "@id": "https://2nspira.com/#organization" },
      areaServed: "Worldwide",
    },
    {
      "@type": "Service", "@id": "https://2nspira.com/services#entrepreneur-mentoring",
      name: "Entrepreneur Mentoring & Coaching",
      description: "Industry-aligned, one-on-one mentoring for entrepreneurs, combining venture guidance with mindset and leadership coaching.",
      url: "https://2nspira.com/coaching",
      provider: { "@id": "https://2nspira.com/#organization" }, areaServed: "Worldwide",
    },
  ],
};

const outcomes = [
  {
    title: "Clear Strategic Direction",
    description:
      "Actionable roadmaps and prioritized next steps based on your organization's actual needs.",
  },
  {
    title: "Practical Implementation Paths",
    description:
      "Realistic timelines, appropriate technology choices, and achievable milestones.",
  },
  {
    title: "Sustainable Processes",
    description:
      "Workflows that endure beyond any single project or vendor relationship.",
  },
];

export default function ServicesPage() {
  return (
    <main className={pageMain} id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ServiceEffects>
      {/* Hero */}
      <section
        className="relative overflow-hidden border-b border-line bg-surface py-24 sm:py-28"
        aria-labelledby="hero-heading"
      >
        <AmbientField />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p><EyebrowPill>What we do</EyebrowPill></p>
          <h1
            id="hero-heading"
            className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          >
            Transform your organization with practical technology
          </h1>
          <p className={`mx-auto mt-6 max-w-2xl ${lead}`}>
            Human-centered solutions for AI adoption, systems optimization, and
            technology leadership—alongside entrepreneur mentoring, mindset,
            and leadership coaching.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className={buttonPrimary}
              aria-label="Discuss your needs with 2Nspira"
            >
              Discuss your needs
            </Link>
          </div>
        </div>
      </section>

      {/* Advisory visual — conceptual, not an actual client or engagement */}
      <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6">
      <figure data-catalog-fade className="group relative overflow-hidden rounded-[2rem] border border-line shadow-[0_20px_60px_rgba(35,41,54,0.10)]">
        <Image
          src="/images/pages/services-advisory.webp"
          alt="Conceptual visualization of an advisory conversation between a consultant and a client."
          width={1344}
          height={768}
          className="h-auto w-full transition-transform duration-700 ease-gentle group-hover:scale-[1.015]"
        />
      </figure>
      </div>

      {/* Services Grid */}
      <section className={section} aria-labelledby="services-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div><h2 data-catalog-reveal id="services-heading" className={h2}>
            Core Capabilities
          </h2>
          <p className={`mt-4 max-w-2xl ${lead}`}>
            Four integrated capabilities designed to work together or
            independently.
          </p></div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item, index) => (
              <article data-catalog-card data-service-card
                key={item.id}
                className={`group relative flex h-full flex-col overflow-hidden p-8 ${card}`}
                aria-labelledby={item.id}
              >
                <span data-service-rule aria-hidden="true" />
                <span data-service-icon><item.icon aria-hidden="true" size={25} strokeWidth={1.6} /></span>
                <span className="mb-5 text-xs font-semibold tracking-[0.18em] text-accent">{String(index + 1).padStart(2, "0")}</span>
                <h3 id={item.id} className={h3}>
                  {item.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-body">
                  {item.description}
                </p>
                <p className="mt-3 text-sm font-medium leading-6 text-ink">
                  {item.benefit}
                </p>
                <ul
                  className="mt-6 space-y-2.5 text-sm text-body"
                  aria-label={`${item.title} capabilities`}
                >
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
                {item.href && item.linkLabel && (
                  <Link
                    href={item.href}
                    className={`mt-6 ${linkInline}`}
                  >
                    {item.linkLabel} <span data-service-arrow aria-hidden="true">→</span>
                  </Link>
                )}
              </article>
            ))}
          </div>
          <div className="mt-8"><EntrepreneurMentoringCard /></div>
        </div>
      </section>

      {/* Common Outcomes */}
      <section className={`${sectionBand} relative overflow-hidden`} aria-labelledby="outcomes-heading">
        <AmbientField />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <h2 data-catalog-reveal id="outcomes-heading" className={h2}>
            What to expect
          </h2>
          <p className={`mt-4 max-w-2xl ${lead}`}>
            Our approach produces tangible outcomes that support long-term
            success.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-3" role="list">
            {outcomes.map((item) => (
              <div key={item.title} data-catalog-card className={`group h-full p-8 hover:bg-surface hover:shadow-soft ${cardFlat}`} role="listitem">
                <AccentRule className="mb-5 w-8" />
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className={`mt-2 ${caption}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={section} aria-labelledby="cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 data-catalog-reveal id="cta-heading" className={h2}>
            Ready to explore how 2Nspira can help?
          </h2>
          <p className={`mx-auto mt-4 max-w-xl ${lead}`}>
            Schedule a discovery call. No commitments required.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className={buttonPrimary}
              aria-label="Get in touch with 2Nspira"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
      </ServiceEffects>
    </main>
  );
}
