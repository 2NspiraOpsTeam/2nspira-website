import ServiceJourney from "@/components/ServiceJourney";
import PlatformCarousel from "@/components/platforms/PlatformCarousel";
import { aiTools } from "@/lib/ai-tools";
import PageSections from "@/components/PageSections";
import { Compass, UsersRound, Workflow, Database, ShieldCheck, ChartNoAxesCombined } from "lucide-react";
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

const description = "Become an AI-enabled organization with 2Nspira. Align strategy, people, processes, and technology through practical AI consulting, training, and governance.";
export const metadata: Metadata = publicPageMetadata({
  title: "AI Transformation & Enablement Consulting", description, path: "/ai-enablement"
});

const dimensionIcons = [Compass, UsersRound, Workflow, Database, ShieldCheck, ChartNoAxesCombined];
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
const applications = [
  { title: "Executive leadership", text: "Faster access to useful information, better decision support, and clearer visibility." },
  { title: "Operations", text: "Fewer repetitive tasks, more consistent handoffs, and improved workflow coordination." },
  { title: "Customer service", text: "More timely responses, better knowledge access, and smoother service experiences." },
  { title: "Finance & administration", text: "Assisted document processing, reconciliation support, and reporting—with human review." },
  { title: "Human resources", text: "Knowledge assistance, onboarding support, and training resources with appropriate controls." },
  { title: "Education & nonprofits", text: "Administrative efficiency, staff support, improved information access, and mission-focused service delivery." }
];
const questions = [
  { question: "Do we need to choose an AI tool before we talk?", answer: "No. Start with your organizational priorities and the work you want to improve. Readiness, data, risks, and team capacity help determine whether an AI tool, a process change, or another approach is appropriate." },
  { question: "Does every engagement include all five stages?", answer: "No. The roadmap is a flexible framework, not a fixed package. We agree the stages, deliverables, implementation responsibilities, and any ongoing support for your organization before work begins." },
  { question: "How does the free scorecard differ from a readiness engagement?", answer: "The AI Readiness Scorecard is a self-guided starting point. A scoped organizational readiness engagement can examine leadership, people, workflows, data, technology, and governance in greater depth, with agreed findings and priorities." },
  { question: "What should we bring to the first conversation?", answer: "Bring your priorities, an example workflow, current AI experiments, and the decisions you need help making. Do not include sensitive records or credentials in the booking form." }
];
const jsonLd = {
  "@context": "https://schema.org", "@type": "Service", "@id": "https://2nspira.com/ai-enablement#service",
  name: "Organizational AI Transformation & Enablement Consulting", description,
  serviceType: ["Organizational AI transformation", "AI readiness assessment", "AI adoption strategy", "AI governance consulting", "Workforce AI training", "AI workflow implementation"],
  url: "https://2nspira.com/ai-enablement", provider: { "@id": "https://2nspira.com/#organization" }, areaServed: "Worldwide"
};

export default function Page() {
  return <main className={`${pageMain} ${polish.page}`} id="main-content"><ServiceEffects editorial>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <section data-service-hero className="border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-wrap gap-6"><Link href="/services" className={linkInline}>← All services</Link><Link href="/ai-team" className={linkInline}>Meet our human-led AI team →</Link></div>
        <div className="mt-4"><EyebrowPill>AI Enablement &amp; Organizational Transformation</EyebrowPill>
          <h1 className="mt-4 max-w-5xl text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.04em] text-ink">Move beyond using AI. Become an AI-enabled organization.</h1>
        </div>
        <section id="ai-tools" aria-label="AI tools and platforms" className="min-w-0 scroll-mt-24">
          <PlatformCarousel platforms={aiTools} label="AI tool logos" listLabel="AI tools and platforms" description="AI tools & platforms we work with." notice="Names and logos belong to their respective owners. Inclusion reflects tool experience, not partnership, endorsement or certification." />
        </section>
        <div className="mt-8 grid items-center gap-9 lg:grid-cols-2">
          <div>
            <p className={lead}>Align your people, workflows, and technology so AI supports useful, accountable work—not just more experiments.</p>
            <p className="mt-4 leading-7 text-body">Start with readiness. Build the right skills and safeguards. Improve one workflow, then learn and expand.</p>
            <div className="mt-7 flex flex-wrap gap-3"><Link href="/resources/ai-readiness-scorecard" className={buttonPrimary}>Explore your organization’s AI readiness</Link><a href="#ai-conversation" className={buttonSecondary}>Talk about your AI transformation ↓</a></div>
          </div>
          <figure className="overflow-hidden rounded-[2rem] border border-line shadow-xl">
            <Image src="/images/hero/ai-human-led-v3.webp" alt="Three professionals reviewing connected digital workflows together in an AI operations workspace." width={1536} height={1024} sizes="(min-width: 1024px) 552px, calc(100vw - 32px)" unoptimized fetchPriority="high" className="h-auto w-full" />
          </figure>
        </div>
        <p className="mt-8 border-t border-line pt-5 text-sm font-medium text-muted">We don’t just help you adopt AI. We help you build the capabilities to succeed with it.</p>
      </div>
    </section>
    <ServiceJourney service="ai" />
    <PageSections items={[["ai-tools", "Tools & platforms"], ["ai-capabilities-heading", "Build capability"], ["ai-roadmap-heading", "Your roadmap"], ["ai-work-heading", "See it in practice"], ["personal-ai-assistant", "Personal AI assistance"]]} />
    <section className={section} aria-labelledby="ai-capabilities-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6">
      <EyebrowPill>What an AI-enabled organization looks like</EyebrowPill>
      <h2 id="ai-capabilities-heading" className={`mt-5 max-w-3xl ${h2}`}>AI isn’t another tool. It’s a new organizational capability.</h2>
      <p className={`max-w-3xl ${lead}`}>An AI-enabled organization isn’t one that uses AI. It’s one that works better because of it. Six connected dimensions help turn isolated experiments into lasting organizational capability.</p>
      <details className="mt-6 rounded-2xl border border-line bg-surface p-5"><summary className="min-h-11 cursor-pointer rounded py-2 font-medium text-accent focus-visible:outline-2 focus-visible:outline-accent">Explore the six dimensions of AI capability</summary><div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{dimensions.map((item, i) => { const Icon = dimensionIcons[i]; return <article key={item.title} className={`p-6 ${cardFlat}`}><span data-story-icon><Icon aria-hidden="true" className="h-6 w-6" /></span><h3 className={h3}>{item.title}</h3><p className="mt-3 leading-7 text-body">{item.text}</p></article>; })}</div></details>
    </div></section>
    <section className={sectionBand} aria-labelledby="ai-roadmap-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6">
      <EyebrowPill>From readiness to an AI-enabled operating model</EyebrowPill>
      <h2 id="ai-roadmap-heading" className={`mt-5 ${h2}`}>Your path to becoming AI-enabled</h2>
      <p className={`max-w-3xl ${lead}`}>A practical transformation framework, adapted to your organization’s size, readiness, and priorities.</p>
      <details className="mt-6 rounded-2xl border border-line bg-surface p-5"><summary className="min-h-11 cursor-pointer rounded py-2 font-medium text-accent focus-visible:outline-2 focus-visible:outline-accent">Explore the transformation roadmap</summary><ol className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{stages.map((stage, i) => <li data-process-step key={stage.title} className={`p-6 ${cardFlat}`}><span data-step-number className="text-sm font-semibold text-accent">0{i+1}</span><h3 className={`mt-3 ${h3}`}>{stage.title}</h3><p className="mt-2 font-medium text-ink">{stage.subtitle}</p><p className="mt-3 leading-7 text-body">{stage.text}</p><details className="mt-5 border-t border-line pt-2"><summary className="min-h-11 cursor-pointer rounded py-3 font-medium text-accent focus-visible:outline-2 focus-visible:outline-accent">Potential deliverable</summary><p className="pb-3 text-sm leading-7 text-body">{stage.output}</p></details></li>)}</ol></details>
      <p className="mt-6 max-w-3xl text-sm leading-7 text-muted">These are proposed stages and deliverables, not a promise that every project includes all five. Scope, implementation responsibilities, validation criteria, and ongoing support are defined for each client.</p>
    </div></section>
    <section className={section} aria-labelledby="ai-outcomes-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6">
      <h2 id="ai-outcomes-heading" className={`max-w-3xl ${h2}`}>What changes when your organization becomes AI-enabled?</h2>
      <p className={`max-w-3xl ${lead}`}>Start with the work and the people it serves. These are potential applications—not guaranteed results. Suitability depends on your data, systems, controls, and agreed scope.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{applications.map(item => <article key={item.title} className={`p-6 ${cardFlat}`}><h3 className={h3}>{item.title}</h3><p className="mt-3 leading-7 text-body">{item.text}</p></article>)}</div>
      <aside className="mt-8 rounded-2xl border border-line bg-accent-soft p-6 sm:p-8"><h3 className={h3}>Define success before implementation.</h3><p className="mt-3 max-w-3xl leading-7 text-body">Baseline the measures that matter, then compare results: time saved, rework reduced, task quality, staff adoption, cost per workflow, and risk incidents. Review value alongside quality and safeguards—not speed alone.</p></aside>
    </div></section>
    <section className={sectionBand} aria-labelledby="ai-work-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">Practical experience. Not just AI theory.</p>
      <h2 id="ai-work-heading" className={`mt-3 ${h2}`}>We put AI to work—starting with our own operations.</h2>
      <p className={`max-w-2xl ${lead}`}>Our internal AI engineering, workflow design, and human-led coordination of intelligent agents inform how we approach reliable, sustainable AI-supported work. This is internal engineering experience, not a claim of independently verified client outcomes.</p>
      <Link href="/work#internal-engineering" className={`mt-5 min-h-11 ${linkInline}`}>Explore our internal AI engineering experience →</Link>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {[
          { image: "/images/posts/ai-agents-human-accountability-20261030.webp", width: 1672, height: 941, alt: "Illustration of a human overseeing many connected AI workspaces.", eyebrow: "Hands-on AI practice", title: "An AI team still needs a human lead.", text: "Jeffrey shares lessons from building a multi-agent workflow: coordination, model choices, and human oversight.", href: "/post/building-ai-team-multi-agent-workflow-lessons", label: "Read the field notes" },
          { image: "/images/work/manufacturing-command-center-card.webp", width: 1100, height: 503, alt: "Manufacturing operations showcase showing connected production, quality, and inventory dashboards.", eyebrow: "Operational systems showcase", title: "Useful AI starts with connected work.", text: "Try our interactive manufacturing demo with fictional data. Explore connected workflows and accountability; its assistant uses local rules, not a live AI model.", href: "https://demo.2nspira.com/manufacturing/", label: "Explore the manufacturing demo" }
        ].map(item => <article key={item.title} className={`overflow-hidden ${cardFlat}`}>
          <a href={item.href} className="block focus-visible:outline-2 focus-visible:outline-accent"><Image src={item.image} alt={item.alt} width={item.width} height={item.height} sizes="(min-width: 768px) 540px, calc(100vw - 32px)" unoptimized className="aspect-[16/9] w-full object-cover" /></a>
          <div className="p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-widest text-accent">{item.eyebrow}</p><h3 className={`mt-3 ${h3}`}>{item.title}</h3><p className="mt-3 leading-7 text-body">{item.text}</p><a href={item.href} className={`mt-4 inline-flex min-h-11 items-center ${linkInline}`}>{item.label} →</a></div>
        </article>)}
      </div>
    </div></section>
    <section className={section} aria-labelledby="ai-leadership-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6">
      <h2 id="ai-leadership-heading" className={h2}>Executive judgment. Hands-on technology experience.</h2>
      <p className={`max-w-3xl ${lead}`}>Led by Jeffrey V. Cortez, whose experience spans technology leadership, enterprise systems, data modernization, and AI education. His qualifications include an Executive M.S. in Technology Management from Columbia University and a B.S. in Computer Science from Queens College, CUNY.</p>
      <Link href="/about#executive-profile" className={`mt-5 min-h-11 ${linkInline}`}>Meet Jeffrey and explore his leadership experience →</Link>
      <details className="mt-8 rounded-2xl border border-line bg-surface p-6"><summary className="min-h-11 cursor-pointer rounded py-2 font-medium text-ink focus-visible:outline-2 focus-visible:outline-accent">How our capabilities work together</summary><ul className="mt-4 space-y-4 leading-7 text-body"><li><Link href="/technology-advisory" className={linkInline}>Technology Advisory & Leadership</Link> provides direction, investment priorities, and executive accountability.</li><li><Link href="/automation-systems-optimization" className={linkInline}>Business Automation &amp; Integrations</Link> improves the underlying operating model.</li><li>AI Enablement connects capability, governance, skills, and AI-enabled workflows.</li><li><Link href="/websites" className={linkInline}>Websites &amp; Custom Digital Platforms</Link> delivers customer-facing or operational applications where needed.</li></ul></details>
    </div></section>
    <ServiceQuestions items={questions} />
    <section id="ai-conversation" className="mx-auto mb-16 max-w-6xl scroll-mt-24 px-4 sm:px-6" aria-labelledby="ai-cta-heading"><div className="rounded-[2rem] bg-ink px-6 py-12 sm:px-10"><span className="inline-flex rounded-full border border-white/30 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-ink">Start with readiness. Define the next step.</span><h2 id="ai-cta-heading" className="mt-5 max-w-3xl text-3xl font-medium tracking-tight text-white sm:text-4xl">Build an organization capable of thriving with AI.</h2><p className="mt-4 max-w-3xl leading-7 text-white/80">Use the free AI Readiness Scorecard to surface strengths and gaps. Then bring your priorities, current experiments, and an example workflow to a focused conversation about organizational readiness and transformation.</p><div className="mt-7 flex flex-wrap gap-4"><Link href="/resources/ai-readiness-scorecard" className={buttonPrimary}>Take the free AI Readiness Scorecard</Link><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Talk about your AI transformation <span className="sr-only">(Google Calendar, opens in a new tab)</span> ↗</a></div><p className="mt-4 text-sm leading-6 text-white/80">Choose an available time in Google Calendar for a conversation via Google Meet. Prefer a message? <Link href="/contact?service=ai#contact-message" className="rounded underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-white">Contact us</Link>. Please don’t include sensitive records or credentials.</p></div></section>
    <section className={sectionBand} aria-labelledby="personal-agent-heading" id="personal-ai-assistant">
      <details className="mx-auto max-w-6xl px-4 sm:px-6"><summary className="min-h-11 cursor-pointer rounded py-2 font-medium text-ink focus-visible:outline-2 focus-visible:outline-accent">Also exploring a personal AI assistant?</summary>
        <EyebrowPill>Complementary offering · Individuals & teams</EyebrowPill>
        <h2 id="personal-agent-heading" className={`mt-5 max-w-3xl ${h2}`}>Your own AI assistant. Set up around the way you work.</h2>
        <p className={`max-w-3xl ${lead}`}>Go beyond a blank chat window. We help you choose, set up, and personalize an AI agent assistant for your priorities, everyday tasks, and preferred tools.</p>
        <figure className="mt-8 overflow-hidden rounded-[2rem] border border-line bg-ink">
          <Image src="/images/advisory/personal-ai-workspace-v1.webp" alt="A professional directing a personal AI assistant that connects research, scheduling, writing, and task planning in one workspace." width={1672} height={941} sizes="(min-width: 1152px) 1104px, calc(100vw - 32px)" unoptimized className="aspect-[16/9] h-auto w-full object-cover" />
        </figure>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { title: "Start with your day", text: "Choose a useful first job: research a topic, organize information, draft content, or prepare for a meeting. Define what a helpful result looks like." },
            { title: "Make it yours", text: "Shape its instructions, tone, and working context. Connect selected tools and knowledge sources where supported, with permissions matched to the task." },
            { title: "Build confidence", text: "Test real examples together, refine the workflow, and learn how to review its work. Keep approval in your hands for messages, purchases, and important changes." }
          ].map(item => <article key={item.title} className={`p-6 sm:p-7 ${cardFlat}`}><h3 className={h3}>{item.title}</h3><p className="mt-3 leading-7 text-body">{item.text}</p></article>)}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-7 text-muted">We’ll agree the setup, training, access boundaries, and any ongoing support before work begins. Platform capabilities, subscriptions, and integrations depend on the tools you choose.</p>
        <Link href="/contact?service=ai#contact-message" className={`mt-6 min-h-11 ${linkInline}`}>Ask about personal AI assistance →</Link>
      </details>
    </section>
  </ServiceEffects></main>;
}
