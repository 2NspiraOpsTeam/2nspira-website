import { env } from "cloudflare:workers";
import { NextRequest, NextResponse } from "next/server";

const PORTAL_URL = env.PORTAL_URL || "http://localhost:3000";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const res = await fetch(`${PORTAL_URL}/api/admin/clients/${encodeURIComponent(id)}/service-notification`, {
      method: "POST", headers: { cookie: request.headers.get("cookie") || "" },
    });
    return NextResponse.json(await res.json(), { status: res.status });
  } catch {
    return NextResponse.json({ error: "Portal unavailable" }, { status: 502 });
  }
}
