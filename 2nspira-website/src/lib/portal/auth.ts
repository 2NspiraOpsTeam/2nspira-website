import { env } from "cloudflare:workers";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "./db";
import * as schema from "@/db/schema";

export function getAuth() {
  const secret = env.BETTER_AUTH_SECRET ?? process.env.BETTER_AUTH_SECRET;
  if (!secret) throw new Error("BETTER_AUTH_SECRET is required");

  return betterAuth({
    appName: "2Nspira Client Portal",
    baseURL: (env.BETTER_AUTH_URL as string | undefined) ?? process.env.BETTER_AUTH_URL,
    basePath: "/api/auth",
    secret,
    database: drizzleAdapter(getDb(), {
      provider: "sqlite",
      schema: {
        user: schema.users,
        session: schema.sessions,
        account: schema.accounts,
        verification: schema.verifications,
      },
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      minPasswordLength: 10,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
      cookieCache: { enabled: true, maxAge: 60 * 5 },
    },
    trustedOrigins: [
      "https://2nspira.com",
      "https://www.2nspira.com",
      "https://2nspira-website-preview.jcortez-36a.workers.dev",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
  });
}
