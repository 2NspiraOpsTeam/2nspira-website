"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/portal/Sidebar";
import { CreditCard, Plus, Shield, AlertTriangle } from "lucide-react";

export default function PaymentMethodsPage() {
  const router = useRouter();
  const [methods, setMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [client, setClient] = useState<Record<string, unknown> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/portal/payment-methods");
      if (res.status === 401) { router.push("/portal/login"); return; }
      if (res.ok) {
        const json = await res.json();
        setMethods(json.paymentMethods || []);
        setClient(json.client ?? null);
      }
    } catch {} finally { setLoading(false); }
  }, [router]);

  useEffect(() => { load(); }, [load]);

  const handleLogout = async () => {
    await fetch("/api/portal/auth/logout", { method: "POST" });
    router.push("/portal/login");
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const form = (e.target as HTMLFormElement);
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/portal/payment-methods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "card",
          cardNumber: fd.get("cardNumber") as string,
          expMonth: fd.get("expMonth") as string,
          expYear: fd.get("expYear") as string,
          billingAddress: {
            line1: fd.get("line1") as string,
            city: fd.get("city") as string,
            state: fd.get("state") as string,
            country: (fd.get("country") as string) || "US",
            postalCode: (fd.get("postalCode") as string) || "",
          },
          isDefault: true,
        }),
      });
      if (res.ok) {
        const json = await res.json();
        setMethods((prev) => [...prev, json.paymentMethod]);
        setShowForm(false);
      }
    } catch {} finally { setSubmitting(false); }
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard size={24} className="text-accent-500" />
              <h1 className="text-2xl font-bold">Payment Methods</h1>
            </div>
            <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent-strong transition-colors flex items-center gap-2">
              <Plus size={16} /> Add Card
            </button>
          </div>
          {showForm && (
            <div className="rounded-2xl border-2 border-accent-500/30 bg-canvas p-4">
              <form onSubmit={handleAdd} className="space-y-4">
                <h3 className="font-semibold">Add New Card</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-foreground/70 mb-1">Card Number</label>
                    <input name="cardNumber" className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" placeholder="4242 4242 4242 4242" required />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground/70 mb-1">Cardholder Name</label>
                    <input name="cardholderName" className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground/70 mb-1">Expiry Month</label>
                    <input name="expMonth" type="number" min="1" max="12" className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" placeholder="12" required />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground/70 mb-1">Expiry Year</label>
                    <input name="expYear" type="number" min={new Date().getFullYear()} className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" placeholder={`${new Date().getFullYear() + 3}`} required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-foreground/70 mb-1">Billing Address</label>
                    <input name="line1" className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 mb-2" placeholder="123 Main St" />
                    <div className="grid grid-cols-2 gap-4">
                      <input name="city" className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" placeholder="City" />
                      <input name="state" className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" placeholder="State" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="submit" disabled={submitting} className="px-4 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent-strong transition-colors disabled:opacity-50">
                    {submitting ? "Adding…" : "Add Card"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg text-sm font-medium bg-surface text-foreground/60 hover:bg-surface/50 transition-colors">Cancel</button>
                </div>
              </form>
            </div>
          )}
          <div className="grid gap-4">
            {methods.map((pm: any) => (
              <div key={pm.id} className="rounded-2xl border border-line bg-canvas p-4 flex items-center gap-4">
                <Shield size={28} className="text-accent-500" />
                <div className="flex-1">
                  <div className="font-semibold">
                    {pm.brand || "Card"} •••• {pm.last4 || "••••"}
                    {pm.isDefault && <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Default</span>}
                  </div>
                  <div className="text-sm text-foreground/50 mt-0.5">
                    Expires: {pm.expiryMonth}/{pm.expiryYear}
                    {pm.billingAddress && ` · ${pm.billingAddress.city}, ${pm.billingAddress.state}`}
                    {!pm.isValid && <span className="flex items-center gap-1 text-red-500 mt-1 text-xs"><AlertTriangle size={12} /> Expired</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {methods.length === 0 && !showForm && (
            <div className="rounded-2xl border border-line bg-canvas text-center py-12 text-foreground/40">
              <CreditCard size={32} className="mx-auto mb-3 text-foreground/20" />
              <p>No payment methods yet. Add a card to get started.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
