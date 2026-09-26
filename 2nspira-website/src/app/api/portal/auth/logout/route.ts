import { NextRequest, NextResponse } from "next/server";

const PORTAL_URL = process.env.PORTAL_URL || "http://localhost:3000";

export async function POST(request: NextRequest) {
  try {
    const res = await fetch(`${PORTAL_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    const response = NextResponse.json({ ok: true });
    const setCookie = res.headers.get("set-cookie");
    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }

    return response;
  } catch {
    return NextResponse.json({ ok: true });
  }
}
