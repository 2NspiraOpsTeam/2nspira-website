import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./Footer.module.css";

const services = [
  { name: "AI Enablement", href: "/ai-enablement" },
  { name: "Automation & Systems Optimization", href: "/automation-systems-optimization" },
  { name: "Websites & Digital Platforms", href: "/websites" },
  { name: "Fractional CIO / Technology Leadership", href: "/fractional-cio" },
  { name: "Entrepreneur Mentoring & Coaching", href: "/coaching" },
];
const navigation = [
  { name: "Home", href: "/" }, { name: "Services", href: "/services" },
  { name: "About", href: "/about" }, { name: "Careers", href: "/careers" },
  { name: "Insights", href: "/insights" }, { name: "Resources", href: "/resources" },
  { name: "Books", href: "/books" }, { name: "Shop", href: "/shop" },
  { name: "Contact", href: "/contact" },
];
const legal = [
  { name: "Privacy policy", href: "/privacy-policy" },
  { name: "Terms and conditions", href: "/terms-conditions" },
  { name: "Copyright", href: "/copyright" },
];

export default function Footer() {
  return <footer className={styles.footer}>
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className={styles.columns}>
        <div>
          <Link href="/" className={styles.brand} aria-label="2Nspira home">
            {/* Preserve the approved dark wordmark on its own light surface. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo/2nspira-logo.png" alt="2Nspira" width={320} height={132} className="h-auto w-40" />
          </Link>
          <p className={styles.description}>Human-centered technology transformation and practical AI adoption for organizations.</p>
        </div>
        <nav aria-labelledby="footer-services-heading">
          <h2 id="footer-services-heading" className={styles.heading}>Services</h2>
          <ul className={styles.list}>{services.map(link => <li key={link.href}><Link href={link.href} className={styles.link}>{link.name}<ArrowUpRight aria-hidden="true" size={16} /></Link></li>)}</ul>
        </nav>
        <nav aria-labelledby="footer-nav-heading">
          <h2 id="footer-nav-heading" className={styles.heading}>Navigation</h2>
          <ul className={`${styles.list} ${styles.navigation}`}>{navigation.map(link => <li key={link.href}><Link href={link.href} className={styles.link}>{link.name}</Link></li>)}</ul>
        </nav>
        <div>
          <h2 id="footer-contact-heading" className={styles.heading}>Contact</h2>
          <p className={styles.description}>Questions about our services or ready to get started?</p>
          <Link href="/contact" className={styles.contact} aria-label="Get in touch with 2Nspira via contact page">Get in touch<ArrowUpRight aria-hidden="true" size={18} /></Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} 2Nspira. All rights reserved.</p>
        <nav aria-label="Legal" className={styles.legal}>{legal.map(link => <Link key={link.href} href={link.href} className={styles.link}>{link.name}</Link>)}</nav>
      </div>
    </div>
  </footer>;
}
