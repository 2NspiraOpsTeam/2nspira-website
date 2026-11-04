import Link from "next/link";
import FooterInvitation from "./FooterInvitation";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { socialLinks } from "@/lib/socialLinks";
import { BOOKING_URL } from "@/lib/booking";
import styles from "./Footer.module.css";

const services = [
  { name: "Websites, Apps & Digital Platforms", href: "/websites" },
  { name: "Automation & Systems Optimization", href: "/automation-systems-optimization" },
  { name: "AI Enablement", href: "/ai-enablement" },
  { name: "Fractional CIO & Technology Leadership", href: "/fractional-cio" },
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
  { name: "Videos", href: "/videos" },
  { name: "Resources", href: "/resources" },
  { name: "Leadership books", href: "/books" },
  { name: "Manufacturing demo", href: "https://demo.2nspira.com/manufacturing/" },
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
      <FooterInvitation><section className={styles.invitation} aria-labelledby="footer-invitation-heading">
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
      </section></FooterInvitation>

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
          <nav aria-label="2Nspira social media" className={styles.social}>
            <ul className={styles.socialLinks}>{socialLinks.map(link => <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label={`2Nspira on ${link.name} (opens in a new tab)`}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  {link.name === "YouTube" ? <path d="M23 7s-.2-1.7-.9-2.4c-.9-.9-1.9-.9-2.4-1C16.4 3.4 12 3.4 12 3.4s-4.4 0-7.7.2c-.5.1-1.5.1-2.4 1C1.2 5.3 1 7 1 7S.8 9 .8 11v2c0 2 .2 4 .2 4s.2 1.7.9 2.4c.9.9 2.1.9 2.6 1 1.9.2 7.5.2 7.5.2s4.4 0 7.7-.3c.5 0 1.5 0 2.4-.9.7-.7.9-2.4.9-2.4s.2-2 .2-4v-2c0-2-.2-4-.2-4ZM9.7 15.5v-7l6 3.5-6 3.5Z" /> : link.name === "LinkedIn" ? <path d="M20.4 2H3.6C2.7 2 2 2.7 2 3.6v16.8c0 .9.7 1.6 1.6 1.6h16.8c.9 0 1.6-.7 1.6-1.6V3.6c0-.9-.7-1.6-1.6-1.6ZM8 19H5V9.5h3V19ZM6.5 8.2a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4V19h-3V9.5h2.9v1.3c.4-.8 1.4-1.6 2.8-1.6 3 0 3.5 2 3.5 4.5V19Z" /> : <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.7-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />}
                </svg>
              </a>
            </li>)}</ul>
          </nav>
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
          <ul className={styles.list}>{ideas.map(link => <li key={link.href}><a href={link.href} className={styles.link}>{link.name}</a></li>)}</ul>
        </nav>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} 2Nspira. All rights reserved.</p>
        <nav aria-label="Legal" className={styles.legal}>{legal.map(link => <Link key={link.href} href={link.href} className={styles.link}>{link.name}</Link>)}</nav>
      </div>
    </div>
  </footer>;
}
