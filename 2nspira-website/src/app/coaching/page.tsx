import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, CalendarDays, Video, Compass, UserRound, Handshake, Lightbulb, Users, Search, Layers, Target, BriefcaseBusiness, Brain, Focus, MessageSquare, BookOpen, ClipboardList, FileText, CheckCircle2, ShieldCheck } from "lucide-react";
import PageEffects from "./CoachingEffects";
import styles from "./coaching.module.css";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { buttonPrimary, cardFlat, eyebrow, h1, h2, h3, lead, linkInline, pageMain, section } from "@/components/ui";

const description = "Industry-aligned entrepreneur mentoring from 2Nspira. Develop your venture, strengthen leadership, and move forward with one-on-one business coaching.";
export const metadata: Metadata = {
  title: { absolute: "Entrepreneur Mentoring & Business Coaching | 2Nspira" }, description,
  alternates: { canonical: "/coaching" },
  openGraph: { type: "website", siteName: "2Nspira", title: "Build your business. Grow into the leader it needs.", description,
    url: "https://2nspira.com/coaching", images: [{ url: "https://2nspira.com/images/coaching/coaching-social-v5.jpg", width: 1200, height: 630, alt: "One-on-one entrepreneur mentoring in an industrial creative studio — illustrative scene" }] },
  twitter: { card: "summary_large_image", title: "Build your business. Grow into the leader it needs.", description, images: ["https://2nspira.com/images/coaching/coaching-social-v5.jpg"] },
};

const ventureFoundations = [
  {
    "title": "Design thinking",
    icon: Lightbulb,
    "text": "Understand the people experiencing the problem, challenge assumptions, explore possible solutions, and test early concepts."
  },
  {
    "title": "Ideal customer persona",
    icon: Users,
    "text": "Identify who you serve, their needs, buying motivations, alternatives, and decision process. Distinguish the person using your product from the person paying for it."
  },
  {
    "title": "Customer discovery and validation",
    icon: Search,
    "text": "Learn how to interview potential customers and gather evidence of a meaningful problem and willingness to pay."
  },
  {
    "title": "Product development",
    icon: Layers,
    "text": "Translate what you learn into a value proposition, prototypes, a focused minimum viable product, and a practical development roadmap."
  },
  {
    "title": "Product–market fit",
    icon: Target,
    "text": "Test whether customers consistently choose, use, pay for, and return to your solution. Use the evidence to refine your product and positioning."
  },
  {
    "title": "Business model and go-to-market",
    icon: BriefcaseBusiness,
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


const growthIcons = [Brain, Compass, Focus, MessageSquare, Users];

const relationship = [
  { icon: MessageSquare, title: "Regular one-on-one conversations", text: "We work through the decisions and challenges in front of you, review what you’re learning, and agree the next priorities." },
  { icon: ClipboardList, title: "Agreed actions", text: "Each conversation leads to clear actions and a way to review progress." },
  { icon: BookOpen, title: "Personalized reading and exercises", text: "Books, resources, and practical exercises are chosen around your venture and leadership development." },
  { icon: Handshake, title: "Defined support between sessions", text: "We agree the scope, channels, and boundaries of support between sessions at the start of the relationship." },
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
          <p className={lead}>One-on-one mentoring for entrepreneurs—from validating a product idea to navigating the challenges of leading a growing company. Matched with a coach aligned with your industry.</p>
          <ul aria-label="Typical mentoring sessions" className="mt-6 flex flex-wrap gap-2 text-sm text-body">
            <li className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-2"><Clock aria-hidden="true" size={17} />Usually 1 hour</li>
            <li className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-2"><CalendarDays aria-hidden="true" size={17} />Usually weekly</li>
            <li className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-2"><Video aria-hidden="true" size={17} />Zoom · In person when possible</li>
          </ul>
          <div className="mt-8"><Link href="/contact" className={`${buttonPrimary} min-h-[44px]`}>Discuss your business idea or leadership challenge</Link></div>
        </div>
        <figure className={`relative ${styles.hero}`} data-catalog-fade>
          <Image src="/images/coaching/creative-mentoring-hero-v5.webp" alt="Illustrative scene of one entrepreneur and one mentor in an executive conversation in an industrial creative studio." width={1536} height={864} loading="eager" fetchPriority="high" className="h-auto w-full rounded-3xl border border-line" />
          <figcaption className="mt-4 text-sm tracking-wide text-muted">Space to think. Support to move forward.</figcaption>
        </figure>
      </div>
    </header>

    <section aria-labelledby="mentor-heading" className={`${styles.sectionSpacing} ${styles.mentorBand}`}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className={eyebrow}>Industry-aligned guidance</p>
          <h2 data-catalog-reveal id="mentor-heading" className={`mt-4 ${h2}`}>Matched to your business.</h2>
          <p className="mt-5 leading-8 text-body">2Nspira matches you with a coach aligned with your industry, business priorities, and stage of development. We start with the decisions and leadership challenges you face.</p>
          <p className="mt-5 leading-8 text-body">Our work combines practical business guidance with mindset and leadership coaching. You gain an experienced sounding board, honest feedback, and direction grounded in the challenges you face.</p>
          <Link href="/about" className={`mt-6 min-h-[44px] ${linkInline}`}>About 2Nspira <span aria-hidden="true">&nbsp;→</span></Link>
        </div>
        <aside aria-labelledby="mentor-background-heading" className={styles.mentorNote} data-catalog-fade>
          <span className={styles.iconBadge}><Handshake aria-hidden="true" size={28} strokeWidth={1.6} /></span>
          <h3 id="mentor-background-heading" className={`mt-6 ${h3}`}>Industry leaders. Individual support.</h3>
          <p className="mt-5 leading-8 text-body">A handful of industry leaders are available to coach you.</p>
          <p className="mt-3 text-sm leading-7 text-body">Our mentoring is focused on helping you build a business worth pursuing while developing your ability to lead it.</p>
        </aside>
      </div>
    </section>

    <section aria-labelledby="support-heading">
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${styles.sectionSpacing}`}>
        <h2 data-catalog-reveal id="support-heading" className={h2}>Three areas of support</h2>
        <p className="mt-5 max-w-2xl leading-7 text-body">A focused venture. Stronger leadership. Support to keep moving. Explore the areas that matter most to you.</p>
        <nav aria-label="Mentoring areas" className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {id: "build-the-right-business", icon: Compass, number: "01", title: "Build the right business", text: "Understand your customers. Test your idea. Shape your product."},
            {id: "become-a-stronger-leader", icon: UserRound, number: "02", title: "Become a stronger leader", text: "Strengthen your judgment, resilience, and ability to lead others."},
            {id: "keep-moving-with-guidance", icon: Handshake, number: "03", title: "Keep moving with guidance", text: "Turn conversations into action, with a working plan and ongoing support."},
          ].map(({id,icon: Icon,number,title,text}) => <Link key={id} href={`#${id}`} data-catalog-card className={`block p-6 ${cardFlat} ${styles.areaLink}`}>
            <div className="flex items-center justify-between"><span className={styles.iconBadge}><Icon aria-hidden="true" size={24} strokeWidth={1.6} /></span><span aria-hidden="true" className="text-sm font-semibold tracking-widest text-accent">{number}</span></div>
            <span className="mt-5 block text-lg font-semibold text-ink">{title}</span>
            <span className="mt-3 block text-sm leading-6 text-body">{text}</span>
            <span aria-hidden="true" className={`mt-5 block text-accent ${styles.explore}`}>Explore <span>→</span></span>
          </Link>)}
        </nav>
      </div>

      <section aria-labelledby="build-the-right-business" className={`${styles.sectionSpacing} ${styles.ventureBand}`}>
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.4fr]">
          <div>
            <span aria-hidden="true" className={styles.sectionNumber}>01 / Your venture</span>
            <h3 data-catalog-reveal id="build-the-right-business" className={`mt-4 scroll-mt-24 ${styles.pillarHeading}`}>Build the right business</h3>
            <h4 className="mt-5 text-lg font-medium text-ink">Turn your idea into a business worth building</h4>
            <p className="mt-4 leading-8 text-body">Together, we work through the foundations of your venture:</p>
            <p className="mt-4 text-sm leading-7 text-body">Open a topic to explore how we work on it together.</p>
          </div>
          <div className="grid items-start gap-3 sm:grid-cols-2">
            {ventureFoundations.map(({ title, text, icon: Icon }) => <details key={title} className={`p-5 ${cardFlat} ${styles.disclosure}`}>
              <summary className={styles.summary}><span className={styles.summaryTitle}><Icon aria-hidden="true" size={22} strokeWidth={1.7} /><span>{title}</span></span><span aria-hidden="true" className={styles.plus}>+</span></summary>
              <p className="mt-4 leading-7 text-body">{text}</p>
            </details>)}
          </div>
        </div>
      </section>

      <section aria-labelledby="become-a-stronger-leader" className={styles.sectionSpacing}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className={styles.leadershipBoard}>
            <div>
              <span aria-hidden="true" className={styles.inverseNumber}>02 / Your leadership</span>
              <h3 data-catalog-reveal id="become-a-stronger-leader" className={`mt-4 scroll-mt-24 ${styles.inverseHeading}`}>Become a stronger leader</h3>
              <h4 className={`mt-5 text-lg font-medium ${styles.inverseText}`}>Grow alongside your company</h4>
              <p className={`mt-5 leading-8 ${styles.inverseText}`}>The business will challenge you personally as well as professionally. Our mentoring relationship also creates space to work on:</p>
              <div aria-hidden="true" className={styles.leadershipSymbol}><UserRound size={68} strokeWidth={1} /></div>
            </div>
            <ul className={styles.leadershipList}>{founderGrowth.map((item, index) => { const Icon = growthIcons[index] ?? Focus; return <li key={item} data-coaching-step><span className={styles.inverseIcon}><Icon aria-hidden="true" size={22} strokeWidth={1.6} /></span><span>{item}</span></li>; })}</ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="keep-moving-with-guidance" className={`${styles.sectionSpacing} ${styles.guidanceBand}`}>
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <span aria-hidden="true" className={styles.sectionNumber}>03 / Your support</span>
            <h3 data-catalog-reveal id="keep-moving-with-guidance" className={`mt-4 scroll-mt-24 ${styles.pillarHeading}`}>Keep moving with guidance</h3>
            <p className="mt-5 max-w-xl leading-8 text-body">Your coach shares relevant experiences, recommends books and resources, and helps you turn those lessons into practical action. Regular conversations and agreed support between sessions give you a continuing relationship as your business evolves.</p>
          </div>
          <dl className={styles.supportTimeline}>{relationship.map(({title,text,icon: Icon}) => <div key={title} data-coaching-step className={styles.supportStep}><dt className="font-semibold text-ink"><span aria-hidden="true" className={styles.timelineIcon}><Icon size={22} strokeWidth={1.7} /></span>{title}</dt><dd className="mt-2 leading-7 text-body">{text}</dd></div>)}</dl>
        </div>
      </section>
    </section>

    <section aria-labelledby="due-diligence-heading" className={`${styles.sectionSpacing} ${styles.documentBand}`}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <span aria-hidden="true" className={styles.iconBadge}><FileText size={26} strokeWidth={1.5} /></span>
          <h2 data-catalog-reveal id="due-diligence-heading" className={`mt-6 ${h2}`}>Your Entrepreneur Due Diligence Document</h2>
          <p className="mt-5 leading-8 text-body">We bring your thinking and research together in a working document that helps you decide what to pursue, what to test, and where to invest your time and money.</p>
          <ul className="mt-6 space-y-4" aria-label="Working document focus">{["Make assumptions visible", "Gather real evidence", "Choose the next action"].map(item => <li key={item} className="flex items-center gap-3 font-medium text-ink"><CheckCircle2 aria-hidden="true" className="shrink-0 text-accent" size={21} strokeWidth={1.7} /><span>{item}</span></li>)}</ul>
          <p className="mt-6 leading-8 text-body">This document evolves as you learn, making your assumptions and evidence visible before you make larger commitments.</p>
        </div>
        <div className={styles.documentPreview} data-catalog-fade>
          <div className={styles.documentTop}><FileText aria-hidden="true" size={22} /><span>Working document</span><span className={styles.sampleLabel}>Sample outline</span></div>
          <div className="p-6 sm:p-8">
            <p className="text-lg font-semibold text-ink">Entrepreneur Due Diligence</p>
            <div aria-hidden="true" className={styles.documentLines}>
              <div><span>01</span><span>Purpose &amp; problem</span></div><div><span>02</span><span>Customer evidence</span></div><div><span>03</span><span>Priorities &amp; actions</span></div>
            </div>
            <details className={`mt-6 border-t border-line pt-4 ${styles.disclosure}`}>
              <summary className={styles.summary}>Explore the eight-part working outline<span aria-hidden="true" className={styles.plus}>+</span></summary>
              <h3 className={`mt-6 ${h3}`}>A sample working outline</h3>
              <p className="mt-4 leading-7 text-body">Your document captures:</p>
              <ol className="mt-4 list-decimal space-y-3 pl-6 leading-7 text-body marker:text-accent">{dueDiligenceContents.map(item => <li key={item}>{item}</li>)}</ol>
            </details>
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="working-together-heading" className={`${styles.sectionSpacing} ${styles.processBand}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 data-catalog-reveal id="working-together-heading" className={h2}>How working together works</h2>
        <ol className={styles.processSteps} aria-label="Mentoring process">
          <li><article data-catalog-card className={`p-6 sm:p-7 ${cardFlat}`}><div className={styles.stepTop}><span className={styles.iconBadge}><MessageSquare aria-hidden="true" size={24} /></span><span aria-hidden="true">01</span></div><h3 className={`mt-6 ${h3}`}>Start with an introductory conversation</h3><p className="mt-4 leading-7 text-body">We discuss your business idea, industry, current challenges, and what you want to develop as a leader. We then match you with a coach aligned with your industry and priorities.</p></article></li>
          <li><article data-catalog-card className={`p-6 sm:p-7 ${cardFlat}`}><div className={styles.stepTop}><span className={styles.iconBadge}><ClipboardList aria-hidden="true" size={24} /></span><span aria-hidden="true">02</span></div><h3 className={`mt-6 ${h3}`}>Agree priorities and actions</h3><p className="mt-4 leading-7 text-body">We identify the decisions and skills that need attention first, agree practical actions, and review what you learn as your business develops.</p></article></li>
          <li><article data-catalog-card className={`p-6 sm:p-7 ${cardFlat}`}><div className={styles.stepTop}><span className={styles.iconBadge}><Compass aria-hidden="true" size={24} /></span><span aria-hidden="true">03</span></div><h3 className={`mt-6 ${h3}`}>Define the rhythm and support</h3><p className="mt-4 leading-7 text-body">Sessions are usually one hour, once a week, via Zoom or in person when possible. We agree the schedule, the scope and channels of support between sessions, and response expectations before the engagement begins.</p></article></li>
        </ol>
        <div className={styles.scopeNote}><ShieldCheck aria-hidden="true" size={32} strokeWidth={1.5} /><h3 className={h3}>Mentoring, not done-for-you development</h3><p className="leading-8 text-body">We help you strengthen your leadership while you retain ownership of business decisions and execution. Mentoring supports your judgment, plans, and actions; it is not done-for-you product development or outsourced operational delivery.</p></div>
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
