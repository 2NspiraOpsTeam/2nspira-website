import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import source from "@/content/our-story.json";
import {
  buttonPrimary,
  card,
  cardFlat,
  pageHero,
  eyebrow,
  h2,
  h3,
  lead,
  pageMain,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "From EKM IT Solutions to 2Nspira: practical, human-centered technology that helps organizations move forward with clarity, trust, and purpose.",
  alternates: { canonical: "/about" },
};

const framework = [
  { title: "Functional", text: "Systems that work the way you do" },
  { title: "Financial", text: "Smart investments with clear ROI" },
  { title: "Emotional", text: "Technology that builds confidence" },
  { title: "Identity", text: "Solutions reflecting your organization" },
  { title: "Meaning", text: "Outcomes supporting your mission" },
];

export default function AboutPage() {
  const story = source.blocks.slice(1, 12);
  return (
    <main className={pageMain} id="main-content">
      {/* Header with gradient + Reveal animations — /websites pattern */}
      <header className="relative overflow-hidden bg-gradient-to-b from-[#3c5c8c]/10 via-[#4a6fa5]/5 to-transparent py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal delay={0}>
            <p className={eyebrow}>Our story</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Technology should inspire possibility—not pressure.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className={lead}>
              We help smaller organizations access the technology strategy, systems
              thinking, and innovation support often reserved for larger
              institutions.
            </p>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        {/* Image with Reveal */}
        <Reveal>
          <figure className="-mx-4 mt-0 overflow-hidden sm:-mx-6 lg:-mx-8">
            <Image
              src="/images/advisory/collaborative-strategy.webp"
              alt="Conceptual visualization of a collaborative strategy discussion."
              width={1672}
              height={941}
              className="h-auto w-full"
            />
          </figure>
        </Reveal>

        {/* Ethos section — wrapped in Reveal */}
        <Reveal>
          <section className={`mt-12 p-6 sm:p-10 ${card}`}>
            <h2 className={h2}>Our ethos</h2>
            {story.map((block) => (
              <p key={block.heading ?? block.text} className="mt-5 leading-8 text-body">
                {block.text}
              </p>
            ))}
          </section>
        </Reveal>

        {/* Framework cards — Reveal + hover lift + glow orb + eyebrow label + pill tag */}
        <Reveal>
          <section>
            <h2 className={h2}>The 2Nspira Framework</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {framework.map((item, index) => (
                <div
                  key={item.title}
                  className={`group relative flex flex-col p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft ${cardFlat}`}
                >
                  {/* Glow orb on hover — /websites card pattern */}
                  <div
                    className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-accent-soft opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  {/* Eyebrow label with number — /websites pattern */}
                  <p className={eyebrow}>
                    {String(index + 1).padStart(2, "0")} · {item.title}
                  </p>
                  <p className="mt-3 text-body">{item.text}</p>
                  {/* Pill tag */}
                  <div className="mt-auto pt-4">
                    <span className="inline-block rounded-full bg-canvas-deep px-3 py-1 text-xs font-medium text-body">
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* CTA — Reveal-wrapped */}
        <Reveal>
          <section>
            <h2 className={h2}>When you grow, we all move forward.</h2>
            <p className={`mt-4 ${lead}`}>
              We work with educational institutions, nonprofits, small businesses,
              IT teams, creatives, and professionals. Your success is a shared
              mission.
            </p>
            <Link href="/contact" className={`mt-6 ${buttonPrimary}`}>
              Start a conversation →
            </Link>
          </section>
        </Reveal>

        {/* Dark CTA band — /websites approach section pattern */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#1f2430] to-[#232936] py-16 sm:py-20">
          {/* Decorative glow orbs */}
          <div className="absolute -right-20 -top-16 h-40 w-40 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
          <div className="absolute -left-16 -bottom-12 h-32 w-32 rounded-full bg-accent/15 blur-2xl" aria-hidden="true" />
          <Reveal>
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <div className={`flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${cardFlat}`}>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-canvas sm:text-3xl">
                    Have a project in mind?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Tell us the outcome. We&apos;ll help identify the simplest useful path.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className={`${buttonPrimary} shrink-0 self-start sm:self-auto`}
                >
                  Discuss your project
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
