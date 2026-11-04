import { env } from "cloudflare:workers";
import { Buffer } from "node:buffer";

interface Statement {
  bind(...values: unknown[]): Statement;
  first<T>(): Promise<T | null>;
  run(): Promise<{ meta: { changes: number } }>;
}
interface Config {
  CAREERS_DB?: { prepare(sql: string): Statement };
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  GOOGLE_REFRESH_TOKEN?: string;
}
const config = env as unknown as Config;
const recipient = "jcortez@2nspira.com";
const b64 = (value: string) => Buffer.from(value, "utf8").toString("base64");
const digest = async (value: string) => Buffer.from(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))).toString("hex");
export type DeliveryStatus = "delivered" | "unavailable" | "unknown" | "limited";

/** Fixed owner recipient; no visitor-selected recipients or persisted message bodies. */
export async function deliverContact(input: { email: string; subject: string; body: string; fingerprint: string; ip: string }): Promise<DeliveryStatus> {
  const db = config.CAREERS_DB;
  if (!db || !config.GOOGLE_CLIENT_ID || !config.GOOGLE_CLIENT_SECRET || !config.GOOGLE_REFRESH_TOKEN) return "unavailable";
  const now = Math.floor(Date.now() / 1000);
  const id = await digest(`${Math.floor(now / 86400)}:${input.fingerprint}`);
  const existing = await db.prepare("SELECT status FROM contact_delivery WHERE id=?").bind(id).first<{ status: string }>();
  if (existing?.status === "sent") return "delivered";
  if (existing && existing.status !== "failed") return "unknown";
  const rate = await digest(`${Math.floor(now / 3600)}:${input.ip}`);
  const limit = await db.prepare("INSERT INTO contact_rate_limits(id,count,expires) VALUES(?,1,?) ON CONFLICT(id) DO UPDATE SET count=count+1 WHERE count<5 RETURNING count").bind(rate, now + 3600).first<{ count: number }>();
  if (!limit) return "limited";
  await db.prepare("DELETE FROM contact_rate_limits WHERE expires<?").bind(now).run();
  await db.prepare("DELETE FROM contact_delivery WHERE created_at<?").bind(now - 7 * 86400).run();
  // Authorize before claiming a send. Authentication failure cannot have sent mail.
  let token: string;
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST", signal: AbortSignal.timeout(10000),
      body: new URLSearchParams({ client_id: config.GOOGLE_CLIENT_ID, client_secret: config.GOOGLE_CLIENT_SECRET, refresh_token: config.GOOGLE_REFRESH_TOKEN, grant_type: "refresh_token" }),
    });
    const data = await response.json() as { access_token?: string };
    if (!response.ok || !data.access_token) return "unavailable";
    token = data.access_token;
  } catch { return "unavailable"; }
  const claim = await db.prepare("INSERT INTO contact_delivery(id,status,created_at) VALUES(?,'sending',?) ON CONFLICT(id) DO UPDATE SET status='sending' WHERE status='failed'").bind(id, now).run();
  if (!claim.meta.changes) {
    const row = await db.prepare("SELECT status FROM contact_delivery WHERE id=?").bind(id).first<{ status: string }>();
    return row?.status === "sent" ? "delivered" : "unknown";
  }
  const mime = ["From: 2Nspira <engage@2nspira.com>", `To: ${recipient}`, `Reply-To: ${input.email}`, `Subject: =?UTF-8?B?${b64(input.subject)}?=`, `Message-ID: <contact-${id}@2nspira.com>`, "MIME-Version: 1.0", "Content-Type: text/plain; charset=UTF-8", "Content-Transfer-Encoding: base64", "", b64(input.body)].join("\r\n");
  try {
    const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", { method: "POST", signal: AbortSignal.timeout(15000), headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ raw: Buffer.from(mime, "utf8").toString("base64url") }) });
    if (!response.ok) {
      const knownFailure = [400, 401, 403, 429].includes(response.status);
      await db.prepare("UPDATE contact_delivery SET status=? WHERE id=?").bind(knownFailure ? "failed" : "unknown", id).run();
      return knownFailure ? "unavailable" : "unknown";
    }
    const data = await response.json() as { id?: string };
    if (!data.id) throw new Error("Unconfirmed delivery");
    await db.prepare("UPDATE contact_delivery SET status='sent',provider_id=? WHERE id=?").bind(data.id, id).run();
    return "delivered";
  } catch {
    await db.prepare("UPDATE contact_delivery SET status='unknown' WHERE id=?").bind(id).run().catch(() => {});
    return "unknown";
  }
}
