import DemoHero from "./DemoHero";
import DemoTrust from "./DemoTrust";
import SchoolVision from "./SchoolVision";
import ManufacturingVision from "./ManufacturingVision";
import { ArrowRight } from "lucide-react";
import { demos } from "@/lib/demos";
import {
  buttonPrimary,
  cardFlat,
  eyebrow,
  h2,
  pageMain,
} from "@/components/ui";
export default function DemoDetail({ kind }: { kind: keyof typeof demos }) {
  if (kind === "manufacturing") return <ManufacturingVision />;
  const demo = demos[kind];
  return (
    <main className={pageMain}>
      <DemoHero
        category="K–12 school management"
        title="One learning journey. Everyone connected."
        text="Give teachers room to teach and families a clearer view. Connect the first application to classroom progress, without losing the learner between systems."
        image="/images/demos/education-workspace.webp"
        alt="Learning Grove family view showing classroom learning, enrolled classes and published teacher feedback."
        href={demo.url}
        steps={["Welcome a learner", "Connect the classroom", "Share progress"]}
      />
      {kind === "education" && (
        <section className="border-y border-line bg-canvas-deep py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className={eyebrow}>Choose your perspective</p>
            <h2 className={`mt-4 ${h2}`}>
              Four experiences. One shared student record.
            </h2>
            <p className="mt-5 max-w-3xl leading-8 text-body">
              Choose your K–12 day. Families start with published fictional
              learning; staff and students can load an enrolled classroom
              example. Existing tab changes are kept when switching roles.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  "Administrator",
                  "Review, admit, enroll, and follow the record.",
                ],
                [
                  "Teacher",
                  "Plan learning, give feedback, and publish a learning report.",
                ],
                [
                  "Student",
                  "Submit work, reflect on learning, and see feedback.",
                ],
                [
                  "Parent",
                  "See Riley’s published learning, reflection, and feedback.",
                ],
              ].map(([role, text], i) => (
                <a
                  href={`${demo.url}?role=${role}`}
                  key={role}
                  className={`${cardFlat} block p-6 focus-visible:outline-2 focus-visible:outline-accent ${["!bg-[#fff0d9]", "!bg-[#e0f4ef]", "!bg-[#efe4fa]", "!bg-[#fff1b8]"][i]}`}
                >
                  <h3 className="font-semibold text-ink">
                    {
                      {
                        Administrator: "School office · Review admissions",
                        Teacher: "Teacher · Open my classroom",
                        Student: "Student · Continue my learning",
                        Parent: "Family · See Riley’s learning",
                      }[role]
                    }{" "}
                    <span aria-hidden="true">→</span>
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-body">{text}</p>
                </a>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-muted">
              Role switching demonstrates appropriate views; it is not
              production authentication or a secure multi-user system.
            </p>
          </div>
        </section>
      )}
      {kind === "education" && <SchoolVision />}
      {kind !== "education" && (
        <>
          <section className="border-y border-line bg-canvas-deep py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2">
              <div>
                <p className={eyebrow}>The challenge</p>
                <h2 className={`mt-4 ${h2}`}>
                  When the handoffs get in the way.
                </h2>
                <p className="mt-5 leading-8 text-body">{demo.challenge}</p>
              </div>
              <div>
                <p className={eyebrow}>The possibility</p>
                <h2 className={`mt-4 ${h2}`}>A more connected way to work.</h2>
                <p className="mt-5 leading-8 text-body">{demo.benefit}</p>
                <p className="mt-4 text-sm leading-7 text-muted">
                  This is an illustrative experience, not a client deployment or
                  a promise of measured results.
                </p>
              </div>
            </div>
          </section>
          <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <p className={eyebrow}>Try the connections</p>
            <h2 className={`mt-4 ${h2}`}>Workflows you can explore.</h2>
            <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {demo.workflows.map(([title, text], i) => (
                <article key={title} className={`${cardFlat} p-6`}>
                  <span className="text-xs font-semibold text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-medium text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-body">{text}</p>
                </article>
              ))}
            </div>
          </section>
        </>
      )}
      <section
        id="walkthrough"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20"
      >
        <p className={eyebrow}>A suggested walkthrough</p>
        <h2 className={`mt-4 ${h2}`}>Follow a complete journey.</h2>
        <details className="mt-7 rounded-2xl border border-line p-6">
          <summary className="min-h-11 cursor-pointer font-medium text-accent">
            Open the step-by-step journey
          </summary>
          <ol className="mt-6 grid gap-7 md:grid-cols-2">
            {demo.steps.map(([title, text], i) => (
              <li key={title} className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-medium text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-body">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </details>
        <a href={demo.url} className={`mt-10 ${buttonPrimary}`}>
          Explore Demo <ArrowRight className="ml-2 h-4 w-4" />
        </a>
        <div className="mt-12 rounded-2xl border border-line p-6">
          <h3 className="font-medium text-ink">
            What this demonstration does—and doesn’t—include
          </h3>
          <p className="mt-3 text-sm leading-7 text-body">{demo.limits}</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            All actions are simulated locally. Refresh retains valid changes in
            this tab; a confirmed reset restores sample data. A fresh browser
            session starts separately. Don’t enter personal or client
            information.
          </p>
        </div>
      </section>
      <DemoTrust />
    </main>
  );
}
