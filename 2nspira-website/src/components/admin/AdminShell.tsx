"use client";

import ResponsiveSidebar from "@/components/portal/ResponsiveSidebar";

import { useCallback, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const NAV_ITEMS = [
  { path: "/admin/dashboard", label: "Dashboard" },
  { path: "/admin/clients", label: "Clients" },
  { path: "/admin/careers", label: "Careers" },
];

export default function AdminShell({
  admin,
  children,
}: {
  admin: { name: string; email: string } | null;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = useCallback(async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }, [router]);

  const isActive = (itemPath: string) =>
    itemPath === pathname ||
    (itemPath === "/admin/clients" && pathname.startsWith("/admin/clients"));

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <ResponsiveSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <div className="p-6 border-b border-line">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-accent">2Nspira</div>
              <div className="text-xs text-foreground/70">Admin Console</div>
            </div>
            <button
              className="lg:hidden text-foreground/70"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close account menu"
            >
              <span aria-hidden="true" className="text-xl">✕</span>
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-500/10 px-3 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-500/20 transition-colors"
          >
            <span aria-hidden="true">↩</span>
            Sign Out
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "bg-accent/10 text-accent-strong"
                  : "text-foreground/70 hover:bg-surface/50 hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => router.push("/")}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/70 hover:bg-surface/50 hover:text-foreground transition-colors"
          >
            ← Back to Site
          </button>
        </nav>

        <div className="p-4 border-t border-line">
          {admin && (
            <div className="px-3 py-2 text-xs text-foreground/70">
              {admin.name}
              <br />
              {admin.email}
            </div>
          )}
        </div>
      </ResponsiveSidebar>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <main className="flex-1 min-w-0">
        <header className="lg:hidden flex items-center justify-between gap-3 p-4 border-b border-line bg-canvas">
          <div className="flex items-center gap-3">
            <button
              aria-expanded={sidebarOpen} aria-controls="account-menu" onClick={() => setSidebarOpen(true)}
              className="text-foreground/70 text-xl"
              aria-label="Open account menu"
            >
              ☰
            </button>
            <span className="font-semibold text-accent">2Nspira Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-700"
          >
            Sign Out
          </button>
        </header>
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
