import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { AccentRule, AmbientField, EyebrowPill } from "@/components/VisualAccents";
import {
  buttonPrimary,
  card,
  cardFlat,
  eyebrow,
  h2,
  h3,
  lead,
  linkInline,
  pageMain,
  section,
  sectionBand,
} from "@/components/ui";

export const metadata: Metadata = {
  title: { absolute: "Fractional CIO & Founder Coaching | 2Nspira" },
  description:
    "Fractional CIO leadership and founder mentoring from 2Nspira. Validate business ideas, develop products, and strengthen leadership with practical advisory and coaching.",
  openGraph: {
    type: "website", siteName: "2Nspira", title: "Clearer decisions. Stronger leaders. Better execution.",
    description: "Fractional CIO leadership and founder mentoring from 2Nspira. Validate business ideas, develop products, and strengthen leadership with practical advisory and coaching.",
    url: "https://2nspira.com/fractional-cio",
    images: [{ url: "https://2nspira.com/images/logo/og-image-v2.png", width: 1200, height: 630, alt: "2Nspira" }],
  },
  twitter: { card: "summary_large_image", title: "Clearer decisions. Stronger leaders. Better execution.", description: "Fractional CIO leadership and founder mentoring from 2Nspira. Validate business ideas, develop products, and strengthen leadership with practical advisory and coaching.", images: ["https://2nspira.com/images/logo/og-image-v2.png"] },
  alternates: {
    canonical: "/fractional-cio",
  },
};

const ventureFoundations = [
  {
    "title": "Design thinking",
    "text": "Understand the people experiencing the problem, challenge assumptions, explore possible solutions, and test early concepts."
  },
  {
    "title": "Ideal customer persona",
    "text": "Identify who you serve, their needs, buying motivations, alternatives, and decision process. Distinguish the person using your product from the person paying for it."
  },
  {
    "title": "Customer discovery and validation",
    "text": "Learn how to interview potential customers and gather evidence of a meaningful problem and willingness to pay."
  },
  {
    "title": "Product development",
    "text": "Translate what you learn into a value proposition, prototypes, a focused minimum viable product, and a practical development roadmap."
  },
  {
    "title": "Product–market fit",
    "text": "Test whether customers consistently choose, use, pay for, and return to your solution. Use the evidence to refine your product and positioning."
  },
  {
    "title": "Business model and go-to-market",
    "text": "Explore pricing, delivery costs, sales channels, and a realistic path to reaching your first customers."
  }
];

const dueDiligenceContents = [
  "The problem, proposed solution, and founder’s purpose.",
  "Your ideal customer persona and customer research.",
  "Market alternatives, competitors, and differentiation.",
  "Product scope, development milestones, and validation results.",
  "Business model, pricing assumptions, costs, and resource needs.",
  "Go-to-market approach and early sales evidence.",
  "Key risks, unanswered questions, and decision criteria.",
  "A prioritized action plan with ownership and milestones."
];

const founderGrowth = [
  "Mindset, resilience, and responding constructively to setbacks.",
  "Decision-making when information is incomplete.",
  "Focus, accountability, and following through.",
  "Communication, delegation, and building a team.",
  "Your transition from creating a product to leading a company."
];

const executiveLenses = [
  { title: "Strategy", text: "Connect technology priorities to the organization’s goals, operating model, and growth plans." },
  { title: "Investment", text: "Sequence spending around business value, capacity, dependencies, and responsible tradeoffs." },
  { title: "Infrastructure", text: "Assess the foundations required for secure, reliable, and resilient operations." },
  { title: "Platforms & Systems", text: "Clarify the role, fit, ownership, and integration of the tools the organization depends on." },
  { title: "Data", text: "Improve how information is governed, trusted, shared, and used in decision-making." },
  { title: "Operations", text: "Reduce friction across workflows, handoffs, vendors, and day-to-day technology delivery." },
  { title: "People", text: "Align leadership, internal capability, partners, roles, and accountability around the work." },
  { title: "Governance & Risk", text: "Make ownership, controls, standards, security, and risk decisions explicit and actionable." },
];

const approach = [
  { title: "Establish clarity", text: "Understand the current environment, priorities, investment, risks, people, and operational friction." },
  { title: "Set direction", text: "Define priorities, roadmap, architecture, ownership, governance, and the sequence of investment." },
  { title: "Lead execution", text: "Guide decisions, vendors, initiatives, teams, and accountability as the roadmap moves forward." },
];

const outcomes = [
  { title: "Sharper decisions", text: "A shared view of priorities, tradeoffs, ownership, and what should happen next." },
  { title: "More disciplined investment", text: "Technology spending connected to business value, timing, risk, and organizational capacity." },
  { title: "Stronger execution", text: "Clearer accountability across leaders, teams, vendors, systems, and critical initiatives." },
  { title: "A more resilient environment", text: "Less avoidable complexity, better governance, and a practical path for modernization." },
  { title: "Stronger leadership capability", text: "Greater confidence in setting priorities, delegating responsibility, making decisions, and guiding teams through change." },
];

const fractionalCioJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Technology Leadership & Founder Advisory",
  description:
    "Fractional CIO leadership and founder mentoring from 2Nspira. Validate business ideas, develop products, and strengthen leadership with practical advisory and coaching.",
  url: "https://2nspira.com/fractional-cio",
  provider: { "@id": "https://2nspira.com/#organization" },
  areaServed: "Worldwide",
};

export default function FractionalCioPage() {
  return (
    <main className={pageMain} id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(fractionalCioJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="relative overflow-hidden border-b border-line bg-surface">
        <AmbientField />
        <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
          <p><EyebrowPill>Fractional technology leadership &amp; founder advisory</EyebrowPill></p>
          <h1 className="animate-rise mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Clearer decisions. Stronger leaders. Better execution.
          </h1>
          <p className={`animate-rise ${lead}`} style={{ animationDelay: "80ms" }}>
            Technology decisions shape your business—and the people leading it need support, too.
          </p>
          <p className="animate-rise mt-5 max-w-3xl text-base leading-7 text-body" style={{ animationDelay: "120ms" }}>
            2Nspira helps founders and business leaders connect technology, investment, people, and execution. Whether you need an experienced fractional technology executive or a trusted advisor to strengthen your own leadership, we help you clarify priorities, navigate difficult decisions, and turn plans into progress.
          </p>
          <div className="animate-rise mt-8" style={{ animationDelay: "160ms" }}>
            <Link href="/contact" className={`${buttonPrimary} min-h-[44px]`}>Discuss your leadership priorities</Link>
          </div>
        </div>
      </section>

      <section className={section} aria-labelledby="engagements-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="engagements-heading" className={h2}>Two ways to work together</h2>
          <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2">
            <article className={`flex h-full flex-col p-7 sm:p-8 ${card}`} aria-labelledby="fractional-engagement-heading">
              <AccentRule className="mb-6" />
              <h3 id="fractional-engagement-heading" className={h3}>Fractional CIO / Technology Leadership</h3>
              <p className="mt-5 leading-8 text-body">Experienced executive leadership for organizations that need direction and accountability across technology strategy, investment, vendors, governance, and delivery.</p>
              <p className="mt-4 leading-8 text-body">We provide leadership within an agreed scope, working with your team to move priorities into execution.</p>
              <Link href="#cio-service-heading" className={`mt-auto min-h-[44px] pt-6 ${linkInline}`}>Explore fractional leadership <span aria-hidden="true">&nbsp;→</span></Link>
            </article>
            <article className={`flex h-full flex-col p-7 sm:p-8 ${card}`} aria-labelledby="founder-engagement-heading">
              <AccentRule className="mb-6" />
              <h3 id="founder-engagement-heading" className={h3}>Founder Advisory &amp; Coaching</h3>
              <p className="mt-5 leading-8 text-body">Practical business guidance, mindset and leadership coaching for entrepreneurs—from exploring an initial idea and developing a product to leading a growing company.</p>
              <p className="mt-4 leading-8 text-body">We help you strengthen your leadership while you retain ownership of business decisions and execution.</p>
              <Link href="#founder-coaching-heading" className={`mt-auto min-h-[44px] pt-6 ${linkInline}`}>Explore founder mentoring <span aria-hidden="true">&nbsp;→</span></Link>
            </article>
          </div>
        </div>
      </section>

      <section className={sectionBand} aria-labelledby="founder-coaching-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-4xl">
            <p className={eyebrow}>Founder mentoring with Jeffrey Cortez</p>
            <h2 id="founder-coaching-heading" className={`mt-4 scroll-mt-24 ${h2}`}>Build a business with purpose. Become the leader it needs.</h2>
            <p className="mt-6 leading-8 text-body">A product idea is a starting point. Building a company means understanding your customers, testing your assumptions, developing the right product, and growing into the responsibilities of leadership.</p>
            <p className="mt-5 leading-8 text-body">Drawing on my experience building four companies from the ground up, I mentor entrepreneurs through those decisions—from exploring an initial idea to developing a product and leading a growing business.</p>
            <p className="mt-5 leading-8 text-body">Our work combines practical business guidance with mindset and leadership coaching. You gain an experienced sounding board, honest feedback, and direction grounded in the challenges you face.</p>
          </div>

          <section aria-labelledby="venture-foundations-heading" className="mt-12">
            <h3 id="venture-foundations-heading" className={h3}>Turn your idea into a business worth building</h3>
            <p className="mt-4 leading-8 text-body">Together, we work through the foundations of your venture:</p>
            <dl className="mt-6 grid gap-5 md:grid-cols-2">
              {ventureFoundations.map(({ title, text }) => (
                <div key={title} className={`p-6 sm:p-7 ${cardFlat}`}>
                  <dt className="font-semibold text-ink">{title}</dt>
                  <dd className="mt-3 leading-7 text-body">{text}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
            <section aria-labelledby="due-diligence-heading" className={`p-6 sm:p-8 ${cardFlat}`}>
              <AccentRule className="mb-6" />
              <h3 id="due-diligence-heading" className={h3}>Develop your Entrepreneur Due Diligence Document</h3>
              <p className="mt-5 leading-8 text-body">We bring your thinking and research together in a working document that helps you decide what to pursue, what to test, and where to invest your time and money.</p>
              <p className="mt-5 font-semibold text-ink">Your document captures:</p>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-body marker:text-accent">
                {dueDiligenceContents.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="mt-6 leading-8 text-body">This document evolves as you learn, making your assumptions and evidence visible before you make larger commitments.</p>
            </section>

            <section aria-labelledby="founder-growth-heading" className={`p-6 sm:p-8 ${cardFlat}`}>
              <AccentRule className="mb-6" />
              <h3 id="founder-growth-heading" className={h3}>Grow alongside your company</h3>
              <p className="mt-5 leading-8 text-body">The business will challenge you personally as well as professionally. Our mentoring relationship also creates space to work on:</p>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-body marker:text-accent">
                {founderGrowth.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="mt-6 leading-8 text-body">I share relevant experiences, recommend books and resources, and help you turn those lessons into practical action. Regular conversations and agreed support between sessions give you a continuing relationship as your business evolves.</p>
            </section>
          </div>

          <div className="mt-10 max-w-3xl">
            <p className="text-lg font-medium leading-8 text-ink">An experienced mentor for the company you’re building—and the leader you’re becoming.</p>
            <div className="mt-6"><Link href="/contact" className={`${buttonPrimary} min-h-[44px]`}>Start a mentoring conversation</Link></div>
          </div>
        </div>
      </section>

      <section aria-labelledby="cio-service-heading">
        <header className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-28">
          <h2 id="cio-service-heading" className={`scroll-mt-24 ${h2}`}>Fractional CIO / Technology Leadership</h2>
        </header>
        <section className={section} aria-labelledby="leadership-heading">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className={eyebrow}>Executive technology leadership</p>
              <h3 id="leadership-heading" className={`mt-4 ${h2}`}>What a Fractional CIO actually does</h3>
              <p className={`mt-4 ${lead}`}>A Fractional CIO turns business priorities into technology decisions the organization can fund, own, and execute.</p>
              <p className="mt-5 leading-8 text-body">
                We assess the environment, frame tradeoffs, establish a practical roadmap, guide vendors and initiatives, and strengthen leadership accountability. The work sits above day-to-day support while remaining close enough to execution to keep strategy grounded.
              </p>
              <p className="mt-5 leading-8 text-body">This is not outsourced IT support or generic technical consulting. It is executive judgment for organizations that need clarity, direction, and accountable execution without hiring a full-time CIO.</p>
              <div className={`mt-8 p-6 sm:p-7 ${cardFlat}`}>
                <AccentRule className="mb-5" />
                <h4 className={h3}>Independent judgment</h4>
                <p className="mt-3 leading-7 text-body">
                  2Nspira is not tied to selling a particular platform, license, or implementation. Recommendations are shaped by organizational needs, existing investments, risk, and the simplest responsible path forward.
                </p>
              </div>
            </div>
            <Reveal>
              <figure className="group relative overflow-hidden rounded-[2rem] border border-line shadow-[0_20px_60px_rgba(35,41,54,0.10)]">
                <Image src="/images/advisory/advisory-ideas-to-impact.webp" alt="Conceptual visualization of an executive advisory and mentoring conversation at a strategy wall." width={1672} height={941} className="h-auto w-full transition-transform duration-700 ease-gentle motion-safe:group-hover:scale-[1.015]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/10 via-transparent to-accent/10 opacity-60" aria-hidden="true" />
              </figure>
            </Reveal>
          </div>
        </section>

        <section className={sectionBand} aria-labelledby="lenses-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-3xl">
              <p className={eyebrow}>Eight executive lenses</p>
              <h3 id="lenses-heading" className={`mt-4 ${h2}`}>See the whole environment before setting the agenda</h3>
              <p className={`mt-4 ${lead}`}>Technology leadership requires a connected view. We examine eight dimensions together so decisions account for dependencies, constraints, ownership, and business impact.</p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {executiveLenses.map((lens, index) => (
                <Reveal key={lens.title} delay={index * 60} className="h-full">
                  <article className={`group h-full p-6 motion-safe:hover:-translate-y-1 ${card}`}>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span>
                    <h4 className={`mt-5 ${h3}`}>{lens.title}</h4>
                    <p className="mt-3 text-sm leading-6 text-body">{lens.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={section} aria-labelledby="fit-heading">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
            <Reveal>
              <article className={`h-full p-7 sm:p-8 ${card}`}>
                <AccentRule className="mb-6" />
                <h3 id="fit-heading" className={h2}>When Fractional CIO leadership makes sense</h3>
                <p className="mt-5 leading-8 text-body">
                  The organization has reached a point where technology decisions carry executive consequences, but the need or budget does not justify a full-time CIO. Growth, modernization, technical debt, vendor complexity, unclear ownership, or a stalled initiative often make the leadership gap visible.
                </p>
              </article>
            </Reveal>
            <Reveal delay={80}>
              <article className={`h-full p-7 sm:p-8 ${card}`}>
                <AccentRule className="mb-6" />
                <h3 className={h2}>Leadership that connects the organization</h3>
                <p className="mt-5 leading-8 text-body">
                  Effective technology direction connects business ambition, financial discipline, operational reality, IT capability, and vendor delivery. We create a common decision frame so those groups can move together instead of optimizing in isolation.
                </p>
              </article>
            </Reveal>
          </div>
        </section>

        <section className={sectionBand} aria-labelledby="approach-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-3xl">
              <p className={eyebrow}>Clarity → Direction → Execution</p>
              <h3 id="approach-heading" className={`mt-4 ${h2}`}>A disciplined path from complexity to progress</h3>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {approach.map((step, index) => (
                <Reveal key={step.title} delay={index * 80} className="h-full">
                  <article className={`h-full p-7 ${card}`}>
                    <p className="text-sm font-semibold tracking-widest text-accent">{String(index + 1).padStart(2, "0")}</p>
                    <h4 className={`mt-4 ${h3}`}>{step.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-body">{step.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      </section>

      <section className={section} aria-labelledby="outcomes-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className={eyebrow}>Tangible outcomes</p>
            <h2 id="outcomes-heading" className={`mt-4 ${h2}`}>Leadership that improves decisions and execution</h2>
            <p className={`mt-4 ${lead}`}>The objective is not a strategy document. It is an organization better equipped to make, fund, and carry out technology decisions.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {outcomes.map((outcome, index) => (
              <Reveal key={outcome.title} delay={index * 70}>
                <article className={`h-full p-7 ${cardFlat}`}>
                  <h3 className={h3}>{outcome.title}</h3>
                  <p className="mt-3 leading-7 text-body">{outcome.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionBand} aria-labelledby="fractional-cio-cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 id="fractional-cio-cta-heading" className={h2}>Bring clarity to your next leadership decision.</h2>
          <p className={`mx-auto mt-4 max-w-2xl ${lead}`}>Whether you need fractional technology leadership or support navigating your role as a founder, start with the decisions, priorities, or challenges in front of you.</p>
          <div className="mt-10">
            <Link href="/contact" className={`${buttonPrimary} min-h-[44px]`}>Start a leadership conversation</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
