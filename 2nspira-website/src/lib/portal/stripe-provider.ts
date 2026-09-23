import Stripe from "stripe";

export type SafeStripeMethod = {
  id: string; type: "card" | "bank_account"; brand: string; lastFour: string;
  expirationMonth?: number; expirationYear?: number; accountType?: string; verificationStatus: string;
};

export class StripePaymentProvider {
  private readonly stripe: Stripe;
  private readonly isTestMode: boolean;
  constructor(secretKey: string, private readonly webhookSecret = "") {
    this.isTestMode = secretKey.startsWith("sk_test_");
    this.stripe = new Stripe(secretKey, { apiVersion: "2026-08-26.dahlia", httpClient: Stripe.createFetchHttpClient() });
  }
  async createCustomer(name: string, organizationId: string) {
    this.assertTestMode();
    return this.stripe.customers.create({ name, metadata: { organizationId } }, { idempotencyKey: `portal-customer:${organizationId}` });
  }
  async createSetupIntent(customerId: string, type: "card" | "bank_account") {
    this.assertTestMode();
    return this.stripe.setupIntents.create({ customer: customerId, payment_method_types: [type === "bank_account" ? "us_bank_account" : "card"], usage: "off_session" });
  }
  async retrieveSafeMethod(customerId: string, paymentMethodId: string): Promise<SafeStripeMethod> {
    this.assertTestMode();
    const method = await this.stripe.paymentMethods.retrieve(paymentMethodId);
    if ((typeof method.customer === "string" ? method.customer : method.customer?.id) !== customerId) throw new Error("Payment method is not attached to this organization");
    if (method.type === "card" && method.card) return { id: method.id, type: "card", brand: method.card.brand, lastFour: method.card.last4, expirationMonth: method.card.exp_month, expirationYear: method.card.exp_year, verificationStatus: "verified" };
    if (method.type === "us_bank_account" && method.us_bank_account) return { id: method.id, type: "bank_account", brand: method.us_bank_account.bank_name ?? "Bank account", lastFour: method.us_bank_account.last4 ?? "unknown", accountType: method.us_bank_account.account_type ?? undefined, verificationStatus: method.us_bank_account.status_details?.blocked?.network_code ? "failed" : "verified" };
    throw new Error("Unsupported payment method");
  }
  async createPaymentIntent(input: { customerId: string; paymentMethodId: string; type: "card" | "bank_account"; amountCents: number; idempotencyKey: string; description: string; metadata: Record<string, string> }) {
    this.assertTestMode();
    return this.stripe.paymentIntents.create({ customer: input.customerId, payment_method: input.paymentMethodId, payment_method_types: [input.type === "bank_account" ? "us_bank_account" : "card"], amount: input.amountCents, currency: "usd", confirm: true, off_session: true, description: input.description, metadata: input.metadata }, { idempotencyKey: input.idempotencyKey });
  }
  async verifyWebhook(rawBody: string, signature: string) {
    if (!this.webhookSecret) throw new Error("Stripe webhook signing secret is not configured");
    return this.stripe.webhooks.constructEventAsync(rawBody, signature, this.webhookSecret, undefined, Stripe.createSubtleCryptoProvider());
  }
  private assertTestMode() {
    if (!this.isTestMode) throw new Error("Stripe test-mode secret key required");
  }
}
