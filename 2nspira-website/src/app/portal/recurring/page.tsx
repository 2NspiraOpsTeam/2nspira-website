"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/portal/Sidebar";
import { StatusBadge } from "@/components/StatusBadge";
import { Repeat, Pause, Play, RotateCcw, Calendar, DollarSign } from "lucide-react";

export default function RecurringPage() {
  const router = useRouter();
  const [auths, setAuths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [client, setClient] = useState<Record<string, unknown> | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/portal/recurring");
      if (res.status === 401) { router.push("/portal/login"); return; }
      if (res.ok) {
        const json = await res.json();
        setAuths(json.recurringAuthorizations || []);
        setClient(json.client ?? null);
      }
    } catch {} finally { setLoading(false); }
  }, [router]);

  useEffect(() => { load(); }, [load]);

  const handleLogout = async () => {
    await fetch("/api/portal/auth/logout", { method: "POST" });
    router.push("/portal/login");
  };

  const handleToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "paused" : "active";
    try {
      await fetch(`/api/portal/recurring/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      load();
    } catch {}
  };

  const handleRevoke = async (id: string) => {
    try {
      await fetch(`/api/portal/recurring/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "revoked" }),
      });
      load();
    } catch {}
  };

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
            <Repeat size={24} className="text-accent-500" />
            <h1 className="text-2xl font-bold">Recurring Payments</h1>
          </div>
          <div className="grid gap-4">
            {loading ? (
              <div className="text-center py-8 text-foreground/50">Loading...</div>
            ) : (
              auths.map((auth: any) => (
                <div key={auth.id} className="rounded-2xl border border-line bg-canvas p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">
                          {auth.billingCycle === "monthly" ? "Monthly" : auth.billingCycle === "quarterly" ? "Quarterly" : "Annual"} — ${auth.amount.toLocaleString()}
                        </h3>
                        <StatusBadge status={auth.status} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-foreground/60">
                        <div className="flex items-center gap-1.5"><Calendar size={14} />Next charge: {auth.nextChargeDate?.split("T")[0] ?? "—"}</div>
                        <div className="flex items-center gap-1.5"><DollarSign size={14} />${auth.amount.toLocaleString()} per {auth.billingCycle}</div>
                        <div className="text-xs text-foreground/40 font-mono">{auth.id.slice(0, 8)}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {auth.status === "active" && (
                        <button onClick={() => handleToggle(auth.id, "active")} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-surface text-foreground/60 hover:bg-surface/50 transition-colors flex items-center gap-1" title="Pause">
                          <Pause size={14} /> Pause
                        </button>
                      )}
                      {auth.status === "paused" && (
                        <button onClick={() => handleToggle(auth.id, "paused")} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent-strong transition-colors flex items-center gap-1" title="Resume">
                          <Play size={14} /> Resume
                        </button>
                      )}
                      {auth.status !== "revoked" && auth.status !== "expired" && (
                        <button onClick={() => handleRevoke(auth.id)} className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-1" title="Revoke">
                          <RotateCcw size={14} /> Revoke
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {auths.length === 0 && !loading && (
            <div className="rounded-2xl border border-line bg-canvas text-center py-12 text-foreground/40">
              <Repeat size={32} className="mx-auto mb-3 text-foreground/20" />
              <p>No recurring payment authorizations yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
