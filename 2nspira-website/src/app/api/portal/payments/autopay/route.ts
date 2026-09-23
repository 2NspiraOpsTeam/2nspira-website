import { and, eq } from "drizzle-orm";
import { auditEvents, billingAuthorizations, billingSchedules, engagements } from "@/db/schema";
import { apiError, requireBillingRole, requirePortalApiContext } from "@/lib/portal/api-context";
import { getDb } from "@/lib/portal/db";
import { requirePaymentMethod } from "@/lib/portal/payments";

export async function POST(request: Request) {
  try {
    const context = await requirePortalApiContext(); requireBillingRole(context.role);
    const body = await request.json() as { engagementId: string; paymentMethodId: string; frequency: "monthly" | "annual" | "specific"; nextChargeAt: string; amount: number; convenienceFee?: number; authorizationText: string; authorizationVersion: string };
    if (!body.authorizationText?.trim() || !body.authorizationVersion) throw new Error("Explicit autopay authorization is required");
    if (!Number.isFinite(body.amount) || body.amount <= 0 || !["monthly", "annual", "specific"].includes(body.frequency)) throw new Error("Invalid billing schedule");
    const db = getDb(); const engagement = await db.select().from(engagements).where(and(eq(engagements.id, body.engagementId), eq(engagements.organizationId, context.organization.id))).limit(1);
    if (!engagement[0]) throw new Error("Service engagement not found");
    const method = await requirePaymentMethod(context.organization.id, body.paymentMethodId); const now = new Date().toISOString(); const authId = `auth_${crypto.randomUUID()}`; const scheduleId = `sched_${crypto.randomUUID()}`;
    await db.insert(billingAuthorizations).values({ id: authId, organizationId: context.organization.id, paymentMethodReferenceId: method.id, billingRule: JSON.stringify({ amount: body.amount, fee: body.convenienceFee ?? 0, frequency: body.frequency, authorizationText: body.authorizationText, authorizationVersion: body.authorizationVersion }), active: true, authorizedAt: now, authorizedByUserId: context.user.id });
    await db.insert(billingSchedules).values({ id: scheduleId, organizationId: context.organization.id, engagementId: engagement[0].id, authorizationId: authId, paymentMethodReferenceId: method.id, frequency: body.frequency, amount: body.amount, convenienceFee: body.convenienceFee ?? 0, nextChargeAt: new Date(body.nextChargeAt).toISOString(), advanceNoticeDays: 3, status: "active", createdAt: now, updatedAt: now });
    await db.insert(auditEvents).values({ id: `audit_${crypto.randomUUID()}`, organizationId: context.organization.id, actorUserId: context.user.id, action: "autopay.enrolled", entityType: "billing_schedule", entityId: scheduleId, occurredAt: now });
    return Response.json({ scheduleId, status: "active", advanceNoticeDays: 3 });
  } catch (error) { return apiError(error); }
}

export async function DELETE(request: Request) {
  try {
    const context = await requirePortalApiContext(); requireBillingRole(context.role); const { scheduleId } = await request.json() as { scheduleId: string }; const db = getDb();
    const rows = await db.select().from(billingSchedules).where(and(eq(billingSchedules.id, scheduleId), eq(billingSchedules.organizationId, context.organization.id))).limit(1); if (!rows[0]) throw new Error("Billing schedule not found");
    const now = new Date().toISOString(); await db.update(billingSchedules).set({ status: "revoked", updatedAt: now }).where(and(eq(billingSchedules.id, scheduleId), eq(billingSchedules.organizationId, context.organization.id)));
    await db.update(billingAuthorizations).set({ active: false, revokedAt: now }).where(and(eq(billingAuthorizations.id, rows[0].authorizationId), eq(billingAuthorizations.organizationId, context.organization.id)));
    await db.insert(auditEvents).values({ id: `audit_${crypto.randomUUID()}`, organizationId: context.organization.id, actorUserId: context.user.id, action: "autopay.revoked", entityType: "billing_schedule", entityId: scheduleId, occurredAt: now });
    return Response.json({ scheduleId, status: "revoked" });
  } catch (error) { return apiError(error); }
}
