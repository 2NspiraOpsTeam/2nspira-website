import { and, eq } from "drizzle-orm";
import { auditEvents, manualPaymentAuditEvents, manualPayments } from "@/db/schema";
import { apiError, requirePortalApiContext } from "@/lib/portal/api-context";
import { getDb } from "@/lib/portal/db";
import { requireInvoice } from "@/lib/portal/payments";

const ACK = "I confirm that I initiated this payment. I understand the invoice remains pending until 2Nspira confirms receipt.";
export async function POST(request: Request) {
  try {
    const context = await requirePortalApiContext();
    const body = await request.json() as { invoiceId: string; method: "manual_ach" | "zelle"; acknowledgmentAccepted: boolean; referenceNumber?: string; note?: string };
    if (!body.acknowledgmentAccepted) throw new Error("Payment-sent acknowledgment is required");
    if (body.method !== "manual_ach" && body.method !== "zelle") throw new Error("Unsupported manual payment method");
    const invoice = await requireInvoice(context.organization.id, body.invoiceId); const db = getDb();
    const existing = await db.select().from(manualPayments).where(and(eq(manualPayments.organizationId, context.organization.id), eq(manualPayments.invoiceId, invoice.id), eq(manualPayments.method, body.method))).limit(1);
    if (existing[0]) return Response.json({ payment: existing[0], duplicate: true });
    const now = new Date().toISOString(); const id = `manual_${crypto.randomUUID()}`;
    await db.insert(manualPayments).values({ id, organizationId: context.organization.id, invoiceId: invoice.id, method: body.method, expectedAmount: invoice.balance, state: "pending_verification", clientReportedAt: now, clientUserId: context.user.id, acknowledgmentVersion: "v1.0", acknowledgmentText: ACK, referenceNumber: body.referenceNumber?.trim().slice(0, 100), clientNote: body.note?.trim().slice(0, 500), createdAt: now, updatedAt: now });
    await db.insert(manualPaymentAuditEvents).values({ id: `audit_${crypto.randomUUID()}`, organizationId: context.organization.id, manualPaymentId: id, actorUserId: context.user.id, action: "CLIENT_REPORTED_SENT", occurredAt: now });
    await db.insert(auditEvents).values({ id: `audit_${crypto.randomUUID()}`, organizationId: context.organization.id, actorUserId: context.user.id, action: "manual_payment.reported", entityType: "manual_payment", entityId: id, metadataJson: JSON.stringify({ method: body.method, invoiceId: invoice.id }), occurredAt: now });
    return Response.json({ payment: { id, state: "pending_verification" }, duplicate: false });
  } catch (error) { return apiError(error); }
}
