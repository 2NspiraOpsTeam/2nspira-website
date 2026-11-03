import polish from "@/components/ServicePolish.module.css";
import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ServiceEffects from "@/components/ServiceEffects";
import ServiceConversation from "@/components/ServiceConversation";
import ServiceQuestions from "@/components/ServiceQuestions";
import { EyebrowPill } from "@/components/VisualAccents";
import { h2, h3, lead, linkInline, pageMain, section, sectionBand, cardFlat, buttonPrimary } from "@/components/ui";

const description = "Find where AI can reduce repetitive work and help your team serve customers better. Get practical AI strategy, training, and governance from 2Nspira.";

export const metadata: Metadata = publicPageMetadata({
  title: "AI Consulting for Better Business Workflows",
  shareTitle: "Less repetitive work. Responsible AI.",
  description,
  path: "/ai-enablement"
});

const content = {
    visualTreatment: "editorial" as const,
    title: "Put AI to work. Keep people in control.",
    eyebrowText: "AI Strategy, Training & Governance",
    primaryActionLabel: "Discuss AI Readiness",
    intro: "Less repetitive work. More confident teams. We help you choose useful AI workflows, set clear safeguards, and keep human judgment at the center.",
    audience: "For leaders and teams ready to move from scattered experiments to purposeful AI use.",
    situations: [
      { title: "AI use is growing without a plan", text: "People are experimenting, but priorities, ownership, and acceptable use are unclear." },
      { title: "Your team needs confidence", text: "You want people to understand AI’s limits, protect information, and use it with judgment." },
      { title: "You need a useful starting point", text: "You want to choose a manageable workflow to test rather than add another tool without a purpose." },
    ],
    questions: [
      { question: "Do we need to choose an AI tool before we talk?", answer: "No. Start with the work you want to improve and any current experiments. Readiness, data, risks, and team capacity help determine whether a tool or a different change is appropriate." },
      { question: "Is this strategy, training, or implementation?", answer: "The focus depends on your needs. We agree which strategy, governance, training, or implementation work is in scope. A roadmap does not automatically include every implementation or ongoing monitoring activity." },
      { question: "What should we bring to the first conversation?", answer: "Bring your priorities, an example workflow, the tools already in use, and the decisions you need help making. You do not need to share sensitive records or credentials in the booking form." },
    ],
    outcomesTitle: "Practical outcomes to work toward",
    outcomes: [
      "Clear priorities for where AI can help.",
      "Practical safeguards for your data and decisions.",
      "Useful workflows with people in control.",
      "A way to measure quality, adoption, and value."
    ],
    steps: [
      {
        title: "Understand readiness",
        text: "Review current AI usage, surface exposure and workflow friction, and identify the most useful opportunities."
      },
      {
        title: "Build the foundation",
        text: "Define an acceptable-use framework, map responsibilities, and develop a practical implementation roadmap."
      },
      {
        title: "Enable adoption",
        text: "Support workflow implementation, train teams, and maintain leadership oversight as adoption grows."
      }
    ],
    image: {
      src: "/images/advisory/focused-collaboration.webp",
      alt: "Two people reviewing data and AI workflows in a focused collaboration session."
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://2nspira.com/ai-enablement#service",
      serviceType: ["AI strategy consulting", "AI governance advisory", "AI literacy and team training", "Responsible AI implementation"],
      name: "AI Enablement, Training & Governance Advisory",
      description,
      url: "https://2nspira.com/ai-enablement",
      provider: { "@id": "https://2nspira.com/#organization" },
      areaServed: "Worldwide"
    },
    focusAreas: [
      { title: "Strategy", text: "Connect AI investments to mission, priorities, and practical value." },
      { title: "AI Literacy", text: "Give leaders and teams the language to evaluate capabilities and limits." },
      { title: "Governance", text: "Define ownership, acceptable use, approvals, and escalation paths." },
      { title: "Data", text: "Protect sensitive information and clarify what systems may access." },
      { title: "Workflows", text: "Redesign work around useful assistance, review points, and accountability." },
      { title: "People", text: "Build confidence, role clarity, and adoption at a responsible pace." },
      { title: "Implementation", text: "Move from experiments to controlled, supportable operating practices." },
      { title: "Measurement", text: "Track quality, risk, adoption, time saved, and mission-level value." }
    ],
    credibility: {
      title: "Practical experience. Visible thinking.",
      intro: "Explore the work and thinking behind our approach—from hands-on AI experiments to the systems organizations use every day.",
      items: [
        { title: "Hands-on AI practice", text: "Jeffrey Cortez shares lessons from building a multi-agent AI workflow: coordination, local and cloud models, and human oversight.", href: "/post/building-ai-team-multi-agent-workflow-lessons", label: "Read the field notes" },
        { title: "Technology leadership", text: "Led by Jeffrey Cortez, whose background spans technology leadership, education, and operational systems, with an Executive Master’s in Technology Management from Columbia University.", href: "/post/building-ai-team-multi-agent-workflow-lessons", label: "Explore Jeffrey’s perspective" },
        { title: "Systems you can explore", text: "Explore selected digital platforms and operational systems to see how we turn business needs into working tools.", href: "/work", label: "Explore selected work" }
      ]
    },
    buildSection: {
      title: "Three ways to move AI forward",
      intro: "Start where you need help. We agree the scope before work begins.",
      items: [
        { title: "Choose the right work", text: "Find a useful starting point—not just another tool.", details: ["Readiness review and prioritized use cases", "A roadmap with owners and success measures"] },
        { title: "Give people confidence", text: "Help your team use AI thoughtfully in everyday work.", details: ["Role-aware training and practical playbooks", "Clear human review and escalation points"] },
        { title: "Put safeguards in place", text: "Make responsible use part of how work gets done.", details: ["Privacy guidance and acceptable-use standards", "Controlled pilots and quality measures"] }
      ]
    },
    assessmentCta: {
      title: "Start with your AI readiness",
      text: "Use the free 2Nspira scorecard to identify strengths, gaps, and the next leadership conversation.",
      label: "Take the AI Readiness Scorecard",
      href: "/resources/ai-readiness-scorecard"
    },
    closingCta: {
      eyebrow: "From readiness to roadmap",
      title: "Move forward with AI you can explain, govern, and use.",
      text: "Bring your priorities, current experiments, and the decisions holding you back. Together, we’ll define a practical next step for responsible AI adoption.",
      primary: { label: "Discuss AI Readiness", href: "/contact" },
      secondary: { label: "Explore all services", href: "/services" }
    }
};


export default function Page() {
  return <main className={`${pageMain} ${polish.page}`} id="main-content"><ServiceEffects>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(content.jsonLd).replace(/</g, "\\u003c") }} />
    <section data-service-hero className="border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Link href="/services" className={linkInline}>← All services</Link>
        <div className="mt-8 grid items-center gap-9 lg:grid-cols-2">
          <div><EyebrowPill>{content.eyebrowText}</EyebrowPill>
            <h1 className="mt-6 text-[length:var(--type-display)] font-medium leading-[1.08] tracking-[-0.04em] text-ink">Put AI to work.<br />Keep people in control.</h1>
            <p className={lead}>Less repetitive work. More confident teams. Turn scattered AI experiments into useful workflows—with clear safeguards and human judgment built in.</p>
            <ServiceConversation label="Find your AI starting point" />
          </div>
          <figure className="overflow-hidden rounded-[2rem] border border-line shadow-xl">
            <Image src="/images/hero/ai-human-led-v3.webp" alt="Three professionals reviewing connected digital workflows together in an AI operations workspace." width={1536} height={1024} sizes="(min-width: 1024px) 552px, calc(100vw - 32px)" unoptimized fetchPriority="high" className="h-auto w-full" />
          </figure>
        </div>
        <p className="mt-8 border-t border-line pt-5 text-sm font-medium text-muted">Useful workflows. Confident people. Responsible decisions.</p>
      </div>
    </section>
    <section className={section} aria-labelledby="ai-pathways-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">Sound familiar?</p>
      <h2 id="ai-pathways-heading" className={`mt-3 ${h2}`}>AI is everywhere. Where does it help you?</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">{content.buildSection.items.map((item, i) => <article key={item.title} className={`p-6 ${cardFlat}`}>
        <p className="mb-4 text-sm font-medium text-accent">{["Too many experiments?", "Unsure what to trust?", "Worried about the risks?"][i]}</p>
        <h3 className={h3}>{item.title}</h3><p className="mt-3 leading-7 text-body">{item.text}</p>
        <details className="mt-5 border-t border-line pt-2"><summary className="min-h-11 cursor-pointer rounded py-3 font-medium text-accent focus-visible:outline-2 focus-visible:outline-accent">What this can include</summary><ul className="list-disc space-y-2 pb-3 pl-5 text-sm leading-7 text-body">{item.details.map(d => <li key={d}>{d}</li>)}</ul></details>
      </article>)}</div>
    </div></section>
    <section className={sectionBand} aria-labelledby="ai-work-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">From ideas to working systems</p>
      <h2 id="ai-work-heading" className={`mt-3 ${h2}`}>Explore the thinking. See the work.</h2>
      <p className={`max-w-2xl ${lead}`}>Our AI approach connects hands-on experimentation with the operational realities of running a business.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {[
          { image: "/images/posts/ai-agents-human-accountability-20261030.webp", width: 1672, height: 941, alt: "Illustration of a human overseeing many connected AI workspaces.", eyebrow: "Hands-on AI practice", title: "An AI team still needs a human lead.", text: "Jeffrey shares lessons from building a multi-agent workflow: coordination, model choices, and human oversight.", href: "/post/building-ai-team-multi-agent-workflow-lessons", label: "Read the field notes" },
          { image: "/images/work/manufacturing-command-center-card.webp", width: 1100, height: 503, alt: "Manufacturing operations concept showing connected production, quality, and inventory dashboards.", eyebrow: "Operational systems showcase", title: "Useful AI starts with connected work.", text: "Explore our manufacturing operations showcase—a view of the workflows, records, and accountability that technology needs to support.", href: "/work", label: "Explore selected work" }
        ].map(item => <article key={item.title} className={`overflow-hidden ${cardFlat}`}>
          <Link href={item.href} className="block focus-visible:outline-2 focus-visible:outline-accent"><Image src={item.image} alt={item.alt} width={item.width} height={item.height} sizes="(min-width: 768px) 540px, calc(100vw - 32px)" unoptimized className="aspect-[16/9] w-full object-cover" /></Link>
          <div className="p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-widest text-accent">{item.eyebrow}</p><h3 className={`mt-3 ${h3}`}>{item.title}</h3><p className="mt-3 leading-7 text-body">{item.text}</p><Link href={item.href} className={`mt-4 inline-flex min-h-11 items-center ${linkInline}`}>{item.label} →</Link></div>
        </article>)}
      </div>
    </div></section>
    <section className={section} aria-labelledby="approach-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6">
      <h2 id="approach-heading" className={h2}>One useful starting point. A clear path forward.</h2>
      <ol className="mt-8 grid gap-7 md:grid-cols-3">{content.steps.map((step, i) => <li data-process-step key={step.title} className="border-t border-line pt-5"><span className="text-sm font-semibold text-accent">0{i+1}</span><h3 className={`mt-3 ${h3}`}>{step.title}</h3><p className="mt-3 leading-7 text-body">{step.text}</p></li>)}</ol>
      <details className="mt-10 rounded-2xl border border-line bg-surface p-5 sm:p-7"><summary className="min-h-11 cursor-pointer rounded py-2 font-medium text-ink focus-visible:outline-2 focus-visible:outline-accent">Explore our eight-area AI framework</summary><div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{content.focusAreas.map(item => <div key={item.title}><h3 className="font-semibold text-ink">{item.title}</h3><p className="mt-2 text-sm leading-6 text-body">{item.text}</p></div>)}</div></details>
      <aside className="mt-10 rounded-2xl border border-line bg-accent-soft p-6 sm:flex sm:items-center sm:justify-between sm:gap-8"><div><h2 className={h3}>{content.assessmentCta.title}</h2><p className="mt-3 max-w-xl leading-7 text-body">{content.assessmentCta.text}</p></div><Link href={content.assessmentCta.href} className={`mt-5 shrink-0 sm:mt-0 ${buttonPrimary}`}>Take the free scorecard →</Link></aside>
    </div></section>
    <ServiceQuestions items={content.questions} />
    <section className="mx-auto mb-16 max-w-6xl px-4 sm:px-6" aria-labelledby="ai-cta-heading"><div className="rounded-[2rem] bg-ink px-6 py-12 text-center sm:px-10"><h2 id="ai-cta-heading" className="mx-auto max-w-2xl text-3xl font-medium tracking-tight text-white sm:text-4xl">What could your team do with less busywork?</h2><p className="mx-auto mt-4 max-w-xl leading-7 text-white/80">Bring one workflow, one question, or one experiment. Let’s find a practical next step.</p><ServiceConversation label="Discuss AI readiness" centered dark /></div></section>
  </ServiceEffects></main>;
}
