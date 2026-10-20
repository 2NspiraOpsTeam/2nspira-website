import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import styles from "./resources.module.css";

export const metadata: Metadata = publicPageMetadata({
  "title": "Resources | Assessments and Practical Tools",
  "description": "Use free 2Nspira assessments to identify professional strengths, evaluate organizational AI readiness, and turn insight into practical next steps.",
  "path": "/resources"
});

const strengthsUrl = "/resources/strength-profile";
const readinessUrl = "/resources/ai-readiness-scorecard";

function Arrow() {
  return <span className={styles.arrow} aria-hidden="true">↗</span>;
}

function Marker({ kind }: { kind: number }) {
  const paths = [
    <><circle cx="12" cy="9" r="4" /><path d="M5 21v-2a7 7 0 0 1 14 0v2M12 1v2" /></>,
    <><path d="M4 4h16v12H9l-5 4V4Z" /><path d="M8 8h8M8 12h5" /></>,
    <><circle cx="8" cy="7" r="3" /><circle cx="18" cy="9" r="2" /><path d="M2 21v-3a6 6 0 0 1 12 0v3M17 15a5 5 0 0 1 5 5v1" /></>,
    <><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z" /><path d="m8 12 3 3 5-6" /></>,
  ];
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind]}</svg>;
}

function Benefits({ items }: { items: string[] }) {
  return <ul className={styles.benefits}>{items.map((item) => <li key={item}><span aria-hidden="true">✦</span>{item}</li>)}</ul>;
}

export default function ResourcesPage() {
  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.hero} aria-labelledby="resources-title">
        <div className={`${styles.container} ${styles.heroInner}`}>
          <div>
            <p className={styles.eyebrow}><span aria-hidden="true" />Resources</p>
            <h1 id="resources-title">Practical tools.<br /><em>Clearer next steps.</em></h1>
            <p className={styles.intro}>Assess where you are, understand what matters,<br className={styles.desktopBreak} /> and move forward with greater clarity.</p>
            <p className={styles.heroNote}>Two free assessments. A more informed starting point.</p>
          </div>
          <div className={styles.heroArt} aria-hidden="true">
            <div className={styles.orbit} />
            <div className={`${styles.miniCard} ${styles.backCard}`}><span>02 / ORGANIZATIONS</span><p>Readiness<br />before scale.</p><div className={styles.nodePath}><i /><i /><i /></div></div>
            <div className={`${styles.miniCard} ${styles.frontCard}`}><span>01 / PROFESSIONALS</span><div className={styles.compass}>✦</div><p>Clarity starts<br />with you.</p><div className={styles.cardRule} /></div>
            <span className={styles.artCaption}>REFLECT · UNDERSTAND · MOVE FORWARD</span>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        <div className={styles.sectionLabel}><span>THE ASSESSMENTS</span><span>Individual insight. Organizational perspective.</span></div>
        <section id="professional-strengths" className={styles.feature} aria-labelledby="strengths-title">
          <Reveal className={styles.reveal}>
            <figure className={styles.visual}>
              <Image src="/images/pages/resources-strengths.svg" width={600} height={480} alt="A reflection framework connecting natural strengths, work style, and role fit around how you create value." />
              <figcaption><span>01 / PROFESSIONAL CLARITY</span><span>Start with self-awareness</span></figcaption>
            </figure>
          </Reveal>
          <Reveal className={styles.reveal}>
            <div className={styles.copy}>
              <p className={styles.kicker}>For professionals &amp; the people who guide them</p>
              <h2 id="strengths-title">Professional Strengths Assessment</h2>
              <p className={styles.description}>Understand how you naturally create value, collaborate, and thrive at work.</p>
              <Benefits items={["Natural strengths", "Role fit & energy", "Coaching & career conversations"]} />
              <Link href={strengthsUrl} className={styles.primary}>Take the assessment <Arrow /></Link>
            </div>
          </Reveal>
        </section>

        <section id="ai-readiness" className={`${styles.feature} ${styles.reverse}`} aria-labelledby="readiness-title">
          <Reveal className={`${styles.reveal} ${styles.featureVisual}`}>
            <figure className={`${styles.visual} ${styles.darkVisual}`}>
              <Image src="/images/pages/resources-ai-readiness.svg" width={600} height={480} alt="An organizational AI readiness framework linking strategy, governance, workflows, and trust to implementation." />
              <figcaption><span>02 / ORGANIZATIONAL READINESS</span><span>Build on a considered foundation</span></figcaption>
            </figure>
          </Reveal>
          <Reveal className={`${styles.reveal} ${styles.featureCopy}`}>
            <div className={styles.copy}>
              <p className={styles.kicker}>For leaders making decisions about AI</p>
              <h2 id="readiness-title">AI Readiness Assessment <em>for Organizations</em></h2>
              <p className={styles.description}>Evaluate strategy, governance, workflows, trust, and implementation readiness before scaling AI.</p>
              <Benefits items={["Identify readiness gaps", "Support executive decisions", "Build a responsible adoption path"]} />
              <Link href={readinessUrl} className={styles.primary}>Assess your organization <Arrow /></Link>
            </div>
          </Reveal>
        </section>
      </div>

      <section className={styles.practical} aria-labelledby="practical-title">
        <div className={styles.container}>
          <div className={styles.bandHeading}><h2 id="practical-title">Designed for practical use</h2><p>A starting point for a better conversation.</p></div>
          <ul className={styles.useCases}>{["Career reflection", "Coaching", "Team development", "Responsible AI planning"].map((label, index) => <li key={label}><Marker kind={index} /><span>{label}</span></li>)}</ul>
        </div>
      </section>

      <section className={`${styles.container} ${styles.closing}`} aria-labelledby="closing-title">
        <p className={styles.kicker}>A little clarity goes a long way</p>
        <h2 id="closing-title">Not sure where to start?</h2>
        <p>Choose the assessment that best matches the decision you are trying to make.</p>
        <p>Looking for ongoing guidance? Our separately arranged Entrepreneur Mentoring &amp; Coaching service matches you with a coach aligned with your industry. Coaching is not included with the free assessments.</p>
        <div className={styles.closingActions}>
          <Link href="/coaching" className={styles.secondary}>Explore mentoring &amp; coaching <Arrow /></Link>
          <Link href={strengthsUrl} className={styles.secondary}>Explore Professional Strengths <Arrow /></Link>
          <Link href={readinessUrl} className={styles.secondary}>Explore AI Readiness <Arrow /></Link>
        </div>
      </section>
    </main>
  );
}
