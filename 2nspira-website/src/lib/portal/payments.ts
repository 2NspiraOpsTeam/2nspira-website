import { env } from "cloudflare:workers";
import { and, eq } from "drizzle-orm";
import { getDb } from "./db";
import { invoices, paymentMethodReferences, stripeCustomers } from "@/db/schema";
import { StripePaymentProvider } from "./stripe-provider";

export function stripeProvider() {
  return new StripePaymentProvider(String(env.STRIPE_SECRET_KEY ?? ""), String(env.STRIPE_WEBHOOK_SECRET ?? ""));
}

export async function getOrCreateStripeCustomer(organization: { id: string; name: string }) {
  const db = getDb();
  const existing = await db.select().from(stripeCustomers).where(eq(stripeCustomers.organizationId, organization.id)).limit(1);
  if (existing[0]) return existing[0].customerReference;
  const customer = await stripeProvider().createCustomer(organization.name, organization.id);
  await db.insert(stripeCustomers).values({ organizationId: organization.id, customerReference: customer.id, createdAt: new Date().toISOString() });
  return customer.id;
}

export async function requireInvoice(organizationId: string, invoiceId: string) {
  const row = await getDb().select().from(invoices).where(and(eq(invoices.organizationId, organizationId), eq(invoices.id, invoiceId))).limit(1);
  if (!row[0]) throw new Error("Invoice not found");
  return row[0];
}

export async function requirePaymentMethod(organizationId: string, methodId: string) {
  const row = await getDb().select().from(paymentMethodReferences).where(and(eq(paymentMethodReferences.organizationId, organizationId), eq(paymentMethodReferences.id, methodId), eq(paymentMethodReferences.status, "active"))).limit(1);
  if (!row[0]) throw new Error("Payment method not found");
  return row[0];
}
