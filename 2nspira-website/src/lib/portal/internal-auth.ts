import { env } from "cloudflare:workers";

export function requirePaymentJob(request: Request) {
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  const expected = String(env.PAYMENT_JOB_SECRET ?? "");
  if (!expected || supplied.length !== expected.length) throw new Error("Payment job authorization required");
  let difference = 0; for (let index = 0; index < supplied.length; index++) difference |= supplied.charCodeAt(index) ^ expected.charCodeAt(index);
  if (difference !== 0) throw new Error("Payment job authorization required");
}
