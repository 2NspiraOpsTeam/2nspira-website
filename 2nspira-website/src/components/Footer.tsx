import Link from "next/link";

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
      className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-black"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
              2Nspira
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Human-centered technology transformation and practical AI adoption for organizations.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3
              className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-white"
              id="footer-nav-heading"
            >
              Navigation
            </h3>
            <ul
              className="space-y-2"
              aria-labelledby="footer-nav-heading"
            >
              {footerNavLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
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
              className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-white"
              id="footer-contact-heading"
            >
              Contact
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Questions about our services or ready to get started?
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label="Get in touch with 2Nspira via contact page"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <nav aria-label="Legal" className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-600 dark:text-zinc-400">
          {[
            { name: "Privacy policy", href: "/privacy-policy" },
            { name: "Terms and conditions", href: "/terms-conditions" },
            { name: "Refunds and cancellations", href: "/refund-cancellation" },
            { name: "Copyright", href: "/copyright" },
          ].map(link => <Link key={link.href} href={link.href} className="rounded underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">{link.name}</Link>)}
        </nav>

        {/* Bottom */}
        <div className="mt-12 border-t border-zinc-200 pt-8 text-center dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            &copy; {currentYear} 2Nspira. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
