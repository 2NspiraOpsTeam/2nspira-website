import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { serviceNeeds } from "@/lib/serviceNeeds";
import { moreServiceLinks } from "@/lib/navigation";
import styles from "./homepage.module.css";

const homepageDescription = "Professional websites and custom digital platforms, business automation and organizational AI enablement. Human-led expertise, AI-enabled delivery.";
const homepageShareTitle = "Websites & Custom Digital Platforms | 2Nspira";
export const metadata: Metadata = {
  title: { absolute: homepageShareTitle }, description: homepageDescription,
  alternates: { canonical: "https://2nspira.com/" },
  openGraph: { type: "website", locale: "en_US", url: "https://2nspira.com/", siteName: "2Nspira", title: homepageShareTitle, description: homepageDescription, images: [{ url: "https://2nspira.com/images/logo/og-image-v2.png", width: 1200, height: 630, alt: "2Nspira" }] },
  twitter: { card: "summary_large_image", title: homepageShareTitle, description: homepageDescription, images: ["https://2nspira.com/images/logo/og-image-v2.png"] },
};

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
      name: "2Nspira core services",
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
    <section className={styles.launchHero} aria-labelledby="hero-heading">
      <div className={styles.launchCopy}>
        <p className={styles.eyebrow}>Human-led. AI-enabled. Built for your business.</p>
        <h1 id="hero-heading">Professional websites.<br /><span>Powerful digital platforms.</span></h1>
        <p>We design and build modern business websites, client portals and custom digital systems—so your customers find you and your people can get to work.</p>
        <div className={styles.actions}><Link href="/contact" className={styles.primaryButton}>Discuss Your Project <span aria-hidden="true">↗</span></Link><Link href="/work" className={styles.textLink}>View Our Work <span aria-hidden="true">→</span></Link></div>
      </div>
      <Link href="/work#teams-management" className={styles.heroProject}>
        <div className={styles.browserBar}><span aria-hidden="true">● ● ●</span><span>Selected client work</span></div>
        <Image src="/images/work/live-teams-20261105.jpg" alt="Teams Management public website featuring property discovery" width={1440} height={1000} priority unoptimized sizes="(max-width: 900px) 100vw, 50vw" />
        <div className={styles.projectCaption}><span>Teams Management<br /><small>Website &amp; property platform</small></span><span aria-hidden="true">↗</span></div>
      </Link>
    </section>
    <div className={styles.proofBand} aria-label="Experience and project evidence"><p>Building practical technology <strong>since 2019.</strong></p><Link href="/work#teams-management">Teams Management ↗</Link><Link href="/websites#our-work">GeVitals &amp; Open Goal Soccer ↗</Link></div>

    <section className={`${styles.section} ${styles.featuredWork}`} aria-labelledby="feature-heading">
      <div><p className={styles.eyebrow}>Real work, not a concept</p><h2 id="feature-heading">A website is only<br />the beginning.</h2><p className={styles.featureLead}>Teams Management connects property discovery with the people and tools behind it.</p>
        <dl className={styles.projectFacts}><div><dt>The challenge</dt><dd>Help prospective residents and businesses find properties and reach the right team.</dd></div><div><dt>What we built</dt><dd>Property discovery, galleries, maps, rental inquiry paths and authorized staff tools.</dd></div></dl>
        <Link href="/work#teams-management" className={styles.textLink}>Explore the Teams project <span aria-hidden="true">→</span></Link>
      </div>
      <div className={styles.projectDetail}><Image src="/images/work/teams-mobile-20261113.webp" alt="Teams Management website at mobile width with navigation, property discovery and inquiry entry points" width={390} height={844} unoptimized sizes="(max-width: 760px) 70vw, 280px" /><p>Teams Management · Mobile website</p></div>
    </section>

    <section id="find-the-right-service" className={`${styles.section} ${styles.coreServices}`} aria-labelledby="services-heading">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Three ways to move forward</p><h2 id="services-heading">Build. Connect. Enable.</h2></div><p>Start with what your organization needs next.</p></div>
      <div className={styles.coreGrid}>{serviceNeeds.map((service, i) => <article key={service.href} className={styles.coreCard}><span className={styles.serviceNumber}>0{i + 1}{i === 0 ? " / Our flagship" : ""}</span><h3>{service.name}</h3><p>{service.help}</p>{i === 0 && <div className={styles.buildPaths}><Link href="/websites#professional-websites">Professional websites →</Link><Link href="/websites#custom-digital-platforms">Custom digital platforms →</Link></div>}<Link href={service.href} className={styles.textLink}>{service.link} <span aria-hidden="true">↗</span></Link></article>)}</div>
      <div className={styles.moreServices}><h3>More Services</h3><p>Leadership and ongoing support as your needs evolve.</p>{moreServiceLinks.map(link => <Link key={link.href} href={link.href} className={styles.textLink}>{link.name} ↗</Link>)}</div>
    </section>

    <section id="our-purpose" className={`${styles.section} ${styles.whyUs}`} aria-labelledby="why-heading"><div><p className={styles.eyebrow}>Why 2Nspira</p><h2 id="why-heading">Human judgment.<br />Hands-on delivery.</h2><Link href="/about" className={styles.textLink}>Our story, since 2019 <span aria-hidden="true">→</span></Link></div><div><article><h3>Start with the people</h3><p>Understand your customers, your team and the work before choosing the technology.</p></article><article><h3>Build with purpose</h3><p>Human-led engineering, supported by AI, with attention to accessibility, testing and maintainability.</p></article><article><h3>Keep the scope clear</h3><p>Agree what we’re building, how we’ll review it and what ongoing support includes.</p></article></div></section>
    <aside className={styles.studioNote} aria-label="Creative Studio"><p>Another side of 2Nspira: original ideas, stories and experiments.</p><Link href="/studio" className={styles.textLink}>Explore Creative Studio <span aria-hidden="true">↗</span></Link></aside>
    <section className={styles.contact} aria-labelledby="contact-heading"><p className={styles.eyebrow}>Your next project starts here</p><h2 id="contact-heading">What would you like to build?</h2><Link href="/contact" className={styles.lightButton}>Discuss Your Project <span aria-hidden="true">↗</span></Link><p>Tell us about your idea. Choose a message or an introductory call on our contact page.</p></section>
  </main>;
}
