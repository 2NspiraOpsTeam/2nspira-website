import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { socialLinks } from "@/lib/socialLinks";
import { BOOKING_URL } from "@/lib/booking";
import styles from "./Footer.module.css";

const services = [
  { name: "AI Enablement", href: "/ai-enablement" },
  { name: "Automation & Systems Optimization", href: "/automation-systems-optimization" },
  { name: "Websites & Digital Platforms", href: "/websites" },
  { name: "Fractional CIO / Technology Leadership", href: "/fractional-cio" },
  { name: "Entrepreneur Mentoring & Coaching", href: "/coaching" },
];
const company = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Our work", href: "/work" },
  { name: "About 2Nspira", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];
const ideas = [
  { name: "Insights", href: "/insights" },
  { name: "Resources", href: "/resources" },
    { name: "Buying guides", href: "/buying-guides" },
  { name: "Leadership books", href: "/books" },
  { name: "Bookstore", href: "https://books.2nspira.com" },
  { name: "Creative shop", href: "/shop" },
];
const legal = [
  { name: "Privacy policy", href: "/privacy-policy" },
  { name: "Terms and conditions", href: "/terms-conditions" },
  { name: "Copyright", href: "/copyright" },
];

export default function Footer() {
  return <footer className={styles.footer}>
    <div className={styles.container}>
      <section className={styles.invitation} aria-labelledby="footer-invitation-heading">
        <div>
          <p className={styles.eyebrow}>Let’s move forward</p>
          <h2 id="footer-invitation-heading" className={styles.title}>A clearer next step starts with a conversation.</h2>
          <p className={styles.intro}>Bring the challenge, idea, or decision in front of you. Let’s explore the right support.</p>
        </div>
        <div className={styles.actions}>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={styles.contact}
            aria-label="Book a 30-minute conversation (Google Calendar, opens in a new tab)">Book a 30-minute conversation<ArrowUpRight aria-hidden="true" size={18} /></a>
          <Link href="/contact#contact-message" className={styles.message}>Prefer to send a message? <span aria-hidden="true">→</span></Link>
          <p className={styles.bookingNote}>Introductory call via Google Meet. Share how we can help when you book. Google Calendar opens in a new tab.</p>
        </div>
      </section>

      <div className={styles.columns}>
        <div className={styles.brandColumn}>
          <Link href="/" className={styles.brand} aria-label="2Nspira home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo/2nspira-logo.png" alt="2Nspira" width={320} height={132} className="h-auto w-40" />
          </Link>
          <p className={styles.description}>Practical technology. Human-centered leadership. Support for the business you’re building.</p>
          <h2 id="footer-contact-heading" className={`${styles.heading} ${styles.contactHeading}`}>Connect with us</h2>
          <ul className={styles.contactDetails} aria-labelledby="footer-contact-heading">
            <li><a href="mailto:hello@2nspira.com" className={styles.link}><Mail aria-hidden="true" size={17} />hello@2nspira.com</a></li>
            <li><a href="tel:+16465430199" className={styles.link}><Phone aria-hidden="true" size={17} />+1 (646) 543-0199</a></li>
          </ul>
        </div>
        <nav className={styles.services} aria-labelledby="footer-services-heading">
          <h2 id="footer-services-heading" className={styles.heading}>Services</h2>
          <ul className={styles.list}>{services.map(link => <li key={link.href}><Link href={link.href} className={styles.link}>{link.name}</Link></li>)}</ul>
        </nav>
        <nav className={styles.company} aria-labelledby="footer-company-heading">
          <h2 id="footer-company-heading" className={styles.heading}>Company</h2>
          <ul className={styles.list}>{company.map(link => <li key={link.href}><Link href={link.href} className={styles.link}>{link.name}</Link></li>)}</ul>
        </nav>
        <nav className={styles.ideas} aria-labelledby="footer-ideas-heading">
          <h2 id="footer-ideas-heading" className={styles.heading}>Ideas &amp; resources</h2>
          <ul className={styles.list}>{ideas.map(link => <li key={link.href}><Link href={link.href} className={styles.link}>{link.name}</Link></li>)}</ul>
        </nav>
      </div>

      <nav aria-labelledby="footer-social-heading" className={styles.social}>
        <div><h2 id="footer-social-heading" className={styles.heading}>Follow 2Nspira</h2><p className={styles.socialNote}>Ideas, perspectives, and what we’re working on.</p></div>
        <ul className={styles.socialLinks}>{socialLinks.map(link => <li key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label={`2Nspira on ${link.name} (opens in a new tab)`}>
            {link.name}<ArrowUpRight aria-hidden="true" size={17} />
          </a>
        </li>)}</ul>
      </nav>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} 2Nspira. All rights reserved.</p>
        <nav aria-label="Legal" className={styles.legal}>{legal.map(link => <Link key={link.href} href={link.href} className={styles.link}>{link.name}</Link>)}</nav>
      </div>
    </div>
  </footer>;
}
