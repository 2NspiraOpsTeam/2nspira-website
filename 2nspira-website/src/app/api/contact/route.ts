import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";

/**
 * Production inquiry delivery (release candidate, 2026-09-09).
 *
 * Delivery strategy (honest, fail-closed):
 * 1. If CONTACT_API_URL is set (Cloudflare Worker Secret, e.g. Resend/SES
 *    relay endpoint), the inquiry is POSTed there and the client receives a
 *    "delivered" confirmation.
 * 2. Otherwise (or if the relay fails) the route returns status "draft" with
 *    the composed subject/body so the client falls back to mailto:.
 *    The site never claims a message was sent when it was not.
 *
 * No secrets in the repo. Configure via `wrangler secret put CONTACT_API_URL`
 * (+ optional CONTACT_API_KEY). Inbox: hello@2nspira.com (Wix-published,
 * matches legal pages).
 */

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
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 200);
  const organization = clean(payload.organization, 160);
  const message = clean(payload.message, MAX_BODY);

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
    "",
    message,
    "",
    `— Submitted via 2nspira.com on ${new Date().toISOString()}`,
  ].join("\n");

  const relayUrl = env.CONTACT_API_URL as string | undefined;
  const relayKey = env.CONTACT_API_KEY as string | undefined;

  if (relayUrl) {
    try {
      const res = await fetch(relayUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(relayKey ? { Authorization: `Bearer ${relayKey}` } : {}),
        },
        body: JSON.stringify({
          to: CONTACT_EMAIL,
          from: email,
          replyTo: email,
          subject,
          text: body,
          source: "2nspira-website",
        }),
      });
      if (!res.ok) throw new Error(`relay responded ${res.status}`);
      return NextResponse.json({ ok: true, status: "delivered" });
    } catch {
      return NextResponse.json({
        ok: false,
        status: "draft",
        error: "Relay unavailable — draft fallback provided",
        to: CONTACT_EMAIL,
        subject,
        body,
      });
    }
  }

  return NextResponse.json({ ok: true, status: "draft", to: CONTACT_EMAIL, subject, body });
}
