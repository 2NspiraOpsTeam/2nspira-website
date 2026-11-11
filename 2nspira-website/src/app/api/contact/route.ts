import { NextRequest, NextResponse } from "next/server";
import { deliverContact } from "@/lib/contactDelivery";

/** Owner notifications use the existing Gmail sender; no public recipient control. */
const CONTACT_EMAIL = "hello@2nspira.com";
const MAX_BODY = 8000;

function clean(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .trim()
    .slice(0, max);
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({ ok: false, error: "Invalid request origin" }, { status: 403 });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return NextResponse.json({ ok: false, error: "JSON required" }, { status: 415 });
  let payload: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 12000) return NextResponse.json({ ok: false, error: "Message too large" }, { status: 413 });
    payload = JSON.parse(raw) as Record<string, unknown>;
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("Invalid payload");
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 200);
  const organization = clean(payload.organization, 160);
  const message = clean(payload.message, MAX_BODY);
  const organizationType = clean(payload.organizationType, 80);
  const projectType = clean(payload.projectType, 100);
  const projectUrl = clean(payload.projectUrl, 500);
  const timeline = clean(payload.timeline, 160);
  const budget = clean(payload.budget, 160);
  if (projectUrl) {
    try { if (!["https:", "http:"].includes(new URL(projectUrl).protocol)) throw new Error(); }
    catch { return NextResponse.json({ ok: false, error: "Use a valid http or https project URL" }, { status: 422 }); }
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "name, email, and message are required" },
      { status: 422 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email address is required" },
      { status: 422 }
    );
  }

  const subject = `Website inquiry from ${name}${organization ? ` (${organization})` : ""}`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Organization: ${organization || "Not provided"}`,
    `Organization type: ${organizationType || "Not provided"}`,
    `Project type: ${projectType || "Not provided"}`,
    `Existing URL: ${projectUrl || "Not provided"}`,
    `Expected timeline: ${timeline || "Not provided"}`,
    `Budget range: ${budget || "Not provided"}`,
    "",
    message,
    "",
    `— Submitted via 2nspira.com on ${new Date().toISOString()}`,
  ].join("\n");

  try {
    const status = await deliverContact({ email, subject, body,
      fingerprint: JSON.stringify([name, email.toLowerCase(), organization, organizationType, message, projectType, projectUrl, timeline, budget]),
      ip: request.headers.get("cf-connecting-ip") || "local",
    });
    if (status === "delivered") return NextResponse.json({ ok: true, status });
    if (status === "unknown") return NextResponse.json({ ok: false, status }, { status: 202 });
    if (status === "limited") return NextResponse.json({ ok: false, error: "Too many messages. Please try later." }, { status: 429 });
  } catch {
    return NextResponse.json({ ok: false, status: "unknown" }, { status: 503 });
  }
  return NextResponse.json({ ok: false, status: "draft", to: CONTACT_EMAIL, subject, body });
}
