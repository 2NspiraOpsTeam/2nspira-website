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
      className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 dark:border-zinc-800 dark:bg-black/95"
      role="banner"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center space-x-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          aria-label="2Nspira home"
        >
          <span className="text-xl font-bold text-zinc-900 dark:text-white">2Nspira</span>
        </Link>

        <nav className="hidden items-center space-x-6 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              {...getLinkProps(link.href)}
              className="rounded text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-zinc-300 dark:hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button
          className="flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Open menu"
          aria-controls="mobile-menu"
        >
          <svg
            className="h-6 w-6 text-zinc-700 dark:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {isMobileMenuOpen ? "Navigation menu opened" : "Navigation menu closed"}
      </span>
    </header>
  );
}
