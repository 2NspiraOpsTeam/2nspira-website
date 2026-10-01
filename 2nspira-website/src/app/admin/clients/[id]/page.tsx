"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { StatusBadge } from "@/components/StatusBadge";

const ADMIN = { name: "Jeffrey C", email: "jcortez@waterbearmecca.com" };
const BILLING_CYCLES = ["monthly", "quarterly", "annual", "one-time"];
const SERVICE_STATUSES = ["active", "paused", "terminated"];

type ClientRecord = {
  name: string;
  email: string;
  company?: string;
  active?: boolean;
};

type ServiceRecord = {
  id: string;
  name: string;
  description?: string;
  price?: number | string;
  billingCycle: string;
  status: string;
  dueDate?: string | null;
};

type InvoiceRecord = {
  id: string;
  issueDate?: string;
  issuedAt?: string;
  amount?: number | string;
  status: string;
};

type PaymentRecord = {
  id: string;
  createdAt?: string;
  created_at?: string;
  amount?: number | string;
  status: string;
};

type ClientDetailData = {
  client: ClientRecord;
  services: ServiceRecord[];
  invoices: InvoiceRecord[];
  payments: PaymentRecord[];
};

export default function AdminClientDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [data, setData] = useState<ClientDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  // Edit client
  const [edit, setEdit] = useState({ name: "", company: "", active: true });
  const [editMsg, setEditMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  // Add service
  const [svc, setSvc] = useState({ name: "", description: "", price: "", billingCycle: "monthly", dueDate: "" });
  const [svcMsg, setSvcMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [savingSvc, setSavingSvc] = useState(false);

  // Welcome email
  const [sendingInvite, setSendingInvite] = useState(false);
  const [inviteMsg, setInviteMsg] = useState<{ ok: boolean; text: string } | null>(null);

  // Reset password
  const [resetPw, setResetPw] = useState("");
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [savingPw, setSavingPw] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/clients/${id}`);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (res.status === 404) {
        router.push("/admin/clients");
        return;
      }
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setEdit({ name: json.client?.name || "", company: json.client?.company || "", active: json.client?.active !== false });
      }
    } catch {} finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timeoutId);
  }, [load]);

  const saveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingEdit(true);
    setEditMsg(null);
    try {
      const res = await fetch(`/api/admin/clients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(edit),
      });
      const json = await res.json();
      if (!res.ok) {
        setEditMsg({ ok: false, text: json.error || "Failed to save" });
      } else {
        setEditMsg({ ok: true, text: "Client updated." });
        load();
      }
    } catch {
      setEditMsg({ ok: false, text: "Connection failed" });
    } finally {
      setSavingEdit(false);
    }
  };

  const addService = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSvc(true);
    setSvcMsg(null);
    try {
      const res = await fetch(`/api/admin/clients/${id}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...svc,
          price: Number(svc.price) || 0,
          nextBillingDate: svc.dueDate || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setSvcMsg({ ok: false, text: json.error || "Failed to add service" });
      } else {
        setSvcMsg({ ok: true, text: `Service "${json.service.name}" added.` });
        setSvc({ name: "", description: "", price: "", billingCycle: "monthly", dueDate: "" });
        setData((current) => current ? { ...current, services: json.services || current.services } : current);
      }
    } catch {
      setSvcMsg({ ok: false, text: "Connection failed" });
    } finally {
      setSavingSvc(false);
    }
  };

  const updateServiceStatus = async (serviceId: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/clients/${id}/services/${serviceId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const json = await res.json();
        setData((current) => current ? { ...current, services: json.services || current.services } : current);
      }
    } catch {}
  };

  const saveDueDate = async (serviceId: string, dueDate: string) => {
    try {
      const res = await fetch(`/api/admin/clients/${id}/services/${serviceId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nextBillingDate: dueDate || null }),
      });
      if (res.ok) {
        const json = await res.json();
        setData((current) => current ? { ...current, services: json.services || current.services } : current);
      }
    } catch {}
  };

  const sendWelcomeEmail = async () => {
    setSendingInvite(true);
    setInviteMsg(null);
    try {
      const res = await fetch(`/api/admin/clients/${id}/invite`, { method: "POST" });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setInviteMsg({ ok: true, text: `Welcome email sent to ${client.email}. It includes their assigned services and a one-time account setup link (valid 7 days).` });
      } else if (res.status === 503) {
        setInviteMsg({ ok: false, text: "Welcome email delivery is not configured yet (email provider key missing). Set the client's portal password below and share it directly — the welcome email button will work as soon as delivery is enabled." });
      } else {
        setInviteMsg({ ok: false, text: json.error || "Could not send the welcome email. Use the portal password reset below as a fallback." });
      }
    } catch {
      setInviteMsg({ ok: false, text: "Connection failed. Try again, or use the portal password reset below." });
    } finally {
      setSendingInvite(false);
    }
  };

  const deleteService = async (serviceId: string) => {
    if (!confirm("Delete this service? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/clients/${id}/services/${serviceId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const json = await res.json();
        setData((current) => current ? { ...current, services: json.services || current.services } : current);
      }
    } catch {}
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (resetPw.length < 8) {
      setPwMsg({ ok: false, text: "Password must be at least 8 characters" });
      return;
    }
    setSavingPw(true);
    setPwMsg(null);
    try {
      const res = await fetch(`/api/admin/clients/${id}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: resetPw }),
      });
      const json = await res.json();
      if (!res.ok) {
        setPwMsg({ ok: false, text: json.error || "Failed to reset password" });
      } else {
        setPwMsg({ ok: true, text: `Portal password reset for ${json.email}` });
        setResetPw("");
      }
    } catch {
      setPwMsg({ ok: false, text: "Connection failed" });
    } finally {
      setSavingPw(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/50">Loading…</p>
      </div>
    );
  }

  if (!data) return null;

  const { client, services = [], invoices = [], payments = [] } = data;
  const activeMrr = services
    .filter((s) => s.status === "active" && s.billingCycle !== "one-time")
    .reduce((sum, s) => {
      const p = Number(s.price) || 0;
      if (s.billingCycle === "quarterly") return sum + p / 3;
      if (s.billingCycle === "annual") return sum + p / 12;
      return sum + p;
    }, 0);

  return (
    <AdminShell admin={ADMIN}>
      <div className="space-y-6">
        <button
          onClick={() => router.push("/admin/clients")}
          className="text-sm text-foreground/50 hover:text-foreground transition-colors"
        >
          ← Back to Clients
        </button>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{client.name}</h1>
            <p className="text-foreground/50 mt-1">
              {client.email} {client.company ? `· ${client.company}` : ""}
            </p>
            <p className="text-foreground/40 text-sm mt-1">
              MRR ${activeMrr.toLocaleString()} · {services.length} services · {invoices.length} invoices
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Edit client */}
          <div className="rounded-2xl border border-line bg-canvas p-6">
            <h2 className="font-semibold mb-4">Client Details</h2>
            <form onSubmit={saveClient} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Name</label>
                <input
                  value={edit.name}
                  onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                  className="w-full rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm"
                  required
                />
              </div>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                <input type="checkbox" checked={edit.active} onChange={(e) => setEdit({ ...edit, active: e.target.checked })} />
                Account active
              </label>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Company</label>
                <input
                  value={edit.company}
                  onChange={(e) => setEdit({ ...edit, company: e.target.value })}
                  className="w-full rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm"
                />
              </div>
              {editMsg && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    editMsg.ok
                      ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                      : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                  }`}
                >
                  {editMsg.text}
                </div>
              )}
              <button
                type="submit"
                disabled={savingEdit}
                className="rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong disabled:opacity-50"
              >
                {savingEdit ? "Saving…" : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Welcome email */}
          <div className="rounded-2xl border border-line bg-canvas p-6">
            <h2 className="font-semibold mb-4">Welcome Email</h2>
            <p className="text-sm text-foreground/60 mb-4">
              Sends {client.email} a notification with their assigned services and a one-time link to set their own password, log in, and add a payment method.
            </p>
            {inviteMsg && (
              <div
                className={`p-3 rounded-lg text-sm mb-4 ${
                  inviteMsg.ok
                    ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                    : "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"
                }`}
              >
                {inviteMsg.text}
              </div>
            )}
            <button
              onClick={sendWelcomeEmail}
              disabled={sendingInvite}
              className="rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong disabled:opacity-50"
            >
              {sendingInvite ? "Sending…" : "Send Welcome Email"}
            </button>
          </div>

          {/* Reset portal password */}
          <div className="rounded-2xl border border-line bg-canvas p-6">
            <h2 className="font-semibold mb-4">Portal Access</h2>
            <form onSubmit={resetPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">
                  New Portal Password
                </label>
                <input
                  type="password"
                  value={resetPw}
                  onChange={(e) => setResetPw(e.target.value)}
                  className="w-full rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm"
                  placeholder="min 8 characters"
                />
              </div>
              {pwMsg && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    pwMsg.ok
                      ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                      : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                  }`}
                >
                  {pwMsg.text}
                </div>
              )}
              <button
                type="submit"
                disabled={savingPw}
                className="rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong disabled:opacity-50"
              >
                {savingPw ? "Resetting…" : "Reset Portal Password"}
              </button>
            </form>
          </div>
        </div>

        {/* Services */}
        <div className="rounded-2xl border border-line bg-canvas p-6">
          <h2 className="font-semibold mb-4">Services ({services.length})</h2>

          <form onSubmit={addService} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 p-4 rounded-xl bg-surface/40">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-foreground/60 mb-1">Service name *</label>
              <input
                value={svc.name}
                onChange={(e) => setSvc({ ...svc, name: e.target.value })}
                className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm"
                required
                placeholder="e.g. Monthly Retainer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground/60 mb-1">Price (USD)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={svc.price}
                onChange={(e) => setSvc({ ...svc, price: e.target.value })}
                className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground/60 mb-1">Due date</label>
              <input
                type="date"
                value={svc.dueDate}
                onChange={(e) => setSvc({ ...svc, dueDate: e.target.value })}
                className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <select
                value={svc.billingCycle}
                onChange={(e) => setSvc({ ...svc, billingCycle: e.target.value })}
                className="rounded-lg border border-line bg-canvas px-2 py-2 text-sm"
              >
                {BILLING_CYCLES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={savingSvc}
                className="rounded-full bg-accent px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-strong disabled:opacity-50"
              >
                {savingSvc ? "Adding…" : "Add Service"}
              </button>
            </div>
            <div className="col-span-2 sm:col-span-4">
              <input
                value={svc.description}
                onChange={(e) => setSvc({ ...svc, description: e.target.value })}
                className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm"
                placeholder="Description (optional)"
              />
            </div>
            {svcMsg && (
              <div
                className={`col-span-2 sm:col-span-4 p-3 rounded-lg text-sm ${
                  svcMsg.ok
                    ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                    : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                }`}
              >
                {svcMsg.text}
              </div>
            )}
          </form>

          <div className="space-y-3">
            {services.map((s) => (
              <div key={s.id} className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border/60">
                <div className="min-w-0">
                  <div className="font-medium text-sm">{s.name}</div>
                  <div className="text-xs text-foreground/50">
                    ${Number(s.price || 0).toLocaleString()} / {s.billingCycle}
                    {s.dueDate ? ` · due ${s.dueDate}` : " · no due date set"}
                    {s.description ? ` — ${s.description}` : ""}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="date"
                    value={s.dueDate || ""}
                    onChange={(e) => saveDueDate(s.id, e.target.value)}
                    className="rounded-lg border border-line bg-canvas px-2 py-1.5 text-xs"
                    title="Set due date"
                  />
                  <select
                    value={s.status}
                    onChange={(e) => updateServiceStatus(s.id, e.target.value)}
                    className="rounded-lg border border-line bg-canvas px-2 py-1.5 text-xs"
                  >
                    {SERVICE_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => deleteService(s.id)}
                    className="rounded-lg px-3 py-1.5 text-xs text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {services.length === 0 && (
              <div className="text-center py-6 text-foreground/40 text-sm">
                No services assigned yet.
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Invoices */}
          <div className="rounded-2xl border border-line bg-canvas p-6">
            <h2 className="font-semibold mb-4">Invoices ({invoices.length})</h2>
            <div className="space-y-2">
              {invoices.slice(0, 8).map((inv) => (
                <div key={inv.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 text-sm">
                  <span className="text-foreground/70">{inv.issueDate || inv.issuedAt || "—"}</span>
                  <span className="font-medium">${Number(inv.amount || 0).toLocaleString()}</span>
                  <StatusBadge status={inv.status} />
                </div>
              ))}
              {invoices.length === 0 && (
                <div className="text-center py-4 text-foreground/40 text-sm">No invoices yet</div>
              )}
            </div>
          </div>

          {/* Payments */}
          <div className="rounded-2xl border border-line bg-canvas p-6">
            <h2 className="font-semibold mb-4">Payments ({payments.length})</h2>
            <div className="space-y-2">
              {payments.slice(0, 8).map((p) => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 text-sm">
                  <span className="text-foreground/70">{p.createdAt || p.created_at || "—"}</span>
                  <span className="font-medium">${Number(p.amount || 0).toLocaleString()}</span>
                  <StatusBadge status={p.status} />
                </div>
              ))}
              {payments.length === 0 && (
                <div className="text-center py-4 text-foreground/40 text-sm">No payments yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
