import TransformationSupport from "@/components/TransformationSupport";
import { BOOKING_URL } from "@/lib/booking";
import ManufacturingDemo from "@/components/ManufacturingDemo";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { serviceNeeds } from "@/lib/serviceNeeds";
import styles from "./homepage.module.css";
import ImpactTimeline from "./ImpactTimeline";
import TeamsReviewCarousel from "./TeamsReviewCarousel";

const homepageDescription =
  "AI and technology transformation for growing organizations: AI enablement, business automation, digital platforms, executive advisory and ongoing managed support.";
const homepageShareTitle =
  "AI, Automation & Technology Consulting | 2Nspira";
const homepageSocialImage = "https://2nspira.com/images/logo/og-image-v2.png";

export const metadata: Metadata = {
  title: { absolute: homepageShareTitle },
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
  "/images/homepage/tech-ai.jpg",
  "/images/homepage/tech-automation.jpg",
];
const serviceAlts = ["Person reviewing a visual website on a laptop", "Developer working with code across multiple screens", "Engineer programming a laptop beside automated equipment"];

function Photo({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return <Image src={src} alt={alt} fill unoptimized sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 70vw" priority={priority} className={className} />;
}

const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://2nspira.com/#webpage",
      url: "https://2nspira.com/",
      name: homepageShareTitle,
      description: homepageDescription,
      inLanguage: "en-US",
      isPartOf: { "@id": "https://2nspira.com/#website" },
      about: { "@id": "https://2nspira.com/#organization" },
      mainEntity: { "@id": "https://2nspira.com/#services" },
    },
    {
      "@type": "ItemList",
      "@id": "https://2nspira.com/#services",
      name: "2Nspira services",
      numberOfItems: serviceNeeds.length,
      itemListElement: serviceNeeds.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.name,
          description: service.help,
          url: `https://2nspira.com${service.href}`,
          provider: { "@id": "https://2nspira.com/#organization" },
        },
      })),
    },
  ],
};

export default function Home() {
  return <main id="main-content" className={styles.home}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd).replace(/</g, "\\u003c") }} />
    <section className={styles.hero} aria-labelledby="hero-heading">
      <Photo src="/images/homepage/tech-hero.webp" alt="Technology professional using a portable computer beside server racks" priority />
      <div className={styles.heroShade} />
      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>People. Purpose. Possibility.</p>
        <h1 id="hero-heading">AI &amp; Technology Transformation for Growing Organizations</h1>
        <p>Enable AI. Automate your business. Connect your digital platforms. From transformation strategy to implementation and ongoing support.</p>
        <a className={styles.lightButton} href={BOOKING_URL}>Book a Conversation <span aria-hidden="true">↗</span></a>
      </div>
      <a href="#our-purpose" className={styles.heroFoot}>Independent thinking. Practical change. Since 2019. <span aria-hidden="true">↓</span></a>
    </section>

    <section className={`${styles.section} ${styles.intro}`} id="our-purpose" aria-labelledby="intro-heading">
      <p className={styles.eyebrow}>Your business transformation partner</p>
      <h2 id="intro-heading">Good technology starts<br />with understanding people.</h2>
      <p>Behind every business challenge are people trying to do their best work. We help you see what’s getting in the way, simplify the complex, and move forward with purpose.</p>
      <Link href="/about" className={styles.textLink}>Get to know 2Nspira <span aria-hidden="true">↗</span></Link>
    </section>

    <section id="quick-start" className={`${styles.section} ${styles.quickStart}`} aria-labelledby="challenges-heading">
      <div className={styles.quickStartHead}><h2 id="challenges-heading">What do you need?</h2><p>Choose a starting point. We’ll help you shape the next step.</p></div>
      <ul className={styles.quickStartLinks}>{[
        { title: "Simplify our operations", href: "/automation-systems-optimization" },
        { title: "Put AI to work responsibly", href: "/ai-enablement" },
        { title: "Build a website or platform", href: "/websites" },
        { title: "Get technology leadership", href: "/fractional-cio" },
      ].map(item => <li key={item.href}><Link href={item.href}>{item.title}<span aria-hidden="true">↗</span></Link></li>)}</ul>
    </section>

    <section className={styles.section} id="find-the-right-service" aria-labelledby="services-heading">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>What we do</p><h2 id="services-heading">Expertise that moves<br />your business forward.</h2></div><Link href="/services" className={styles.textLink}>Explore our services</Link></div>
      <div className={styles.services}>{serviceNeeds.map((service, i) => <article key={service.href} className={styles.service}>
        <Link href={service.href} className={styles.serviceImage} aria-label={service.name}><Photo src={serviceImages[i]} alt={serviceAlts[i]} /></Link>
        <h3><Link href={service.href}>{service.name}</Link></h3><p>{service.help}</p>
      </article>)}</div>
    </section>

      <TransformationSupport />
    <section className={styles.audience} aria-labelledby="audience-heading">
      <div className={styles.audienceImage}><Photo src="/images/homepage/tech-community.jpg" alt="Two developers reviewing code together on a laptop" /></div>
      <div className={styles.bandCopy}>
        <p className={styles.eyebrow}>Who we serve</p>
        <h2 id="audience-heading">For organizations ready to move beyond what’s holding them back.</h2>
        <p>Whether you’re growing a business, leading a team, serving a community, or building something new, we help you overcome what stands between where you are and where you want to go.</p>
        <ul className={styles.audienceNeeds}>{[
          { title: "Established & growing businesses", text: "Build the systems and digital experiences your next stage of growth demands.", href: "/services", action: "Find your starting point" },
          { title: "Operations & technology leaders", text: "Bring clarity to technology decisions, simplify complexity, and build the capabilities to work effectively with AI.", href: "/fractional-cio", action: "Explore executive technology leadership" },
          { title: "Schools & nonprofits", text: "Make limited resources go further through accessible digital services, practical technology, and stronger operations.", href: "/automation-systems-optimization", action: "Explore better ways of working" },
          { title: "Entrepreneurs & founders", text: "Launch a focused digital platform and connect the workflows your growing business needs.", href: "/who-we-serve/startups-entrepreneurs", action: "Explore technology support for founders" },
        ].map(audience => <li key={audience.title}><h3>{audience.title}</h3><p>{audience.text}</p><Link href={audience.href} className={styles.textLink}>{audience.action} <span aria-hidden="true">→</span></Link></li>)}</ul>
        <Link href="/who-we-serve" className={styles.textLink}>Explore Who We Serve <span aria-hidden="true">↗</span></Link>
        <p className="mt-5"><Link href="/resources/ai-readiness-scorecard" className={styles.textLink}>Assess your organization’s AI readiness →</Link></p>
      </div>
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

    <section className={`${styles.section} ${styles.projectReviews}`} aria-labelledby="teams-reviews-heading">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>The people behind the property experience</p><h2 id="teams-reviews-heading">The community behind this client website.</h2></div></div>
      <p className={styles.reviewIntro}>These resident reviews describe Teams Management’s property-management service. They are client context—not testimonials about 2Nspira or evidence of our project results.</p>
      <details className="mt-6"><summary className="min-h-11 cursor-pointer rounded py-3 font-medium text-ink focus-visible:outline-2 focus-visible:outline-accent">Read the client’s resident reviews</summary><TeamsReviewCarousel /></details>
      <div className={styles.reviewFoot}><p>Selected positive Google review excerpts about Teams Management’s property-management service.</p><a href="https://www.google.com/maps/place/Teams+Management+LLC/data=!4m2!3m1!1s0x89c258c0e0b65e2d:0xa24510b57f3f6d39" target="_blank" rel="noopener noreferrer" className={styles.textLink}>Read all Google reviews <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></div>
    </section>

    <section className={`${styles.section} ${styles.impact}`} aria-labelledby="impact-heading">
      <h2 id="impact-heading">Making an impact since 2019.</h2>
      <ImpactTimeline />
    </section>

    <section className={`${styles.section} ${styles.work}`} aria-labelledby="work-heading"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>More perspectives. More possibility.</p><h2 id="work-heading">A closer look at our work.</h2></div><Link href="/work" className={styles.textLink}>View our work <span aria-hidden="true">↗</span></Link></div><div className={styles.workGrid}>{[
      {name:"GeVitals", image:"gevitals",text:"A bilingual clinic website connecting content, video, publishing, and local discovery."},
      {name:"Open Goal Soccer",image:"open-goal",text:"An accessible archival redesign preserving a community program’s mission and story."}
    ].map(project=><Link key={project.name} href="/websites#our-work" className={styles.workCard}><div><Photo src={`/images/pages/${project.image}-website-preview-20261021.jpg`} alt={`${project.name} public website preview`} /></div><h3>{project.name} <span aria-hidden="true">↗</span></h3><p>{project.text}</p></Link>)}</div></section>


  <ManufacturingDemo />
    </main>;
}
