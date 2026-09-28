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
  visualTreatment?: "default" | "editorial";
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
  visualTreatment = "default",
}: Props) {
  const isEditorial = visualTreatment === "editorial";

  return (
    <main className={`${pageMain} ${isEditorial ? "overflow-hidden" : ""}`} id="main-content">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <section className={`relative overflow-hidden border-b border-line ${isEditorial ? "bg-gradient-to-b from-surface to-accent-soft/25" : "bg-surface"}`}>
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

      <div className={`mx-auto max-w-6xl px-4 sm:px-6 sm:py-16 ${isEditorial ? "py-12" : "py-16"}`}>
        {image && (
          <figure className="hero-settle group relative overflow-hidden rounded-[2rem] border border-line shadow-[0_20px_60px_rgba(35,41,54,0.10)]">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width ?? 1672}
              height={image.height ?? 941}
              priority
              className={`h-auto w-full transition-transform duration-700 ease-gentle ${isEditorial ? "motion-safe:md:group-hover:scale-[1.015]" : "group-hover:scale-[1.015]"}`}
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
          <section className={`mt-16 ${isEditorial ? "rounded-[2rem] border border-line bg-canvas-deep px-5 py-10 sm:px-8 sm:py-12" : ""}`} aria-labelledby="focus-areas-heading">
            <Reveal>
              {isEditorial && <AccentRule className="mb-5" />}
              <h2 id="focus-areas-heading" className={h2}>The operating model for responsible AI</h2>
              <p className={`max-w-3xl ${lead}`}>Eight connected areas turn isolated experiments into a capability the organization can govern, use, and improve.</p>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {focusAreas.map((area, index) => (
                <Reveal key={area.title} delay={index * 45} variant={isEditorial ? "scale" : "rise"}>
                  <article className={`group h-full p-6 ${card} ${isEditorial ? "relative overflow-hidden border-t-2 border-t-accent/45 motion-safe:md:hover:-translate-y-1" : ""}`}>
                    <p className={`${isEditorial ? "inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-sm" : "text-xs tracking-widest"} font-semibold text-accent`}>{String(index + 1).padStart(2, "0")}</p>
                    <h3 className={`${isEditorial ? "mt-5" : "mt-3"} ${h3}`}>{area.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-body">{area.text}</p>
                    {isEditorial && <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 ease-gentle motion-safe:md:group-hover:scale-x-100" aria-hidden="true" />}
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <section className={`mt-16 ${isEditorial ? "border-y border-line py-12" : ""}`} aria-labelledby="approach-heading">
          <Reveal><h2 id="approach-heading" className={h2}>
            From clarity to execution
          </h2></Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 80} variant={isEditorial && index === 1 ? "fade" : "rise"}><article className={`group h-full p-6 ${isEditorial ? "motion-safe:md:hover:-translate-y-1" : "hover:-translate-y-1"} ${card}`}>
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
              <Reveal key={section.title} delay={index * 90} variant={isEditorial ? "scale" : "rise"}>
                <article className={`relative h-full overflow-hidden p-8 ${cardFlat} ${isEditorial ? (index === 0 ? "border-accent/25 bg-gradient-to-br from-surface to-accent-soft/45" : "border-line-strong bg-canvas-deep") : ""}`}>
                  {isEditorial && <span className="absolute right-6 top-4 text-6xl font-semibold leading-none text-accent/10" aria-hidden="true">0{index + 1}</span>}
                  <AccentRule className="mb-6" />
                  <h2 className={`relative ${h2}`}>{section.title}</h2>
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
          <section className={`mt-16 ${isEditorial ? "rounded-[2rem] bg-surface px-5 py-10 shadow-[0_20px_60px_rgba(35,41,54,0.06)] ring-1 ring-line sm:px-8 sm:py-12" : ""}`} aria-labelledby="build-section-heading">
            <Reveal>
              <h2 id="build-section-heading" className={h2}>{buildSection.title}</h2>
              <p className={`max-w-3xl ${lead}`}>{buildSection.intro}</p>
            </Reveal>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {buildSection.items.map((item, index) => (
                <Reveal key={item.title} delay={index * 60} variant={isEditorial && index % 2 === 1 ? "fade" : "rise"}>
                  <article className={`h-full p-6 ${card} ${isEditorial ? "motion-safe:md:hover:-translate-y-1" : ""}`}>
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
            <ol className={`relative mt-8 grid gap-4 md:grid-cols-4 ${isEditorial ? "before:absolute before:bottom-0 before:left-[1.15rem] before:top-0 before:w-px before:bg-line-strong md:before:bottom-auto md:before:left-[12.5%] md:before:right-[12.5%] md:before:top-[1.15rem] md:before:h-px md:before:w-auto" : ""}`}>
              {journey.stages.map((stage, index) => (
                <Reveal key={stage.title} delay={index * 70}>
                  <li className={`relative h-full ${isEditorial ? "pl-14 md:pl-0 md:pt-14" : `p-6 ${cardFlat}`}`}>
                    {isEditorial && <span className="absolute left-0 top-0 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 bg-surface text-sm font-semibold text-accent shadow-soft md:left-1/2 md:-translate-x-1/2">{index + 1}</span>}
                    <div className={isEditorial ? `h-full p-6 ${cardFlat}` : ""}>
                      <p className="text-xs font-semibold uppercase tracking-widest text-accent">Stage {index + 1}</p>
                      <h3 className={`mt-3 ${h3}`}>{stage.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-body">{stage.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        <Reveal className="mt-16" variant={isEditorial ? "fade" : "rise"}><aside className={`relative overflow-hidden p-6 sm:p-8 ${cardFlat} ${isEditorial ? "border-accent/20 bg-accent-soft/55 sm:flex sm:items-center sm:justify-between sm:gap-8" : ""}`}>
          <AmbientField />
          <div className="relative max-w-3xl">
            <h2 className={h3}>{assessmentCta?.title ?? "Start with a clearer picture"}</h2>
            <p className={`mt-2 ${caption}`}>{assessmentCta?.text ?? "Explore our free assessments before your next leadership conversation."}</p>
            {!isEditorial && (
              <Link href={assessmentCta?.href ?? "/resources"} className={`mt-4 ${linkInline}`}>
                {assessmentCta?.label ?? "Explore 2Nspira resources"} →
              </Link>
            )}
          </div>
          {isEditorial && (
            <Link href={assessmentCta?.href ?? "/resources"} className={`relative mt-5 shrink-0 ${buttonPrimary} sm:mt-0`}>
              {assessmentCta?.label ?? "Explore 2Nspira resources"} →
            </Link>
          )}
        </aside></Reveal>

        {closingCta && (
          <Reveal className="mt-16" variant={isEditorial ? "scale" : "rise"}>
            <section className={`relative overflow-hidden rounded-[2rem] bg-ink px-6 py-12 text-center sm:px-10 sm:py-16 ${isEditorial ? "shadow-[0_24px_70px_rgba(31,36,48,0.20)]" : ""}`} aria-labelledby="closing-cta-heading">
              {isEditorial && <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />}
              <div className="relative">
                {closingCta.eyebrow && <p className="text-sm font-semibold uppercase tracking-widest text-white/70">{closingCta.eyebrow}</p>}
                <h2 id="closing-cta-heading" className="mx-auto mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">{closingCta.title}</h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/75">{closingCta.text}</p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link href={closingCta.primary.href} className={buttonPrimary}>{closingCta.primary.label} →</Link>
                  {closingCta.secondary && (
                    <Link href={closingCta.secondary.href} className={`${buttonSecondary} text-white hover:text-white/80 focus-visible:ring-white focus-visible:ring-offset-ink`}>{closingCta.secondary.label} →</Link>
                  )}
                </div>
              </div>
            </section>
          </Reveal>
        )}
      </div>
    </main>
  );
}
