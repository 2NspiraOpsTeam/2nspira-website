import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import { AccentRule, AmbientField, EyebrowPill } from "./VisualAccents";
import {
  buttonPrimary,
  buttonSecondary,
  card,
  cardFlat,
  caption,
  h2,
  h3,
  lead,
  linkInline,
  pageMain,
  pageHero,
} from "./ui";

type Props = {
  title: string;
  intro: string;
  audience: string;
  outcomes: string[];
  outcomesTitle?: string;
  steps: { title: string; text: string }[];
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  jsonLd?: Record<string, unknown>;
  overview?: {
    eyebrow?: string;
    title: string;
    text: string;
  };
  focusAreas?: { title: string; text: string }[];
  insightSections?: { title: string; text: string; items?: string[] }[];
  buildSection?: {
    title: string;
    intro: string;
    items: { title: string; text: string }[];
  };
  journey?: {
    title: string;
    intro: string;
    stages: { title: string; text: string }[];
  };
  assessmentCta?: {
    title: string;
    text: string;
    label: string;
    href: string;
  };
  closingCta?: {
    eyebrow?: string;
    title: string;
    text: string;
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
};

export default function ServicePage({
  title,
  intro,
  audience,
  outcomes,
  outcomesTitle = "What we help you achieve",
  steps,
  image,
  jsonLd,
  overview,
  focusAreas,
  insightSections,
  buildSection,
  journey,
  assessmentCta,
  closingCta,
}: Props) {
  return (
    <main className={pageMain} id="main-content">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <AmbientField />
        <div className={`${pageHero} relative`}>
          <Link href="/services" className={linkInline}>
            ← All services
          </Link>
          <div className="mt-8"><EyebrowPill>Advisory services</EyebrowPill></div>
          <h1 className="animate-rise mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className={`animate-rise ${lead}`} style={{ animationDelay: "90ms" }}>{intro}</p>
          <Link href="/contact" className={`mt-8 ${buttonPrimary}`}>
            Start a conversation →
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {image && (
          <figure className="hero-settle group relative overflow-hidden rounded-[2rem] border border-line shadow-[0_20px_60px_rgba(35,41,54,0.10)]">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width ?? 1672}
              height={image.height ?? 941}
              priority
              className="h-auto w-full transition-transform duration-700 ease-gentle group-hover:scale-[1.015]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/10 via-transparent to-accent/10 opacity-60" aria-hidden="true" />
          </figure>
        )}

        <section className={`${image ? "mt-16" : ""} grid gap-6 md:grid-cols-2`} aria-label="Who we help and outcomes">
          <Reveal><div className="group h-full rounded-2xl border border-line bg-surface p-8 shadow-soft">
            <AccentRule className="mb-6" />
            <h2 className={h2}>Who this is for</h2>
            <p className={`mt-4 ${lead}`}>
              {audience}
            </p>
          </div></Reveal>
          <Reveal delay={100}><div className="group h-full rounded-2xl border border-line bg-surface p-8 shadow-soft">
            <AccentRule className="mb-6" />
            <h2 className={h2}>{outcomesTitle}</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 leading-8 text-body">
              {outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div></Reveal>
        </section>

        {overview && (
          <Reveal className="mt-16">
            <section className={`relative overflow-hidden p-8 sm:p-10 ${cardFlat}`} aria-labelledby="service-overview-heading">
              <AmbientField />
              <div className="relative max-w-4xl">
                {overview.eyebrow && <p className="text-sm font-semibold uppercase tracking-widest text-accent">{overview.eyebrow}</p>}
                <h2 id="service-overview-heading" className={`${overview.eyebrow ? "mt-3 " : ""}${h2}`}>{overview.title}</h2>
                <p className={lead}>{overview.text}</p>
              </div>
            </section>
          </Reveal>
        )}

        {focusAreas && focusAreas.length > 0 && (
          <section className="mt-16" aria-labelledby="focus-areas-heading">
            <Reveal>
              <h2 id="focus-areas-heading" className={h2}>The operating model for responsible AI</h2>
              <p className={`max-w-3xl ${lead}`}>Eight connected areas turn isolated experiments into a capability the organization can govern, use, and improve.</p>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {focusAreas.map((area, index) => (
                <Reveal key={area.title} delay={index * 45}>
                  <article className={`h-full p-6 ${card}`}>
                    <p className="text-xs font-semibold tracking-widest text-accent">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className={`mt-3 ${h3}`}>{area.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-body">{area.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16" aria-labelledby="approach-heading">
          <Reveal><h2 id="approach-heading" className={h2}>
            From clarity to execution
          </h2></Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 80}><article className={`group h-full p-6 hover:-translate-y-1 ${card}`}>
                <p className="text-sm font-semibold tracking-widest text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className={`mt-4 ${h3}`}>{step.title}</h3>
                <p className={`mt-3 text-sm leading-7 ${""}`}>
                  <span className="text-body">{step.text}</span>
                </p>
              </article></Reveal>
            ))}
          </div>
        </section>

        {insightSections && insightSections.length > 0 && (
          <section className="mt-16 grid gap-6 md:grid-cols-2" aria-label="Responsible AI principles">
            {insightSections.map((section, index) => (
              <Reveal key={section.title} delay={index * 90}>
                <article className={`h-full p-8 ${cardFlat}`}>
                  <AccentRule className="mb-6" />
                  <h2 className={h2}>{section.title}</h2>
                  <p className="mt-4 leading-8 text-body">{section.text}</p>
                  {section.items && (
                    <ul className="mt-5 space-y-3 text-sm leading-7 text-body">
                      {section.items.map((item) => <li key={item} className="flex gap-3"><span className="text-accent" aria-hidden="true">—</span><span>{item}</span></li>)}
                    </ul>
                  )}
                </article>
              </Reveal>
            ))}
          </section>
        )}

        {buildSection && (
          <section className="mt-16" aria-labelledby="build-section-heading">
            <Reveal>
              <h2 id="build-section-heading" className={h2}>{buildSection.title}</h2>
              <p className={`max-w-3xl ${lead}`}>{buildSection.intro}</p>
            </Reveal>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {buildSection.items.map((item, index) => (
                <Reveal key={item.title} delay={index * 60}>
                  <article className={`h-full p-6 ${card}`}>
                    <h3 className={h3}>{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-body">{item.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {journey && (
          <section className="mt-16" aria-labelledby="journey-heading">
            <Reveal>
              <h2 id="journey-heading" className={h2}>{journey.title}</h2>
              <p className={`max-w-3xl ${lead}`}>{journey.intro}</p>
            </Reveal>
            <ol className="mt-8 grid gap-4 md:grid-cols-4">
              {journey.stages.map((stage, index) => (
                <Reveal key={stage.title} delay={index * 70}>
                  <li className={`h-full p-6 ${cardFlat}`}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent">Stage {index + 1}</p>
                    <h3 className={`mt-3 ${h3}`}>{stage.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-body">{stage.text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        <Reveal className="mt-16"><aside className={`relative overflow-hidden p-6 sm:p-8 ${cardFlat}`}>
          <AmbientField />
          <div className="relative">
            <h2 className={h3}>{assessmentCta?.title ?? "Start with a clearer picture"}</h2>
            <p className={`mt-2 ${caption}`}>{assessmentCta?.text ?? "Explore our free assessments before your next leadership conversation."}</p>
            <Link href={assessmentCta?.href ?? "/resources"} className={`mt-4 ${linkInline}`}>
              {assessmentCta?.label ?? "Explore 2Nspira resources"} →
            </Link>
          </div>
        </aside></Reveal>

        {closingCta && (
          <Reveal className="mt-16">
            <section className="rounded-[2rem] bg-ink px-6 py-12 text-center sm:px-10 sm:py-16" aria-labelledby="closing-cta-heading">
              {closingCta.eyebrow && <p className="text-sm font-semibold uppercase tracking-widest text-white/70">{closingCta.eyebrow}</p>}
              <h2 id="closing-cta-heading" className="mx-auto mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">{closingCta.title}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/75">{closingCta.text}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href={closingCta.primary.href} className={buttonPrimary}>{closingCta.primary.label} →</Link>
                {closingCta.secondary && (
                  <Link href={closingCta.secondary.href} className={`${buttonSecondary} text-white hover:text-white/80 focus-visible:ring-white focus-visible:ring-offset-ink`}>{closingCta.secondary.label} →</Link>
                )}
              </div>
            </section>
          </Reveal>
        )}
      </div>
    </main>
  );
}
