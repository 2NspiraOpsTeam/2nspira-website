import InvoiceDemoFeature from "@/components/demos/InvoiceDemoFeature";
import offersStyles from "./offers.module.css";
import PlatformCarousel from "@/components/platforms/PlatformCarousel";
import { aiTools } from "@/lib/ai-tools";
import PageSections from "@/components/PageSections";
import { Compass, UsersRound, Workflow, Database, ShieldCheck, ChartNoAxesCombined, ArrowRight, Check } from "lucide-react";
import polish from "@/components/ServicePolish.module.css";
import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ServiceEffects from "@/components/ServiceEffects";
import ServiceQuestions from "@/components/ServiceQuestions";
import { BOOKING_URL } from "@/lib/booking";
import { EyebrowPill } from "@/components/VisualAccents";
import { h2, h3, lead, linkInline, pageMain, section, sectionBand, cardFlat, buttonPrimary, buttonSecondary } from "@/components/ui";

const description = "Practical AI consulting, employee training and implementation for organizations. Assess readiness, test useful workflows and support responsible AI adoption.";
export const metadata: Metadata = publicPageMetadata({
  title: "AI Consulting, Employee Training & Implementation", description, path: "/ai-enablement"
});

const offers = [
  {
    id: "ai-readiness", step: "01 · Readiness", title: "AI readiness assessment and strategy",
    problem: "Not sure where AI can help? Start with your people, priorities and the work.",
    deliverables: ["Stakeholder workshop and prioritized use-case shortlist", "Data and access constraints, staff training and an acceptable-use baseline for your review", "Phased adoption roadmap with a proposed pilot owner and success criteria"],
    boundary: "A scoped assessment is quoted separately from the initial conversation. A process change or ordinary automation may be the better answer.",
    cta: "Explore an AI readiness assessment"
  },
  {
    id: "ai-training", step: "02 · Training & adoption", title: "Practical AI training for employees",
    problem: "Turn tool access into practical team skills. Practice everyday tasks with role-based workshops, approved examples and clear review guidance.",
    deliverables: ["Role-based workshops and exercises using approved work examples", "Review checklists for accuracy, appropriate data use and human approval", "Practice guidance and follow-up office hours as agreed in your scope"],
    boundary: "Training is a separately scoped engagement. We agree tools, roles, session format, approved examples and follow-up availability before work begins; certification is not implied.",
    cta: "Discuss employee AI training"
  },
  {
    id: "ai-implementation", step: "03 · Implementation", title: "AI implementation services: start with one workflow",
    problem: "Have a workflow worth improving? Test one practical workflow before expanding it.",
    deliverables: ["One agreed workflow, approved test data and an access model", "Working pilot with evaluation cases, human review and failure handling", "Operator handoff and baseline-versus-pilot measurement report"],
    boundary: "Agree quality thresholds and stop criteria before testing. A pilot is not a promise of ROI or unrestricted autonomous access.",
    cta: "Discuss an AI pilot"
  },
  {
    id: "responsible-ai-support", step: "04 · Optional ongoing support", title: "Ongoing AI adoption support",
    problem: "Keep AI useful as needs change. Review quality, costs and the next improvements together.",
    deliverables: ["Scheduled answer-quality evaluations and usage/cost reviews", "Failure log, escalation ownership and access/governance reviews", "Prioritized improvements and a documented review cadence"],
    boundary: "Optional support is scoped separately. Systems, support hours, response targets and escalation responsibilities are agreed before contracting; no 24/7 coverage is implied.",
    cta: "Discuss ongoing AI support"
  }
];

const dimensionIcons = [Compass, UsersRound, Workflow, Database, ShieldCheck, ChartNoAxesCombined, ArrowRight, Check];
const dimensions = [
  { title: "Leadership & Strategy", text: "Leaders understand where AI creates value and how it supports organizational priorities." },
  { title: "People & Culture", text: "Employees have the skills, confidence, and support to work effectively alongside AI." },
  { title: "Processes & Operations", text: "Workflows are redesigned to reduce friction and combine human judgment with intelligent assistance." },
  { title: "Data & Technology", text: "Information and systems are prepared to support reliable, secure AI-enabled workflows." },
  { title: "Governance & Trust", text: "Clear policies, ownership, and oversight keep AI accountable and responsible." },
  { title: "Performance & Improvement", text: "The organization measures results, learns from experience, and improves how AI is used." }
];
const stages = [
  { title: "Discover", subtitle: "Understand where you are", text: "Assess leadership readiness, workforce skills, existing AI use, data quality, technology systems, operational friction, and governance needs.", output: "Organizational AI Readiness Assessment" },
  { title: "Align", subtitle: "Define where you want to go", text: "Develop an AI vision tied to business goals. Prioritize opportunities by value, feasibility, risk, and organizational capacity.", output: "AI Strategy and Prioritized Transformation Roadmap" },
  { title: "Prepare", subtitle: "Build organizational capability", text: "Establish policies, data safeguards, leadership accountability, workforce AI training, and the technical foundations for responsible adoption.", output: "AI Governance Framework and Workforce Enablement Plan" },
  { title: "Transform", subtitle: "Put AI into everyday operations", text: "Redesign selected workflows, implement appropriate AI tools or agents, integrate existing systems, and validate results with employees and leadership.", output: "Verified AI-Enabled Workflows and Implementation Playbooks" },
  { title: "Evolve", subtitle: "Measure, improve, and expand", text: "Monitor adoption, effectiveness, costs, quality, and risk. Refine the operating model and responsibly extend proven capabilities.", output: "AI Performance Scorecard and Continuous Improvement Roadmap" }
];
const questions = [
  { question: "Can you provide AI training for employees using our existing tools?", answer: "Yes—start with your current tools and the tasks your staff need help with. We confirm supported capabilities, licensing, permissions and approved examples before agreeing role-based training. New subscriptions are not automatically required." },
  { question: "What does an AI readiness assessment include?", answer: "An agreed assessment can include stakeholder findings, a prioritized use-case shortlist, data and access constraints, an acceptable-use baseline and a phased roadmap with a proposed pilot owner and success criteria. The exact deliverables are confirmed in the scope." },
  { question: "How much do AI consulting and training services cost?", answer: "Scope depends on the number of roles and participants, training format, workflow complexity, data readiness, integration requirements and support needs. We agree deliverables, schedule and pricing before work begins; training, assessments, implementation and ongoing support can be scoped separately." },
  { question: "Can we use confidential or student information?", answer: "Data use is agreed during scoping. Initial examples use synthetic or approved nonsensitive information. Any proposed sensitive-data use requires review of permissions, vendor terms, retention, access controls and applicable obligations before implementation. A pilot is not a compliance certification." },
  { question: "Do we need to choose an AI tool before we talk?", answer: "No. Start with your organizational priorities and the work you want to improve. Readiness, data, risks, and team capacity help determine whether an AI tool, a process change, or another approach is appropriate." },
  { question: "What should we bring to the first conversation?", answer: "Bring your priorities, an example workflow, current AI experiments, and the decisions you need help making. Do not include sensitive records or credentials in the booking form." }
];
const jsonLd = {
  "@context": "https://schema.org", "@type": "Service", "@id": "https://2nspira.com/ai-enablement#service",
  name: "Organizational AI Enablement", description,
  serviceType: ["AI consulting", "Employee AI training", "AI readiness assessment", "AI adoption strategy", "AI governance consulting", "Workforce AI training", "AI workflow implementation"],
  url: "https://2nspira.com/ai-enablement", provider: { "@id": "https://2nspira.com/#organization" }, areaServed: "Worldwide"
};

export default function Page() {
  return <main className={`${pageMain} ${polish.page} ${offersStyles.keyboardScrollPage}`} id="main-content"><ServiceEffects editorial>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <section data-service-hero className="border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-wrap gap-6"><Link href="/services" className={linkInline}>← All services</Link><Link href="/ai-team" className={linkInline}>Meet our human-led AI team →</Link></div>
        <div className="mt-4"><EyebrowPill>Organizational AI Enablement</EyebrowPill>
          <h1 className="mt-4 max-w-5xl text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.04em] text-ink">AI consulting, training and implementation for your organization</h1>
        </div>
        <div className="mt-8 grid items-center gap-9 lg:grid-cols-2">
          <div>
            <p className={lead}>Make AI useful in everyday work. 2Nspira helps your organization assess AI readiness, train employees and implement practical AI workflows—with clear policies and human oversight.</p>
            <p className="mt-4 leading-7 text-body">Get AI-ready. Put AI to work. Keep it accountable.</p>
            <div className="mt-7 flex flex-wrap gap-3"><Link href="/contact?service=ai#contact-message" className={buttonPrimary}>Discuss Your Project</Link><Link href="/resources/ai-readiness-scorecard" className={buttonSecondary}>Take the free readiness scorecard</Link><a href="#ai-offers-heading" className={buttonSecondary}>Find your starting point ↓</a></div>
          </div>
          <figure className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-xl"><Link href="/resources/ai-readiness-scorecard" className="block focus-visible:outline-2 focus-visible:outline-accent" aria-label="Explore the AI Readiness Scorecard">
            <Image src="/images/engagement/ai-readiness-screen-20261116.webp" alt="Actual AI Readiness Scorecard showing assessment sectors and practical readiness priorities." width={1440} height={1000} sizes="(min-width: 1024px) 552px, calc(100vw - 32px)" unoptimized fetchPriority="high" className="h-auto w-full" /></Link><figcaption className="border-t border-line px-5 py-4 text-xs leading-6 text-muted">Our AI Readiness Scorecard · Explore your starting point</figcaption>
          </figure>
        </div>
        <p className="mt-8 border-t border-line pt-5 text-sm font-medium text-muted">We don’t just help you adopt AI. We help you build the capabilities to succeed with it.</p>
      </div>
    </section>
    <PageSections items={[["ai-offers-heading", "Choose your starting point"], ["ai-training", "Team training"], ["invoice-workflow-demo", "Try the invoice demo"], ["ai-roadmap-heading", "See the path"], ["ai-work-heading", "Explore our work"]]} />
    <section className={sectionBand} aria-labelledby="ai-offers-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6">
      <EyebrowPill>Four ways forward</EyebrowPill>
      <h2 id="ai-offers-heading" className={`mt-5 scroll-mt-28 ${h2}`}>Start where you are.</h2>
      <p className={`max-w-2xl ${lead}`}>Choose the help your team needs now.</p>
      <nav aria-label="AI engagement options" className={offersStyles.choices}>{offers.map((offer, i) => <a key={offer.id} href={`#${offer.id}`} className={offersStyles.choice}><span>0{i + 1}</span>{["We need a plan", "We need team training", "We need implementation", "We need ongoing support"][i]}<ArrowRight size={18} aria-hidden="true" /></a>)}</nav>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">{offers.map((offer) => { return <article id={offer.id} key={offer.id} aria-labelledby={`${offer.id}-title`} className={`${offersStyles.offer} ${cardFlat}`}>
        <div className={offersStyles.offerBody}><p className="text-xs font-semibold uppercase tracking-widest text-accent">{offer.step}</p>
        <h3 id={`${offer.id}-title`} className={`mt-3 ${h3}`}>{offer.title}</h3>
        <p className="mt-3 leading-7 text-body">{offer.problem}</p>
        <details className={offersStyles.scopeDetails}><summary>What’s included</summary><ul className="mt-3 space-y-3 text-sm leading-6 text-body">{offer.deliverables.map(item => <li key={item} className="flex gap-2"><Check size={16} className="mt-1 shrink-0 text-accent" aria-hidden="true" />{item}</li>)}</ul><p className="mt-4 border-t border-line pt-4 text-sm leading-6 text-muted">{offer.boundary}</p></details>
        <Link href="/contact?service=ai#contact-message" className={`mt-auto min-h-11 ${linkInline} ${offersStyles.focusClearance}`}>{offer.cta} →</Link></div>
      </article>; })}</div>
      <p className="mt-6 flex items-start gap-3 text-sm leading-6 text-muted"><ShieldCheck size={20} className="shrink-0 text-accent" aria-hidden="true" />Your people stay in control, from the first workshop to the working pilot.</p>
    </div></section>
    <InvoiceDemoFeature editorial productScreen />
    <section id="ai-tools" aria-label="AI tools and platforms" className="mx-auto min-w-0 max-w-6xl scroll-mt-24 px-4 pb-10 sm:px-6">
          <PlatformCarousel platforms={aiTools} label="AI tool logos" listLabel="AI tools and platforms" description="AI tools & platforms we work with." notice="Names and logos belong to their respective owners. Inclusion reflects tool experience, not partnership, endorsement or certification." />
    </section>
    <section className={`${section} ${offersStyles.roadmapBand}`} aria-labelledby="ai-roadmap-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6">
      <EyebrowPill>A clear path, not a leap</EyebrowPill>
      <h2 id="ai-roadmap-heading" className={`mt-5 scroll-mt-28 ${h2}`}>Small steps. Shared confidence.</h2>
      <p className={`max-w-2xl ${lead}`}>Move from understanding the opportunity to improving real work. We adapt the path to your priorities.</p>
      <p className="mt-6 text-sm font-semibold tracking-wide text-accent">Discover → Align → Prepare → Implement → Improve</p>
      <details className={offersStyles.scopeDetails}><summary>Explore the five-stage approach</summary><div className="mt-5 grid gap-5 sm:grid-cols-2">{stages.map(stage => <div key={stage.title}><h3 className="font-medium text-ink">{stage.title}</h3><p className="mt-2 text-sm leading-6 text-body">{stage.text}</p><p className="mt-2 text-sm font-medium text-accent">{stage.output}</p></div>)}</div><p className="mt-5 text-sm leading-6 text-muted">Choose only the stages you need. Deliverables and responsibilities are agreed in your scope.</p></details>
      <details id="ai-capabilities-heading" className={offersStyles.scopeDetails}><summary>What makes an organization AI-ready?</summary><div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{dimensions.map((item, i) => { const Icon = dimensionIcons[i]; return <div key={item.title}><Icon aria-hidden="true" size={24} className="text-accent" /><h3 className="mt-3 font-medium text-ink">{item.title}</h3><p className="mt-2 text-sm leading-6 text-body">{item.text}</p></div>; })}</div></details>
    </div></section>
    <section className={sectionBand} aria-labelledby="ai-work-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">Practical experience. Not just AI theory.</p>
      <h2 id="ai-work-heading" className={`mt-3 ${h2}`}>We put AI to work—starting with our own operations.</h2>
      <p className={`max-w-2xl ${lead}`}>Explore our hands-on engineering and Jeffrey’s field notes from building a human-led AI team.</p>
      <Link href="/work#internal-engineering" className={`mt-5 min-h-11 ${linkInline}`}>Explore our internal AI engineering experience →</Link>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {[
          { image: "", width: 1672, height: 941, alt: "", eyebrow: "Hands-on AI practice", title: "An AI team still needs a human lead.", text: "Jeffrey shares lessons from building a multi-agent workflow: coordination, model choices, and human oversight.", href: "/post/building-ai-team-multi-agent-workflow-lessons", label: "Read the field notes" },
          { image: "/images/work/teams-homepage-20261113.webp", width: 1440, height: 1000, alt: "Teams Management property discovery website built by 2Nspira.", eyebrow: "Published project · Teams Management", title: "Make the next step easier to find.", text: "The challenge: help residents and businesses find the right property and reach the right team. We connected property discovery, galleries, location information and inquiry journeys in one website.", href: "/work", label: "Explore the project story" }
        ].map(item => <article key={item.title} className={`overflow-hidden ${cardFlat} ${!item.image ? "flex flex-col justify-center" : ""}`}>
          {item.image && <a href={item.href} className="block focus-visible:outline-2 focus-visible:outline-accent"><Image src={item.image} alt={item.alt} width={item.width} height={item.height} sizes="(min-width: 768px) 540px, calc(100vw - 32px)" unoptimized className="aspect-[16/9] w-full object-cover" /></a>}
          <div className="p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-widest text-accent">{item.eyebrow}</p><h3 className={`mt-3 ${h3}`}>{item.title}</h3><p className="mt-3 leading-7 text-body">{item.text}</p><a href={item.href} className={`mt-4 inline-flex min-h-11 items-center ${linkInline}`}>{item.label} →</a></div>
        </article>)}
      </div>
    </div></section>
    <section className={section} aria-labelledby="ai-leadership-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid items-center gap-8 md:grid-cols-[200px_1fr]"><Image src="/images/leadership/jeffrey-cortez-linkedin-20261103.jpg" alt="Portrait of Jeffrey V. Cortez." width={400} height={400} sizes="200px" unoptimized className="aspect-square w-full max-w-[200px] rounded-2xl object-cover" /><div><h2 id="ai-leadership-heading" className={h2}>Executive judgment. Hands-on technology experience.</h2>
      <p className={`max-w-3xl ${lead}`}>Led by Jeffrey V. Cortez. Technology leadership, enterprise systems and AI education—with a named human accountable for the work.</p>
      <Link href="/about#executive-profile" className={`mt-5 min-h-11 ${linkInline}`}>Meet Jeffrey and explore his leadership experience →</Link></div></div>
      <details className="mt-8 rounded-2xl border border-line bg-surface p-6"><summary className="min-h-11 cursor-pointer rounded py-2 font-medium text-ink focus-visible:outline-2 focus-visible:outline-accent">How our capabilities work together</summary><ul className="mt-4 space-y-4 leading-7 text-body"><li><Link href="/technology-advisory" className={linkInline}>Technology Leadership &amp; Advisory</Link> provides direction, investment priorities, and executive accountability.</li><li><Link href="/automation-systems-optimization" className={linkInline}>Business Automation &amp; Integrations</Link> improves the underlying operating model.</li><li>AI Enablement connects capability, governance, skills, and AI-enabled workflows.</li><li><Link href="/websites" className={linkInline}>Websites</Link> supports a clear customer-facing experience. <Link href="/custom-software-development" className={linkInline}>Custom Software Development</Link> connects operational applications and workflows where needed.</li></ul></details>
    </div></section>
    <section className={section} id="personal-ai-assistant" aria-labelledby="personal-agent-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6"><h2 id="personal-agent-heading" className={h2}>Looking for a personal AI assistant?</h2><p className={`max-w-2xl ${lead}`}>Explore setup and training around your own tasks, tools and working preferences.</p><Link href="/personal-ai-assistant" className={`mt-5 min-h-11 ${linkInline}`}>Explore personal AI assistant setup →</Link></div></section>
    <ServiceQuestions items={questions} />
    <section id="ai-conversation" className="mx-auto mb-16 max-w-6xl scroll-mt-24 px-4 sm:px-6" aria-labelledby="ai-cta-heading"><div className="rounded-[2rem] bg-ink px-6 py-12 sm:px-10"><span className="inline-flex rounded-full border border-white/30 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-ink">Start with readiness. Define the next step.</span><h2 id="ai-cta-heading" className="mt-5 max-w-3xl text-3xl font-medium tracking-tight text-white sm:text-4xl">Practical AI help for your people and workflows.</h2><p className="mt-4 max-w-3xl leading-7 text-white/80">Start with the free scorecard, or bring one workflow to a conversation. We’ll help you find a practical next step.</p><div className="mt-7 flex flex-wrap gap-4"><Link href="/resources/ai-readiness-scorecard" className={buttonPrimary}>Take the free AI Readiness Scorecard</Link><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Discuss your people and workflows <span className="sr-only">(Google Calendar, opens in a new tab)</span> ↗</a></div><p className="mt-4 text-sm leading-6 text-white/80">Choose an available time in Google Calendar for a conversation via Google Meet. Prefer a message? <Link href="/contact?service=ai#contact-message" className="rounded underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-white">Contact us</Link>. Please don’t include sensitive records or credentials.</p></div></section>
  </ServiceEffects></main>;
}
