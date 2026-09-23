import { and, eq } from "drizzle-orm";
import { auditEvents, invoices, manualPaymentAuditEvents, manualPayments } from "@/db/schema";
import { apiError, PortalApiError, requirePortalApiContext } from "@/lib/portal/api-context";
import { getDb } from "@/lib/portal/db";

export async function POST(request: Request, { params }: { params: Promise<{ paymentId: string }> }) {
  try {
    const context = await requirePortalApiContext();
    if (context.role !== "internal_admin") throw new PortalApiError(403, "Internal payment verification required");
    const { paymentId } = await params; const body = await request.json() as { action: "confirm" | "not_found" | "request_info"; note?: string };
    if (!["confirm", "not_found", "request_info"].includes(body.action)) throw new Error("Unsupported reconciliation action");
    if (body.action === "request_info" && !body.note?.trim()) throw new Error("A request note is required");
    const db = getDb(); const rows = await db.select().from(manualPayments).where(and(eq(manualPayments.id, paymentId), eq(manualPayments.organizationId, context.organization.id))).limit(1);
    const payment = rows[0]; if (!payment) throw new Error("Manual payment not found"); if (payment.state === "settled") throw new Error("Settled payment cannot be changed");
    const now = new Date().toISOString(); const state = body.action === "confirm" ? "settled" : body.action === "not_found" ? "payment_not_received" : "pending_verification";
    await db.update(manualPayments).set({ state, verifiedAt: body.action === "confirm" ? now : undefined, verifiedBy: body.action === "confirm" ? context.user.id : undefined, verificationNote: body.note?.trim().slice(0, 500), updatedAt: now }).where(and(eq(manualPayments.id, payment.id), eq(manualPayments.organizationId, context.organization.id)));
    if (body.action === "confirm") await db.update(invoices).set({ status: "paid", balance: 0 }).where(and(eq(invoices.id, payment.invoiceId), eq(invoices.organizationId, context.organization.id)));
    const action = body.action === "confirm" ? "CONFIRMED_RECEIVED" : body.action === "not_found" ? "PAYMENT_NOT_FOUND" : "REQUESTED_MORE_INFORMATION";
    await db.insert(manualPaymentAuditEvents).values({ id: `audit_${crypto.randomUUID()}`, organizationId: context.organization.id, manualPaymentId: payment.id, actorUserId: context.user.id, action, note: body.note?.trim().slice(0, 500), occurredAt: now });
    await db.insert(auditEvents).values({ id: `audit_${crypto.randomUUID()}`, organizationId: context.organization.id, actorUserId: context.user.id, action: `manual_payment.${body.action}`, entityType: "manual_payment", entityId: payment.id, occurredAt: now });
    return Response.json({ id: payment.id, state });
  } catch (error) { return apiError(error); }
}
