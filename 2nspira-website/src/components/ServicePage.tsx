import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import { AccentRule, AmbientField, EyebrowPill } from "./VisualAccents";
import {
  buttonPrimary,
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
  steps: { title: string; text: string }[];
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  jsonLd?: Record<string, unknown>;
};

export default function ServicePage({ title, intro, audience, outcomes, steps, image, jsonLd }: Props) {
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
            <h2 className={h2}>What we help you achieve</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 leading-8 text-body">
              {outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div></Reveal>
        </section>

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

        <Reveal className="mt-12"><aside className={`relative overflow-hidden p-6 sm:p-8 ${cardFlat}`}>
          <AmbientField />
          <div className="relative">
          <h2 className={h3}>Start with a clearer picture</h2>
          <p className={`mt-2 ${caption}`}>
            Explore our free assessments before your next leadership conversation.
          </p>
          <Link href="/resources" className={`mt-4 ${linkInline}`}>
            Explore 2Nspira resources →
          </Link>
          </div>
        </aside></Reveal>
      </div>
    </main>
  );
}
