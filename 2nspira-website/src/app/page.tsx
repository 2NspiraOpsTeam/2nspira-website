import Image from "next/image";
import { PanelsTopLeft, Workflow, Compass, Users, ScanLine, Handshake } from "lucide-react";
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

const serviceHighlights = [
  { Icon: PanelsTopLeft, value: "Turn your next visitor into a clear next step.", capabilities: ["Business websites", "Portals & dashboards", "Connected tools"] },
  { Icon: Workflow, value: "Less repeated work. Smoother handoffs.", capabilities: ["Workflow mapping", "System integrations", "Phased automation"] },
  { Icon: Compass, value: "Make AI useful, responsible and understood.", capabilities: ["Strategy & governance", "Team training", "Practical adoption"] },
];

const featuredProjects = [
  { name: "Teams Management", type: "Property management", status: "Published client website", url: "https://www.teamsmanagement.com/", image: "teams", alt: "Teams Management website showing New York property discovery", challenge: "A portfolio to bring together.", description: "Clear property discovery, galleries and inquiries." },
  { name: "GeVitals", type: "Health & wellness", status: "Published client website", url: "https://gevitals.com/", image: "gevitals", alt: "GeVitals clinic website with Spanish-language services and English navigation option", challenge: "Care across two languages.", description: "One bilingual home for services, content and video." },
  { name: "Open Goal Soccer", type: "Community & nonprofit", status: "Published community archive", url: "https://opengoalsoccer.com/", image: "soccer", alt: "Open Goal Soccer archive with its inclusive youth soccer story and original program photography", challenge: "A community story worth keeping.", description: "A modern archive for an inclusive soccer legacy." },
  { name: "2Nspira Bookstore", type: "In-house e-commerce storefront", status: "An in-house 2Nspira project", url: "https://books.2nspira.com/", image: "bookstore", alt: "2Nspira Bookstore public catalog showing collectible books and individual copy listings", challenge: "Every copy has a story.", description: "A collectible-book catalog with individual copy details, photography and pricing." },
];

export default function Home() {
  return <main id="main-content" className={styles.home}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd).replace(/</g, "\\u003c") }} />
    <section className={styles.launchHero} aria-labelledby="hero-heading">
      <div className={styles.launchCopy}>
        <p className={styles.eyebrow}>Human-led. AI-enabled. Built for your business.</p>
        <h1 id="hero-heading">Professional websites.<br /><span>Powerful digital platforms.</span></h1>
        <p>Websites that earn trust. Platforms that make work flow. Built around your customers and your team.</p>
        <div className={styles.actions}><Link href="/contact" className={styles.primaryButton}>Discuss Your Project <span aria-hidden="true">↗</span></Link><Link href="/work" className={styles.textLink}>View Our Work <span aria-hidden="true">→</span></Link></div>
      </div>
      <Link href="/work#teams-management" className={styles.heroProject}>
        <div className={styles.browserBar}><span aria-hidden="true">● ● ●</span><span>Selected client work</span></div>
        <div className={styles.deviceStage}><span className={styles.deviceLabel}>Designed for real life.<br />Ready for every screen.</span><Image src="/images/work/teams-mobile-20261113.webp" alt="Teams Management responsive property website on a mobile screen" width={420} height={740} priority unoptimized sizes="(max-width: 900px) 100vw, 50vw" /></div>
        <div className={styles.projectCaption}><span>Teams Management<br /><small>Published property website</small></span><span aria-hidden="true">↗</span></div>
      </Link>
    </section>
    <section id="featured-websites" className={`${styles.section} ${styles.portfolio}`} aria-labelledby="portfolio-heading">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Selected websites · Live and explorable</p><h2 id="portfolio-heading">Different businesses.<br />Distinct digital experiences.</h2></div><Link href="/work" className={styles.textLink}>Explore our work <span aria-hidden="true">→</span></Link></div>
      <div className={styles.portfolioGrid}>{[featuredProjects[1], featuredProjects[2], featuredProjects[0], featuredProjects[3]].map(project => <article key={project.name} className={styles.portfolioCard}>
        <a href={project.url} className={styles.portfolioLink}>
          <div className={styles.portfolioImage}><div className={styles.browserBar}><span aria-hidden="true">● ● ●</span><span>{new URL(project.url).hostname.replace(/^www\./, "")}</span></div><Image src={`/images/work/${project.image}-homepage-20261113.webp`} alt={project.alt} width={1008} height={700} unoptimized sizes="(max-width: 760px) calc(100vw - 48px), 44vw" /></div>
          <div className={styles.portfolioCopy}><p className={styles.portfolioType}>{project.type}</p><h3>{project.name}<span aria-hidden="true">↗</span></h3><p><strong className={styles.projectChallenge}>{project.challenge}</strong>{project.description}</p><span className={styles.portfolioStatus}>{project.status}</span><span className={styles.portfolioVisit}>{project.image === "bookstore" ? "Visit bookstore" : "Visit website"} <span aria-hidden="true">→</span></span></div>
        </a>
      </article>)}</div>
      <p className={styles.portfolioNote}>Teams’ tenant and staff workflows require authorized access; they are not public demos. Open Goal Soccer is a preserved archive, not an active program.</p>
    </section>
    <div className={styles.proofBand} aria-label="Experience and project evidence"><p>Building practical technology <strong>since 2019.</strong></p><Link href="/work#teams-management">Explore Teams’ website &amp; staff workspace ↗</Link></div>

    <section id="find-the-right-service" className={`${styles.section} ${styles.coreServices}`} aria-labelledby="services-heading">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Three ways to move forward</p><h2 id="services-heading">Build. Connect. Enable.</h2></div><p>Start with what your organization needs next.</p></div>
      <div className={styles.coreGrid}>{serviceNeeds.map((service, i) => <article key={service.href} className={styles.coreCard}><span className={styles.serviceGlyph} aria-hidden="true">{(() => { const Icon = serviceHighlights[i].Icon; return <Icon size={30} strokeWidth={1.4} />; })()}</span><span className={styles.serviceNumber}>0{i + 1}{i === 0 ? " / Our flagship" : ""}</span><h3>{service.name}</h3><p>{serviceHighlights[i].value}</p><ul className={styles.capabilities}>{serviceHighlights[i].capabilities.map(item => <li key={item}>{item}</li>)}</ul>{i === 0 && <div className={styles.buildPaths}><Link href="/websites#professional-websites">Professional websites →</Link><Link href="/websites#custom-digital-platforms">Custom digital platforms →</Link></div>}<Link href={service.href} className={styles.textLink}>{service.link} <span aria-hidden="true">↗</span></Link></article>)}</div>
      <div className={styles.moreServices}><h3>More Services</h3><p>Leadership and ongoing support as your needs evolve.</p>{moreServiceLinks.map(link => <Link key={link.href} href={link.href} className={styles.textLink}>{link.name} ↗</Link>)}</div>
    </section>

    <section id="our-purpose" className={`${styles.section} ${styles.whyUs}`} aria-labelledby="why-heading"><div><p className={styles.eyebrow}>Why 2Nspira</p><h2 id="why-heading">Human judgment.<br />Hands-on delivery.</h2><Link href="/about" className={styles.textLink}>Our story, since 2019 <span aria-hidden="true">→</span></Link></div><div><article><Users aria-hidden="true" size={25} strokeWidth={1.5} /><h3>People before technology</h3><p>Your customers and team shape the decisions.</p></article><article><ScanLine aria-hidden="true" size={25} strokeWidth={1.5} /><h3>Purpose in every build</h3><p>Accessible, tested and made to maintain.</p></article><article><Handshake aria-hidden="true" size={25} strokeWidth={1.5} /><h3>A clear working relationship</h3><p>Shared scope, visible progress, defined support.</p></article></div></section>
    <aside className={styles.studioNote} aria-label="Creative Studio"><p>Another side of 2Nspira: original ideas, stories and experiments.</p><Link href="/studio" className={styles.textLink}>Explore Creative Studio <span aria-hidden="true">↗</span></Link></aside>
    <section className={styles.contact} aria-labelledby="contact-heading"><p className={styles.eyebrow}>Your next project starts here</p><h2 id="contact-heading">What would you like to build?</h2><Link href="/contact" className={styles.lightButton}>Discuss Your Project <span aria-hidden="true">↗</span></Link><p>Tell us about your idea. Choose a message or an introductory call on our contact page.</p></section>
  </main>;
}
