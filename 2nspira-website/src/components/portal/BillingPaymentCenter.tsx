"use client";

import { useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, type Stripe } from "@stripe/stripe-js";

type Method = { id: string; type: "card" | "bank_account"; brand: string; lastFour: string; expirationMonth: number | null; expirationYear: number | null; accountType: string | null; isDefault: boolean };
type Invoice = { id: string; invoiceNumber: string; balance: number; dueDate: string; status: string };

export default function BillingPaymentCenter({ methods, invoices, canManage, managedAchFeeCents, cardFeeBasisPoints }: { methods: Method[]; invoices: Invoice[]; canManage: boolean; managedAchFeeCents: number; cardFeeBasisPoints: number }) {
  const [setup, setSetup] = useState<{ clientSecret: string; stripe: Promise<Stripe | null> } | null>(null);
  const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  async function begin(type: "card" | "bank_account") {
    setBusy(true); setMessage("");
    const response = await fetch("/api/portal/payments/setup-intent", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ type }) });
    const result = await response.json(); setBusy(false);
    if (!response.ok) return setMessage(result.error ?? "Unable to start secure payment setup");
    setSetup({ clientSecret: result.clientSecret, stripe: loadStripe(result.publishableKey) });
  }
  return <div className="portal-payment-center">
    <section className="portal-method-grid" aria-label="Saved payment methods">
      {methods.map((method) => <article className="portal-method" key={method.id}><header><span className="portal-method-brand">{method.type === "card" ? "CARD" : "MANAGED ACH"}</span>{method.isDefault && <span className="portal-status">Default</span>}</header><h2>{method.brand} <span>•••• {method.lastFour}</span></h2><p>{method.type === "card" ? `Expires ${String(method.expirationMonth).padStart(2, "0")}/${method.expirationYear}` : `${method.accountType ?? "Bank account"} · Stripe verified`}</p></article>)}
    </section>
    {canManage && <div className="portal-heading-actions"><button className="portal-secondary-button" onClick={() => begin("card")} disabled={busy}>Add card</button><button className="portal-secondary-button" onClick={() => begin("bank_account")} disabled={busy}>Add bank account</button></div>}
    {setup && <Elements stripe={setup.stripe} options={{ clientSecret: setup.clientSecret }}><SetupForm onSaved={() => { setSetup(null); setMessage("Payment method saved securely. Refreshing…"); location.reload(); }} /></Elements>}
    {message && <p role="status" className="portal-security-note">{message}</p>}
    <section className="portal-payment-choices"><h2>Open invoices</h2>{invoices.length === 0 ? <p>No open invoices.</p> : invoices.map((invoice) => <InvoicePayment key={invoice.id} invoice={invoice} methods={methods} canManage={canManage} managedAchFeeCents={managedAchFeeCents} cardFeeBasisPoints={cardFeeBasisPoints} />)}</section>
  </div>;
}

function SetupForm({ onSaved }: { onSaved: () => void }) {
  const stripe = useStripe(); const elements = useElements(); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); if (!stripe || !elements) return; setBusy(true); setError("");
    const result = await stripe.confirmSetup({ elements, redirect: "if_required" });
    if (result.error) { setBusy(false); return setError(result.error.message ?? "Setup failed"); }
    const paymentMethodId = typeof result.setupIntent.payment_method === "string" ? result.setupIntent.payment_method : result.setupIntent.payment_method?.id;
    const response = await fetch("/api/portal/payments/methods", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ paymentMethodId }) });
    if (!response.ok) { const body = await response.json(); setBusy(false); return setError(body.error ?? "Unable to save payment method"); }
    onSaved();
  }
  return <form onSubmit={submit} className="portal-payment-element"><PaymentElement /><button className="portal-primary-button" disabled={!stripe || busy}>{busy ? "Saving…" : "Save payment method"}</button>{error && <p role="alert">{error}</p>}</form>;
}

function InvoicePayment({ invoice, methods, canManage, managedAchFeeCents, cardFeeBasisPoints }: { invoice: Invoice; methods: Method[]; canManage: boolean; managedAchFeeCents: number; cardFeeBasisPoints: number }) {
  const [choice, setChoice] = useState<"card" | "managed_ach" | "manual_ach" | "zelle">("manual_ach"); const [message, setMessage] = useState(""); const [reference, setReference] = useState("");
  const method = methods.find((item) => choice === "card" ? item.type === "card" : choice === "managed_ach" ? item.type === "bank_account" : false);
  const feeCents = choice === "managed_ach" ? managedAchFeeCents : choice === "card" ? Math.round(invoice.balance * 100 * cardFeeBasisPoints / 10_000) : 0;
  async function pay() {
    if (!method) return setMessage("Add the selected saved payment method first.");
    const response = await fetch("/api/portal/payments/pay", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ invoiceId: invoice.id, paymentMethodId: method.id, disclosedFeeCents: feeCents }) }); const body = await response.json();
    setMessage(response.ok ? `Payment ${body.status}. Final status is confirmed by Stripe webhook.` : body.error);
  }
  async function reportSent() {
    const response = await fetch("/api/portal/payments/manual", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ invoiceId: invoice.id, method: choice, acknowledgmentAccepted: true, referenceNumber: reference }) }); const body = await response.json();
    setMessage(response.ok ? "Payment reported as sent. We will mark the invoice paid after funds are received and verified." : body.error);
  }
  return <article className="portal-invoice-payment"><header><strong>{invoice.invoiceNumber}</strong><span>${invoice.balance.toFixed(2)} · due {invoice.dueDate}</span></header><div className="portal-choice-grid">
    <label><input type="radio" checked={choice === "manual_ach"} onChange={() => setChoice("manual_ach")} /> ACH Bank Transfer <small>$0 convenience fee · you initiate transfer</small></label>
    <label><input type="radio" checked={choice === "managed_ach"} onChange={() => setChoice("managed_ach")} /> Managed ACH <small>${(feeCents / 100).toFixed(2)} disclosed convenience fee · total ${(invoice.balance + feeCents / 100).toFixed(2)}</small></label>
    <label><input type="radio" checked={choice === "card"} onChange={() => setChoice("card")} /> Credit Card <small>${(feeCents / 100).toFixed(2)} configured processing fee when selected</small></label>
    <label><input type="radio" checked={choice === "zelle"} onChange={() => setChoice("zelle")} /> Zelle <small>Manual payment · pending verification</small></label>
  </div>{(choice === "manual_ach" || choice === "zelle") ? <div><ManualInstructions method={choice} /><label>Optional confirmation/reference <input value={reference} onChange={(event) => setReference(event.target.value)} maxLength={100} /></label><p><small>I confirm that I initiated this payment. I understand the invoice remains pending until 2Nspira confirms receipt.</small></p><button className="portal-primary-button" onClick={reportSent} disabled={!canManage}>I have sent this payment</button></div> : <button className="portal-primary-button" onClick={pay} disabled={!canManage}>Authorize ${(invoice.balance + feeCents / 100).toFixed(2)} payment</button>}{message && <p role="status">{message}</p>}</article>;
}

function ManualInstructions({ method }: { method: "manual_ach" | "zelle" }) {
  const [text, setText] = useState<string | null>(null); const [loaded, setLoaded] = useState(false);
  async function load() { const response = await fetch(`/api/portal/payments/instructions/${method}`); const body = await response.json(); setText(body.instructions ?? body.message ?? "Instructions unavailable"); setLoaded(true); }
  return loaded ? <div className="portal-security-note"><strong>Secure instructions</strong><p>{text}</p></div> : <button className="portal-secondary-button" onClick={load}>Show secure {method === "zelle" ? "Zelle" : "bank transfer"} instructions</button>;
}
