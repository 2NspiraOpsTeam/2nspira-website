import Link from "next/link";
import styles from "./ai-team.module.css";
import { Search, Palette, Code2, Workflow, ShieldCheck, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { aiTeam } from "@/content/team/ai-team";
import { publicPageMetadata } from "@/lib/pageMetadata";
import { buttonPrimary, buttonSecondary, card, eyebrow, h1, h2, h3, lead } from "@/components/ui";

export const metadata = publicPageMetadata({
  title: "Meet Our AI Team",
  description: "Meet Maya, Cleo, Adam, Dax, and Brian: five specialized AI agents supporting research, design, engineering, operations, and quality under human leadership.",
  path: "/ai-team",
});

const icons = [Search, Palette, Code2, Workflow, ShieldCheck];
const summaries = [
  "Find the signal. Turn research into clear insights, strategy, and stories.",
  "Make it intuitive. Shape accessible interfaces and thoughtful digital experiences.",
  "Bring ideas to life. Build applications, integrations, and AI-enabled workflows.",
  "Connect the moving parts. Organize repeatable processes and operational workflows.",
  "Challenge assumptions. Test journeys, surface defects, and inform release decisions.",
];

export default function AITeamPage() {
  return <main id="main-content" className="bg-canvas text-ink">
    <header className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16">
      <Reveal><p className={eyebrow}>The 2Nspira AI team</p><h1 className={h1}>Five perspectives.<br />One human-led team.</h1><p className={`${lead} max-w-xl`}>Meet the specialized AI agents supporting how we discover, design, build, operate, and validate.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#agents" className={buttonPrimary}>Meet the agents ↓</a><Link href="/team-delivery" className={buttonSecondary}>Meet our people <ArrowUpRight size={16} aria-hidden="true" /></Link></div><p className="mt-6 text-sm text-body">People set the direction. AI extends the possibilities.</p></Reveal>
      <Reveal variant="scale" className="relative"><div className="overflow-hidden rounded-3xl border border-line bg-canvas-deep shadow-soft">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/hero/ai-team-high-contrast-20261105.webp" width={1536} height={1024} alt="Five luminous cyan intelligence cores connected against a deep navy background" fetchPriority="high" className="h-auto w-full" /><div className="flex items-center justify-between gap-4 border-t border-line bg-surface px-5 py-4"><span className="text-sm font-medium">Human judgment. AI support.</span><span className="rounded-full bg-accent-soft px-3 py-1 text-xs text-accent">Working together</span></div></div></Reveal>
    </header>

    <section id="agents" aria-labelledby="agents-title" className={`${styles.collaborators} scroll-mt-24 border-y border-line py-16 sm:py-20`}><div className="mx-auto max-w-7xl px-5"><Reveal><p className={eyebrow}>Meet your collaborators</p><h2 id="agents-title" className={`${h2} mt-3 max-w-2xl`}>Different strengths. Shared direction.</h2><p className="mt-4 max-w-2xl leading-7 text-body">A focused role for each agent. Explore the details when you need them.</p></Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{aiTeam.map((a,i) => { const Icon = icons[i]; return <Reveal key={a.id} delay={i*40} className="h-full"><article id={a.id} className={`${card} group flex h-full scroll-mt-24 flex-col overflow-hidden motion-safe:hover:-translate-y-1`}>
        <div aria-hidden="true" className="relative flex h-36 items-center justify-between overflow-hidden border-b border-line bg-gradient-to-br from-accent-soft via-surface to-canvas-deep px-7"><span className="absolute -right-5 -top-10 h-44 w-44 rounded-full border border-accent/15" /><span className="absolute right-6 top-3 h-32 w-32 rounded-full border border-accent/15" /><span className="text-6xl font-medium tracking-tighter text-accent/20">0{i+1}</span><Icon size={46} strokeWidth={1.25} className="relative text-accent transition-transform duration-500 motion-safe:group-hover:scale-110" /></div>
        <div className="flex flex-1 flex-col p-6"><p className={eyebrow}>{a.stage} · AI agent</p><h3 className={`${h3} mt-3`}>{a.name}</h3><p className="mt-1 text-sm font-medium text-accent">{a.role}</p><p className="mt-4 leading-7 text-body">{summaries[i]}</p>
        <details className="mt-6 border-t border-line"><summary className="min-h-12 cursor-pointer py-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Explore {a.name}’s role</summary><div className="pb-3"><p className="leading-7 text-body">{a.bio}</p><h4 className="mt-5 text-sm font-semibold">Intended responsibilities</h4><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-body">{a.responsibilities.map(r => <li key={r}>{r}</li>)}</ul><p className="mt-5 text-sm leading-7 text-body"><strong>Boundaries:</strong> {a.boundary}</p></div></details></div>
      </article></Reveal>; })}<Reveal className="h-full"><aside className="flex h-full flex-col justify-center rounded-2xl border border-accent/25 bg-accent-soft p-7"><ShieldCheck size={32} className="text-accent" aria-hidden="true" /><h3 className={`${h3} mt-5`}>Our people lead.<br />At every stage.</h3><p className="mt-4 leading-7 text-body">People define priorities, review critical decisions, and remain accountable for client outcomes.</p><Link href="/team-delivery" className={`${buttonSecondary} mt-5 self-start px-0`}>Meet the human team <ArrowUpRight size={16} aria-hidden="true" /></Link></aside></Reveal></div>
      <p className="mt-7 max-w-3xl text-sm leading-7 text-body">These are role scopes, not capability guarantees. Tools, permissions, and tested integrations determine what is available for each task.</p>
    </div></section>

    <section aria-labelledby="workflow-title" className="mx-auto max-w-7xl px-5 py-16 sm:py-24"><Reveal><p className={eyebrow}>From question to working solution</p><h2 id="workflow-title" className={`${h2} mt-3`}>A connected way of working.</h2><p className="mt-4 max-w-2xl leading-7 text-body">Findings feed design. Design informs the build. Testing sends learning back into the work—not just to the end of a checklist.</p></Reveal><ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{aiTeam.map((a,i) => <li key={a.id} className="relative rounded-2xl border border-line bg-surface p-5"><p className="text-sm text-accent">0{i+1}</p><h3 className={`${h3} mt-3`}>{a.stage}</h3><a href={`#${a.id}`} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded text-sm text-accent underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-accent">{a.name} <ArrowUpRight size={15} aria-hidden="true" /></a></li>)}</ol></section>

    <section aria-labelledby="enablement-title" className="border-t border-line bg-canvas-deep"><div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:py-20 lg:grid-cols-2"><Reveal className="overflow-hidden rounded-3xl border border-line">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/leadership/team-realistic-owner-20261105.png" width={1774} height={887} loading="lazy" alt="2Nspira human team and illustrated AI-agent lineup" className="h-auto w-full" /></Reveal><Reveal><p className={eyebrow}>Put the approach to work</p><h2 id="enablement-title" className={`${h2} mt-3`}>Build your own AI-enabled organization.</h2><p className="mt-5 max-w-xl leading-8 text-body">Align your people, workflows, technology, and governance—with human expertise at the center.</p><Link href="/ai-enablement" className={`${buttonPrimary} mt-7`}>Explore AI Enablement →</Link></Reveal></div></section>
  </main>;
}
