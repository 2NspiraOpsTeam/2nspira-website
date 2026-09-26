"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Work", href: "/websites" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const ideaLinks = [
  { name: "Books", href: "/books" },
  { name: "Insights", href: "/insights" },
  { name: "Resources", href: "/resources" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIdeasOpen, setIsIdeasOpen] = useState(false);
  const ideasRef = useRef<HTMLDivElement>(null);
  const ideasButtonRef = useRef<HTMLButtonElement>(null);
  const ideasPinnedRef = useRef(false);
  const pathname = usePathname();

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const getLinkProps = (href: string) => {
    const isCurrent = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return { "aria-current": isCurrent ? ("page" as const) : undefined };
  };

  const ideasAreCurrent = ideaLinks.some((link) => pathname.startsWith(link.href));

  useEffect(() => {
    if (!isIdeasOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!ideasRef.current?.contains(event.target as Node)) {
        ideasPinnedRef.current = false;
        setIsIdeasOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isIdeasOpen]);

  const handleIdeasKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    ideasPinnedRef.current = false;
    setIsIdeasOpen(false);
    ideasButtonRef.current?.focus();
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-line bg-canvas/85 backdrop-blur-md backdrop-saturate-150 transition-[background-color,border-color] duration-300 ease-gentle"
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="group flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          aria-label="2Nspira home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo/2nspira-logo.png"
            alt="2Nspira"
            className="h-9 w-auto"
            width={320}
            height={132}
          />
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              {...getLinkProps(link.href)}
              className="rounded-full px-3 py-2 text-sm font-medium text-body transition-colors duration-300 ease-gentle hover:bg-accent-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas [aria-current=page]:bg-accent-soft [aria-current=page]:text-ink"
            >
              {link.name}
            </Link>
          ))}

          <div
            ref={ideasRef}
            className="relative"
            onMouseEnter={() => setIsIdeasOpen(true)}
            onMouseLeave={() => {
              if (!ideasPinnedRef.current) setIsIdeasOpen(false);
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                ideasPinnedRef.current = false;
                setIsIdeasOpen(false);
              }
            }}
            onKeyDown={handleIdeasKeyDown}
          >
            <button
              ref={ideasButtonRef}
              type="button"
              onClick={() => {
                if (ideasPinnedRef.current) {
                  ideasPinnedRef.current = false;
                  setIsIdeasOpen(false);
                  return;
                }

                ideasPinnedRef.current = true;
                setIsIdeasOpen(true);
              }}
              aria-expanded={isIdeasOpen}
              aria-controls="ideas-navigation"
              className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 ease-gentle hover:bg-accent-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                ideasAreCurrent ? "bg-accent-soft text-ink" : "text-body"
              }`}
            >
              Ideas
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-200 ${isIdeasOpen ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div
              id="ideas-navigation"
              className={`absolute left-1/2 top-full w-44 -translate-x-1/2 pt-2 ${isIdeasOpen ? "block" : "hidden"}`}
            >
              <div className="rounded-2xl border border-line bg-canvas p-2 shadow-[0_16px_40px_rgba(35,41,54,0.14)]">
                {ideaLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    {...getLinkProps(link.href)}
                    onClick={() => {
                      ideasPinnedRef.current = false;
                      setIsIdeasOpen(false);
                    }}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-body transition-colors duration-200 hover:bg-accent-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [aria-current=page]:bg-accent-soft [aria-current=page]:text-ink"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.slice(3).map((link) => (
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

          <Link
            href="/portal/login"
            className="hidden rounded-full border border-line px-4 py-2 text-sm font-medium text-body transition-colors duration-300 ease-gentle hover:border-accent hover:bg-accent-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:inline-flex"
          >
            Login
          </Link>

          <Link
            href="/portal/register"
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors duration-300 ease-gentle hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:inline-flex"
          >
            Register
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
