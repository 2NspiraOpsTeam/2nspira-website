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

  // Force solid opaque styles on all elements via inline styles
  const navLinkStyle = {
    backgroundColor: "#ffffff",
    opacity: 1,
    backdropFilter: "none",
    WebkitBackdropFilter: "none"
  };

  const menuPanelStyle = {
    backgroundColor: "#ffffff",
    opacity: 1,
    backdropFilter: "none",
    WebkitBackdropFilter: "none"
  };

  const backdropStyle = {
    backgroundColor: "#000000",
    opacity: 1
  };

  return (
    <div
      ref={dialogRef}
      id="mobile-menu"
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
      style={backdropStyle} // Force solid black backdrop
    >
      <h2 id="mobile-menu-title" className="sr-only">Mobile navigation</h2>

      {/* Close Button */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-gray-800 focus:outline-none"
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

      {/* Menu Panel - Solid white with no transparency */}
      <div className="relative h-full w-[85vw] max-w-xs sm:max-w-md shadow-lg" style={menuPanelStyle}>
        
        {/* Menu Items - All solid white backgrounds, absolutely forced via inline styles */}
        <nav className="space-y-1 px-4 pt-14" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={onClose}
              style={navLinkStyle} // Force solid white via inline style
              className="block rounded-xl px-4 py-3.5 text-lg font-medium text-gray-900 focus:outline-none"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-10 left-4 right-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="block rounded-xl bg-blue-600 px-4 py-3.5 text-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors duration-300 ease-gentle"
          >
            Start a conversation →
          </Link>
          <p className="mt-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} 2Nspira
          </p>
        </div>
      </div>
    </div>
  );
}
