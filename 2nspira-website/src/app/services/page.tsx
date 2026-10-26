import { publicPageMetadata } from "@/lib/pageMetadata";
import ClientServiceGrid from "@/components/ClientServiceGrid";
import ServiceConversation from "@/components/ServiceConversation";
import ServiceQuestions from "@/components/ServiceQuestions";
import { serviceNeeds } from "@/lib/serviceNeeds";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ServiceEffects from "@/components/ServiceEffects";
import { AccentRule, AmbientField, EyebrowPill } from "@/components/VisualAccents";
import {
  cardFlat,
  caption,
  h2,
  lead,
  linkInline,
  pageMain,
  section,
  sectionBand,
} from "@/components/ui";

export const metadata: Metadata = publicPageMetadata({
  title: "Business Transformation & Operations Consulting",
  shareTitle: "Make your business work better.",
  description: "Reduce manual work, improve operations, and support growth with 2Nspira. Find practical help with automation, AI, websites, and technology decisions.",
  path: "/services"
});

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
          ...serviceNeeds.map(item => ({ name: item.name, url: `https://2nspira.com${item.href}` })),
        ].map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })),
      },
    },
    {
      "@type": "Service",
      "@id": "https://2nspira.com/ai-enablement#service",
      name: "AI Enablement",
      description:
        "Find where AI can reduce repetitive work and help your team serve customers better. Get practical AI strategy, training, and governance from 2Nspira.",
      url: "https://2nspira.com/ai-enablement",
      provider: { "@id": "https://2nspira.com/#organization" },
      areaServed: "Worldwide",
    },
    {
      "@type": "Service",
      "@id": "https://2nspira.com/automation-systems-optimization#service",
      name: "Automation & Systems Optimization",
      description:
        "Reduce manual work and disconnected spreadsheets. 2Nspira helps connect your systems, simplify handoffs, and improve the information your team relies on.",
      url: "https://2nspira.com/automation-systems-optimization",
      provider: { "@id": "https://2nspira.com/#organization" },
      areaServed: "Worldwide",
    },
    {
      "@type": "Service",
      "@id": "https://2nspira.com/services#websites",
      name: "Websites & Digital Platforms",
      description:
        "Help customers understand your offer, make inquiries, and access your services. 2Nspira builds websites connected to the way your business works.",
      url: "https://2nspira.com/websites",
      provider: { "@id": "https://2nspira.com/#organization" },
      areaServed: "Worldwide",
    },
    {
      "@type": "Service",
      "@id": "https://2nspira.com/services#fractional-leadership",
      name: "Fractional CIO / Technology Leadership",
      description:
        "Unsure which technology investments will help your business? Get fractional CIO guidance to set priorities, manage risk, and support operations and growth.",
      url: "https://2nspira.com/fractional-cio",
      provider: { "@id": "https://2nspira.com/#organization" },
      areaServed: "Worldwide",
    },
    {
      "@type": "Service", "@id": "https://2nspira.com/coaching#service",
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
            Practical improvements for the way your business works.
          </h1>
          <p className={`mx-auto mt-6 max-w-2xl ${lead}`}>
            Manual work, disconnected systems, unreliable reports, and unclear technology decisions can hold an organization back. We help businesses simplify operations, connect systems, adopt AI responsibly, and build technology foundations that support sustainable growth.
          </p>
          <ServiceConversation centered />
          <a href="#find-the-right-service" className={`mt-4 min-h-11 ${linkInline}`}>Find the right service <span aria-hidden="true"> ↓</span></a>
        </div>
      </section>

      {/* Services Grid */}
      <section id="find-the-right-service" className={`${section} scroll-mt-24`} aria-labelledby="services-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div><h2 data-catalog-reveal id="services-heading" className={h2}>
            What would you like to change?
          </h2>
          <p className={`mt-4 max-w-2xl ${lead}`}>
            Choose the situation that feels familiar. Our services can work
            independently or together, depending on your priorities and agreed scope.
          </p></div>

          <ClientServiceGrid />
          <p className="mt-6 max-w-3xl text-sm leading-7 text-body">These are examples of support, not fixed packages. We agree what to assess, advise on, or implement before the work begins.</p>
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
            We begin with your situation—not a tool or a predetermined package.
            Priorities, responsibilities, and next steps are agreed with you.
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

      {/* Advisory visual — conceptual, not an actual client or engagement */}
      <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6">
      <figure data-catalog-fade className="group relative overflow-hidden rounded-[2rem] border border-line shadow-[0_20px_60px_rgba(35,41,54,0.10)]">
        <Image
          src="/images/pages/services-advisory.webp"
          alt="Conceptual visualization of an advisory conversation between a consultant and a client."
          width={1344}
          height={768}
          className="h-auto w-full transition-transform duration-700 ease-gentle motion-safe:group-hover:scale-[1.015]"
        />
      </figure>
      </div>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6" aria-labelledby="examples-heading">
        <h2 id="examples-heading" className={h2}>See what the work can look like.</h2>
        <p className={lead}>Explore published digital experiences and operational initiatives, with their scope and status explained.</p>
        <Link href="/work" className={`mt-5 min-h-11 ${linkInline}`}>Explore our work <span aria-hidden="true"> →</span></Link>
      </section>
      <ServiceQuestions items={[
        { question: "Do I need to know which service I need?", answer: "No. Start with your goals, current challenges, and the decisions you need to make. The introductory conversation helps us understand your situation and explore which service may fit." },
        { question: "What happens after the introductory conversation?", answer: "If there is a fit, we agree the priorities, scope, responsibilities, and next steps before an engagement begins. The conversation itself does not commit you to a project or coaching relationship." },
        { question: "Are implementation and ongoing support included?", answer: "They depend on the engagement. Mentoring is guidance rather than done-for-you delivery. Technical implementation and any ongoing support are separately defined in the agreed scope; no open-ended support commitment is implied." },
      ]} />
      {/* CTA */}
      <section className={section} aria-labelledby="cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 data-catalog-reveal id="cta-heading" className={h2}>
            Not sure which service fits?
          </h2>
          <p className={`mx-auto mt-4 max-w-xl ${lead}`}>
            You don’t need a technical brief. Tell us what feels stuck, what
            you want to improve, and what you’ve tried. We’ll explore the fit together.
          </p>
          <ServiceConversation centered />
        </div>
      </section>
      </ServiceEffects>
    </main>
  );
}
