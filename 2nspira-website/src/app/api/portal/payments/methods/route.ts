import { and, eq } from "drizzle-orm";
import { paymentMethodReferences, stripeCustomers } from "@/db/schema";
import { apiError, requireBillingRole, requirePortalApiContext } from "@/lib/portal/api-context";
import { getDb } from "@/lib/portal/db";
import { stripeProvider } from "@/lib/portal/payments";

export async function POST(request: Request) {
  try {
    const context = await requirePortalApiContext(); requireBillingRole(context.role);
    const { paymentMethodId } = await request.json() as { paymentMethodId: string };
    const db = getDb();
    const customer = await db.select().from(stripeCustomers).where(eq(stripeCustomers.organizationId, context.organization.id)).limit(1);
    if (!customer[0]) throw new Error("Stripe customer not configured for this organization");
    const method = await stripeProvider().retrieveSafeMethod(customer[0].customerReference, paymentMethodId);
    const existing = await db.select().from(paymentMethodReferences).where(and(eq(paymentMethodReferences.organizationId, context.organization.id), eq(paymentMethodReferences.providerReference, method.id))).limit(1);
    const id = existing[0]?.id ?? `pm_${crypto.randomUUID()}`;
    if (!existing[0]) await db.insert(paymentMethodReferences).values({ id, organizationId: context.organization.id, provider: "stripe", providerReference: method.id, type: method.type, brand: method.brand, lastFour: method.lastFour, expirationMonth: method.expirationMonth, expirationYear: method.expirationYear, accountType: method.accountType, verificationStatus: method.verificationStatus, isDefault: false, status: "active", createdAt: new Date().toISOString() });
    return Response.json({ id, type: method.type, brand: method.brand, lastFour: method.lastFour, expirationMonth: method.expirationMonth, expirationYear: method.expirationYear, accountType: method.accountType });
  } catch (error) { return apiError(error); }
}
