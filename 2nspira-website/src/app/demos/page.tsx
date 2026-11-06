import Link from "next/link";
import { GraduationCap, Factory, ArrowRight } from "lucide-react";
import { publicPageMetadata } from "@/lib/pageMetadata";
import { demos } from "@/lib/demos";
import {
  buttonPrimary,
  cardFlat,
  eyebrow,
  h1,
  h2,
  lead,
  pageMain,
} from "@/components/ui";
export const metadata = publicPageMetadata({
  title: "Interactive Demos for Schools & Manufacturing",
  shareTitle: "Explore a more connected way to work.",
  description:
    "Try connected school and manufacturing workflows with fictional data. Explore practical ways to reduce repeated work and improve operational visibility.",
  path: "/demos",
});
export default function Demos() {
  return (
    <main className={pageMain}>
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-20 sm:px-6 sm:pt-24">
        <p className={eyebrow}>Interactive demos</p>
        <h1 className={`${h1} max-w-4xl`}>
          See what better-connected work could feel like.
        </h1>
        <p className={`${lead} max-w-3xl`}>
          Try everyday workflows from the perspective of the people using them.
          Explore how your organization could reduce repeated tasks, make
          clearer handoffs, and see what needs attention.
        </p>
        <p className="mt-6 text-sm leading-7 text-muted">
          Fictional organizations. Sample data. No account required. These are
          interactive demonstrations—not client systems or claims of measured
          results.
        </p>
      </section>
      <section
        className="mx-auto grid max-w-6xl gap-7 px-4 pb-20 sm:px-6 lg:grid-cols-2"
        aria-label="Available demos"
      >
        {(["education", "manufacturing"] as const).map((kind) => {
          const d = demos[kind],
            Icon = kind === "education" ? GraduationCap : Factory;
          return (
            <article
              className={`${cardFlat} flex flex-col overflow-hidden`}
              key={kind}
            >
              <div className="border-b border-line bg-accent-soft p-8 sm:p-10">
                <Icon className="h-12 w-12 text-accent" strokeWidth={1.3} />
                <p className={`mt-7 ${eyebrow}`}>
                  {d.category} · Ready to explore
                </p>
                <h2 className={`mt-4 ${h2}`}>{d.title}</h2>
              </div>
              <div className="flex flex-1 flex-col p-8 sm:p-10">
                <p className="leading-8 text-body">
                  {kind === "education"
                    ? "Connect registration, admissions, enrollment, schedules, attendance, coursework, assignments, and student progress. Explore administrator, teacher, student, and parent perspectives."
                    : "Connect customer orders, production work orders, materials, procurement, quality checks, fulfillment, and reporting. Follow a batch through the factory and see each handoff."}
                </p>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {kind === "education"
                    ? "Start with a family’s application and finish with published classroom feedback."
                    : "Start with a customer order and finish with a quality-approved simulated shipment."}
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-5 pt-8">
                  <a href={d.url} className={buttonPrimary}>
                    Explore Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                  <Link
                    href={`/demos/${kind}`}
                    className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4"
                  >
                    Overview & guided path
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
      <section className="border-y border-line bg-canvas-deep py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className={h2}>Explore freely. Keep real work separate.</h2>
          <p className="mt-5 max-w-3xl leading-8 text-body">
            Changes belong to your browser tab, not a shared client database.
            Demo actions don’t send messages, collect payments, create purchase
            commitments, or dispatch shipments. Use Reset demo to restore the
            original examples.
          </p>
          <p className="mt-6 text-sm leading-7 text-body">
            Looking for project examples?{" "}
            <Link
              href="/work"
              className="font-medium text-accent underline underline-offset-4"
            >
              Visit Work
            </Link>
            . Exploring how we can help?{" "}
            <Link
              href="/services"
              className="font-medium text-accent underline underline-offset-4"
            >
              See our services
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
