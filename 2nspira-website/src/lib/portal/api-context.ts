import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";
import { getAuth } from "./auth";
import { getDb } from "./db";
import { memberships, organizations } from "@/db/schema";
import type { PortalRole } from "./context";

export async function requirePortalApiContext() {
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session?.user) throw new PortalApiError(401, "Authentication required");
  const rows = await getDb().select({ organization: organizations, role: memberships.role })
    .from(memberships).innerJoin(organizations, eq(memberships.organizationId, organizations.id))
    .where(and(eq(memberships.userId, session.user.id))).limit(1);
  if (!rows[0]) throw new PortalApiError(403, "Organization access required");
  return { user: session.user, organization: rows[0].organization, role: rows[0].role as PortalRole };
}

export function requireBillingRole(role: PortalRole) {
  if (!(["account_owner", "billing_admin", "internal_admin"] as PortalRole[]).includes(role)) {
    throw new PortalApiError(403, "Billing administrator access required");
  }
}

export class PortalApiError extends Error {
  constructor(readonly status: number, message: string) { super(message); }
}

export function apiError(error: unknown) {
  const status = error instanceof PortalApiError ? error.status : 400;
  const message = error instanceof Error ? error.message.replace(/sk_(test|live)_[A-Za-z0-9]+/g, "[redacted]") : "Request failed";
  return Response.json({ error: message }, { status });
}
