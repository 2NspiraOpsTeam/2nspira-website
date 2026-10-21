import PageIdentity from "@/components/PageIdentity";
import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { AccentRule, AmbientField, EyebrowPill } from "@/components/VisualAccents";
import source from "@/content/our-story.json";
import {
  buttonPrimary,
  card,
  cardFlat,
  h2,
  h3,
  lead,
  pageMain,
  pageHero,
} from "@/components/ui";

export const metadata: Metadata = publicPageMetadata({
  "title": "Our Human-Centered Approach",
  "description": "Meet 2Nspira. Discover our human-centered approach to technology strategy, responsible AI, systems, and entrepreneur mentoring and coaching.",
  "path": "/about"
});

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
      <PageIdentity type="AboutPage" name="Our Human-Centered Approach" path="/about" />
      <header className={`${pageHero} relative overflow-hidden text-center`}>
        <AmbientField />
        <div className="relative">
        <p><EyebrowPill>Our story</EyebrowPill></p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Technology should inspire possibility—not pressure.
        </h1>
        <p className={`mx-auto max-w-2xl ${lead}`}>
          We help smaller organizations access the technology strategy, systems
          thinking, and innovation support often reserved for larger
          institutions. We also help entrepreneurs build their businesses and
          strengthen their leadership through mentoring and coaching.
        </p></div>
      </header>

      <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <figure className="group relative -mx-4 mt-0 overflow-hidden rounded-[2rem] border border-line shadow-[0_20px_60px_rgba(35,41,54,0.10)] sm:mx-0">
          <Image
            src="/images/advisory/collaborative-strategy.webp"
            alt="Conceptual visualization of a collaborative strategy discussion."
            width={1672}
            height={941}
            className="h-auto w-full transition-transform duration-700 ease-gentle motion-safe:group-hover:scale-[1.015]"
          />
        </figure>

        <Reveal className="mt-12"><section className={`relative overflow-hidden p-6 sm:p-10 ${card}`}>
          <AccentRule className="mb-6" />
          <h2 className={h2}>Our ethos</h2>
          <p className="mt-5 leading-8 text-body">{story[0].text}</p>
          <div className="mt-8 space-y-4">
            {[
              { title: "Our story and evolution", paragraphs: story.slice(1, 3) },
              { title: "How we make technology practical", paragraphs: story.slice(3, 6) },
              { title: "The difference we work toward", paragraphs: story.slice(6) },
            ].map((section, index) => (
              <details key={section.title} className="group rounded-2xl border border-line bg-canvas p-5 open:bg-surface sm:p-6">
                <summary className="cursor-pointer text-lg font-semibold text-ink marker:text-accent">
                  <span className="ml-2 mr-3 text-sm text-accent">0{index + 1}</span>{section.title}
                </summary>
                {section.paragraphs.map((block, i) => <p key={i} className="mt-5 leading-8 text-body">{block.text}</p>)}
              </details>
            ))}
          </div>
        </section></Reveal>

        <section className={`mt-12 p-6 sm:p-10 ${card}`} aria-labelledby="about-coaching-heading">
          <AccentRule className="mb-6" />
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">People as well as platforms</p>
          <h2 id="about-coaching-heading" className={`mt-4 ${h2}`}>Support for the business—and the person leading it.</h2>
          <p className={`mt-4 ${lead}`}>Technology leadership helps organizations make better decisions about their systems. Entrepreneur Mentoring &amp; Coaching creates space for the decisions, mindset, and leadership habits of the person building the business.</p>
          <p className="mt-4 leading-8 text-body">A handful of industry leaders are available to coach you. We match you with a coach aligned with your industry to work through customer discovery, product development, delegation, and accountability.</p>
          <Link href="/coaching" className={`mt-6 min-h-11 ${buttonPrimary}`}>Explore Entrepreneur Mentoring &amp; Coaching →</Link>
        </section>

        <section className="mt-20">
          <Reveal>
          <h2 className={h2}>The 2Nspira Framework</h2>
          <p className={`mt-4 max-w-2xl ${lead}`}>Five dimensions keep technology grounded in the people and mission it serves.</p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {framework.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}><div className={`group h-full p-6 hover:bg-surface hover:shadow-soft ${cardFlat}`}>
                <span className="text-xs font-semibold tracking-[0.18em] text-accent">{String(index + 1).padStart(2, "0")}</span>
                <h3 className={h3}>{item.title}</h3>
                <p className="mt-3 text-body">{item.text}</p>
              </div></Reveal>
            ))}
          </div>
        </section>

        <Reveal className="mt-20"><section className="relative overflow-hidden rounded-[2rem] border border-line bg-canvas-deep p-8 shadow-soft sm:p-12">
          <AmbientField />
          <div className="relative">
          <h2 className={h2}>When you grow, we all move forward.</h2>
          <p className={`mt-4 ${lead}`}>
            We work with educational institutions, nonprofits, small businesses,
            IT teams, creatives, professionals, and entrepreneurs developing their
            ventures and leadership. Your success is a shared
            mission.
          </p>
          <Link href="/contact" className={`mt-6 ${buttonPrimary}`}>
            Start a conversation →
          </Link>
          </div>
        </section></Reveal>
      </div>
    </main>
  );
}
