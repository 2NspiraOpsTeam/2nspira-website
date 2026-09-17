"use client";

import Link from "next/link";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const ideasButtonRef = useRef<HTMLButtonElement>(null);
  const [isIdeasOpen, setIsIdeasOpen] = useState(false);
  
  // Force solid opaque styles via inline styles - these override ANY global CSS rules
  const navLinkStyle: CSSProperties = {
    backgroundColor: "#ffffff",
    backgroundImage: "none",
    opacity: 1,
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
    boxSizing: "border-box"
  };

  const menuPanelStyle: CSSProperties = {
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    backdropFilter: "none",
    WebkitBackdropFilter: "none"
  };

  const backdropStyle: CSSProperties = {
    backgroundColor: "#ffffff",
    opacity: 1,
    position: "fixed",
    inset: 0,
    height: "100dvh",
    overflowY: "auto",
    zIndex: 1000
  };

  const primaryLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Work", href: "/websites" },
  ];

  const secondaryLinks = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const ideaLinks = [
    { name: "Books", href: "/books" },
    { name: "Insights", href: "/insights" },
    { name: "Resources", href: "/resources" },
  ];

  const handleClose = () => {
    setIsIdeasOpen(false);
    onClose();
  };

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape") return;
    event.preventDefault();

    if (isIdeasOpen) {
      setIsIdeasOpen(false);
      ideasButtonRef.current?.focus();
      return;
    }

    onClose();
  };

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
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

  return createPortal(
    <div
      ref={dialogRef}
      id="mobile-menu"
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
      onKeyDown={handleDialogKeyDown}
      style={backdropStyle} // Force solid black backdrop via inline style
    >
      <h2 id="mobile-menu-title" className="sr-only">Mobile navigation</h2>

      {/* X Close Button - Top Right */}
      <button
        ref={closeButtonRef}
        onClick={(e) => { e.preventDefault(); handleClose(); }}
        style={{ 
          position: "absolute", 
          right: "1rem", 
          top: "1rem", 
          zIndex: 100,
          width: 44,
          height: 44,
          display: "grid",
          placeItems: "center", 
          backgroundColor: "#f9fafb",
          color: "#374151"
        }}
        aria-label="Close menu"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Menu Panel - Solid white background with X close button */}
      <div className="flex min-h-full w-full flex-col" style={menuPanelStyle}>
        
        {/* Menu Items - All solid white backgrounds, absolutely forced via inline styles */}
        <nav className="space-y-1 px-4 pt-16 pb-4" aria-label="Mobile navigation">
          {primaryLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={handleClose}
              style={navLinkStyle} // Force solid white via inline style
              className="block rounded-xl px-4 py-3.5 text-lg font-medium text-gray-900 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {link.name}
            </Link>
          ))}

          <button
            ref={ideasButtonRef}
            type="button"
            onClick={() => setIsIdeasOpen((open) => !open)}
            aria-expanded={isIdeasOpen}
            aria-controls="mobile-ideas-navigation"
            style={navLinkStyle}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-lg font-medium text-gray-900 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Ideas
            <svg
              className={`h-5 w-5 transition-transform duration-200 ${isIdeasOpen ? "rotate-180" : ""}`}
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
            id="mobile-ideas-navigation"
            className={isIdeasOpen ? "space-y-1 pb-1 pl-4" : "hidden"}
          >
            {ideaLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={handleClose}
                style={navLinkStyle}
                className="flex min-h-[48px] items-center rounded-xl px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {secondaryLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={handleClose}
              style={navLinkStyle}
              className="block rounded-xl px-4 py-3.5 text-lg font-medium text-gray-900 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Contact CTA and copyright at bottom */}
        <div className="mt-auto px-4 pb-8 pt-8">
          <Link
            href="/contact"
            onClick={handleClose}
            className="block rounded-xl bg-blue-600 px-4 py-3.5 text-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors duration-300 ease-gentle mb-6"
          >
            Start a conversation →
          </Link>
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} 2Nspira
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
