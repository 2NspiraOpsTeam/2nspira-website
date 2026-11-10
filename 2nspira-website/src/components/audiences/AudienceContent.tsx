import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Factory,
  Building2,
  BriefcaseBusiness,
  HeartHandshake,
  ShoppingBag,
  Clapperboard,
} from "lucide-react";
import type { Content } from "@/lib/audiences/model";
import { BOOKING_URL } from "@/lib/booking";
import { buttonPrimary, eyebrow, h1, h2 } from "@/components/ui";
const icons = [
  GraduationCap,
  Factory,
  Building2,
  BriefcaseBusiness,
  HeartHandshake,
  ShoppingBag,
  Clapperboard,
];
export default function AudienceContent({ content: c }: { content: Content }) {
  return (
    <main id="main-content" className="flex-1 bg-canvas">
      <section className="border-b border-line bg-canvas-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className={eyebrow}>Business transformation, built around you</p>
          <h1 className={`${h1} max-w-4xl`}>{c.heading}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-body">
            {c.intro}
          </p>
          <a
            href="#industries"
            className="mt-7 inline-flex min-h-11 items-center gap-2 font-medium text-accent underline underline-offset-4"
          >
            Find your organization <ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>
      </section>
      <section
        id="industries"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6"
      >
        <p className={eyebrow}>Your work. Your next possibility.</p>
        <h2 className={`${h2} mt-4 max-w-3xl`}>
          Practical technology for everyday challenges.
        </h2>
        <p className="mt-5 max-w-3xl leading-7 text-body">
          Explore audiences we can support and solutions we can build together.
          These are possibilities, not claims of completed client engagements or
          guaranteed results.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {c.industries
            .filter((i) => i.visible)
            .map((i, n) => {
              const Icon = icons[n % icons.length];
              return (
                <article
                  key={i.id}
                  className="flex min-w-0 flex-col rounded-3xl border border-line bg-white p-6 sm:p-8"
                >
                  <span className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent">
                    <Icon aria-hidden="true" size={25} />
                  </span>
                  <h3 className="text-2xl font-medium tracking-tight text-ink">
                    {i.title}
                  </h3>
                  <p className="mt-4 leading-7 text-body">{i.challenges}</p>
                  <h4 className="mt-5 text-sm font-semibold text-ink">
                    How we can help
                  </h4>
                  <p className="mt-2 leading-7 text-body">{i.help}</p>
                  <div className="my-6 rounded-2xl bg-canvas-deep p-5">
                    <h4 className="text-sm font-semibold text-ink">
                      What better can look like
                    </h4>
                    <p className="mt-2 leading-7 text-body">{i.outcomes}</p>
                  </div>
                  <div className="mt-auto space-y-2">
                    {i.href && (
                      <Link
                        href={i.href}
                        className="inline-flex min-h-11 items-center gap-2 font-medium text-accent underline underline-offset-4"
                      >
                        {i.linkLabel}
                        <ArrowRight aria-hidden="true" size={17} />
                      </Link>
                    )}
                    {i.exampleHref && (
                      <p>
                        <Link
                          href={i.exampleHref}
                          className="inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4"
                        >
                          {i.exampleLabel}
                        </Link>
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6">
        <div className="rounded-3xl border border-line bg-accent-soft p-8 sm:p-12">
          <p className={eyebrow}>Start with your business, not a tool</p>
          <h2 className={`${h2} mt-4 max-w-3xl`}>
            What would make work easier for your people?
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-body">
            Tell us where work slows down, what your customers need and where
            you want to go. We’ll explore a practical next step together.
          </p>
          <a href={BOOKING_URL} className={`${buttonPrimary} mt-7`}>
            Let’s discuss your business{" "}
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
