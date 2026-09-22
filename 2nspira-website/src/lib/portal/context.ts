import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { getAuth } from "./auth";
import { getDb } from "./db";
import { memberships, organizations } from "@/db/schema";

export type PortalRole = "account_owner" | "billing_admin" | "standard_user" | "internal_admin";

export async function getPortalContext() {
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/account/sign-in");

  const db = getDb();
  const rows = await db
    .select({
      organization: organizations,
      role: memberships.role,
    })
    .from(memberships)
    .innerJoin(organizations, eq(memberships.organizationId, organizations.id))
    .where(and(eq(memberships.userId, session.user.id)))
    .limit(1);

  if (!rows[0]) redirect("/account/no-access");
  return { user: session.user, organization: rows[0].organization, role: rows[0].role as PortalRole };
}

export function canManageBilling(role: PortalRole) {
  return role === "account_owner" || role === "billing_admin" || role === "internal_admin";
}
