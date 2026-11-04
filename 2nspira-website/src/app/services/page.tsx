import EditorialHero from "@/components/EditorialHero";
import { publicPageMetadata } from "@/lib/pageMetadata";
import ClientServiceGrid from "@/components/ClientServiceGrid";
import ServiceConversation from "@/components/ServiceConversation";
import ServiceQuestions from "@/components/ServiceQuestions";
import { serviceNeeds } from "@/lib/serviceNeeds";
import type { Metadata } from "next";
import Link from "next/link";
import ServiceEffects from "@/components/ServiceEffects";
import { AccentRule, AmbientField, EyebrowPill } from "@/components/VisualAccents";
import {
  cardFlat,
  buttonPrimary,
  eyebrow,
  h2,
  lead,
  linkInline,
  pageMain,
  section,
  sectionBand,
} from "@/components/ui";

export const metadata: Metadata = publicPageMetadata({
  title: "Business Technology Consulting & Modernization",
  shareTitle: "Move your business forward—with people and technology.",
  description: "Explore AI enablement, automation, websites and apps, fractional CIO leadership, and entrepreneur mentoring. Find a practical starting point for your business.",
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
      name: "Websites, Apps & Digital Platforms",
      description:
        "Help customers understand your offer, make inquiries, and access your services. 2Nspira builds websites, web apps, and mobile apps connected to the way your business works.",
      url: "https://2nspira.com/websites",
      provider: { "@id": "https://2nspira.com/#organization" },
      areaServed: "Worldwide",
    },
    {
      "@type": "Service",
      "@id": "https://2nspira.com/services#fractional-leadership",
      name: "Fractional CIO & Technology Leadership",
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

const steps = [
  { title: "Start with the challenge", description: "Tell us what is slowing you down, the decision ahead, or the opportunity you want to explore. You do not need a technical brief." },
  { title: "Agree a focused path", description: "Together, we define priorities, scope, responsibilities, and what progress should look like before an engagement begins." },
  { title: "Build, learn, and adapt", description: "Move through the agreed work in manageable steps, review what is working, and make informed decisions about what comes next." },
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
        className="relative overflow-hidden border-b border-line bg-surface"
        aria-labelledby="hero-heading"
      >
        <AmbientField />
        <EditorialHero image="/images/pages/services-advisory.webp" alt="Illustrative technology advisory discussion connecting business priorities and practical decisions.">
          <p><EyebrowPill>People. Strategy. Technology.</EyebrowPill></p>
          <h1
            id="hero-heading"
            className="mt-4 text-[length:var(--type-display)] font-medium leading-[1.08] tracking-[-0.04em] text-ink"
          >
            A stronger business starts with your next right move.
          </h1>
          <p className={`mx-auto mt-6 max-w-2xl ${lead}`}>
            Turn technology uncertainty, disconnected operations, and growing pains into a clearer path forward. From responsible AI and connected systems to digital experiences and personal leadership, we help you move from what’s holding you back to what comes next.
          </p>
          <ServiceConversation label="Let’s talk about your next step" />
          <a href="#find-the-right-service" className={`mt-4 min-h-11 ${linkInline}`}>Find the right service <span aria-hidden="true"> ↓</span></a>
        </EditorialHero>
      </section>

      {/* Services Grid */}
      <section id="find-the-right-service" className={`${section} scroll-mt-24`} aria-labelledby="services-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div><h2 data-catalog-reveal id="services-heading" className={h2}>
            Where do you need to make progress?
          </h2>
          <p className={`mt-4 max-w-2xl ${lead}`}>
            Start with the challenge that feels familiar. Explore one area or combine the right support around your priorities.
          </p></div>

          <nav aria-label="Jump to a service" className="mt-7 flex flex-wrap gap-3">
            {serviceNeeds.map((service, index) => <a key={service.href} href={`#service-${index + 1}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{["Websites & apps", "Automation", "AI enablement", "Technology leadership", "Mentoring & coaching"][index]}</a>)}
          </nav>
          <ClientServiceGrid />
          <p className="mt-6 max-w-3xl text-sm leading-7 text-body">These are examples of support, not fixed packages. We agree what to assess, advise on, or implement before the work begins.</p>
        </div>
      </section>

      {/* Common Outcomes */}
      <section className={`${sectionBand} relative overflow-hidden`} aria-labelledby="outcomes-heading">
        <AmbientField />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <h2 data-catalog-reveal id="outcomes-heading" className={h2}>
            From a first conversation to a focused path.
          </h2>
          <p className={`mt-4 max-w-2xl ${lead}`}>
            Advice, implementation, or mentoring: the right engagement starts with understanding your situation, not prescribing a tool.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-3" role="list">
            {steps.map((item, index) => (
              <div key={item.title} data-catalog-card className={`group h-full p-8 hover:bg-surface hover:shadow-soft ${cardFlat}`} role="listitem">
                <p className={`${eyebrow} mb-4`}>Step {index + 1}</p>
                <AccentRule className="mb-5 w-8" />
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-body">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={section} aria-labelledby="connected-services-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="connected-services-heading" className={h2}>One challenge. The right combination of support.</h2>
        <p className="mt-4 max-w-3xl leading-8 text-body">A growing business might begin with <Link className={linkInline} href="/fractional-cio">technology leadership</Link>, identify a disconnected handoff, then prioritize <Link className={linkInline} href="/automation-systems-optimization">workflow automation</Link> or a <Link className={linkInline} href="/websites">customer portal</Link>. Each step is scoped around the need—not a requirement to buy every service.</p>
        <p className="mt-4 font-medium text-ink">Understand the challenge. Set the direction. Make it work.</p>
      </div></section>
      <section className={section} aria-labelledby="explore-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className={eyebrow}>Explore before we talk</p>
          <h2 id="explore-heading" className={`mt-4 ${h2}`}>Get a clearer picture of what’s possible.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className={`flex flex-col p-7 sm:p-9 ${cardFlat}`}>
              <p className={eyebrow}>See the work</p>
              <h3 className="mt-4 text-2xl font-medium text-ink">From public websites to connected operations.</h3>
              <p className="mt-4 flex-1 leading-7 text-body">Explore published digital experiences, including Teams Management and GeVitals. See the needs, delivered capabilities, and project status behind the work.</p>
              <Link href="/work" className={`mt-6 min-h-11 ${linkInline}`}>Explore our work <span aria-hidden="true"> →</span></Link>
            </article>
            <article className={`flex flex-col p-7 sm:p-9 ${cardFlat}`}>
              <p className={eyebrow}>Find your starting point</p>
              <h3 className="mt-4 text-2xl font-medium text-ink">Thinking about AI? Start with readiness.</h3>
              <p className="mt-4 flex-1 leading-7 text-body">Use our free AI Readiness Scorecard to reflect on your organization’s strengths and gaps before deciding where to begin.</p>
              <Link href="/resources/ai-readiness-scorecard" className={`mt-6 self-start ${buttonPrimary}`}>Take the free scorecard <span aria-hidden="true"> →</span></Link>
            </article>
          </div>
        </div>
      </section>
      <ServiceQuestions items={[
        { question: "Do I need to know which service I need?", answer: "No. Start with your goals, current challenges, and the decisions you need to make. The introductory conversation helps us understand your situation and explore which service may fit." },
        { question: "What happens after the introductory conversation?", answer: "If there is a fit, we agree the priorities, scope, responsibilities, and next steps before an engagement begins. The conversation itself does not commit you to a project or coaching relationship." },
        { question: "Can services work together?", answer: "Yes. For example, a technology roadmap may identify an automation priority or an AI workflow to explore. We agree which advisory, implementation, training, or ongoing support activities are included. Mentoring remains guidance rather than done-for-you delivery." },
      ]} />
      {/* CTA */}
      <section className={section} aria-labelledby="cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 data-catalog-reveal id="cta-heading" className={h2}>
            Let’s make your next step clearer.
          </h2>
          <p className={`mx-auto mt-4 max-w-xl ${lead}`}>
            Bring one challenge, an idea you want to test, or a decision you need to make. We’ll explore where the right support could help—and whether we’re a fit.
          </p>
          <ServiceConversation centered />
        </div>
      </section>
      </ServiceEffects>
    </main>
  );
}
