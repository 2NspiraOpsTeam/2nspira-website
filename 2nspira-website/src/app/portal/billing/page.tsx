"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/portal/Sidebar";
import { StatusBadge } from "@/components/StatusBadge";
import { FileText, Filter, Download } from "lucide-react";

export default function BillingPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [client, setClient] = useState<Record<string, unknown> | null>(null);

  const load = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== "all") params.set("status", filter);
      const res = await fetch(`/api/portal/billing?${params}`);
      if (res.status === 401) { router.push("/portal/login"); return; }
      if (res.ok) {
        const json = await res.json();
        setInvoices(json.invoices || []);
        setClient(json.client ?? null);
      }
    } catch {} finally { setLoading(false); }
  }, [filter, router]);

  useEffect(() => { load(); }, [load]);

  const handleLogout = async () => {
    await fetch("/api/portal/auth/logout", { method: "POST" });
    router.push("/portal/login");
  };

  const statusCounts = { all: 0, paid: 0, pending: 0, overdue: 0 };
  invoices.forEach((inv) => {
    const key = inv.status as keyof typeof statusCounts;
    if (key in statusCounts) statusCounts[key]++;
  });

  return (
    <div className="min-h-screen flex">
      <Sidebar onLogout={handleLogout} client={client ?? undefined} />
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <main className="flex-1 min-w-0">
        <header className="lg:hidden flex items-center gap-3 p-4 border-b border-border">
          <button onClick={() => setSidebarOpen(true)} className="text-foreground/60 text-xl">☰</button>
          <span className="font-semibold text-accent-500">2Nspira</span>
        </header>
        <div className="p-4 lg:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <FileText size={24} className="text-accent-500" />
            <h1 className="text-2xl font-bold">Billing History</h1>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "paid", "pending", "overdue"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === f ? "bg-accent-500 text-white" : "bg-surface text-foreground/60 hover:bg-surface/50"
                } capitalize`}
              >
                {f}{statusCounts[f as keyof typeof statusCounts] > 0 && ` (${statusCounts[f as keyof typeof statusCounts]})`}
              </button>
            ))}
            <button className="btn btn-ghost ml-auto"><Download size={16} /><span className="ml-1">Export</span></button>
          </div>
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-8 text-foreground/50">Loading...</div>
            ) : (
              invoices.map((inv: any) => (
                <div key={inv.id} className="rounded-2xl border border-line bg-canvas p-4 hover:border-accent-500/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">${inv.amount.toLocaleString()}</div>
                      <div className="text-sm text-foreground/50 mt-1">
                        Issued: {inv.issueDate} · Due: {inv.dueDate}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={inv.status} />
                      <span className="text-xs text-foreground/40 font-mono">{inv.id.slice(0, 8)}</span>
                    </div>
                  </div>
                  {inv.lineItems?.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {inv.lineItems.map((item: any, i: number) => (
                        <div key={i} className="text-sm flex justify-between text-foreground/60">
                          <span>{item.description}</span>
                          <span>${item.total.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {inv.paidAt && (
                    <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                      Paid on {inv.paidAt}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          {invoices.length === 0 && !loading && (
            <div className="rounded-2xl border border-line bg-canvas text-center py-12 text-foreground/40">
              <p>No invoices found for this filter.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
