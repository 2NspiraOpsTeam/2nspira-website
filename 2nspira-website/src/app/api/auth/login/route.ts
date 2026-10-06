import { env } from "cloudflare:workers";
import { NextRequest, NextResponse } from "next/server";

const PORTAL_URL = env.PORTAL_URL || "http://localhost:3000";

export async function POST(request: NextRequest) {
  let credentials: { email?: unknown; password?: unknown };
  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  if (typeof credentials.email !== "string" || typeof credentials.password !== "string") {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  let backend: Response;
  try {
    backend = await fetch(`${PORTAL_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: credentials.email.trim(), password: credentials.password }),
    });
  } catch {
    return NextResponse.json({ error: "Portal unavailable" }, { status: 502 });
  }
  if (!backend.ok) {
    return NextResponse.json(
      { error: backend.status === 401 ? "Invalid credentials" : "Portal unavailable" },
      { status: backend.status === 401 ? 401 : 502 },
    );
  }
  const cookie = backend.headers.get("set-cookie");
  if (!cookie) return NextResponse.json({ error: "Portal unavailable" }, { status: 502 });
  const data = (await backend.json()) as { role?: string };
  if (data.role !== "client" && data.role !== "admin") {
    return NextResponse.json({ error: "Portal unavailable" }, { status: 502 });
  }
  const response = NextResponse.json({
    ok: true,
    role: data.role,
    redirect: data.role === "admin" ? "/admin/dashboard" : "/portal/dashboard",
  });
  response.headers.set("set-cookie", cookie);
  return response;
}
