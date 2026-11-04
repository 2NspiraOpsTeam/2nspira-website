import LeadershipProfile from "@/components/LeadershipProfile";
import styles from "./about.module.css";
import { ArrowUpRight, Compass, HeartHandshake, Wrench } from "lucide-react";
import CatalogEffects from "@/components/catalog/CatalogEffects";
import PageIdentity from "@/components/PageIdentity";
import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { AccentRule, AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { companyStory } from "@/content/company-history";
import ImpactTimeline from "../ImpactTimeline";
import historyStyles from "../homepage.module.css";
import {
  buttonPrimary,
  card,
  h2,
  h3,
  lead,
  pageMain,
  buttonSecondary,
} from "@/components/ui";

export const metadata: Metadata = publicPageMetadata({
  title: "Your Business Transformation Partner",
  shareTitle: "Your goals first. Practical change together.",
  description: "Meet 2Nspira, your business transformation partner in New York City. We help simplify operations, serve customers better, and use technology with purpose.",
  path: "/about"
});

const framework = [
  { title: "Functional", text: "Systems that work the way you do" },
  { title: "Financial", text: "Smart investments with clear ROI" },
  { title: "Emotional", text: "Technology that builds confidence" },
  { title: "Identity", text: "Solutions reflecting your organization" },
  { title: "Meaning", text: "Outcomes supporting your mission" },
];

export default function AboutPage() {
  return (
    <main className={pageMain} id="main-content"><CatalogEffects headings>
      <PageIdentity type="AboutPage" name="Our Human-Centered Approach" path="/about" />
      <header className={styles.hero}>
        <AmbientField />
        <div className={styles.heroCopy}>
          <p><EyebrowPill>New York roots. Forward-looking thinking.</EyebrowPill></p>
          <h1 className={styles.headline}>Big possibilities.<br /><span>A human approach.</span></h1>
          <p className={lead}>You shouldn’t need a bigger organization to think bigger. We bring technology leadership and hands-on expertise together to help you turn what’s next into something real.</p>
          <div className={styles.actions}>
            <Link href="/contact" className={buttonPrimary}>Let’s build what’s next <ArrowUpRight size={17} className="ml-2" aria-hidden="true" /></Link>
            <Link href="/work" className={buttonSecondary}>Explore our work →</Link>
          </div>
          <p className={styles.heroNote}>Strategy with direction. Technology with purpose. People at the center.</p>
        </div>
        <figure className={styles.heroVisual}>
          <Image src="/images/advisory/collaborative-strategy.webp" alt="People gathered around a table for a collaborative technology strategy discussion." width={1672} height={941} sizes="(max-width: 900px) 100vw, 50vw" priority className={styles.heroImage} />
          <figcaption className={styles.photoCaption}><span>THE BELIEF BEHIND OUR WORK</span><strong>Technology should open doors.<br />Not get in your way.</strong></figcaption>
        </figure>
      </header>

      <div className={styles.proofBand} aria-label="Our journey at a glance">
        <div><strong>2019</strong><span>Our story began in New York</span></div>
        <div><strong>20+</strong><span>Community organizations supported</span></div>
        <div><strong>100th</strong><span>Website launch reached in 2024</span></div>
      </div>

      <LeadershipProfile />
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <Reveal className="mt-20"><section className={styles.story} aria-labelledby="our-story-heading">
          <div><AccentRule className="mb-6" /><p className={styles.eyebrow}>Our story</p><h2 id="our-story-heading" className={`mt-4 ${h2}`}>Built through experience.<br />Driven by possibility.</h2></div>
          <div>
            <p className="text-xl leading-9 text-ink">{companyStory.paragraphs[0]}</p>
            <p className="mt-5 leading-8 text-body">In 2025, under the leadership of Jeffrey Cortez, EKM IT Solutions became 2Nspira—bringing AI, automation, modern digital platforms, and executive technology leadership into one connected practice.</p>
            <p className="mt-5 leading-8 text-body">Our name evolved. Our purpose stayed the same: make technology work for the people and organizations it serves.</p>
            <details className={styles.details}><summary>The story behind the evolution</summary><div className="pt-4 space-y-4">{companyStory.paragraphs.slice(1).map(paragraph => <p key={paragraph} className="leading-8 text-body">{paragraph}</p>)}</div></details>
          </div>
        </section></Reveal>

        <section className="mt-20" aria-labelledby="partnership-heading">
          <Reveal><p className={styles.eyebrow}>What working together feels like</p><h2 id="partnership-heading" className={`mt-4 max-w-3xl ${h2}`}>A partner in the thinking.<br />And in the doing.</h2></Reveal>
          <div className={styles.partners}>
            {[
              { icon: Compass, title: "Clarity before complexity", text: "We start with your goals, your constraints, and the decisions in front of you—not a predetermined platform." },
              { icon: Wrench, title: "Ideas into working solutions", text: "From the roadmap to the rollout, strategic thinking stays connected to hands-on implementation." },
              { icon: HeartHandshake, title: "Progress that feels human", text: "We work alongside you, explain the choices, and help your team build confidence as things change." },
            ].map(({ icon: Icon, title, text }, index) => <Reveal key={title} delay={index * 60}><article className={`h-full p-7 ${card}`}><Icon className="mb-8 text-accent" size={28} strokeWidth={1.5} aria-hidden="true" /><h3 className={h3}>{title}</h3><p className="mt-4 leading-7 text-body">{text}</p></article></Reveal>)}
          </div>
        </section>

        <section className={`mt-16 ${historyStyles.storyHistory}`} aria-labelledby="company-history-heading">
          <h2 id="company-history-heading" className={`${h2} mb-8`}>Our company milestones</h2>
          <ImpactTimeline idPrefix="story" />
        </section>

        <section className={`mt-12 p-6 sm:p-10 ${card}`} aria-labelledby="about-coaching-heading">
          <AccentRule className="mb-6" />
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">People, not just platforms</p>
          <h2 id="about-coaching-heading" className={`mt-4 ${h2}`}>Building a stronger business starts with the person leading it.</h2>
          <p className={`mt-4 ${lead}`}>Technology can transform how a business operates. But behind every growing business is someone making difficult decisions, navigating uncertainty, and learning what it takes to lead.</p>
          <p className="mt-4 leading-8 text-body">You don&apos;t have to figure it all out alone.</p>
          <p className="mt-4 leading-8 text-body">At 2Nspira, we believe investing in the person is just as important as investing in the business. That&apos;s why we connect entrepreneurs and business owners with experienced, industry-aligned mentors who offer real-world perspective, honest feedback, and practical guidance.</p>
          <p className="mt-4 leading-8 text-body">Whether you&apos;re validating an idea, finding your first customers, developing a product, or learning to lead a growing team, our mentoring relationships help you turn challenges into clearer decisions—and decisions into meaningful progress.</p>
          <Link href="/coaching" className={`mt-6 min-h-11 ${buttonPrimary}`}>Explore Entrepreneur Mentoring &amp; Coaching →</Link>
        </section>

        <section className="mt-20" aria-labelledby="framework-heading">
          <Reveal><p className={styles.eyebrow}>Our compass</p><h2 id="framework-heading" className={`mt-4 ${h2}`}>Good technology works on a human level.</h2><p className={`mt-4 max-w-2xl ${lead}`}>The 2Nspira Framework asks five questions that keep every decision connected to your people and purpose.</p></Reveal>
          <div className={styles.framework}>
            {framework.map((item, index) => <Reveal key={item.title} delay={index * 40}><div className={styles.dimension}><span className={styles.eyebrow}>{String(index + 1).padStart(2, "0")} / {item.title}</span><h3 className={`mt-5 ${h3}`}>{["Does it make work easier?", "Is it a sound investment?", "Does it build confidence?", "Does it feel like you?", "Does it serve your mission?"][index]}</h3><p className="mt-4 leading-7 text-body">{item.text}</p></div></Reveal>)}
          </div>
        </section>

        <Reveal className="mt-20"><section className="relative overflow-hidden rounded-[2rem] border border-line bg-canvas-deep p-8 shadow-soft sm:p-12">
          <AmbientField />
          <div className="relative">
          <h2 className={h2}>Your next chapter starts with a clearer direction.</h2>
          <p className={`mt-4 ${lead}`}>
            We partner with growing businesses, established organizations, and mission-driven leaders who need practical technology expertise without unnecessary complexity. Based in New York City, we support clients nationally and internationally.
          </p>
          <Link href="/contact" className={`mt-6 ${buttonPrimary}`}>
            Let’s talk about your next chapter →
          </Link>
          </div>
        </section></Reveal>
      </div>
    </CatalogEffects></main>
  );
}
