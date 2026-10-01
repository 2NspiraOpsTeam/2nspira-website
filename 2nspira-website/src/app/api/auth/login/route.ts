import { env } from "cloudflare:workers";
import { NextRequest, NextResponse } from "next/server";

const PORTAL_URL = env.PORTAL_URL || "http://localhost:3000";

/**
 * Unified login entry point for 2nspira.com.
 *
 * The client-portal-v1 worker remains the source of truth for credentials and
 * sessions. This route:
 *   1. Tries admin auth (worker `admins` table) first.
 *   2. Falls back to client auth (worker `users` table) if admin auth is not a match.
 *   3. Re-sets the worker's session cookie on the 2nspira.com domain.
 *      Cookie names differ (`admin_session` vs `client_portal_session`),
 *      so both session types can coexist without collision.
 *   4. Returns the authenticated role so the client routes to the correct
 *      dashboard (/admin/dashboard or /portal/dashboard).
 *
 * No credentials are stored locally; no hard-coded email routing.
 */
export async function POST(request: NextRequest) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid credentials" },
      { status: 400 },
    );
  }

  const email = typeof body.email === "string" ? body.email : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json(
      { ok: false, error: "Invalid credentials" },
      { status: 401 },
    );
  }

  const payload = JSON.stringify({ email, password });

  // 1) Admin auth
  let adminRes: Response | null = null;
  try {
    adminRes = await fetch(`${PORTAL_URL}/api/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });
  } catch {
    adminRes = null;
  }

  if (adminRes && adminRes.ok) {
    const data = (await adminRes.json().catch(() => ({}))) as {
      admin?: Record<string, unknown>;
    };
    const response = NextResponse.json(
      { ok: true, role: "admin", redirect: "/admin/dashboard", admin: data.admin },
      { status: 200 },
    );
    const setCookie = adminRes.headers.get("set-cookie");
    if (!setCookie) return NextResponse.json({ error: "Portal unavailable" }, { status: 502 });
    response.headers.set("set-cookie", setCookie);
    return response;
  }

  if (!adminRes || adminRes.status !== 401) {
    return NextResponse.json({ error: "Portal unavailable" }, { status: 502 });
  }

  // 2) Client auth
  let clientRes: Response;
  try {
    clientRes = await fetch(`${PORTAL_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Portal unavailable" },
      { status: 502 },
    );
  }

  const data = (await clientRes.json().catch(() => ({}))) as {
    error?: string;
    client?: Record<string, unknown>;
  };

  if (clientRes.ok) {
    const response = NextResponse.json(
      { ok: true, role: "client", redirect: "/portal/dashboard", client: data.client },
      { status: 200 },
    );
    const setCookie = clientRes.headers.get("set-cookie");
    if (!setCookie) return NextResponse.json({ error: "Portal unavailable" }, { status: 502 });
    response.headers.set("set-cookie", setCookie);
    return response;
  }

  if (clientRes.status >= 500) {
    return NextResponse.json({ error: "Portal unavailable" }, { status: 502 });
  }

  // Surface worker-level errors (e.g. deactivated account) without leaking
  // which table the credential was checked against.
  return NextResponse.json(
    { ok: false, error: data.error || "Invalid credentials" },
    { status: clientRes.status === 403 ? 403 : 401 },
  );
}
