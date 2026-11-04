import Link from "next/link";
import { h2, h3, linkInline } from "@/components/ui";

export default function LeadershipProfile() {
  return <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="executive-profile-heading" id="executive-profile">
    <div className="grid gap-8 rounded-3xl border border-line bg-canvas-deep p-6 sm:p-10 lg:grid-cols-2">
      <div><p className="text-sm font-semibold uppercase tracking-widest text-accent">The person behind the direction</p>
        <h2 id="executive-profile-heading" className={`mt-4 ${h2}`}>Experienced leadership for decisions that matter.</h2></div>
      <div><h3 className={h3}>Jeffrey Cortez</h3>
        <p className="mt-4 leading-8 text-body">Jeffrey leads 2Nspira, bringing together technology leadership, education, and operational systems. His background includes an Executive Master’s in Technology Management from Columbia University.</p>
        <p className="mt-4 leading-8 text-body">His hands-on practice includes building a multi-agent AI workflow and examining the coordination, model choices, and human oversight it requires. These are internal engineering lessons, not claims of client results.</p>
        <Link href="/post/building-ai-team-multi-agent-workflow-lessons" className={`mt-5 inline-flex min-h-11 items-center ${linkInline}`}>Read Jeffrey’s background and engineering field notes →</Link>
      </div>
    </div>
  </section>;
}
