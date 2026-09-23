import { env } from "cloudflare:workers";
import { and, eq } from "drizzle-orm";
import type Stripe from "stripe";
import { billingSchedules, invoices, payments, stripeWebhookEvents } from "@/db/schema";
import { getDb } from "@/lib/portal/db";
import { StripePaymentProvider } from "@/lib/portal/stripe-provider";
import { normalizedStripeState } from "@/lib/portal/payment-domain";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) return Response.json({ error: "Missing Stripe signature" }, { status: 400 });
  const rawBody = await request.text();
  try {
    const provider = new StripePaymentProvider(String(env.STRIPE_SECRET_KEY ?? ""), String(env.STRIPE_WEBHOOK_SECRET ?? ""));
    const event = await provider.verifyWebhook(rawBody, signature); const db = getDb();
    const prior = await db.select().from(stripeWebhookEvents).where(eq(stripeWebhookEvents.id, event.id)).limit(1);
    if (prior[0]) return Response.json({ received: true, duplicate: true });
    await db.insert(stripeWebhookEvents).values({ id: event.id, eventType: event.type, processedAt: new Date().toISOString() });
    const object = event.data.object as Stripe.PaymentIntent;
    if (object.object !== "payment_intent") return Response.json({ received: true, updated: false });
    const organizationId = object.metadata.organizationId; const invoiceId = object.metadata.invoiceId;
    if (!organizationId) return Response.json({ received: true, updated: false });
    const rows = await db.select().from(payments).where(and(eq(payments.organizationId, organizationId), eq(payments.providerTransactionReference, object.id))).limit(1);
    if (!rows[0]) return Response.json({ received: true, updated: false });
    const status = normalizedStripeState(event.type, rows[0].status, object.last_payment_error?.message ?? "");
    await db.update(payments).set({ status, providerStatus: event.type, failureReason: object.last_payment_error?.message?.slice(0, 500), paidAt: status === "settled" ? new Date().toISOString() : rows[0].paidAt, updatedAt: new Date().toISOString() }).where(and(eq(payments.id, rows[0].id), eq(payments.organizationId, organizationId)));
    if (status === "settled" && invoiceId) await db.update(invoices).set({ status: "paid", balance: 0 }).where(and(eq(invoices.id, invoiceId), eq(invoices.organizationId, organizationId)));
    if (status === "settled" && object.metadata.scheduleId) {
      const schedules = await db.select().from(billingSchedules).where(and(eq(billingSchedules.id, object.metadata.scheduleId), eq(billingSchedules.organizationId, organizationId))).limit(1);
      const schedule = schedules[0]; if (schedule) { const next = new Date(schedule.nextChargeAt); if (schedule.frequency === "monthly") next.setUTCMonth(next.getUTCMonth() + 1); if (schedule.frequency === "annual") next.setUTCFullYear(next.getUTCFullYear() + 1); await db.update(billingSchedules).set({ status: schedule.frequency === "specific" ? "completed" : schedule.status, nextChargeAt: next.toISOString(), updatedAt: new Date().toISOString() }).where(and(eq(billingSchedules.id, schedule.id), eq(billingSchedules.organizationId, organizationId))); }
    }
    return Response.json({ received: true, updated: true, status });
  } catch { return Response.json({ error: "Stripe webhook verification or persistence failed" }, { status: 400 }); }
}
