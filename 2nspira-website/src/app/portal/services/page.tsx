"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/portal/Sidebar";
import { StatusBadge } from "@/components/StatusBadge";
import { Briefcase, Clock, Plus } from "lucide-react";

export default function ServicesPage() {
  const router = useRouter();
  const [data, setData] = useState<{ services: any[]; client?: Record<string, unknown> } | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/portal/services");
        if (res.status === 401) { router.push("/portal/login"); return; }
        if (res.ok) setData(await res.json());
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

  const client = data?.client;
  const services = data?.services ?? [];

  return (
    <div className="min-h-screen flex">
      <Sidebar onLogout={handleLogout} client={client} />
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
            <Briefcase size={24} className="text-accent-500" />
            <h1 className="text-2xl font-bold">Your Services</h1>
          </div>
          <div className="grid gap-4">
            {services.map((svc: any) => (
              <div key={svc.id} className="rounded-2xl border border-line bg-canvas p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{svc.name}</h3>
                      <StatusBadge status={svc.status} />
                    </div>
                    <p className="text-foreground/60 mb-3">{svc.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-foreground/50">
                      <span className="flex items-center gap-1.5"><Clock size={14} />${svc.price.toLocaleString()}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} />{svc.billingCycle}</span>
                      {svc.nextBillingDate && (
                        <span className="flex items-center gap-1.5"><Clock size={14} />Next: {svc.nextBillingDate}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {services.length === 0 && (
            <div className="rounded-2xl border border-line bg-canvas text-center py-12 text-foreground/40">
              <Plus size={32} className="mx-auto mb-3 text-foreground/20" />
              <p>No services yet. Contact 2Nspira to set up services for your account.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
