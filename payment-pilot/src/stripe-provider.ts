import Stripe from 'stripe';
import type { SafePaymentMethod } from './models';
import type { CreateChargeRequest, CreateSetupRequest, PaymentProvider, ProviderWebhookEvent } from './payment-provider';

export class StripePaymentProvider implements PaymentProvider {
  readonly name = 'stripe';
  private readonly stripe: Stripe;
  private readonly isTestMode: boolean;

  constructor(secretKey: string, private readonly webhookSecret: string) {
    this.isTestMode = secretKey.startsWith('sk_test_');
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2026-08-26.dahlia',
      httpClient: Stripe.createFetchHttpClient(),
    });
  }

  async createCustomer(name: string, metadata: Record<string, string> = {}) {
    this.assertTestMode();
    const customer = await this.stripe.customers.create({ name, metadata });
    return { id: customer.id };
  }

  async createSetupIntent({ customerId, type }: CreateSetupRequest) {
    this.assertTestMode();
    const intent = await this.stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: [type === 'ach' ? 'us_bank_account' : 'card'],
      usage: 'off_session',
    });
    return { id: intent.id, clientSecret: intent.client_secret };
  }

  async retrieveSafePaymentMethod(customerId: string, paymentMethodId: string): Promise<SafePaymentMethod> {
    this.assertTestMode();
    const method = await this.stripe.paymentMethods.retrieve(paymentMethodId);
    if (method.customer !== customerId) throw new Error('Payment method is not attached to this customer');
    if (method.type !== 'card' && method.type !== 'us_bank_account') throw new Error('Unsupported payment method');

    return method.type === 'card'
      ? {
          provider: 'stripe', customerId, paymentMethodId: method.id, type: 'card',
          brand: method.card?.brand, last4: method.card?.last4 ?? 'unknown',
          expiryMonth: method.card?.exp_month, expiryYear: method.card?.exp_year,
          verificationStatus: 'verified', createdAt: new Date(method.created * 1000).toISOString(),
        }
      : {
          provider: 'stripe', customerId, paymentMethodId: method.id, type: 'ach',
          bankName: method.us_bank_account?.bank_name ?? undefined,
          accountType: method.us_bank_account?.account_type ?? undefined,
          last4: method.us_bank_account?.last4 ?? 'unknown',
          verificationStatus: 'verified',
          createdAt: new Date(method.created * 1000).toISOString(),
        };
  }

  async chargeSavedMethod(request: CreateChargeRequest) {
    this.assertTestMode();
    const methodType = request.type === 'ach' ? 'us_bank_account' : 'card';
    const intent = await this.stripe.paymentIntents.create({
      amount: request.amount,
      currency: request.currency,
      customer: request.customerId,
      payment_method: request.paymentMethodId,
      payment_method_types: [methodType],
      confirm: true,
      off_session: true,
      description: request.description,
      metadata: request.metadata,
    }, { idempotencyKey: request.idempotencyKey });
    return { id: intent.id, status: intent.status, clientSecret: intent.client_secret };
  }

  async verifyWebhook(payload: string, signature: string): Promise<ProviderWebhookEvent> {
    if (!this.webhookSecret) throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
    const event = await this.stripe.webhooks.constructEventAsync(
      payload,
      signature,
      this.webhookSecret,
      undefined,
      Stripe.createSubtleCryptoProvider(),
    );
    const object = event.data.object as Stripe.PaymentIntent | Stripe.Charge | Stripe.PaymentMethod;
    const paymentId = object.object === 'payment_intent'
      ? object.id
      : object.object === 'charge'
        ? (typeof object.payment_intent === 'string' ? object.payment_intent : object.payment_intent?.id)
        : undefined;
    const failureReason = object.object === 'payment_intent'
      ? object.last_payment_error?.message ?? undefined
      : object.object === 'charge'
        ? object.failure_message ?? undefined
        : undefined;
    return { id: event.id, type: event.type, paymentId, providerStatus: object.object, failureReason };
  }

  private assertTestMode() {
    if (!this.isTestMode) throw new Error('Stripe test-mode secret key required for API operations');
  }
}
