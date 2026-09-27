"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import MobileMenu from "./MobileMenu";

type MenuName = "services" | "ideas";

const serviceLinks = [
  { name: "AI Enablement", href: "/ai-enablement" },
  { name: "Automation & Systems Optimization", href: "/automation-systems-optimization" },
  { name: "Websites & Digital Platforms", href: "/websites" },
  { name: "Fractional CIO / Technology Leadership", href: "/fractional-cio" },
];

const ideaLinks = [
  { name: "Books", href: "/books" },
  { name: "Insights", href: "/insights" },
  { name: "Resources", href: "/resources" },
];

const primaryLinks = [
  { name: "Work", href: "/websites#our-work" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const menuButtonRefs = useRef<Record<MenuName, HTMLButtonElement | null>>({ services: null, ideas: null });
  const pinnedMenuRef = useRef<MenuName | null>(null);
  const pathname = usePathname();

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const isCurrent = (href: string) => {
    const path = href.split("#")[0];
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };
  const menuIsCurrent = (menu: MenuName) =>
    (menu === "services" ? serviceLinks : ideaLinks).some((link) => isCurrent(link.href));

  const closeMenu = (returnFocus = false) => {
    const previousMenu = openMenu;
    pinnedMenuRef.current = null;
    setOpenMenu(null);
    if (returnFocus && previousMenu) menuButtonRefs.current[previousMenu]?.focus();
  };

  const toggleMenu = (menu: MenuName) => {
    if (pinnedMenuRef.current === menu) {
      closeMenu();
      return;
    }
    pinnedMenuRef.current = menu;
    setOpenMenu(menu);
  };

  useEffect(() => {
    if (!openMenu) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!navigationRef.current?.contains(event.target as Node)) {
        pinnedMenuRef.current = null;
        setOpenMenu(null);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [openMenu]);

  const handleNavigationKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape" || !openMenu) return;
    event.preventDefault();
    closeMenu(true);
  };

  const renderMenu = (menu: MenuName, label: string, links: typeof serviceLinks) => {
    const isOpen = openMenu === menu;
    return (
      <div
        className="relative"
        onMouseEnter={() => setOpenMenu(menu)}
        onMouseLeave={() => {
          if (pinnedMenuRef.current !== menu) setOpenMenu(null);
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closeMenu();
        }}
      >
        <button
          ref={(node) => { menuButtonRefs.current[menu] = node; }}
          type="button"
          onClick={() => toggleMenu(menu)}
          aria-expanded={isOpen}
          aria-controls={`${menu}-navigation`}
          className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 ease-gentle hover:bg-accent-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${menuIsCurrent(menu) ? "bg-accent-soft text-ink" : "text-body"}`}
        >
          {label}
          <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>

        <div id={`${menu}-navigation`} className={`absolute left-1/2 top-full z-20 -translate-x-1/2 pt-2 ${isOpen ? "block" : "hidden"} ${menu === "services" ? "w-80" : "w-48"}`}>
          <div className="rounded-2xl border border-line bg-canvas p-2 shadow-[0_16px_40px_rgba(35,41,54,0.14)]">
            {menu === "services" && (
              <Link href="/services" onClick={() => closeMenu()} className="mb-1 block rounded-xl px-3 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                View all services
              </Link>
            )}
            {links.map((link) => (
              <Link key={link.name} href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined} onClick={() => closeMenu()} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-body transition-colors duration-200 hover:bg-accent-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [aria-current=page]:bg-accent-soft [aria-current=page]:text-ink">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-canvas/90 backdrop-blur-md backdrop-saturate-150" role="banner">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas" aria-label="2Nspira home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo/2nspira-logo.png" alt="2Nspira" className="h-9 w-auto" width={320} height={132} />
        </Link>

        <nav ref={navigationRef} className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation" onKeyDown={handleNavigationKeyDown}>
          {renderMenu("services", "Services", serviceLinks)}
          <Link href={primaryLinks[0].href} aria-current={pathname === "/websites" ? "page" : undefined} className="rounded-full px-3 py-2 text-sm font-medium text-body transition-colors duration-300 ease-gentle hover:bg-accent-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas [aria-current=page]:bg-accent-soft [aria-current=page]:text-ink">
            Work
          </Link>
          {renderMenu("ideas", "Ideas", ideaLinks)}
          {primaryLinks.slice(1).map((link) => (
            <Link key={link.name} href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined} className="rounded-full px-3 py-2 text-sm font-medium text-body transition-colors duration-300 ease-gentle hover:bg-accent-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas [aria-current=page]:bg-accent-soft [aria-current=page]:text-ink">
              {link.name}
            </Link>
          ))}
          <span className="mx-1 h-5 w-px bg-line" aria-hidden="true" />
          <Link href="/portal/login" className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors duration-300 ease-gentle hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas">Login</Link>
        </nav>

        <button className="flex h-10 w-10 items-center justify-center rounded-full text-body transition-colors duration-300 ease-gentle hover:bg-accent-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden" onClick={() => setIsMobileMenuOpen(true)} aria-expanded={isMobileMenuOpen} aria-label="Open menu" aria-controls="mobile-menu">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      <span className="sr-only" aria-live="polite" aria-atomic="true">{isMobileMenuOpen ? "Navigation menu opened" : "Navigation menu closed"}</span>
    </header>
  );
}
