import { integer, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
}, (table) => [uniqueIndex("account_provider_unique").on(table.providerId, table.accountId)]);

export const verifications = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

export const organizations = sqliteTable("organization", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  legalName: text("legal_name"),
  demo: integer("demo", { mode: "boolean" }).notNull().default(false),
  billingEmail: text("billing_email").notNull(),
  phone: text("phone"),
  address: text("address"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const memberships = sqliteTable("organization_membership", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: text("role", { enum: ["account_owner", "billing_admin", "standard_user", "internal_admin"] }).notNull(),
  createdAt: text("created_at").notNull(),
}, (table) => [uniqueIndex("membership_org_user_unique").on(table.organizationId, table.userId)]);

export const services = sqliteTable("service", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
});

export const engagements = sqliteTable("engagement", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id").notNull().references(() => organizations.id),
  serviceId: text("service_id").notNull().references(() => services.id),
  status: text("status", { enum: ["active", "completed", "paused"] }).notNull(),
  billingType: text("billing_type", { enum: ["recurring", "hourly", "fixed_project"] }).notNull(),
  billingFrequency: text("billing_frequency"),
  amount: real("amount"),
  currency: text("currency").notNull().default("USD"),
  startDate: text("start_date").notNull(),
  renewalDate: text("renewal_date"),
  nextBillingDate: text("next_billing_date"),
});

export const invoices = sqliteTable("invoice", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id").notNull().references(() => organizations.id),
  engagementId: text("engagement_id").references(() => engagements.id),
  invoiceNumber: text("invoice_number").notNull().unique(),
  issueDate: text("issue_date").notNull(),
  dueDate: text("due_date").notNull(),
  status: text("status", { enum: ["paid", "due", "overdue", "draft", "voided"] }).notNull(),
  subtotal: real("subtotal").notNull(),
  tax: real("tax").notNull().default(0),
  total: real("total").notNull(),
  balance: real("balance").notNull(),
  currency: text("currency").notNull().default("USD"),
});

export const invoiceLineItems = sqliteTable("invoice_line_item", {
  id: text("id").primaryKey(),
  invoiceId: text("invoice_id").notNull().references(() => invoices.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  quantity: real("quantity").notNull(),
  unitPrice: real("unit_price").notNull(),
  amount: real("amount").notNull(),
});

export const paymentMethodReferences = sqliteTable("payment_method_reference", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id").notNull().references(() => organizations.id),
  provider: text("provider").notNull(),
  providerReference: text("provider_reference").notNull(),
  type: text("type", { enum: ["card", "bank_account"] }).notNull(),
  brand: text("brand").notNull(),
  lastFour: text("last_four").notNull(),
  expirationMonth: integer("expiration_month"),
  expirationYear: integer("expiration_year"),
  isDefault: integer("is_default", { mode: "boolean" }).notNull().default(false),
  status: text("status", { enum: ["active", "expired", "removed"] }).notNull(),
  createdAt: text("created_at").notNull(),
});

export const payments = sqliteTable("payment", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id").notNull().references(() => organizations.id),
  invoiceId: text("invoice_id").references(() => invoices.id),
  paymentMethodReferenceId: text("payment_method_reference_id").references(() => paymentMethodReferences.id),
  provider: text("provider").notNull(),
  providerTransactionReference: text("provider_transaction_reference"),
  amount: real("amount").notNull(),
  currency: text("currency").notNull().default("USD"),
  status: text("status", { enum: ["scheduled", "processing", "succeeded", "failed", "refunded"] }).notNull(),
  paidAt: text("paid_at"),
});

export const billingAuthorizations = sqliteTable("billing_authorization", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id").notNull().references(() => organizations.id),
  paymentMethodReferenceId: text("payment_method_reference_id").notNull().references(() => paymentMethodReferences.id),
  billingRule: text("billing_rule").notNull(),
  active: integer("active", { mode: "boolean" }).notNull().default(false),
  authorizedAt: text("authorized_at").notNull(),
  authorizedByUserId: text("authorized_by_user_id").notNull().references(() => users.id),
  revokedAt: text("revoked_at"),
});

export const auditEvents = sqliteTable("audit_event", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id").notNull().references(() => organizations.id),
  actorUserId: text("actor_user_id").references(() => users.id),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id"),
  metadataJson: text("metadata_json"),
  occurredAt: text("occurred_at").notNull(),
});
