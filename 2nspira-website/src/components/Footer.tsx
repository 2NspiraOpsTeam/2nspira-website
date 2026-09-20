import Link from "next/link";
import { buttonPrimary, caption } from "./ui";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerNavLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Insights", href: "/insights" },
    { name: "Resources", href: "/resources" },
    { name: "Books", href: "/books" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer
      className="border-t border-line bg-canvas py-14"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              aria-label="2Nspira home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo/2nspira-logo.png"
                alt="2Nspira"
                className="h-10 w-auto"
                width={320}
                height={132}
              />
            </Link>
            <p className={`mt-3 ${caption}`}>
              Human-centered technology transformation and practical AI adoption for organizations.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider text-ink"
              id="footer-nav-heading"
            >
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5" aria-labelledby="footer-nav-heading">
              {footerNavLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="rounded text-sm text-body transition-colors duration-300 ease-gentle hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider text-ink"
              id="footer-contact-heading"
            >
              Contact
            </h3>
            <p className={`mt-4 ${caption}`}>
              Questions about our services or ready to get started?
            </p>
            <Link
              href="/contact"
              className={`mt-5 ${buttonPrimary}`}
              aria-label="Get in touch with 2Nspira via contact page"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <nav
          aria-label="Legal"
          className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-body"
        >
          {[
            { name: "Privacy policy", href: "/privacy-policy" },
            { name: "Terms and conditions", href: "/terms-conditions" },
            { name: "Copyright", href: "/copyright" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded underline decoration-line-strong underline-offset-4 transition-colors duration-300 ease-gentle hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="mt-12 border-t border-line pt-8 text-center">
          <p className={`text-sm ${caption}`}>
            &copy; {currentYear} 2Nspira. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
