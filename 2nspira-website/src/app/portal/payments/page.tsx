"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/portal/Sidebar";
import { StatusBadge } from "@/components/StatusBadge";
import { DollarSign, CheckCircle, XCircle, Clock, CreditCard } from "lucide-react";

export default function PaymentsPage() {
  const router = useRouter();
  const [payments, setPayments] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [client, setClient] = useState<Record<string, unknown> | null>(null);

  const load = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== "all") params.set("status", filter);
      const res = await fetch(`/api/portal/payments?${params}`);
      if (res.status === 401) { router.push("/portal/login"); return; }
      if (res.ok) {
        const json = await res.json();
        setPayments(json.payments || []);
        setClient(json.client ?? null);
      }
    } catch {} finally { setLoading(false); }
  }, [filter, router]);

  useEffect(() => { load(); }, [load]);

  const handleLogout = async () => {
    await fetch("/api/portal/auth/logout", { method: "POST" });
    router.push("/portal/login");
  };

  const allStatuses = ["all", "succeeded", "failed", "pending", "processing", "refunded", "canceled"];

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
            <DollarSign size={24} className="text-accent-500" />
            <h1 className="text-2xl font-bold">Payment History</h1>
          </div>
          <div className="flex gap-2 flex-wrap">
            {allStatuses.map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                  filter === s ? "bg-accent-500 text-white" : "bg-surface text-foreground/60 hover:bg-surface/50"
                } text-xs`}>
                {s}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-8 text-foreground/50">Loading...</div>
            ) : (
              payments.map((pay: any) => (
                <div key={pay.id} className="rounded-2xl border border-line bg-canvas p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {pay.status === "succeeded" ? (
                        <CheckCircle size={20} className="text-emerald-500" />
                      ) : pay.status === "failed" || pay.status === "canceled" ? (
                        <XCircle size={20} className="text-red-500" />
                      ) : (
                        <Clock size={20} className="text-amber-500" />
                      )}
                      <div>
                        <div className="font-semibold">${pay.amount.toLocaleString()}</div>
                        <div className="text-xs text-foreground/50 mt-0.5">
                          {pay.createdAt?.split("T")[0]} · #{pay.id.slice(0, 8)}
                          {pay.stripePaymentIntentId && (
                            <span className="ml-2 font-mono text-foreground/30">{pay.stripePaymentIntentId.slice(0, 12)}…</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <StatusBadge status={pay.status} />
                  </div>
                </div>
              ))
            )}
          </div>
          {payments.length === 0 && !loading && (
            <div className="rounded-2xl border border-line bg-canvas text-center py-12 text-foreground/40">
              <CreditCard size={32} className="mx-auto mb-3 text-foreground/20" />
              <p>No payments recorded yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
