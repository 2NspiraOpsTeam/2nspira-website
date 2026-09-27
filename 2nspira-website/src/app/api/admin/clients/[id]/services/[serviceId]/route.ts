import { env } from "cloudflare:workers";
import { NextRequest, NextResponse } from "next/server";

const PORTAL_URL = env.PORTAL_URL || "http://localhost:3000";

type Params = { params: Promise<{ id: string; serviceId: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { id, serviceId } = await params;
  const cookieHeader = request.headers.get("cookie") || "";
  const body = await request.json();

  try {
    const res = await fetch(`${PORTAL_URL}/api/admin/clients/${id}/services/${serviceId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", cookie: cookieHeader },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Portal unavailable" }, { status: 502 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id, serviceId } = await params;
  const cookieHeader = _request.headers.get("cookie") || "";

  try {
    const res = await fetch(`${PORTAL_URL}/api/admin/clients/${id}/services/${serviceId}`, {
      method: "DELETE",
      headers: { cookie: cookieHeader },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Portal unavailable" }, { status: 502 });
  }
}
