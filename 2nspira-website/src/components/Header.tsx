"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Insights", href: "/insights" },
  { name: "Resources", href: "/resources" },
  { name: "Books", href: "/books" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const getLinkProps = (href: string) => {
    const isCurrent = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return { "aria-current": isCurrent ? ("page" as const) : undefined };
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-line bg-canvas/85 backdrop-blur-md backdrop-saturate-150 transition-[background-color,border-color] duration-300 ease-gentle"
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="group flex items-center space-x-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          aria-label="2Nspira home"
        >
          <span className="text-xl font-semibold tracking-tight text-ink transition-colors duration-300 ease-gentle group-hover:text-accent">
            2Nspira
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              {...getLinkProps(link.href)}
              className="rounded-full px-3 py-2 text-sm font-medium text-body transition-colors duration-300 ease-gentle hover:bg-accent-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas [aria-current=page]:bg-accent-soft [aria-current=page]:text-ink"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors duration-300 ease-gentle hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:inline-flex"
          >
            Start a conversation
          </Link>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-body transition-colors duration-300 ease-gentle hover:bg-accent-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Open menu"
            aria-controls="mobile-menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {isMobileMenuOpen ? "Navigation menu opened" : "Navigation menu closed"}
      </span>
    </header>
  );
}
