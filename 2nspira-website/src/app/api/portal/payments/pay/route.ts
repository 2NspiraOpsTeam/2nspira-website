import { eq } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { payments, stripeCustomers } from "@/db/schema";
import { apiError, requireBillingRole, requirePortalApiContext } from "@/lib/portal/api-context";
import { getDb } from "@/lib/portal/db";
import { requireInvoice, requirePaymentMethod, stripeProvider } from "@/lib/portal/payments";
import { cardFeeCents, managedAchFeeCents } from "@/lib/portal/payment-domain";

export async function POST(request: Request) {
  try {
    const context = await requirePortalApiContext(); requireBillingRole(context.role);
    const body = await request.json() as { invoiceId: string; paymentMethodId: string; disclosedFeeCents?: number };
    const [invoice, method] = await Promise.all([requireInvoice(context.organization.id, body.invoiceId), requirePaymentMethod(context.organization.id, body.paymentMethodId)]);
    const fee = method.type === "bank_account" ? managedAchFeeCents(env.MANAGED_ACH_FEE_CENTS) : cardFeeCents(Math.round(invoice.balance * 100), env.CARD_FEE_BPS);
    if ((body.disclosedFeeCents ?? 0) !== fee) throw new Error("Payment fee disclosure is stale; refresh before authorizing");
    const customer = await getDb().select().from(stripeCustomers).where(eq(stripeCustomers.organizationId, context.organization.id)).limit(1);
    if (!customer[0]) throw new Error("Stripe customer not configured for this organization");
    const idempotencyKey = `invoice:${context.organization.id}:${invoice.id}:${method.id}:${invoice.balance}:${fee}`;
    const paymentId = `pay_${crypto.randomUUID()}`; const now = new Date().toISOString();
    await getDb().insert(payments).values({ id: paymentId, organizationId: context.organization.id, invoiceId: invoice.id, paymentMethodReferenceId: method.id, provider: "stripe", amount: invoice.balance, convenienceFee: fee / 100, currency: "USD", status: "submitted", idempotencyKey, createdAt: now, updatedAt: now }).onConflictDoNothing({ target: payments.idempotencyKey });
    const intent = await stripeProvider().createPaymentIntent({ customerId: customer[0].customerReference, paymentMethodId: method.providerReference, type: method.type, amountCents: Math.round(invoice.balance * 100) + fee, idempotencyKey, description: `Invoice ${invoice.invoiceNumber}`, metadata: { organizationId: context.organization.id, invoiceId: invoice.id, portalPaymentId: paymentId } });
    const normalized = intent.status === "succeeded" ? "settled" : intent.status === "processing" ? "processing" : "submitted";
    await getDb().update(payments).set({ providerTransactionReference: intent.id, providerStatus: intent.status, status: normalized, updatedAt: new Date().toISOString() }).where(eq(payments.id, paymentId));
    return Response.json({ paymentId, status: normalized, providerStatus: intent.status });
  } catch (error) { return apiError(error); }
}
