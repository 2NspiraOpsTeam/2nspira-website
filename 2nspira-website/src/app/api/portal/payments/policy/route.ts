import { env } from "cloudflare:workers";
import { apiError, requirePortalApiContext } from "@/lib/portal/api-context";
import { managedAchFeeCents } from "@/lib/portal/payment-domain";

export async function GET() {
  try {
    await requirePortalApiContext();
    return Response.json({ managedAchFeeCents: managedAchFeeCents(env.MANAGED_ACH_FEE_CENTS), cardFeeBasisPoints: Number(env.CARD_FEE_BPS ?? 0) });
  } catch (error) { return apiError(error); }
}
