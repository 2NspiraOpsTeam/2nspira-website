import { env } from "cloudflare:workers";
import { NextRequest, NextResponse } from "next/server";

const PORTAL_URL = env.PORTAL_URL || "http://localhost:3000";

export async function POST(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  const body = await request.json();

  try {
    const res = await fetch(`${PORTAL_URL}/api/admin/auth/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie: cookieHeader },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Portal unavailable" }, { status: 502 });
  }
}
