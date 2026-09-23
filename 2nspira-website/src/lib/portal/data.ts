import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { getDb } from "./db";
import {
  billingAuthorizations,
  engagements,
  invoiceLineItems,
  invoices,
  paymentMethodReferences,
  payments,
  services,
} from "@/db/schema";

export async function getPortalData(organizationId: string) {
  const db = getDb();
  const [engagementRows, invoiceRows, paymentRows, paymentMethodRows, authorizationRows] = await Promise.all([
    db.select({ engagement: engagements, service: services }).from(engagements).innerJoin(services, eq(engagements.serviceId, services.id)).where(eq(engagements.organizationId, organizationId)).orderBy(asc(services.name)),
    db.select({ invoice: invoices, serviceName: services.name }).from(invoices).leftJoin(engagements, eq(invoices.engagementId, engagements.id)).leftJoin(services, eq(engagements.serviceId, services.id)).where(eq(invoices.organizationId, organizationId)).orderBy(desc(invoices.issueDate)),
    db.select({ payment: payments, method: paymentMethodReferences }).from(payments).leftJoin(paymentMethodReferences, and(eq(payments.paymentMethodReferenceId, paymentMethodReferences.id), eq(paymentMethodReferences.organizationId, organizationId))).where(eq(payments.organizationId, organizationId)).orderBy(desc(payments.paidAt)),
    db.select().from(paymentMethodReferences).where(and(eq(paymentMethodReferences.organizationId, organizationId), eq(paymentMethodReferences.status, "active"))).orderBy(desc(paymentMethodReferences.isDefault)),
    db.select().from(billingAuthorizations).where(and(eq(billingAuthorizations.organizationId, organizationId), eq(billingAuthorizations.active, true))).limit(1),
  ]);

  return {
    engagements: engagementRows,
    invoices: invoiceRows,
    payments: paymentRows,
    paymentMethods: paymentMethodRows,
    autopay: authorizationRows[0] ?? null,
  };
}

export async function getInvoiceForOrganization(organizationId: string, invoiceId: string) {
  const db = getDb();
  const rows = await db.select({ invoice: invoices, serviceName: services.name }).from(invoices).leftJoin(engagements, eq(invoices.engagementId, engagements.id)).leftJoin(services, eq(engagements.serviceId, services.id)).where(and(eq(invoices.id, invoiceId), eq(invoices.organizationId, organizationId))).limit(1);
  if (!rows[0]) return null;
  const [lines, invoicePayments] = await Promise.all([
    db.select().from(invoiceLineItems).where(eq(invoiceLineItems.invoiceId, invoiceId)),
    db.select().from(payments).where(and(eq(payments.organizationId, organizationId), eq(payments.invoiceId, invoiceId))),
  ]);
  return { ...rows[0], lines, payments: invoicePayments };
}

export async function getRelatedInvoices(organizationId: string, engagementIds: string[]) {
  if (!engagementIds.length) return [];
  return getDb().select().from(invoices).where(and(eq(invoices.organizationId, organizationId), inArray(invoices.engagementId, engagementIds)));
}
