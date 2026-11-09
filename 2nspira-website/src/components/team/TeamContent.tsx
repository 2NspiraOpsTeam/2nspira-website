/* eslint-disable @next/next/no-img-element -- Admin-approved HTTPS portrait URLs need no remote image proxy or server fetch. */
import Link from "next/link";
import type { TeamContent as Content } from "@/lib/team/model";
import {
  buttonPrimary,
  card,
  h1,
  h2,
  h3,
  lead,
  eyebrow,
} from "@/components/ui";
export default function TeamContent({
  content: c,
  preview = false,
}: {
  content: Content;
  preview?: boolean;
}) {
  return (
    <div className="bg-canvas text-ink">
      <header data-editorial-hero className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <p className={eyebrow}>Team &amp; Delivery</p>
        <h1 className={`${h1} max-w-4xl`}>
          People you can know.
          <br />
          <span className="text-accent">Delivery you can follow.</span>
        </h1>
        <p className={`${lead} max-w-3xl`}>{c.intro}</p>
        <figure className="mt-8 overflow-hidden rounded-2xl border border-line">
          <div className="aspect-[2/1] overflow-hidden">
            <img
              src="/images/leadership/team-realistic-owner-20261105.png"
              alt="2Nspira team, left to right: Joaquin, Sebastian, Ethan, Valentina, Mason, and Ashley."
              width={1774}
              height={887}
              className="h-full w-full object-cover object-top"
            />
          </div>
          <figcaption className="px-4 py-3 text-sm text-body">
            Explore individual profiles below for current roles and professional backgrounds.
          </figcaption>
        </figure>
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-3">
          {[
            ["people", "Our people"],
            ["delivery", "Delivery ownership"],
            ["work", "Work examples"],
            ["ai", "AI assistants"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="inline-flex min-h-11 items-center rounded-full border border-line px-5 py-2 text-sm"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>
      <section
        id="people"
        aria-labelledby="people-title"
        className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20"
      >
        <p className={eyebrow}>Human expertise</p>
        <h2 id="people-title" className={`mt-3 ${h2}`}>
          Our people
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {c.people
            .filter((p) => preview || p.approved)
            .map((p) => (
              <article id={p.id} key={p.id} className={`${card} scroll-mt-24 p-6 sm:p-8`}>
                <div className="flex flex-wrap items-center gap-5">
                  {p.photo ? (
                    <img
                      src={p.photo}
                      alt={`Portrait of ${p.name}`}
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-2xl object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="flex h-20 w-20 items-center justify-center rounded-2xl border border-line bg-canvas-deep text-xl"
                    >
                      {p.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                  <div>
                    <h3 className={h3}>{p.name}</h3>
                    <p className="mt-2 text-sm text-accent">
                      {p.role || "Role awaiting confirmation"}
                    </p>
                  </div>
                </div>
                <details data-profile-details>
                  <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">Background &amp; experience</summary>
                  <p className="pb-3 leading-7 text-body">{p.bio || "Biography awaiting confirmation."}</p>
                </details>
                {p.skills && (
                  <p className="mt-4 text-sm leading-7 text-body">
                    <strong>Focus:</strong> {p.skills}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-5">
                  {p.linkedin && (
                    <a
                      href={p.linkedin}
                      className="inline-flex min-h-11 items-center text-sm text-accent underline"
                    >
                      LinkedIn profile →
                    </a>
                  )}
                  {p.evidence && p.evidence !== p.linkedin && (
                    <a
                      href={p.evidence}
                      className="inline-flex min-h-11 items-center text-sm text-accent underline"
                    >
                      Background &amp; evidence →
                    </a>
                  )}
                </div>
                {preview && !p.approved && (
                  <p className="mt-3 text-sm font-medium text-amber-900">
                    Draft profile — approval pending
                  </p>
                )}
              </article>
            ))}
        </div>
      </section>
      <section
        id="delivery"
        aria-labelledby="delivery-title"
        className="scroll-mt-24 border-y border-line bg-canvas-deep py-16"
      >
        <div className="mx-auto max-w-6xl px-5">
          <p className={eyebrow}>Clear ownership</p>
          <h2 id="delivery-title" className={`mt-3 ${h2}`}>
            Who is accountable
          </h2>
          <p className={`${lead} max-w-3xl`}>
            Your engagement names a human lead for each responsibility. One
            person may hold several roles; AI assistants support the work, not
            the accountability.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {c.responsibilities.map((r) => (
              <article key={r.area} className={`${card} p-6`}>
                <h3 className={h3}>{r.area}</h3>
                <p className="mt-3 font-semibold">
                  {c.people.find((p) => p.id === r.personId)?.name ||
                    "Human lead awaiting confirmation"}
                </p>
                <p className="mt-3 leading-7 text-body">{r.detail}</p>
                {r.support && (
                  <p className="mt-3 text-sm text-body">
                    Supporting contributors: {r.support}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="work"
        aria-labelledby="work-title"
        className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20"
      >
        <p className={eyebrow}>Demonstrated capabilities</p>
        <h2 id="work-title" className={`mt-3 ${h2}`}>
          See the work behind the words
        </h2>
        <p className={`${lead} max-w-3xl`}>
          These examples show delivery scope and engineering approach—not
          promised returns or independently measured client outcomes.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {c.projects
            .filter((p) => preview || p.approved)
            .map((p) => (
              <article key={p.id} className={`${card} flex flex-col p-6`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  {p.kind}
                </p>
                <h3 className={`mt-4 ${h3}`}>{p.title}</h3>
                <p className="mt-4 flex-1 leading-7 text-body">{p.summary}</p>
                {p.url && (
                  <a
                    className="mt-5 inline-flex min-h-11 items-center text-accent underline"
                    href={p.url}
                  >
                    Explore the example →
                  </a>
                )}
                {preview && !p.approved && (
                  <p className="text-sm text-amber-900">
                    Sharing approval pending
                  </p>
                )}
              </article>
            ))}
        </div>
      </section>
      <section
        id="ai"
        aria-labelledby="ai-title"
        className="scroll-mt-24 border-y border-line bg-canvas-deep py-16"
      >
        <div className="mx-auto max-w-6xl px-5">
          <p className={eyebrow}>AI capabilities · not human employees</p>
          <h2 id="ai-title" className={`mt-3 ${h2}`}>
            Human-led. AI-assisted.
          </h2>
          <p className={`${lead} max-w-4xl`}>{c.ai}</p>
          <Link href="/ai-team" className="mt-5 inline-flex min-h-11 items-center text-accent underline">Meet our AI team: roles, workflow &amp; boundaries →</Link>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {c.agents
              .filter((a) => preview || a.approved)
              .map((a) => (
                <article
                  key={a.id}
                  className="effect-card rounded-2xl border border-dashed border-line-strong bg-canvas p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    AI delivery assistant
                  </p>
                  <h3 className={`mt-3 ${h3}`}>{a.name}</h3>
                  <p className="mt-2 font-medium">
                    {a.role || "Functions awaiting confirmation"}
                  </p>
                  <details data-profile-details>
                    <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">Capabilities &amp; boundaries</summary>
                    <p className="pb-3 leading-7 text-body">{a.bio || "No public capability description approved yet."}</p>
                  </details>
                  {preview && !a.approved && (
                    <p className="mt-3 text-sm text-amber-900">
                      Function description awaiting approval
                    </p>
                  )}
                </article>
              ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className={h3}>For proposal reviewers</h2>
        <p className="mt-4 max-w-4xl leading-8 text-body">{c.rfp}</p>
        <Link href="/contact" className={`mt-8 ${buttonPrimary}`}>
          Discuss your delivery needs →
        </Link>
      </section>
    </div>
  );
}
