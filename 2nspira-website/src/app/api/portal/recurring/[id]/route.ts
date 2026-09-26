import { NextRequest, NextResponse } from "next/server";

const PORTAL_URL = process.env.PORTAL_URL || "http://localhost:3000";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieHeader = request.headers.get("cookie") || "";

  try {
    const res = await fetch(`${PORTAL_URL}/api/recurring/${id}`, {
      method: "PUT",
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
