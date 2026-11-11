import Link from "next/link";
import { Cable, ChartNoAxesCombined, Compass, Workflow, PanelsTopLeft, BriefcaseBusiness } from "lucide-react";
import styles from "./BusinessProblems.module.css";
import { EyebrowPill } from "./VisualAccents";
import { cardFlat, h2, lead, linkInline, section } from "./ui";

/** Problem-first entry points reuse established service routes; no new service commitments. */
const problems = [
  { title: "Disconnected Systems", quote: "We’re doing the same work in three different systems.", text: "Connect applications and reduce duplicate entry so information can move with the work.", capability: "Systems Integration", href: "/automation-systems-optimization#systems-integration" },
  { title: "Unreliable Reporting", quote: "We have plenty of data, but nobody trusts the reports.", text: "Address inconsistent data and reporting processes so leaders have a clearer basis for decisions.", capability: "Data & Analytics", href: "/automation-systems-optimization#data-analytics" },
  { title: "AI Uncertainty", quote: "Our employees are experimenting with AI, but we don’t have a plan.", text: "Identify practical opportunities, equip your team, and set responsible safeguards.", capability: "AI Enablement & Governance", href: "/ai-enablement" },
  { title: "Inefficient Operations", quote: "Our technology costs keep growing, but efficiency doesn’t.", text: "Simplify workflows and reduce avoidable administrative work before adding more tools.", capability: "Workflow Automation", href: "/automation-systems-optimization#workflow-automation" },
  { title: "Disconnected Digital Experiences", quote: "Our website looks professional, but everything behind it is still manual.", text: "Connect customer-facing experiences to the processes and systems behind your business.", capability: "Websites & Custom Digital Platforms", href: "/websites" },
  { title: "Leadership Gap", quote: "We need experienced technology leadership, but aren’t ready for a full-time CIO.", text: "Bring senior judgment to priorities, planning, vendors, and technology decisions.", capability: "Executive Technology Advisory", href: "/fractional-cio" },
];

const icons = [Cable, ChartNoAxesCombined, Compass, Workflow, PanelsTopLeft, BriefcaseBusiness];

export default function BusinessProblems() {
  return <section className={`${section} ${styles.section}`} aria-labelledby="business-problems-heading">
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <EyebrowPill>The challenge</EyebrowPill>
      <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
        <div><h2 id="business-problems-heading" className={h2}>Sound Familiar?</h2>
        <div className={styles.headingRule} aria-hidden="true" /></div>
        <p className={`max-w-2xl ${lead}`}>Start with the problem you recognize. You don’t need to know which technology—or service—you need.</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem, index) => {
          const Icon = icons[index];
          return <article key={problem.title} data-service-card className={`${styles.card} relative flex flex-col overflow-hidden p-6 sm:p-7 ${cardFlat}`}>
          <span data-service-rule aria-hidden="true" />
          <span data-service-icon aria-hidden="true"><Icon size={23} strokeWidth={1.6} /></span>
          <h3 className="text-sm font-semibold text-accent">{problem.title}</h3>
          <p className="mt-4 text-xl font-medium leading-8 tracking-tight text-ink">“{problem.quote}”</p>
          <p className="mt-4 text-sm leading-7 text-body">{problem.text}</p>
          <Link href={problem.href} className={`mt-auto pt-5 text-sm min-h-11 ${linkInline}`}>Explore {problem.capability}<span data-service-arrow aria-hidden="true">→</span></Link>
        </article>;
        })}
      </div>
      <Link href="/services" className={`mt-7 min-h-11 ${linkInline}`}>Explore Our Services <span className="ml-1" aria-hidden="true">→</span></Link>
    </div>
  </section>;
}
