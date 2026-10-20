import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageEffects from "@/components/catalog/CatalogEffects";
import styles from "./coaching.module.css";
import { AccentRule, AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { buttonPrimary, cardFlat, eyebrow, h1, h2, h3, lead, linkInline, pageMain, section, sectionBand } from "@/components/ui";

const description = "Personal mentoring for entrepreneurs from 2Nspira. Validate your business idea, develop your venture, and grow with mindset and leadership coaching.";
export const metadata: Metadata = {
  title: { absolute: "Entrepreneur Mentoring & Business Coaching | 2Nspira" }, description,
  alternates: { canonical: "/coaching" },
  openGraph: { type: "website", siteName: "2Nspira", title: "Build your business. Grow into the leader it needs.", description,
    url: "https://2nspira.com/coaching", images: [{ url: "https://2nspira.com/images/coaching/coaching-social-v1.png", width: 1200, height: 630, alt: "A purposeful path forward — Entrepreneur Mentoring & Coaching from 2Nspira" }] },
  twitter: { card: "summary_large_image", title: "Build your business. Grow into the leader it needs.", description, images: ["https://2nspira.com/images/coaching/coaching-social-v1.png"] },
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


const relationship = [
  { title: "Regular mentoring conversations", text: "We work through the decisions and challenges in front of you, review what you’re learning, and agree the next priorities." },
  { title: "Agreed actions", text: "Each conversation leads to clear actions and a way to review progress." },
  { title: "Personalized reading and exercises", text: "Books, resources, and practical exercises are chosen around your venture and leadership development." },
  { title: "Defined support between sessions", text: "We agree the scope, channels, and boundaries of support between sessions at the start of the relationship." },
];

export default function EntrepreneurMentoringPage() {
  const schema = { "@context": "https://schema.org", "@type": "Service", name: "Entrepreneur Mentoring & Coaching", description,
    url: "https://2nspira.com/coaching", provider: { "@id": "https://2nspira.com/#organization" }, areaServed: "Worldwide" };
  return <main id="main-content" className={pageMain}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <PageEffects>
    <header className="relative overflow-hidden border-b border-line bg-surface">
      <AmbientField />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <EyebrowPill>Entrepreneur Mentoring &amp; Coaching</EyebrowPill>
          <h1 className={h1}>Build your business. Grow into the leader it needs.</h1>
          <p className={lead}>Personal mentoring for entrepreneurs—from validating a product idea to navigating the challenges of leading a growing company.</p>
          <div className="mt-8"><Link href="/contact" className={`${buttonPrimary} min-h-[44px]`}>Discuss your business idea or leadership challenge</Link></div>
        </div>
        <figure className={`relative ${styles.hero}`} data-catalog-fade>
          <Image src="/images/coaching/purpose-to-progress.webp" alt="Conceptual sculpture of a navy path rising through open frames, connected by a golden line." width={1536} height={864} loading="eager" fetchPriority="high" className="h-auto w-full rounded-3xl border border-line" />
          <figcaption className="mt-4 text-sm tracking-wide text-muted">Purpose. Perspective. A practical path forward.</figcaption>
        </figure>
      </div>
    </header>

    <section aria-labelledby="mentor-heading" className={section}>
      <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className={eyebrow}>Meet your mentor</p>
          <h2 data-catalog-reveal id="mentor-heading" className={`mt-4 ${h2}`}>Jeffrey Cortez</h2>
          <p className="mt-5 leading-8 text-body">A product idea is a starting point. Building a company means understanding your customers, testing your assumptions, developing the right product, and growing into the responsibilities of leadership.</p>
          <p className="mt-5 leading-8 text-body">Drawing on my experience building four companies from the ground up, I mentor entrepreneurs through those decisions—from exploring an initial idea to developing a product and leading a growing business.</p>
          <p className="mt-5 leading-8 text-body">Our work combines practical business guidance with mindset and leadership coaching. You gain an experienced sounding board, honest feedback, and direction grounded in the challenges you face.</p>
        </div>
        <aside aria-labelledby="mentor-background-heading" className={`p-6 sm:p-8 ${cardFlat}`} data-catalog-card>
          <AccentRule className="mb-6" />
          <h3 id="mentor-background-heading" className={h3}>Build with purpose</h3>
          <p className="mt-4 leading-7 text-body">Jeffrey is the founder of 2Nspira and author of Trust Is the Operating System. His mentoring is focused on helping you build a business worth pursuing while developing your ability to lead it.</p>
          <Link href="/about" className={`mt-5 min-h-[44px] ${linkInline}`}>About Jeffrey and 2Nspira <span aria-hidden="true">&nbsp;→</span></Link>
        </aside>
      </div>
    </section>

    <section className={sectionBand} aria-labelledby="support-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 data-catalog-reveal id="support-heading" className={h2}>Three areas of support</h2>
        <p className="mt-5 max-w-2xl leading-7 text-body">A focused venture. Stronger leadership. Support to keep moving. Explore the areas that matter most to you.</p>
        <nav aria-label="Mentoring areas" className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {id: "build-the-right-business", number: "01", title: "Build the right business", text: "Understand your customers. Test your idea. Shape your product."},
            {id: "become-a-stronger-leader", number: "02", title: "Become a stronger leader", text: "Strengthen your judgment, resilience, and ability to lead others."},
            {id: "keep-moving-with-guidance", number: "03", title: "Keep moving with guidance", text: "Turn conversations into action, with a working plan and ongoing support."},
          ].map(({id,number,title,text}) => <Link key={id} href={`#${id}`} data-catalog-card className={`block p-6 ${cardFlat} ${styles.areaLink}`}>
            <span className="text-sm font-semibold tracking-widest text-accent">{number}</span>
            <span className="mt-4 block text-lg font-semibold text-ink">{title}</span>
            <span className="mt-3 block text-sm leading-6 text-body">{text}</span>
            <span aria-hidden="true" className="mt-5 block text-accent">Explore →</span>
          </Link>)}
        </nav>
        <section aria-labelledby="build-the-right-business" className="mt-12">
          <h3 id="build-the-right-business" className={`scroll-mt-24 ${h3}`}>Build the right business</h3>
          <h4 className="mt-5 font-semibold text-ink">Turn your idea into a business worth building</h4>
          <p className="mt-4 leading-8 text-body">Together, we work through the foundations of your venture:</p>
          <p className="mt-3 text-sm text-body">Open a topic to explore how we work on it together.</p>
          <div className="mt-6 grid items-start gap-4 md:grid-cols-2">
            {ventureFoundations.map(({ title, text }) => <details key={title} className={`p-5 sm:p-6 ${cardFlat} ${styles.disclosure}`}>
              <summary className={styles.summary}>{title}<span aria-hidden="true" className={styles.plus}>+</span></summary>
              <p className="mt-4 leading-7 text-body">{text}</p>
            </details>)}
          </div>
        </section>
        <section aria-labelledby="become-a-stronger-leader" className="mt-12 border-t border-line pt-10">
          <h3 id="become-a-stronger-leader" className={`scroll-mt-24 ${h3}`}>Become a stronger leader</h3>
          <h4 className="mt-5 font-semibold text-ink">Grow alongside your company</h4>
          <p className="mt-5 max-w-4xl leading-8 text-body">The business will challenge you personally as well as professionally. Our mentoring relationship also creates space to work on:</p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">{founderGrowth.map((item, index) => <li key={item} className={`flex items-start gap-4 p-5 leading-7 text-body ${cardFlat}`}><span aria-hidden="true" className="font-semibold text-accent">0{index + 1}</span><span>{item}</span></li>)}</ul>
        </section>
        <section aria-labelledby="keep-moving-with-guidance" className="mt-12 border-t border-line pt-10">
          <h3 id="keep-moving-with-guidance" className={`scroll-mt-24 ${h3}`}>Keep moving with guidance</h3>
          <p className="mt-5 max-w-4xl leading-8 text-body">I share relevant experiences, recommend books and resources, and help you turn those lessons into practical action. Regular conversations and agreed support between sessions give you a continuing relationship as your business evolves.</p>
          <dl className="mt-6 grid gap-5 md:grid-cols-2">{relationship.map(({title,text}) => <div key={title} className={`p-6 ${cardFlat}`}><dt className="font-semibold text-ink">{title}</dt><dd className="mt-3 leading-7 text-body">{text}</dd></div>)}</dl>
        </section>
      </div>
    </section>

    <section aria-labelledby="due-diligence-heading" className={section}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 data-catalog-reveal id="due-diligence-heading" className={h2}>Your Entrepreneur Due Diligence Document</h2>
        <p className="mt-5 leading-8 text-body">We bring your thinking and research together in a working document that helps you decide what to pursue, what to test, and where to invest your time and money.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="Working document focus">
          {["Make assumptions visible", "Gather real evidence", "Choose the next action"].map((item,index) => <div key={item} className={`p-5 ${cardFlat}`}><span className="text-sm font-semibold text-accent">0{index+1}</span><p className="mt-3 font-semibold text-ink">{item}</p></div>)}
        </div>
        <details className={`mt-6 p-6 ${cardFlat} ${styles.disclosure}`}>
          <summary className={styles.summary}>Explore the eight-part working outline<span aria-hidden="true" className={styles.plus}>+</span></summary>
          <h3 className={`mt-6 ${h3}`}>A sample working outline</h3>
          <p className="mt-4 leading-7 text-body">Your document captures:</p>
          <ol className="mt-4 grid list-decimal gap-x-10 gap-y-3 pl-6 leading-8 text-body marker:text-accent md:grid-cols-2">{dueDiligenceContents.map(item => <li key={item}>{item}</li>)}</ol>
        </details>
        <p className="mt-6 leading-8 text-body">This document evolves as you learn, making your assumptions and evidence visible before you make larger commitments.</p>
      </div>
    </section>

    <section aria-labelledby="working-together-heading" className={sectionBand}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 data-catalog-reveal id="working-together-heading" className={h2}>How working together works</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article data-catalog-card className={`p-6 ${cardFlat}`}><p aria-hidden="true" className="text-sm font-semibold tracking-widest text-accent">01</p><h3 className={`mt-4 ${h3}`}>Start with an introductory conversation</h3><p className="mt-4 leading-7 text-body">We discuss your business idea, current challenges, and what you want to develop as a leader. Together, we decide whether the mentoring relationship fits your needs.</p></article>
          <article data-catalog-card className={`p-6 ${cardFlat}`}><p aria-hidden="true" className="text-sm font-semibold tracking-widest text-accent">02</p><h3 className={`mt-4 ${h3}`}>Agree priorities and actions</h3><p className="mt-4 leading-7 text-body">We identify the decisions and skills that need attention first, agree practical actions, and review what you learn as your business develops.</p></article>
          <article data-catalog-card className={`p-6 ${cardFlat}`}><p aria-hidden="true" className="text-sm font-semibold tracking-widest text-accent">03</p><h3 className={`mt-4 ${h3}`}>Define the rhythm and support</h3><p className="mt-4 leading-7 text-body">We agree session frequency and duration, the scope and channels of support between sessions, and response expectations before the engagement begins.</p></article>
        </div>
        <div className={`mt-8 p-6 ${cardFlat}`}><h3 className={h3}>Mentoring, not done-for-you development</h3><p className="mt-4 leading-8 text-body">We help you strengthen your leadership while you retain ownership of business decisions and execution. Mentoring supports your judgment, plans, and actions; it is not done-for-you product development or outsourced operational delivery.</p></div>
      </div>
    </section>

    <section aria-labelledby="mentoring-cta-heading" className={section}>
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 data-catalog-reveal id="mentoring-cta-heading" className={h2}>An experienced mentor for the company you’re building—and the leader you’re becoming.</h2>
        <div className="mt-8"><Link href="/contact" className={`${buttonPrimary} min-h-[44px]`}>Start a mentoring conversation</Link></div>
      </div>
    </section>
    </PageEffects>
  </main>;
}
