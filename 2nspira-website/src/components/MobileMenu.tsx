"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Insights", href: "/insights" },
    { name: "Resources", href: "/resources" },
    { name: "Books", href: "/books" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !firstElement || !lastElement) return;

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

  return (
    <div
      ref={dialogRef}
      id="mobile-menu"
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
    >
      <h2 id="mobile-menu-title" className="sr-only">Mobile navigation</h2>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ease-gentle"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="relative h-full w-[85vw] max-w-xs bg-canvas shadow-lift sm:max-w-md">
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-body transition-colors duration-300 ease-gentle hover:bg-accent-soft hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Close menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Menu Items */}
        <nav className="space-y-1 px-4 pt-14" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={onClose}
              className="block rounded-xl px-4 py-3.5 text-lg font-medium text-ink transition-colors duration-300 ease-gentle hover:bg-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-10 left-4 right-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="block rounded-xl bg-accent px-4 py-3.5 text-center text-base font-medium text-white transition-colors duration-300 ease-gentle hover:bg-accent-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Start a conversation
          </Link>
          <p className="mt-6 text-center text-sm text-muted">
            &copy; {new Date().getFullYear()} 2Nspira
          </p>
        </div>
      </div>
    </div>
  );
}
