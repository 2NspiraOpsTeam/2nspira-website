import { NextRequest, NextResponse } from "next/server";

const PORTAL_URL = process.env.PORTAL_URL || "http://localhost:3000";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const res = await fetch(`${PORTAL_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
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
