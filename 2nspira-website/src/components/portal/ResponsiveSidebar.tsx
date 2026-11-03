"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Desktop navigation becomes a keyboard-contained, dismissible mobile dialog. */
export default function ResponsiveSidebar({ open, onClose, children }: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const close = useRef(onClose);
  useEffect(() => { close.current = onClose; }, [onClose]);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const query = matchMedia("(max-width: 1023px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!mobile || !open || !ref.current) return;
    const sidebar = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const main = sidebar.parentElement?.querySelector<HTMLElement>(":scope > main");
    const wasInert = main?.inert ?? false;
    if (main) main.inert = true;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () => Array.from(sidebar.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex='0']")).filter(e => e.getClientRects().length);
    const frame = requestAnimationFrame(() => focusable()[0]?.focus());
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); close.current(); }
      if (event.key !== "Tab") return;
      const items = focusable(), first = items[0], last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    sidebar.addEventListener("keydown", keydown);
    return () => {
      cancelAnimationFrame(frame);
      sidebar.removeEventListener("keydown", keydown);
      if (main) main.inert = wasInert;
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus();
    };
  }, [mobile, open]);

  return (
    <aside ref={ref} id="account-menu" role={mobile && open ? "dialog" : undefined}
      aria-modal={mobile && open ? true : undefined} aria-label="Account menu"
      aria-hidden={mobile && !open ? true : undefined} inert={mobile && !open}
      className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-canvas border-r border-line flex flex-col transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
      {children}
    </aside>
  );
}
