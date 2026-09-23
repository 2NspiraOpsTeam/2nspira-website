import { and, eq } from "drizzle-orm";
import { billingAuthorizations, billingSchedules, engagements, paymentMethodReferences, payments, stripeCustomers } from "@/db/schema";
import { getDb } from "@/lib/portal/db";
import { requirePaymentJob } from "@/lib/portal/internal-auth";
import { stripeProvider } from "@/lib/portal/payments";

export async function POST(request: Request, { params }: { params: Promise<{ scheduleId: string }> }) {
  try {
    requirePaymentJob(request); const { scheduleId } = await params; const db = getDb();
    const rows = await db.select({ schedule: billingSchedules, authorization: billingAuthorizations, method: paymentMethodReferences, customer: stripeCustomers, engagement: engagements })
      .from(billingSchedules).innerJoin(billingAuthorizations, and(eq(billingSchedules.authorizationId, billingAuthorizations.id), eq(billingSchedules.organizationId, billingAuthorizations.organizationId)))
      .innerJoin(paymentMethodReferences, and(eq(billingSchedules.paymentMethodReferenceId, paymentMethodReferences.id), eq(billingSchedules.organizationId, paymentMethodReferences.organizationId)))
      .innerJoin(stripeCustomers, eq(billingSchedules.organizationId, stripeCustomers.organizationId)).leftJoin(engagements, and(eq(billingSchedules.engagementId, engagements.id), eq(billingSchedules.organizationId, engagements.organizationId)))
      .where(eq(billingSchedules.id, scheduleId)).limit(1);
    const row = rows[0]; if (!row || row.schedule.status !== "active" || !row.authorization.active) throw new Error("Active authorized schedule not found");
    const idempotencyKey = `schedule:${row.schedule.id}:${row.schedule.nextChargeAt.slice(0, 10)}`; const existing = await db.select().from(payments).where(eq(payments.idempotencyKey, idempotencyKey)).limit(1); if (existing[0]) return Response.json({ payment: existing[0], duplicate: true });
    const id = `pay_${crypto.randomUUID()}`; const now = new Date().toISOString(); await db.insert(payments).values({ id, organizationId: row.schedule.organizationId, paymentMethodReferenceId: row.method.id, provider: "stripe", amount: row.schedule.amount, convenienceFee: row.schedule.convenienceFee, currency: "USD", status: "submitted", idempotencyKey, createdAt: now, updatedAt: now });
    const intent = await stripeProvider().createPaymentIntent({ customerId: row.customer.customerReference, paymentMethodId: row.method.providerReference, type: row.method.type, amountCents: Math.round((row.schedule.amount + row.schedule.convenienceFee) * 100), idempotencyKey, description: row.engagement?.id ? "Scheduled 2Nspira service payment" : "Scheduled 2Nspira payment", metadata: { organizationId: row.schedule.organizationId, scheduleId: row.schedule.id, portalPaymentId: id } });
    const status = intent.status === "succeeded" ? "settled" : intent.status === "processing" ? "processing" : "submitted"; await db.update(payments).set({ providerTransactionReference: intent.id, providerStatus: intent.status, status, updatedAt: new Date().toISOString() }).where(eq(payments.id, id));
    return Response.json({ paymentId: id, status, duplicate: false });
  } catch { return Response.json({ error: "Schedule execution failed" }, { status: 400 }); }
}
