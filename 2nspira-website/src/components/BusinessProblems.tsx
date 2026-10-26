import Link from "next/link";
import { cardFlat, h2, lead, linkInline, section } from "./ui";

/** Problem-first entry points reuse established service routes; no new service commitments. */
const problems = [
  { title: "Disconnected Systems", quote: "We’re doing the same work in three different systems.", text: "Connect applications and reduce duplicate entry so information can move with the work.", capability: "Systems Integration", href: "/automation-systems-optimization#systems-integration" },
  { title: "Unreliable Reporting", quote: "We have plenty of data, but nobody trusts the reports.", text: "Address inconsistent data and reporting processes so leaders have a clearer basis for decisions.", capability: "Data & Analytics", href: "/automation-systems-optimization#data-analytics" },
  { title: "AI Uncertainty", quote: "Our employees are experimenting with AI, but we don’t have a plan.", text: "Identify practical opportunities, equip your team, and set responsible safeguards.", capability: "AI Enablement & Governance", href: "/ai-enablement" },
  { title: "Inefficient Operations", quote: "Our technology costs keep growing, but efficiency doesn’t.", text: "Simplify workflows and reduce avoidable administrative work before adding more tools.", capability: "Workflow Automation", href: "/automation-systems-optimization#workflow-automation" },
  { title: "Disconnected Digital Experiences", quote: "Our website looks professional, but everything behind it is still manual.", text: "Connect customer-facing experiences to the processes and systems behind your business.", capability: "Digital Platforms", href: "/websites" },
  { title: "Leadership Gap", quote: "We need experienced technology leadership, but aren’t ready for a full-time CIO.", text: "Bring senior judgment to priorities, planning, vendors, and technology decisions.", capability: "Fractional CIO", href: "/fractional-cio" },
];

export default function BusinessProblems() {
  return <section className={section} aria-labelledby="business-problems-heading">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 id="business-problems-heading" className={h2}>Sound Familiar?</h2>
      <p className={`max-w-2xl ${lead}`}>Start with the problem you recognize. You don’t need to know which technology—or service—you need.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {problems.map(problem => <article key={problem.title} className={`flex flex-col p-6 sm:p-7 ${cardFlat}`}>
          <h3 className="text-sm font-semibold text-accent">{problem.title}</h3>
          <p className="mt-4 text-xl font-medium leading-8 tracking-tight text-ink">“{problem.quote}”</p>
          <p className="mt-4 text-sm leading-7 text-body">{problem.text}</p>
          <Link href={problem.href} className={`mt-auto pt-5 text-sm min-h-11 ${linkInline}`}>Explore {problem.capability}<span className="ml-1" aria-hidden="true">→</span></Link>
        </article>)}
      </div>
      <Link href="/services" className={`mt-7 min-h-11 ${linkInline}`}>Explore Our Services <span className="ml-1" aria-hidden="true">→</span></Link>
    </div>
  </section>;
}
