import { env } from "cloudflare:workers";
import { NextRequest, NextResponse } from "next/server";

const PORTAL_URL = env.PORTAL_URL || "http://localhost:3000";

export async function POST(request: NextRequest) {
  let body: { token?: unknown; password?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid activation request" }, { status: 400 }); }
  if (typeof body.token !== "string" || typeof body.password !== "string") {
    return NextResponse.json({ error: "Invalid activation request" }, { status: 400 });
  }
  try {
    const response = await fetch(`${PORTAL_URL}/api/auth/activate`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: body.token, password: body.password }),
    });
    return NextResponse.json(await response.json(), { status: response.status });
  } catch { return NextResponse.json({ error: "Portal unavailable" }, { status: 502 }); }
}
