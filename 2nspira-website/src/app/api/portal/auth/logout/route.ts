import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";

const PORTAL_URL = env.PORTAL_URL || "http://localhost:3000";

export async function POST(request: Request) {
  try {
    const res = await fetch(`${PORTAL_URL}/api/auth/logout`, {
      method: "POST",
      headers: { cookie: request.headers.get("cookie") || "" },
    });

    const response = NextResponse.json(await res.json(), { status: res.status });
    const setCookie = res.headers.get("set-cookie");
    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }

    return response;
  } catch {
    return NextResponse.json({ error: "Portal unavailable" }, { status: 502 });
  }
}
