import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";

export function getDb() {
  if (!env.PORTAL_DB) throw new Error("PORTAL_DB binding is required");
  return drizzle(env.PORTAL_DB, { schema });
}

export type PortalDb = ReturnType<typeof getDb>;
