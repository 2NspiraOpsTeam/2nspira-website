import type { Metadata } from "next";
import Link from "next/link";
import source from "@/content/our-story.json";
import {
  buttonPrimary,
  card,
  cardFlat,
  eyebrow,
  h2,
  h3,
  lead,
  pageMain,
  pageHero,
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
    <main className={pageMain}>
      <header className={pageHero}>
        <p className={eyebrow}>Our story</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Technology should inspire possibility—not pressure.
        </h1>
        <p className={lead}>
          We help smaller organizations access the technology strategy, systems
          thinking, and innovation support often reserved for larger
          institutions.
        </p>
      </header>

      <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <section className={`p-6 sm:p-10 ${card}`}>
          <h2 className={h2}>Our ethos</h2>
          {story.map((block, i) => (
            <p key={i} className="mt-5 leading-8 text-body">
              {block.text}
            </p>
          ))}
        </section>

        <section className="mt-12">
          <h2 className={h2}>The 2Nspira Framework</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {framework.map((item) => (
              <div key={item.title} className={`p-6 ${cardFlat}`}>
                <h3 className={h3}>{item.title}</h3>
                <p className="mt-3 text-body">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
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
      </div>
    </main>
  );
}
