import { Compass, Layers3, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import styles from "./ServiceJourney.module.css";
import Link from "next/link";
import { hasPublishedTeam } from "@/lib/team/server";
import { cardFlat, h2, h3, section, buttonSecondary } from "./ui";

const journeys = {
  websites: {
    title: "A handover you can plan around",
    intro: "Agree the launch and handover checklist in your proposal—not after the build.",
    items: ["Content, code rights and licensed assets", "Administrative access and editing guidance", "Acceptance checks, redirects and launch responsibilities", "Support scope, ownership and the next change request"],
    audience: "/who-we-serve/small-businesses-professional-services", audienceLabel: "Websites for growing organizations", proof: "/work#client-websites", proofLabel: "Explore published websites",
  },
  automation: {
    title: "What a scoped workflow engagement can include",
    intro: "Start with one difficult handoff. Your proposal defines the tools, permissions and acceptance checks before implementation.",
    items: ["A workflow map and named operating owner", "Agreed connectors, data access and permissions", "An implemented workflow with test and exception checks", "Monitoring responsibilities, retry rules and handover guidance"],
    audience: "/who-we-serve", audienceLabel: "Find your organization’s situation", proof: "/work#concepts-prototypes", proofLabel: "Explore labeled prototypes",
  },
  ai: {
    title: "Choose a practical starting point",
    intro: "Assess readiness, equip your team, or test one governed workflow. Outputs depend on your priorities and agreed scope.",
    items: ["Readiness review: priorities, gaps and a recommended next step", "Adoption support: training needs, usage guidance and governance responsibilities", "Workflow pilot: a bounded task, human review and an evaluation checklist"],
    audience: "/who-we-serve", audienceLabel: "AI needs across organizations", proof: "/work#internal-engineering", proofLabel: "Explore our internal engineering",
  },
  advisory: {
    title: "Agree how leadership will work",
    intro: "Fractional CIO guidance starts with a defined decision—not an open-ended promise. Confirm these boundaries in your proposal.",
    items: ["Business priorities and a named human lead", "Decision authority retained by you or explicitly delegated", "Review cadence, reporting and escalation responsibilities", "Working documents, delivery boundaries and next review"],
    audience: "/who-we-serve/technology-leaders-teams", audienceLabel: "For technology leaders and teams", proof: "/about#executive-profile", proofLabel: "Meet Jeffrey",
  },
  support: {
    title: "Clear responsibilities before support begins",
    intro: "Coverage follows an agreed scope. Existing systems require an access and suitability review before any support commitment.",
    items: ["System inventory, access review and named contacts", "Included maintenance, monitoring and change responsibilities", "Request routing, response expectations and escalation", "Reporting, third-party dependencies and exit handover"],
    audience: "/who-we-serve/small-businesses-professional-services", audienceLabel: "Support for growing organizations", proof: "/work#internal-engineering", proofLabel: "Explore our internal systems practice",
  },
};
export default async function ServiceJourney({ service }: { service: keyof typeof journeys }) {
  const content = journeys[service];
  const teamPublished = await hasPublishedTeam();
  return <section className={section} aria-labelledby={`${service}-scope-heading`}><div className="mx-auto max-w-6xl px-4 sm:px-6">
    <h2 id={`${service}-scope-heading`} className={h2}>{content.title}</h2>
    <p className="mt-4 max-w-3xl leading-7 text-body">{content.intro}</p>
    <div className="mt-8 grid gap-4 md:grid-cols-3" aria-label="Explore your next step">{[
      { Icon: Compass, title: "Find your fit", text: "Start with your organization’s needs.", href: content.audience, label: content.audienceLabel },
      { Icon: Layers3, title: "See the evidence", text: "Explore relevant work and experience.", href: content.proof, label: content.proofLabel },
      { Icon: ArrowUpRight, title: "Meet your people", text: "Know who leads and delivers the work.", href: teamPublished ? "/team-delivery" : "/about#executive-profile", label: "Your human delivery team" },
    ].map(({Icon,title,text,href,label},i) => <Reveal key={title} delay={i*70} className="h-full"><Link href={href} className={`${styles.pathway} ${cardFlat}`}><span className={styles.icon}><Icon aria-hidden="true" size={23} /></span><h3 className={h3}>{title}</h3><p className="mt-2 text-sm leading-6 text-body">{text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">{label}<span aria-hidden="true">↗</span></span></Link></Reveal>)}</div>
    <details className={`mt-5 p-5 ${cardFlat}`}><summary className="min-h-11 cursor-pointer rounded py-2 font-medium text-ink focus-visible:outline-2 focus-visible:outline-accent">What we agree before work begins</summary><ul className="mt-4 grid gap-3 md:grid-cols-2">{content.items.map(item => <li key={item} className="flex gap-3 text-sm leading-7 text-body"><span aria-hidden="true" className="text-accent">✓</span>{item}</li>)}</ul></details>
    {service === "advisory" && <details className={`mt-7 p-6 ${cardFlat}`}><summary className="min-h-11 cursor-pointer rounded py-2 font-medium text-ink focus-visible:outline-2 focus-visible:outline-accent">Explore an illustrative executive decision brief</summary><p className="mt-3 text-sm text-muted">Illustrative template—not a client deliverable or evidence of a client outcome.</p><dl className="mt-5 grid gap-5 md:grid-cols-2">{[["Decision", "Which technology priority needs approval, and by when?"], ["Options & tradeoffs", "Current approach, alternatives, cost assumptions, dependencies and risks."], ["Recommendation", "Proposed next step, rationale, accountable owner and approval needed."], ["Review", "Acceptance evidence, review date and conditions that would change the decision."]].map(([title,text]) => <div key={title}><dt className={h3}>{title}</dt><dd className="mt-2 leading-7 text-body">{text}</dd></div>)}</dl></details>}
    {["websites", "automation", "ai"].includes(service) && <p className="mt-6 max-w-3xl text-sm leading-7 text-body">Need direction before building, or support after delivery? More Services: <Link href="/technology-advisory" className="rounded underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-accent">Technology Leadership &amp; Advisory</Link> and <Link href="/managed-services-support" className="rounded underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-accent">Managed Maintenance &amp; Support</Link>, scoped to your needs.</p>}
    {service !== "websites" && <Link className={`mt-7 ${buttonSecondary}`} href={`/contact?service=${service}#contact-message`}>Discuss {service === "automation" ? "a workflow or integration" : service === "ai" ? "your AI priorities" : service === "advisory" ? "your technology priorities" : "managed support"}</Link>}
  </div></section>;
}
