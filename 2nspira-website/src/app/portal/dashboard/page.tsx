"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { StatusBadge } from "@/components/StatusBadge";

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navItems] = useState([
    { path: "/portal/dashboard", label: "Dashboard" },
    { path: "/portal/services", label: "Services" },
    { path: "/portal/billing", label: "Billing" },
    { path: "/portal/payments", label: "Payments" },
    { path: "/portal/payment-methods", label: "Payment Methods" },
    { path: "/portal/recurring", label: "Recurring Payments" },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/portal/dashboard");
        if (res.status === 401) {
          router.push("/portal/login");
          return;
        }
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch {} finally { setLoading(false); }
    })();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/portal/auth/logout", { method: "POST" });
    router.push("/portal/login");
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-foreground/50">Loading...</p>
    </div>
  );

  if (!data) return null;

  const { client, services, invoices, paymentMethods, recurringAuthorizations, upcomingBalance, outstandingInvoices } = data;
  const activeServices = services.filter((s: any) => s.status === "active").length;
  const pendingInvoices = invoices.filter((i: any) => i.status === "pending" || i.status === "overdue").length;
  const activeRecurring = recurringAuthorizations.filter((r: any) => r.status === "active").length;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-canvas border-r border-line flex flex-col transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-accent-500">2Nspira</div>
              <div className="text-xs text-foreground/50">Client Portal</div>
            </div>
            <button className="lg:hidden text-foreground/50" onClick={() => setSidebarOpen(false)}>
              <span aria-hidden="true" className="text-xl">✕</span>
            </button>
          </div>
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
            <div className="px-3 py-2 text-xs text-foreground/40 mb-3">
              {client.name}
              <br />{client.email}
            </div>
          )}
          <button onClick={handleLogout} className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-500/10 transition-colors">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <main className="flex-1 min-w-0">
        <header className="lg:hidden flex items-center gap-3 p-4 border-b border-border">
          <button onClick={() => setSidebarOpen(true)} className="text-foreground/60 text-xl">☰</button>
          <span className="font-semibold text-accent-500">2Nspira</span>
        </header>

        <div className="p-4 lg:p-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {client?.name}</h1>
            <p className="text-foreground/50 mt-1">Here's your portal overview</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-line bg-canvas p-4">
              <div className="text-sm text-foreground/60 mb-1">Active Services</div>
              <div className="text-2xl font-bold">{activeServices}</div>
            </div>
            <div className="rounded-2xl border border-line bg-canvas p-4">
              <div className="text-sm text-foreground/60 mb-1">Outstanding</div>
              <div className="text-2xl font-bold">${upcomingBalance?.toLocaleString() ?? "0"}</div>
            </div>
            <div className="rounded-2xl border border-line bg-canvas p-4">
              <div className="text-sm text-foreground/60 mb-1">Pending Invoices</div>
              <div className="text-2xl font-bold">{pendingInvoices}</div>
            </div>
            <div className="rounded-2xl border border-line bg-canvas p-4">
              <div className="text-sm text-foreground/60 mb-1">Active Recurring</div>
              <div className="text-2xl font-bold">{activeRecurring}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-canvas p-6">
            <h2 className="font-semibold mb-4">Recent Invoices</h2>
            <div className="space-y-2">
              {invoices.slice(0, 5).map((inv: any) => (
                <div key={inv.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 text-sm">
                  <span className="text-foreground/70">{inv.issueDate}</span>
                  <span className="font-medium">${inv.amount.toLocaleString()}</span>
                  <StatusBadge status={inv.status} />
                </div>
              ))}
              {invoices.length === 0 && <div className="text-center py-6 text-foreground/40">No invoices yet</div>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
