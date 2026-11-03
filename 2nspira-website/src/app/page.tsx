import Image from "next/image";
import Link from "next/link";
import { Compass, Rocket, ClipboardCheck } from "lucide-react";
import type { Metadata } from "next";
import { serviceNeeds } from "@/lib/serviceNeeds";
import styles from "./homepage.module.css";
import ImpactTimeline from "./ImpactTimeline";

const homepageDescription =
  "Make your business work better with 2Nspira. Reduce manual work, improve operations, serve customers better, and support growth through practical technology.";
const homepageShareTitle =
  "Your business, working better. Technology with purpose.";
const homepageSocialImage = "https://2nspira.com/images/logo/og-image-v2.png";

export const metadata: Metadata = {
  title: { absolute: "Business Transformation for Practical Results | 2Nspira" },
  description: homepageDescription,
  alternates: { canonical: "https://2nspira.com/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://2nspira.com/",
    siteName: "2Nspira",
    title: homepageShareTitle,
    description: homepageDescription,
    images: [
      {
        url: homepageSocialImage,
        width: 1200,
        height: 630,
        alt: "2Nspira",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homepageShareTitle,
    description: homepageDescription,
    images: [homepageSocialImage],
  },
};

const serviceImages = [
  "/images/homepage/service-website.jpg",
  "/images/homepage/tech-automation.jpg",
  "/images/homepage/tech-ai.jpg",
  "/images/homepage/executive-boardroom-v1.jpg",
  "/images/homepage/mentoring-office-v2.webp",
];
const serviceAlts = ["Person reviewing a visual website on a laptop", "Engineer programming a laptop beside automated equipment", "Developer working with code across multiple screens", "Executives discussing strategy in a modern boardroom", "Two professionals engaged in a thoughtful one-to-one conversation in a modern office"];

function Photo({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return <Image src={src} alt={alt} fill unoptimized sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 70vw" priority={priority} className={className} />;
}

export default function Home() {
  return <main id="main-content" className={styles.home}>
    <section className={styles.hero} aria-labelledby="hero-heading">
      <Photo src="/images/homepage/tech-hero.jpg" alt="Technology professional using a portable computer beside server racks" priority />
      <div className={styles.heroShade} />
      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>People. Purpose. Possibility.</p>
        <h1 id="hero-heading">A clearer vision.<br />A stronger business.</h1>
        <p>Improve operations, make clearer technology decisions, adopt AI with purpose, and build digital experiences that serve your customers.</p>
        <Link className={styles.lightButton} href="/contact#contact-message">Let’s build what’s next <span aria-hidden="true">↗</span></Link>
      </div>
      <a href="#our-purpose" className={styles.heroFoot}>Independent thinking. Practical change. Since 2019. <span aria-hidden="true">↓</span></a>
    </section>

    <section className={`${styles.section} ${styles.intro}`} id="our-purpose" aria-labelledby="intro-heading">
      <p className={styles.eyebrow}>Your business transformation partner</p>
      <h2 id="intro-heading">Good technology starts<br />with understanding people.</h2>
      <p>Behind every business challenge are people trying to do their best work. We help you see what’s getting in the way, simplify the complex, and move forward with purpose.</p>
      <Link href="/about" className={styles.textLink}>Get to know 2Nspira <span aria-hidden="true">↗</span></Link>
    </section>

    <section className={styles.section} id="find-the-right-service" aria-labelledby="services-heading">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>What we do</p><h2 id="services-heading">Expertise that moves<br />your business forward.</h2></div><Link href="/services" className={styles.textLink}>Explore our services</Link></div>
      <div className={styles.services}>{serviceNeeds.map((service, i) => <article key={service.href} className={styles.service}>
        <Link href={service.href} className={styles.serviceImage} aria-label={service.name}><Photo src={serviceImages[i]} alt={serviceAlts[i]} /></Link>
        <h3><Link href={service.href}>{service.name}</Link></h3><p>{service.help}</p>
      </article>)}</div>
    </section>

    <section className={styles.audience} aria-labelledby="audience-heading">
      <div className={styles.audienceImage}><Photo src="/images/homepage/tech-community.jpg" alt="Two developers reviewing code together on a laptop" /></div>
      <div className={styles.bandCopy}>
        <p className={styles.eyebrow}>Who we serve</p>
        <h2 id="audience-heading">For organizations ready to move beyond what’s holding them back.</h2>
        <p>Whether you’re growing a business, leading a team, serving a community, or building something new, we help you overcome what stands between where you are and where you want to go.</p>
        <ul className={styles.audienceNeeds}>{[
          { title: "Growing businesses", text: "Build the systems and digital experiences your next stage of growth demands." },
          { title: "Operations & technology leaders", text: "Bring clarity to technology decisions, simplify complexity, and make better use of AI." },
          { title: "Schools & nonprofits", text: "Make limited resources go further through practical technology and stronger operations." },
          { title: "Entrepreneurs & founders", text: "Gain the perspective and guidance to build confidently and lead effectively." },
        ].map(audience => <li key={audience.title}><h3>{audience.title}</h3><p>{audience.text}</p></li>)}</ul>
        <Link href="/contact#contact-message" className={styles.textLink}>Let’s discuss your challenge <span aria-hidden="true">↗</span></Link>
      </div>
    </section>

    <section className={`${styles.section} ${styles.challenges}`} aria-labelledby="challenges-heading">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>What brings you here?</p><h2 id="challenges-heading">Where do you need<br />to make progress?</h2></div><p className={styles.challengeIntro}>You don’t need to know which service to ask for. Start with the challenge you’re facing.</p></div>
      <div className={styles.challengeGrid}>{[
        { image: "challenge-operations", category: "Simpler operations", title: "Our operations have become too complicated.", text: "Simplify repetitive work and connect the systems your business relies on.", href: "/automation-systems-optimization", link: "Explore operations solutions" },
        { image: "digital-team", category: "AI with purpose", title: "We want to use AI, but need direction.", text: "Find valuable opportunities, prepare your people, and establish responsible practices.", href: "/ai-enablement", link: "Explore AI enablement" },
        { image: "tech-websites", category: "Better digital experiences", title: "Our website no longer meets our needs.", text: "Build a better customer experience with useful digital capabilities behind it.", href: "/websites", link: "Explore website solutions" },
        { image: "executive-staff-briefing-v1", category: "Confident leadership", title: "We need experienced technology leadership.", text: "Gain strategic direction and oversight without hiring a full-time CIO.", href: "/fractional-cio", link: "Explore technology leadership" },
      ].map(challenge => <Link key={challenge.href} href={challenge.href} className={styles.challengeCard}><div className={styles.challengePhoto}><Photo src={`/images/homepage/${challenge.image}.jpg`} alt="" /><span className={styles.challengeCategory}>{challenge.category}</span></div><div className={styles.challengeCopy}><h3>{challenge.title}</h3><p>{challenge.text}</p><span className={styles.challengeLink}>{challenge.link} <span className={styles.challengeArrow} aria-hidden="true">↗</span></span></div></Link>)}</div>
    </section>

    <section className={`${styles.section} ${styles.nextSteps}`} aria-labelledby="next-steps-heading">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Find your next step</p><h2 id="next-steps-heading">More ways to move forward.</h2></div></div>
      <div className={styles.nextStepGrid}>{[
        { icon: Rocket, title: "Building a new venture?", text: "Make room for a clearer direction, practical guidance, and your next chapter as a founder.", href: "/coaching", link: "Explore entrepreneur mentoring" },
        { icon: Compass, title: "Exploring what’s possible?", text: "Discover how our services connect your goals with the right expertise and support.", href: "/services", link: "Explore how we can help" },
        { icon: ClipboardCheck, title: "Considering AI?", text: "Take a first look at your organization’s readiness before deciding where to begin.", href: "/resources/ai-readiness-scorecard", link: "Start with the AI Readiness Scorecard" },
      ].map(({ icon: Icon, ...step }) => <Link key={step.href} href={step.href} className={styles.nextStepCard}><span className={styles.nextStepIcon}><Icon size={26} strokeWidth={1.5} aria-hidden="true" /></span><h3>{step.title}</h3><p>{step.text}</p><span className={styles.challengeLink}>{step.link}<span aria-hidden="true">↗</span></span></Link>)}</div>
    </section>

    <section className={`${styles.section} ${styles.purpose}`} aria-labelledby="purpose-heading">
      <div><p className={styles.eyebrow}>Our purpose</p><h2 id="purpose-heading">Make work better.<br />Make room for<br /><em>what matters.</em></h2></div>
      <div><p>Technology should create possibility, not more complexity. Our purpose is to help organizations work with greater clarity, confidence, and connection.</p><p>Experienced technology leadership. Hands-on implementation. A people-first approach. We connect strategic decisions with the work of building and improving systems, alongside the people who use them.</p><Link href="/our-story" className={styles.textLink}>Discover our story <span aria-hidden="true">↗</span></Link></div>
    </section>

    <section className={styles.feature} aria-labelledby="feature-heading">
      <div className={styles.featureCopy}><p className={styles.eyebrow}>Published project / Digital platforms</p><h2 id="feature-heading">Teams<br />Management.</h2><p className={styles.featureLead}>A connected property experience.<br />Built around the people who use it.</p>
        <dl><div><dt>The challenge</dt><dd>Help prospective residents and businesses discover the right property and reach the right team.</dd></div><div><dt>The solution</dt><dd>Property discovery, galleries, maps, rental inquiries, tenant service entry points, and authorized staff tools.</dd></div><div><dt>Explore the delivered experience</dt><dd>Browse residential and retail properties, view galleries and locations, and follow inquiry paths on the published website. See the project overview for the wider scope.</dd></div></dl>
        <Link href="/work#teams-management" className={styles.lightButton}>Explore the project <span aria-hidden="true">↗</span></Link>
      </div><div className={styles.featureImage}><Image src="/images/pages/teams-showcase-20261028.jpg" alt="Teams Management public website with property discovery and tenant services" width={1440} height={1000} unoptimized sizes="(max-width: 800px) 100vw, 55vw" /><a href="https://www.teamsmanagement.com/" target="_blank" rel="noopener noreferrer" className={styles.projectVisit}>Visit Teams Management <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></div>
    </section>

    <section className={`${styles.section} ${styles.impact}`} aria-labelledby="impact-heading">
      <h2 id="impact-heading">Making an impact since 2019.</h2>
      <ImpactTimeline />
    </section>

    <section className={`${styles.section} ${styles.work}`} aria-labelledby="work-heading"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>More perspectives. More possibility.</p><h2 id="work-heading">A closer look at our work.</h2></div><Link href="/work" className={styles.textLink}>View our work <span aria-hidden="true">↗</span></Link></div><div className={styles.workGrid}>{[
      {name:"GeVitals", image:"gevitals",text:"A bilingual clinic website connecting content, video, publishing, and local discovery."},
      {name:"Open Goal Soccer",image:"open-goal",text:"An accessible archival redesign preserving a community program’s mission and story."}
    ].map(project=><Link key={project.name} href="/websites#our-work" className={styles.workCard}><div><Photo src={`/images/pages/${project.image}-website-preview-20261021.jpg`} alt={`${project.name} public website preview`} /></div><h3>{project.name} <span aria-hidden="true">↗</span></h3><p>{project.text}</p></Link>)}</div></section>


  </main>;
}
