import { NextRequest, NextResponse } from "next/server";

const PORTAL_URL = process.env.PORTAL_URL || "http://localhost:3000";

export async function GET(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";

  try {
    const res = await fetch(`${PORTAL_URL}/api/payment-methods`, {
      headers: { cookie: cookieHeader },
      credentials: "include",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Portal unavailable" }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";

  try {
    const res = await fetch(`${PORTAL_URL}/api/payment-methods`, {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie: cookieHeader },
      credentials: "include",
      body: await request.text(),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Portal unavailable" }, { status: 502 });
  }
}
