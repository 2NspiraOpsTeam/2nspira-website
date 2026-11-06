import Link from "next/link";
import { aiTeam } from "@/content/team/ai-team";
import { publicPageMetadata } from "@/lib/pageMetadata";
import { buttonPrimary, card, eyebrow, h1, h2, h3, lead } from "@/components/ui";

export const metadata = publicPageMetadata({
  title: "Meet Our AI Team",
  description: "Meet Maya, Cleo, Adam, Dax, and Brian: five specialized AI agents supporting research, design, engineering, operations, and quality under human leadership.",
  path: "/ai-team",
});

export default function AITeamPage() {
  return <main id="main-content" className="bg-canvas text-ink">
    <header className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <p className={eyebrow}>Meet the 2Nspira AI Team</p>
      <h1 className={`${h1} mt-4 max-w-4xl`}>Meet the AI Team Behind Our Innovation</h1>
      <p className={`${lead} max-w-3xl`}>Specialized intelligence. Collaborative execution. Human leadership.</p>
      <p className="mt-6 max-w-3xl leading-8 text-body">At 2Nspira, artificial intelligence is more than a service we offer. It is part of how we work. Five specialized AI agents support research, engineering, design, operations, and quality assurance. They extend human expertise—not replace it.</p>
      <nav aria-label="Meet each AI agent" className="mt-8 flex flex-wrap gap-3">{aiTeam.map(a => <a key={a.id} href={`#${a.id}`} className="inline-flex min-h-11 items-center rounded-full border border-line px-5 py-2 text-sm">{a.name} · {a.stage}</a>)}</nav>
    </header>
    <section aria-labelledby="roles-title" className="mx-auto max-w-6xl px-5 pb-20">
      <h2 id="roles-title" className={h2}>Five specialized agents. One coordinated team.</h2>
      <div className="mt-6 rounded-2xl border border-line bg-canvas-deep p-6"><h3 className={h3}>Role scope, not a capability guarantee</h3><p className="mt-3 max-w-4xl leading-7 text-body">The profiles below describe each agent’s intended responsibilities. Available tools, permissions, and tested integrations determine what is operational for a particular task. Completed work is distinguished from proposals, untested capabilities, and verification gaps. The initials are symbolic avatars, not human portraits.</p></div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">{aiTeam.map(a => <article id={a.id} key={a.id} className={`${card} scroll-mt-24 p-6 sm:p-8`}>
        <div className="flex items-center gap-4"><div aria-hidden="true" className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-line bg-canvas-deep text-2xl font-semibold text-accent">{a.name[0]}</div><div><p className="text-xs font-semibold uppercase tracking-widest text-accent">AI agent · {a.stage}</p><h3 className={`${h3} mt-2`}>{a.name}</h3><p className="mt-1 text-sm text-body">{a.specialty}</p></div></div>
        <p className="mt-5 font-medium">{a.role}</p><p className="mt-2 text-sm text-accent">{a.persona}</p><p className="mt-4 leading-7 text-body">{a.bio}</p>
        <blockquote className="mt-5 border-l-2 border-line-strong pl-4 leading-7">“{a.tagline}”</blockquote>
        <details className="mt-6 border-t border-line pt-2"><summary className="min-h-11 cursor-pointer py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Explore {a.name}’s responsibilities &amp; boundaries</summary><div className="pb-3"><p className="mt-3 text-sm font-semibold">Intended responsibilities</p><ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-body">{a.responsibilities.map(r => <li key={r}>{r}</li>)}</ul><p className="mt-5 leading-7 text-body"><strong>Working style:</strong> {a.personality}</p><p className="mt-4 leading-7 text-body"><strong>Boundaries:</strong> {a.boundary}</p></div></details>
      </article>)}</div>
    </section>
    <section aria-labelledby="workflow-title" className="border-y border-line bg-canvas-deep py-16"><div className="mx-auto max-w-6xl px-5"><p className={eyebrow}>Human-directed collaboration</p><h2 id="workflow-title" className={`${h2} mt-3`}>How Our AI Team Collaborates</h2><ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{aiTeam.map((a,i) => <li key={a.id} className={`${card} p-5`}><p className="text-sm text-accent">0{i+1}</p><h3 className={`${h3} mt-3`}>{a.stage}</h3><a href={`#${a.id}`} className="mt-3 inline-flex min-h-11 items-center text-accent underline">{a.name} →</a><p className="mt-2 text-sm leading-7 text-body">{a.specialty}</p></li>)}</ol><p className="mt-6 max-w-3xl leading-8 text-body">The process is collaborative rather than strictly linear. Agents can revisit earlier stages, exchange findings, and refine solutions as requirements evolve.</p><h3 className={`${h3} mt-10`}>Human Leadership Remains Central</h3><p className="mt-4 max-w-3xl leading-8 text-body">Our human team defines priorities, exercises professional judgment, reviews critical decisions, and remains accountable for client outcomes. AI agents support each stage. Our people lead the decisions.</p></div></section>
    <section className="mx-auto max-w-6xl px-5 py-16"><h2 className={h2}>Built with the same AI capabilities we help clients adopt.</h2><p className="mt-6 max-w-3xl leading-8 text-body">We don’t simply talk about AI transformation. We practice it. Our AI team is a practical example of building an AI-enabled organization: combining human expertise with specialized AI support, clear responsibilities, and evidence-based validation.</p><p className="mt-4 max-w-3xl leading-8 text-body">Our Organization AI Enablement services help clients develop that capability within their own businesses—aligning people, workflows, technology, and governance.</p><Link href="/ai-enablement" className={`${buttonPrimary} mt-8`}>Explore AI Enablement →</Link></section>
  </main>;
}
