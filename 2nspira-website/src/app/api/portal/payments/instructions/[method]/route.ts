import { env } from "cloudflare:workers";
import { apiError, requirePortalApiContext } from "@/lib/portal/api-context";

export async function GET(_: Request, { params }: { params: Promise<{ method: string }> }) {
  try {
    await requirePortalApiContext(); const { method } = await params;
    if (method !== "manual_ach" && method !== "zelle") throw new Error("Unsupported manual payment method");
    const instructions = method === "manual_ach" ? env.MANUAL_ACH_INSTRUCTIONS : env.ZELLE_INSTRUCTIONS;
    return Response.json({ method, available: Boolean(instructions), instructions: instructions || null, message: instructions ? null : "Approved payment instructions are not configured for this environment." });
  } catch (error) { return apiError(error); }
}
