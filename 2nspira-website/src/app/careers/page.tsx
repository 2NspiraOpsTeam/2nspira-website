import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { AccentRule, AmbientField, EyebrowPill } from "@/components/VisualAccents";
import {
  body,
  buttonPrimary,
  cardFlat,
  h2,
  h3,
  lead,
  pageMain,
  section,
  sectionBand,
} from "@/components/ui";

const title = "Careers at 2Nspira | Technology, AI & Consulting Opportunities";
const description =
  "Explore future careers, consulting opportunities, and the 2Nspira talent network. Learn how we connect with technologists, AI specialists, consultants, and project partners.";
const socialImage = "https://2nspira.com/images/logo/og-image-v2.png";
const introductionUrl = "mailto:hello@2nspira.com?subject=2Nspira%20Talent%20Network%20Introduction";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Build what's next with us",
    description,
    url: "/careers",
    siteName: "2Nspira",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "2Nspira" }],
  },
  twitter: { title: "Build what's next with us", description, images: [socialImage] },
};

const expertise = [
  "AI and automation",
  "Full-stack development",
  "Data and analytics",
  "Cloud and infrastructure",
  "UX and UI design",
  "Project and delivery leadership",
  "Business systems consulting",
  "Independent technology advisory",
];

const values = [
  { title: "Practical problem solving", text: "Use technology to address real organizational needs." },
  { title: "Responsible AI", text: "Apply AI with purpose, sound judgment, and appropriate governance." },
  { title: "Accountability", text: "Own the work, communicate clearly, and follow through." },
  { title: "Business understanding", text: "Connect technical decisions to meaningful outcomes." },
  { title: "Continuous learning", text: "Stay curious as tools, practices, and client needs evolve." },
];

const relationships = [
  { title: "Employees", text: "Long-term roles may become available as 2Nspira and its client portfolio grow." },
  { title: "Independent consultants", text: "Experienced professionals may contribute specialized expertise to a particular engagement." },
  { title: "Project partners", text: "Individuals or organizations may collaborate where complementary capabilities create stronger client outcomes." },
];

export default function CareersPage() {
  return (
    <main className={pageMain} id="main-content">
      <header className="relative overflow-hidden border-b border-line bg-surface py-24 sm:py-28">
        <AmbientField />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p><EyebrowPill>Careers at 2Nspira</EyebrowPill></p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Build what&apos;s next with us.
          </h1>
          <p className={`mx-auto max-w-2xl ${lead}`}>
            We build relationships with technologists, strategists, designers, and specialists who believe technology should make organizations stronger, simpler, and more capable.
          </p>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-body">
            Our flexible model combines core leadership with specialized professionals and project partners as each client engagement requires.
          </p>
        </div>
      </header>

      <Reveal className="mx-auto max-w-5xl px-4 pt-10 sm:px-6">
        <figure className="group overflow-hidden rounded-[2rem] border border-line shadow-[0_20px_60px_rgba(35,41,54,0.10)]">
          <Image
            src="/images/pages/careers-collaboration.png"
            alt="Illustrative scene of professionals collaborating around laptops in a technology workspace."
            width={1536}
            height={1024}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
            priority
            className="h-auto w-full transition-transform duration-700 ease-gentle group-hover:scale-[1.015] motion-reduce:transform-none"
          />
        </figure>
      </Reveal>

      <section className={section} aria-labelledby="talent-model-heading">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">Our talent model</p>
              <h2 id="talent-model-heading" className={`mt-4 ${h2}`}>Expertise that scales with the work</h2>
              <p className={`mt-5 ${body}`}>
                We shape each engagement around the expertise it actually needs. Core leadership provides continuity; independent specialists and partners can be brought together for the work at hand.
              </p>
              <p className="mt-4 font-medium leading-8 text-ink">
                The right expertise for each engagement, with a delivery model designed to remain focused, adaptable, and responsive to client needs.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className={`p-6 sm:p-8 ${cardFlat}`}>
              <AccentRule className="mb-5" />
              <h3 className={h3}>Areas of expertise</h3>
              <p className="mt-2 text-sm leading-6 text-muted">Capabilities we may seek as client needs evolve:</p>
              <ul className="mt-6 grid gap-x-5 gap-y-3 sm:grid-cols-2">
                {expertise.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-body">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={sectionBand} aria-labelledby="opportunities-heading">
        <Reveal className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Opportunities</p>
          <h2 id="opportunities-heading" className={`mt-4 ${h2}`}>Current Opportunities</h2>
          <p className="mt-6 text-xl font-semibold text-ink">There are no open positions at this time.</p>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-body">
            2Nspira is growing its client portfolio and professional network. Employment, consulting, and project-based opportunities may become available as our work expands.
          </p>
        </Reveal>
      </section>

      <section className={section} aria-labelledby="network-heading">
        <Reveal className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-8 shadow-soft sm:p-12">
            <AmbientField />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">Future collaboration</p>
              <h2 id="network-heading" className={`mt-4 ${h2}`}>Join the 2Nspira Talent Network</h2>
              <p className={`mt-5 max-w-2xl ${body}`}>
                We welcome introductions from experienced professionals interested in future employment, independent consulting, or project collaboration opportunities. We value strong technical capability paired with sound business judgment.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
                Introduce yourself by email. A brief note about your expertise and a link to your professional profile is a good place to start.
              </p>
              <a href={introductionUrl} className={`mt-7 ${buttonPrimary}`}>Introduce Yourself →</a>
            </div>
          </div>
        </Reveal>
      </section>

      <section className={sectionBand} aria-labelledby="values-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">How we work</p>
            <h2 id="values-heading" className={`mt-4 ${h2}`}>What We Value</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 60}>
                <div className={`group h-full p-6 ${cardFlat}`}>
                  <AccentRule className="mb-5" />
                  <h3 className={h3}>{value.title}</h3>
                  <p className="mt-3 leading-7 text-body">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={section} aria-labelledby="relationships-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Ways to work together</p>
            <h2 id="relationships-heading" className={`mt-4 ${h2}`}>Types of Relationships</h2>
            <p className="mt-4 max-w-2xl leading-8 text-body">The form of collaboration depends on the opportunity and the needs of the engagement.</p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {relationships.map((relationship, index) => (
              <Reveal key={relationship.title} delay={index * 80}>
                <div className={`group h-full p-6 sm:p-8 ${cardFlat}`}>
                  <span className="text-xs font-semibold tracking-[0.18em] text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <AccentRule className="mt-4 mb-4" />
                  <h3 className={h3}>{relationship.title}</h3>
                  <p className="mt-3 leading-7 text-body">{relationship.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-canvas-deep py-16 sm:py-20" aria-labelledby="final-cta-heading">
        <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 id="final-cta-heading" className={h2}>Interested in working with 2Nspira?</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-body">
            We&apos;re interested in meeting thoughtful professionals whose experience aligns with the work we do.
          </p>
          <a href={introductionUrl} className={`mt-7 ${buttonPrimary}`}>Join Our Talent Network →</a>
        </Reveal>
      </section>
    </main>
  );
}
