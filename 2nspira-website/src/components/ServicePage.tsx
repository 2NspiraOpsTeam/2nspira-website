import Link from "next/link";
import Image from "next/image";
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
};

export default function ServicePage({ title, intro, audience, outcomes, steps, image }: Props) {
  return (
    <main className={pageMain} id="main-content">
      <section className="border-b border-line bg-surface">
        <div className={pageHero}>
          <Link href="/services" className={linkInline}>
            ← All services
          </Link>
          <h1 className="mt-8 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className={lead}>{intro}</p>
          <Link href="/contact" className={`mt-8 ${buttonPrimary}`}>
            Start a conversation →
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {image && (
          <figure className="overflow-hidden rounded-2xl border border-line shadow-soft">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width ?? 1672}
              height={image.height ?? 941}
              className="h-auto w-full"
            />
            <figcaption className="bg-canvas px-4 py-3 text-xs leading-relaxed text-muted">
              Conceptual visualization — not an actual 2Nspira client or engagement.
            </figcaption>
          </figure>
        )}

        <section className={`${image ? "mt-16" : ""} grid gap-8 md:grid-cols-2`} aria-label="Who we help and outcomes">
          <div>
            <h2 className={h2}>Who this is for</h2>
            <p className={`mt-4 ${lead}`}>
              {audience}
            </p>
          </div>
          <div>
            <h2 className={h2}>What we help you achieve</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 leading-8 text-body">
              {outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="approach-heading">
          <h2 id="approach-heading" className={h2}>
            From clarity to execution
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className={`p-6 ${card}`}>
                <p className="text-sm font-semibold tracking-widest text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className={`mt-4 ${h3}`}>{step.title}</h3>
                <p className={`mt-3 text-sm leading-7 ${""}`}>
                  <span className="text-body">{step.text}</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        <aside className={`mt-12 p-6 sm:p-8 ${cardFlat}`}>
          <h2 className={h3}>Start with a clearer picture</h2>
          <p className={`mt-2 ${caption}`}>
            Explore our free assessments before your next leadership conversation.
          </p>
          <Link href="/resources" className={`mt-4 ${linkInline}`}>
            Explore 2Nspira resources →
          </Link>
        </aside>
      </div>
    </main>
  );
}
