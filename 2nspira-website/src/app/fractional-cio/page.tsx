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
  pageMain,
  section,
  sectionBand,
} from "@/components/ui";

export const metadata: Metadata = {
  title: { absolute: "Fractional CIO & Founder Coaching | 2Nspira" },
  description:
    "Fractional CIO leadership and founder coaching from 2Nspira. Align technology, strengthen leadership, and turn business priorities into practical execution.",
  openGraph: {
    type: "website", siteName: "2Nspira", title: "Clearer decisions. Stronger leaders. Better execution.",
    description: "Fractional CIO leadership and founder coaching from 2Nspira. Align technology, strengthen leadership, and turn business priorities into practical execution.",
    url: "https://2nspira.com/fractional-cio",
    images: [{ url: "https://2nspira.com/images/logo/og-image-v2.png", width: 1200, height: 630, alt: "2Nspira" }],
  },
  twitter: { card: "summary_large_image", title: "Clearer decisions. Stronger leaders. Better execution.", description: "Fractional CIO leadership and founder coaching from 2Nspira. Align technology, strengthen leadership, and turn business priorities into practical execution.", images: ["https://2nspira.com/images/logo/og-image-v2.png"] },
  alternates: {
    canonical: "/fractional-cio",
  },
};

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
    "Fractional CIO leadership and founder coaching from 2Nspira. Align technology, strengthen leadership, and turn business priorities into practical execution.",
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
            <Link href="/contact" className={buttonPrimary}>Discuss your leadership priorities</Link>
          </div>
        </div>
      </section>

      <section className={section} aria-labelledby="engagements-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="engagements-heading" className={h2}>Two ways to work together</h2>
          <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2">
            <article className={`h-full p-7 sm:p-8 ${card}`} aria-labelledby="fractional-engagement-heading">
              <AccentRule className="mb-6" />
              <h3 id="fractional-engagement-heading" className={h3}>Fractional CIO / Technology Leadership</h3>
              <p className="mt-5 leading-8 text-body">Experienced executive leadership for organizations that need direction and accountability across technology strategy, investment, vendors, governance, and delivery.</p>
              <p className="mt-4 leading-8 text-body">We provide leadership within an agreed scope, working with your team to move priorities into execution.</p>
            </article>
            <article className={`h-full p-7 sm:p-8 ${card}`} aria-labelledby="founder-engagement-heading">
              <AccentRule className="mb-6" />
              <h3 id="founder-engagement-heading" className={h3}>Founder Advisory &amp; Coaching</h3>
              <p className="mt-5 leading-8 text-body">A trusted sounding board and structured leadership support for founders navigating decisions, delegation, team alignment, accountability, and technology choices.</p>
              <p className="mt-4 leading-8 text-body">We help you strengthen your leadership while you retain ownership of business decisions and execution.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={sectionBand} aria-labelledby="founder-coaching-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 id="founder-coaching-heading" className={h2}>Build the business—and your ability to lead it.</h2>
          <p className="mt-6 leading-8 text-body">Being a founder means making decisions before you have every answer. As your business grows, the challenge shifts from doing everything yourself to setting direction, developing people, and creating accountability.</p>
          <p className="mt-5 leading-8 text-body">2Nspira provides practical advisory and coaching for founders navigating that transition. Together, we work through the decisions, conversations, and leadership habits that influence how your business moves forward.</p>
          <p className="mt-8 font-semibold text-ink">We can help you:</p>
          <ul className="mt-4 list-disc space-y-3 pl-6 leading-8 text-body marker:text-accent">
            <li>Turn competing priorities into a focused execution plan.</li>
            <li>Delegate responsibility and establish clear ownership.</li>
            <li>Strengthen communication and alignment across your team.</li>
            <li>Evaluate technology investments and work more effectively with technical partners.</li>
            <li>Prepare for difficult decisions and hold yourself accountable to agreed actions.</li>
          </ul>
          <p className="mt-8 leading-8 text-body">Engagements can include focused advisory sessions, an ongoing coaching relationship, or coaching alongside fractional technology leadership.</p>
          <div className="mt-8"><Link href="/contact" className={buttonPrimary}>Talk through your next leadership challenge</Link></div>
        </div>
      </section>

      <section aria-labelledby="cio-service-heading">
        <header className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-28">
          <h2 id="cio-service-heading" className={h2}>Fractional CIO / Technology Leadership</h2>
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
            <Link href="/contact" className={buttonPrimary}>Start a leadership conversation</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
