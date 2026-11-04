import Openings from "@/components/careers/Openings";
import { publicJobs } from "@/lib/careers/server";
export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./careers.module.css";
import CatalogEffects from "@/components/catalog/CatalogEffects";
import { AccentRule, AmbientField, EyebrowPill } from "@/components/VisualAccents";
import {
  body,
  buttonPrimary,
  buttonSecondary,
  cardFlat,
  h2,
  h3,
  lead,
  pageMain,
  section,
  sectionBand,
} from "@/components/ui";

const title = "Careers at 2Nspira | Practical Business Transformation";
const description =
  "Help businesses work better through practical technology and consulting. Explore 2Nspira openings and connect about future roles and project opportunities.";
const socialImage = "https://2nspira.com/images/logo/og-image-v2.png";
const introductionUrl = "mailto:hello@2nspira.com?subject=2Nspira%20Talent%20Network%20Introduction";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Help businesses work better with us",
    description,
    url: "/careers",
    siteName: "2Nspira",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "2Nspira" }],
  },
  twitter: { title: "Help businesses work better with us", description, images: [socialImage] },
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
  "Entrepreneur mentoring and coaching",
  "Industry leadership and venture development",
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

export default async function CareersPage() {
  const initialJobs = await publicJobs().catch(() => null);
  return (
    <main className={`${pageMain} ${styles.careers}`} id="main-content">
      <CatalogEffects headings>
      <header className="relative overflow-hidden border-b border-line bg-surface py-16 sm:py-24">
        <AmbientField />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
          <div data-catalog-reveal>
            <p><EyebrowPill>Careers at 2Nspira</EyebrowPill></p>
            <h1 className="mt-5 text-[length:var(--type-display)] font-medium leading-[1.08] tracking-[-0.04em] text-ink">
              Build what&apos;s next with us.
            </h1>
            <p className={`max-w-xl ${lead}`}>Bring your expertise. Help businesses and the people leading them work better.</p>
            <nav aria-label="Career paths" className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#opportunities-heading" className={`min-h-11 ${buttonPrimary}`}>Explore open roles <span aria-hidden="true" className="ml-2">↗</span></a>
              <a href="#network-heading" className={`min-h-11 border border-line ${buttonSecondary}`}>Join our talent network <span aria-hidden="true">→</span></a>
            </nav>
            <p className="mt-5 text-sm leading-6 text-muted">Employment · Consulting · Project collaboration</p>
          </div>
          <div data-catalog-reveal className={styles.visual}>
            <figure className="group overflow-hidden rounded-[2rem] border border-line shadow-[0_20px_60px_rgba(35,41,54,0.10)]">
              <Image src="/images/pages/careers-collaboration.png"
                alt="Illustrative scene of professionals collaborating around laptops in a technology workspace."
                width={1536} height={1024} sizes="(max-width: 1023px) 100vw, 560px" priority
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-gentle motion-safe:group-hover:scale-[1.025] motion-reduce:transform-none" />
            </figure>
          </div>
        </div>
      </header>

      <section className={sectionBand} aria-labelledby="opportunities-heading">
        <div data-catalog-reveal className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Opportunities</p>
          <h2 id="opportunities-heading" tabIndex={-1} className={`mt-4 ${h2}`}>Current Opportunities</h2>
          <Openings initialJobs={initialJobs} />

        </div>
      </section>

      <section className={section} aria-labelledby="network-heading">
        <div data-catalog-reveal className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-8 shadow-soft sm:p-12">
            <AmbientField />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">Future collaboration</p>
              <h2 id="network-heading" tabIndex={-1} className={`mt-4 ${h2}`}>Join the 2Nspira Talent Network</h2>
              <p className={`mt-5 max-w-2xl ${body}`}>
                Let’s connect about future roles, consulting, or project collaboration. Tell us what you do best and the kind of work you’re looking for.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
                Introduce yourself by email. A brief note about your expertise and a link to your professional profile is a good place to start.
              </p>
              <a href={introductionUrl} className={`mt-7 min-h-11 ${buttonPrimary}`}>Introduce Yourself →</a>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionBand} aria-labelledby="expertise-heading">
        <div data-catalog-reveal className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Bring your strengths</p>
          <h2 id="expertise-heading" className={`mt-4 ${h2}`}>Where you could contribute</h2>
          <p className="mt-4 max-w-2xl leading-8 text-body">Skills we connect with as client needs evolve—not a list of current vacancies.</p>
          <ul className="mt-7 flex flex-wrap gap-3">
            {expertise.map((item) => (
              <li key={item} className={styles.expertise}><span aria-hidden="true" />{item}</li>
            ))}
          </ul>
          <Link href="/coaching" className="mt-6 inline-flex min-h-11 items-center rounded font-medium text-accent underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Explore our mentoring approach →</Link>
        </div>
      </section>

      <section className={sectionBand} aria-labelledby="values-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div data-catalog-reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">How we work</p>
            <h2 id="values-heading" className={`mt-4 ${h2}`}>What We Value</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div data-catalog-reveal key={value.title}>
                <div data-catalog-card className={`group h-full p-6 ${cardFlat}`}>
                  <AccentRule className="mb-5" />
                  <h3 className={h3}>{value.title}</h3>
                  <p className="mt-3 leading-7 text-body">{value.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={section} aria-labelledby="relationships-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div data-catalog-reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Ways to work together</p>
            <h2 id="relationships-heading" className={`mt-4 ${h2}`}>Types of Relationships</h2>
            <p className="mt-4 max-w-2xl leading-8 text-body">The form of collaboration depends on the opportunity and the needs of the engagement.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {relationships.map((relationship, index) => (
              <div data-catalog-reveal key={relationship.title}>
                <div data-catalog-card className={`group h-full p-6 sm:p-8 ${cardFlat}`}>
                  <span className="text-xs font-semibold tracking-[0.18em] text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <AccentRule className="mt-4 mb-4" />
                  <h3 className={h3}>{relationship.title}</h3>
                  <p className="mt-3 leading-7 text-body">{relationship.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-canvas-deep py-16 sm:py-20" aria-labelledby="final-cta-heading">
        <div data-catalog-reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 id="final-cta-heading" className={h2}>Interested in working with 2Nspira?</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-body">
            We&apos;re interested in meeting thoughtful professionals whose experience aligns with the work we do.
          </p>
          <a href={introductionUrl} className={`mt-7 min-h-11 ${buttonPrimary}`}>Join Our Talent Network →</a>
        </div>
      </section>
      </CatalogEffects>
    </main>
  );
}
