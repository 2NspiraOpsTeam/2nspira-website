"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";

const ADMIN = { name: "Jeffrey C", email: "jcortez@waterbearmecca.com" };

type ClientSummary = {
  id: string;
  name: string;
  email: string;
  company?: string;
  activeServices: number;
  serviceCount: number;
  mrr?: number;
};

export default function AdminClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<ClientSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", password: "" });
  const [createMsg, setCreateMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/clients");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (res.ok) {
        const json = await res.json();
        setClients(json.clients || []);
      }
    } catch {} finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timeoutId);
  }, [load]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setCreateMsg(null);
    try {
      const body: Record<string, string> = { name: form.name, email: form.email, company: form.company };
      if (form.password) body.password = form.password;
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setCreateMsg({ ok: false, text: data.error || "Failed to create client" });
      } else {
        setCreateMsg({ ok: true, text: `Client "${data.client.name}" created.` });
        setForm({ name: "", email: "", company: "", password: "" });
        load();
      }
    } catch {
      setCreateMsg({ ok: false, text: "Connection failed" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/50">Loading…</p>
      </div>
    );
  }

  return (
    <AdminShell admin={ADMIN}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Clients</h1>
            <p className="text-foreground/50 mt-1">{clients.length} total</p>
          </div>
          <button
            onClick={() => setShowCreate((v) => !v)}
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
          >
            {showCreate ? "Cancel" : "+ New Client"}
          </button>
        </div>

        {showCreate && (
          <div className="rounded-2xl border border-line bg-canvas p-6">
            <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Company *</label>
                <input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">
                  Portal Password (optional)
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm"
                  placeholder="min 8 chars if set"
                />
              </div>
              {createMsg && (
                <div
                  className={`sm:col-span-2 p-3 rounded-lg text-sm ${
                    createMsg.ok
                      ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                      : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                  }`}
                >
                  {createMsg.text}
                </div>
              )}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong disabled:opacity-50"
                >
                  {saving ? "Creating…" : "Create Client"}
                </button>
              </div>
            </form>
          </div>
        )}

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search clients by name, email, or company"
          className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm"
        />

        <div className="rounded-2xl border border-line bg-canvas overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs text-foreground/50 uppercase tracking-wide">
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3 hidden sm:table-cell">Company</th>
                <th className="px-4 py-3 hidden md:table-cell">Services</th>
                <th className="px-4 py-3 hidden md:table-cell">MRR</th>
              </tr>
            </thead>
            <tbody>
              {clients.filter((c) => `${c.name} ${c.email} ${c.company}`.toLowerCase().includes(query.toLowerCase())).map((c) => (
                <tr
                  key={c.id}
                  onClick={() => router.push(`/admin/clients/${c.id}`)}
                  className="border-b border-border/50 last:border-0 cursor-pointer hover:bg-surface/40 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-foreground/50">{c.email}</div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-foreground/70">{c.company || "—"}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-foreground/70">
                    {c.activeServices}/{c.serviceCount}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell font-medium">
                    {(c.mrr ?? 0).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </td>
                </tr>
              ))}
              {clients.length === 0 && (
                <tr>
                  <td className="px-4 py-8 text-center text-foreground/40" colSpan={4}>
                    No clients yet. Create one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
