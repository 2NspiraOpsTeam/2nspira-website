"use client";

import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { path: "/portal/dashboard", label: "Dashboard" },
  { path: "/portal/services", label: "Services" },
  { path: "/portal/billing", label: "Billing" },
  { path: "/portal/payments", label: "Payments" },
  { path: "/portal/payment-methods", label: "Payment Methods" },
  { path: "/portal/recurring", label: "Recurring" },
];

export default function Sidebar({
  onLogout,
  client,
}: {
  onLogout: () => Promise<void>;
  client?: Record<string, unknown>;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-canvas border-r border-line flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-accent-500">2Nspira</div>
            <div className="text-xs text-foreground/50">Client Portal</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-500/10 px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-500/20 transition-colors"
        >
          <span aria-hidden="true">↩</span>
          Sign Out
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === item.path
                ? "bg-accent-500/10 text-accent-500"
                : "text-foreground/60 hover:bg-surface/50 hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        {client && (
          <div className="px-3 py-2 text-xs text-foreground/40">
            {(client.name as string)}
            <br />{(client.email as string)}
          </div>
        )}
      </div>
    </aside>
  );
}
