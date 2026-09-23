import { env } from "cloudflare:workers";
import { apiError, requireBillingRole, requirePortalApiContext } from "@/lib/portal/api-context";
import { getOrCreateStripeCustomer, stripeProvider } from "@/lib/portal/payments";

export async function POST(request: Request) {
  try {
    const context = await requirePortalApiContext(); requireBillingRole(context.role);
    const { type } = await request.json() as { type: "card" | "bank_account" };
    if (type !== "card" && type !== "bank_account") throw new Error("Unsupported payment method type");
    const customerId = await getOrCreateStripeCustomer(context.organization);
    const intent = await stripeProvider().createSetupIntent(customerId, type);
    return Response.json({ clientSecret: intent.client_secret, publishableKey: env.STRIPE_PUBLISHABLE_KEY });
  } catch (error) { return apiError(error); }
}
