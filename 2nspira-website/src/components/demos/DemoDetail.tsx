import Link from "next/link";
import {
  ArrowUpRight,
  GraduationCap,
  Factory,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { demos } from "@/lib/demos";
import { BOOKING_URL } from "@/lib/booking";
import {
  buttonPrimary,
  buttonSecondary,
  cardFlat,
  eyebrow,
  h1,
  h2,
  lead,
  pageMain,
} from "@/components/ui";
export default function DemoDetail({ kind }: { kind: keyof typeof demos }) {
  const demo = demos[kind],
    Icon = kind === "education" ? GraduationCap : Factory;
  return (
    <main className={pageMain}>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-20">
        <Link
          href="/demos"
          className="inline-flex min-h-11 items-center text-sm font-medium text-accent"
        >
          ← All demos
        </Link>
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className={eyebrow}>
              {demo.category} · Interactive demonstration
            </p>
            <h1 className={h1}>{demo.headline}</h1>
            <p className="mt-5 text-lg font-medium text-ink">{demo.title}</p>
            <p className={lead}>{demo.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={demo.url} className={buttonPrimary}>
                Explore Demo <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
              <a href="#walkthrough" className={buttonSecondary}>
                What should I try first?
              </a>
            </div>
          </div>
          <aside className={`${cardFlat} p-7 sm:p-8`}>
            <Icon className="h-10 w-10 text-accent" strokeWidth={1.4} />
            <h2 className="mt-6 text-xl font-medium text-ink">
              Who is this for?
            </h2>
            <p className="mt-4 text-sm leading-7 text-body">{demo.audience}</p>
            <div className="mt-6 border-t border-line pt-5">
              <p className="flex items-center gap-2 text-sm font-medium text-ink">
                <ShieldCheck size={17} /> Fictional data. Safe exploration.
              </p>
              <p className="mt-3 text-xs leading-6 text-muted">
                No account required. Changes stay in your browser tab. No real
                messages, charges, purchases, or shipments. Confirm Reset demo
                to restore the samples.
              </p>
            </div>
          </aside>
        </div>
      </section>
      <section className="border-y border-line bg-canvas-deep py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <p className={eyebrow}>The challenge</p>
            <h2 className={`mt-4 ${h2}`}>When the handoffs get in the way.</h2>
            <p className="mt-5 leading-8 text-body">{demo.challenge}</p>
          </div>
          <div>
            <p className={eyebrow}>The possibility</p>
            <h2 className={`mt-4 ${h2}`}>A more connected way to work.</h2>
            <p className="mt-5 leading-8 text-body">{demo.benefit}</p>
            <p className="mt-4 text-sm leading-7 text-muted">
              This is an illustrative experience, not a client deployment or a
              promise of measured results.
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
      {kind === "education" && (
        <section className="border-y border-line bg-canvas-deep py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className={eyebrow}>Choose your perspective</p>
            <h2 className={`mt-4 ${h2}`}>
              Four experiences. One shared student record.
            </h2>
            <p className="mt-5 max-w-3xl leading-8 text-body">
              Start the full journey as Parent, or choose an experience and load
              the enrolled example inside the demo. Switch roles without losing
              the changes in your current tab.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  "Administrator",
                  "Review, admit, enroll, and follow the record.",
                ],
                [
                  "Teacher",
                  "Publish learning, take attendance, and give feedback.",
                ],
                ["Student", "Find classes, submit work, and see feedback."],
                ["Parent", "Apply, follow progress, and try sample tuition."],
              ].map(([role, text]) => (
                <a
                  href={`${demo.url}?role=${role}`}
                  key={role}
                  className={`${cardFlat} block p-6 focus-visible:outline-2 focus-visible:outline-accent`}
                >
                  <h3 className="font-semibold text-ink">
                    {role} <span aria-hidden="true">→</span>
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
      <section
        id="walkthrough"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20"
      >
        <p className={eyebrow}>A suggested walkthrough</p>
        <h2 className={`mt-4 ${h2}`}>Follow a complete journey.</h2>
        <ol className="mt-10 grid gap-7 md:grid-cols-2">
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
      <section className="border-t border-line bg-canvas-deep py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className={h2}>Start with the work you need to improve.</h2>
          <p className="mt-5 max-w-2xl leading-8 text-body">
            Bring your challenges, existing systems, and priorities. We’ll
            discuss what a practical solution could look like for your
            organization.
          </p>
          <a href={BOOKING_URL} className={`mt-7 ${buttonPrimary}`}>
            {demo.cta}
          </a>
          <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm">
            <Link
              href="/websites"
              className="inline-flex min-h-11 items-center text-accent underline underline-offset-4"
            >
              Custom digital platforms
            </Link>
            <Link
              href="/automation-systems-optimization"
              className="inline-flex min-h-11 items-center text-accent underline underline-offset-4"
            >
              Connected workflows & automation
            </Link>
            <Link
              href="/work"
              className="inline-flex min-h-11 items-center text-accent underline underline-offset-4"
            >
              See our project work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
