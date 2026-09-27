"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { StatusBadge } from "@/components/StatusBadge";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (res.ok) {
          const json = await res.json();
          setStats(json);
        } else {
          setStats({ error: "Failed to load stats" });
        }
      } catch {
        setStats({ error: "Connection failed" });
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/50">Loading…</p>
      </div>
    );
  }

  const admin = { name: "Jeffrey C", email: "jcortez@waterbearmecca.com" };

  const cards = [
    { label: "Clients", value: stats.clients ?? 0 },
    { label: "Active Services", value: stats.activeServices ?? 0 },
    { label: "MRR", value: `$${(stats.monthlyMrr ?? 0).toLocaleString()}` },
    { label: "Total Revenue", value: `$${(stats.totalRevenue ?? 0).toLocaleString()}` },
    { label: "Invoices", value: stats.invoices ?? 0 },
    { label: "Unpaid Invoices", value: stats.unpaidInvoices ?? 0 },
  ];

  return (
    <AdminShell admin={admin}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-foreground/50 mt-1">Portfolio overview</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {cards.map((c) => (
            <div key={c.label} className="rounded-2xl border border-line bg-canvas p-4">
              <div className="text-xs text-foreground/60 mb-1">{c.label}</div>
              <div className="text-xl font-bold">{c.value}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-line bg-canvas p-6">
          <h2 className="font-semibold mb-4">Recent Payments</h2>
          <div className="space-y-2">
            {(stats.recentPayments || []).map((p: any) => (
              <div
                key={p.id}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 text-sm"
              >
                <span className="text-foreground/70">{p.clientName || "—"}</span>
                <span className="font-medium">${p.amount?.toLocaleString() ?? "0"}</span>
                <StatusBadge status={p.status} />
              </div>
            ))}
            {(stats.recentPayments || []).length === 0 && (
              <div className="text-center py-6 text-foreground/40">No payments yet</div>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
