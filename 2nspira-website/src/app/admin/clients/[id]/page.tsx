"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { StatusBadge } from "@/components/StatusBadge";

const ADMIN = { name: "Jeffrey C", email: "jcortez@waterbearmecca.com" };
const BILLING_CYCLES = ["monthly", "quarterly", "annual", "one-time"];
const SERVICE_STATUSES = ["active", "paused", "terminated"];
const validDueDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const year = Number(value.slice(0, 4));
  return year >= 1900 && year <= 2100 && !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
    && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
};

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
  nextBillingDate?: string | null;
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
  invitationEligibility?: "new" | "pending" | "provisioned" | "inactive" | "email_conflict";
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
  const [svc, setSvc] = useState({ name: "", description: "", price: "", billingCycle: "monthly", nextBillingDate: "" });
  const [svcMsg, setSvcMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [savingSvc, setSavingSvc] = useState(false);
  const [sendingNotification, setSendingNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [dateEdits, setDateEdits] = useState<Record<string, string>>({});
  const [savingDates, setSavingDates] = useState<Record<string, boolean>>({});
  const [dateErrors, setDateErrors] = useState<Record<string, string>>({});

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
    if (svc.nextBillingDate && !validDueDate(svc.nextBillingDate)) {
      setSvcMsg({ ok: false, text: "Enter a complete due date with a four-digit year (1900–2100)." });
      return;
    }
    setSavingSvc(true);
    setSvcMsg(null);
    try {
      const res = await fetch(`/api/admin/clients/${id}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...svc,
          price: Number(svc.price) || 0,
          nextBillingDate: svc.nextBillingDate || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setSvcMsg({ ok: false, text: json.error || "Failed to add service" });
      } else {
        setSvcMsg({ ok: true, text: `Service "${json.service.name}" added.` });
        setSvc({ name: "", description: "", price: "", billingCycle: "monthly", nextBillingDate: "" });
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

  const saveDueDate = async (serviceId: string, nextBillingDate: string) => {
    if (!nextBillingDate) {
      setDateErrors(current => ({ ...current, [serviceId]: "Choose a complete date before saving." }));
      return;
    }
    if (!validDueDate(nextBillingDate)) {
      setDateErrors(current => ({ ...current, [serviceId]: "Enter a complete date with a four-digit year (1900–2100)." }));
      return;
    }
    setDateErrors(current => ({ ...current, [serviceId]: "" }));
    setSavingDates(current => ({ ...current, [serviceId]: true }));
    try {
      const res = await fetch(`/api/admin/clients/${id}/services/${serviceId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nextBillingDate }),
      });
      if (res.ok) {
        const json = await res.json();
        setData((current) => current ? { ...current, services: json.services || current.services } : current);
        setDateEdits(current => { const next = { ...current }; delete next[serviceId]; return next; });
      } else {
        const json = await res.json().catch(() => ({}));
        setDateErrors(current => ({ ...current, [serviceId]: json.error || "Could not save due date" }));
      }
    } catch { setDateErrors(current => ({ ...current, [serviceId]: "Could not save due date" })); }
    finally { setSavingDates(current => ({ ...current, [serviceId]: false })); }
  };

  const sendServiceNotification = async () => {
    if (sendingNotification) return;
    setSendingNotification(true);
    setNotificationMsg(null);
    try {
      const res = await fetch(`/api/admin/clients/${id}/service-notification`, { method: "POST" });
      const json = await res.json().catch(() => ({}));
      setNotificationMsg({ ok: res.ok, text: res.ok ? `Service notification sent for ${json.serviceCount} active payable service(s).` : json.error || "Could not send service notification" });
    } catch { setNotificationMsg({ ok: false, text: "Connection failed; check delivery before retrying." }); }
    finally { setSendingNotification(false); }
  };

  const sendWelcomeEmail = async () => {
    setSendingInvite(true);
    setInviteMsg(null);
    try {
      const res = await fetch(`/api/admin/clients/${id}/invite`, { method: "POST" });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setInviteMsg({ ok: true, text: `Welcome email sent to ${client.email}. It includes their assigned services and a one-time account setup link (valid 7 days).` });
        await load();
      } else if (res.status === 409) {
        await load();
        setInviteMsg({ ok: false, text: "This account cannot be invited. Its portal access may already be set up; use Portal Access if a password reset is needed." });
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
        await load();
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
          {data.invitationEligibility === "provisioned" ? (
            <div className="rounded-2xl border border-line bg-canvas p-6">
              <h2 className="font-semibold mb-4">Portal Access</h2>
              <p className="text-sm text-foreground/60">This client already has a portal password. Use the password reset below if access needs to be restored.</p>
            </div>
          ) : data.invitationEligibility === "new" || data.invitationEligibility === "pending" ? (
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
              {sendingInvite ? "Sending…" : data.invitationEligibility === "pending" ? "Resend Welcome Email" : "Send Welcome Email"}
            </button>
          </div>
          ) : data.invitationEligibility === "inactive" || data.invitationEligibility === "email_conflict" ? (
            <div className="rounded-2xl border border-line bg-canvas p-6">
              <h2 className="font-semibold mb-4">Welcome Email Unavailable</h2>
              <p className="text-sm text-foreground/60">{data.invitationEligibility === "inactive" ? "Activate this client before sending an invitation." : "This email is already associated with another client identity."}</p>
            </div>
          ) : null}

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
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <button type="button" onClick={sendServiceNotification}
              disabled={sendingNotification || data.invitationEligibility !== "provisioned" || !services.some(s => s.status === "active" && Number(s.price) > 0)}
              className="rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50">
              {sendingNotification ? "Sending…" : "Send Service Notification"}
            </button>
            <span className="text-xs text-foreground/60">Sends the currently active payable services after you finish editing. Requires portal access.</span>
          </div>
          {notificationMsg && <p role="status" className={`mb-4 text-sm ${notificationMsg.ok ? "text-green-700" : "text-red-600"}`}>{notificationMsg.text}</p>}

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
                min="1900-01-01"
                max="2100-12-31"
                value={svc.nextBillingDate}
                onChange={(e) => setSvc(current => ({ ...current, nextBillingDate: e.target.value }))}
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
                    {s.nextBillingDate ? ` · due ${s.nextBillingDate}` : " · no due date set"}
                    {s.description ? ` — ${s.description}` : ""}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="date"
                    min="1900-01-01"
                    max="2100-12-31"
                    value={dateEdits[s.id] ?? s.nextBillingDate ?? ""}
                    onChange={(e) => {
                      setDateEdits(current => ({ ...current, [s.id]: e.target.value }));
                      setDateErrors(current => ({ ...current, [s.id]: "" }));
                    }}
                    disabled={savingDates[s.id]}
                    className="rounded-lg border border-line bg-canvas px-2 py-1.5 text-xs"
                    aria-label={`Due date for ${s.name}`}
                  />
                  {dateEdits[s.id] !== undefined && dateEdits[s.id] !== (s.nextBillingDate ?? "") && (
                    <button type="button" onClick={() => saveDueDate(s.id, dateEdits[s.id])}
                      disabled={savingDates[s.id]}
                      className="rounded-lg bg-accent px-3 py-1.5 text-xs text-white disabled:opacity-50">
                      {savingDates[s.id] ? "Saving…" : "Save date"}
                    </button>
                  )}
                  {dateErrors[s.id] && <span role="alert" className="text-xs text-red-600">{dateErrors[s.id]}</span>}
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
