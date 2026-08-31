"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import MobileMenu from "./MobileMenu";

// Escape key handler for closing menus
const useEscapeKey = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
};

// Trap focus in mobile menu when open
const useFocusTrap = (isActive: boolean) => {
  const containerRef = useState<HTMLDivElement | null>(null)[1];

  useEffect(() => {
    if (!isActive || !containerRef?.current) return;

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];
    const focusableElements = containerRef.current.querySelectorAll(focusableSelectors.join(", "));

    if (focusableElements.length === 0) return;

    const firstEl = focusableElements[0] as HTMLElement;
    const lastEl = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isActive, containerRef]);
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Insights", href: "/insights" },
    { name: "Contact", href: "/contact" },
  ];

  useEscapeKey(isMobileMenuOpen, () => setIsMobileMenuOpen(false));
  useFocusTrap(isMobileMenuOpen);

  // Track current route for active link styling and screen reader announcements
  useEffect(() => {
    const setRoute = () => setActiveRoute(window.location.pathname || "/");
    setRoute();
    window.addEventListener("popstate", setRoute);
    return () => window.removeEventListener("popstate", setRoute);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Determine current link for active state
  const getLinkProps = (href: string) => {
    if (href === "/") return { "aria-current": activeRoute === "/" ? ("page" as const) : undefined };
    if (activeRoute.startsWith(href)) return { "aria-current": "page" as const };
    return {};
  };

  // Generate page name for screen reader on logo click
  const ariaLabel = isMobileMenuOpen
    ? "Menu open. Press Escape to close."
    : "Main navigation";

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 dark:border-zinc-800 dark:bg-black/95"
      role="banner"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 focus-visible:outline-none"
          aria-label="2Nspira Home"
        >
          <span className="font-bold text-xl text-zinc-900 dark:text-white">
            2Nspira
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center space-x-6"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              {...getLinkProps(link.href)}
              className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
          aria-controls="mobile-menu"
        >
          <svg
            className="h-6 w-6 text-zinc-700 dark:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
            focusable="false"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      <nav
        id="mobile-menu"
        className={isMobileMenuOpen ? "md:hidden" : "hidden"}
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        {isMobileMenuOpen && (
          <MobileMenu isOpen={isMobileMenuOpen} onClose={handleNavClick} />
        )}
      </nav>

      {/* Screen reader announcement for state changes */}
      <span className="sr-only">
        {isMobileMenuOpen ? "Navigation menu opened" : "Navigation menu closed"}
      </span>
    </header>
  );
}
