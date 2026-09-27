"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { KeyboardEvent as ReactKeyboardEvent, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const serviceLinks = [
  { name: "AI Enablement", href: "/ai-enablement" },
  { name: "Automation & Systems Optimization", href: "/services#automation-systems-optimization" },
  { name: "Websites & Digital Platforms", href: "/websites" },
  { name: "Fractional CIO / Technology Leadership", href: "/fractional-cio" },
];

const ideaLinks = [
  { name: "Books", href: "/books" },
  { name: "Insights", href: "/insights" },
  { name: "Resources", href: "/resources" },
];

export default function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const serviceButtonRef = useRef<HTMLButtonElement>(null);
  const ideasButtonRef = useRef<HTMLButtonElement>(null);
  const [openSection, setOpenSection] = useState<"services" | "ideas" | null>(null);
  const pathname = usePathname();

  const isCurrent = (href: string) => {
    const path = href.split("#")[0];
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  const handleClose = () => {
    setOpenSection(null);
    onClose();
  };

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    if (openSection) {
      const activeButton = openSection === "services" ? serviceButtonRef.current : ideasButtonRef.current;
      setOpenSection(null);
      activeButton?.focus();
      return;
    }
    onClose();
  };

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (!firstElement || !lastElement) return;
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const accordion = (
    key: "services" | "ideas",
    label: string,
    links: typeof serviceLinks,
    buttonRef: RefObject<HTMLButtonElement | null>,
  ) => {
    const expanded = openSection === key;
    return (
      <>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpenSection(expanded ? null : key)}
          aria-expanded={expanded}
          aria-controls={`mobile-${key}-navigation`}
          className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-lg font-medium text-ink transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {label}
          <svg className={`h-5 w-5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>
        <div id={`mobile-${key}-navigation`} className={expanded ? "space-y-1 pb-2 pl-4" : "hidden"}>
          {key === "services" && (
            <Link href="/services" onClick={handleClose} className="flex min-h-12 items-center rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              View all services
            </Link>
          )}
          {links.map((link) => (
            <Link key={link.name} href={link.href} onClick={handleClose} aria-current={isCurrent(link.href) ? "page" : undefined} className="flex min-h-12 items-center rounded-xl px-4 py-3 text-base font-medium leading-6 text-body transition-colors hover:bg-accent-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [aria-current=page]:bg-accent-soft [aria-current=page]:text-ink">
              {link.name}
            </Link>
          ))}
        </div>
      </>
    );
  };

  return createPortal(
    <div ref={dialogRef} id="mobile-menu" className="fixed inset-0 z-[60] overflow-y-auto bg-canvas" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title" onKeyDown={handleDialogKeyDown}>
      <h2 id="mobile-menu-title" className="sr-only">Mobile navigation</h2>
      <div className="mx-auto flex min-h-full max-w-lg flex-col px-4">
        <div className="flex h-16 items-center justify-between border-b border-line">
          <Link href="/" onClick={handleClose} className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="2Nspira home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo/2nspira-logo.png" alt="2Nspira" className="h-8 w-auto" width={320} height={132} />
          </Link>
          <button ref={closeButtonRef} onClick={handleClose} className="grid h-11 w-11 place-items-center rounded-full bg-canvas-deep text-body transition-colors hover:bg-accent-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="Close menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="space-y-1 py-5" aria-label="Mobile navigation">
          {accordion("services", "Services", serviceLinks, serviceButtonRef)}
          <Link href="/websites#our-work" onClick={handleClose} aria-current={pathname === "/websites" ? "page" : undefined} className="block rounded-xl px-4 py-3.5 text-lg font-medium text-ink transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [aria-current=page]:bg-accent-soft">Work</Link>
          {accordion("ideas", "Ideas", ideaLinks, ideasButtonRef)}
          <Link href="/about" onClick={handleClose} aria-current={isCurrent("/about") ? "page" : undefined} className="block rounded-xl px-4 py-3.5 text-lg font-medium text-ink transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [aria-current=page]:bg-accent-soft">About</Link>
          <Link href="/contact" onClick={handleClose} aria-current={isCurrent("/contact") ? "page" : undefined} className="block rounded-xl px-4 py-3.5 text-lg font-medium text-ink transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [aria-current=page]:bg-accent-soft">Contact</Link>
          <div className="my-3 border-t border-line" />
          <Link href="/portal/login" onClick={handleClose} className="mt-2 block rounded-xl bg-accent px-4 py-3.5 text-center text-base font-medium text-white transition-colors hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas">Login</Link>
        </nav>

        <div className="mt-auto border-t border-line py-6">
          <p className="text-center text-sm text-muted">&copy; {new Date().getFullYear()} 2Nspira</p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
