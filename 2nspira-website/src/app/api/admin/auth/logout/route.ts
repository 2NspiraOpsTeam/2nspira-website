import { env } from "cloudflare:workers";
import { NextRequest, NextResponse } from "next/server";

const PORTAL_URL = env.PORTAL_URL || "http://localhost:3000";

export async function POST(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";

  try {
    const res = await fetch(`${PORTAL_URL}/api/admin/auth/logout`, {
      method: "POST",
      headers: { cookie: cookieHeader },
    });

    const data = await res.json();
    const response = NextResponse.json(data, { status: res.status });

    const setCookie = res.headers.get("set-cookie");
    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }

    return response;
  } catch {
    return NextResponse.json({ error: "Portal unavailable" }, { status: 502 });
  }
}
