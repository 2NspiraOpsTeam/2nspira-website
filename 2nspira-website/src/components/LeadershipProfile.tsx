import Link from "next/link";
import { h2, h3, linkInline } from "@/components/ui";

/** Owner-approved public biography, sourced from Jeffrey's supplied resume (2026-11-03). */
export default function LeadershipProfile({ mentoring = false }: { mentoring?: boolean }) {
  const person = {
    "@context": "https://schema.org", "@type": "Person", "@id": "https://2nspira.com/about#jeffrey-cortez",
    name: "Jeffrey V. Cortez", url: "https://2nspira.com/about#executive-profile",
    worksFor: { "@id": "https://2nspira.com/#organization" },
    alumniOf: [{ "@type": "CollegeOrUniversity", name: "Columbia University" }, { "@type": "CollegeOrUniversity", name: "Queens College, City University of New York" }],
    sameAs: ["https://www.linkedin.com/in/jeffreyvcortez/"],
  };
  return <section className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6" aria-labelledby="executive-profile-heading" id="executive-profile">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
    <div className="grid gap-8 rounded-3xl border border-line bg-canvas-deep p-6 sm:p-10 lg:grid-cols-2">
      <div><p className="text-sm font-semibold uppercase tracking-widest text-accent">{mentoring ? "Leadership & mentoring perspective" : "The person behind the direction"}</p>
        <h2 id="executive-profile-heading" className={`mt-4 ${h2}`}>{mentoring ? "Real experience. A practical perspective." : "Experienced leadership for decisions that matter."}</h2>
        <p className="mt-5 leading-8 text-body">Executive judgment. Hands-on implementation. People-first change.</p>
      </div>
      <div><h3 className={h3}>Jeffrey V. Cortez</h3>
        <p className="mt-4 leading-8 text-body">Jeffrey brings more than 20 years of technology leadership across education, financial services, conservation, and enterprise operations. His experience connects strategy, modernization, data, responsible AI, and the people who make change work.</p>
        <ul className="mt-5 space-y-3 text-sm leading-7 text-body">
          <li><strong className="text-ink">Executive leadership:</strong> Former CIO at 2Nspira and VP of Technology at Amur Capital Management; Director of Business Services Technology at Wildlife Conservation Society.</li>
          <li><strong className="text-ink">Education &amp; implementation:</strong> Enterprise systems, data modernization, and AI education at The School at Columbia University.</li>
          <li><strong className="text-ink">Qualifications:</strong> Executive M.S. in Technology Management, Columbia University; B.S. in Computer Science, Queens College, CUNY.</li>
        </ul>
        <p className="mt-4 leading-8 text-body">At 2Nspira, he turns business priorities into practical roadmaps, connected systems, and responsible adoption. His internal multi-agent AI work offers field lessons in coordination and human oversight—not a substitute for client case-study evidence.</p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          <a href="https://www.linkedin.com/in/jeffreyvcortez/" target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center ${linkInline}`}>Jeffrey on LinkedIn <span className="sr-only">(opens in a new tab)</span> ↗</a>
          <Link href="/post/building-ai-team-multi-agent-workflow-lessons" className={`inline-flex min-h-11 items-center ${linkInline}`}>Read the engineering field notes →</Link>
        </div>
      </div>
    </div>
  </section>;
}
