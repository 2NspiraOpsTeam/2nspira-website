export type PaymentMethodToken = {
  provider: string;
  reference: string;
  type: "card" | "bank_account";
  brand: string;
  lastFour: string;
};

export type ChargeRequest = {
  organizationId: string;
  invoiceId: string;
  paymentMethodReference: string;
  amount: number;
  currency: string;
  idempotencyKey: string;
};

export interface PaymentProvider {
  createPaymentMethod(input: unknown): Promise<PaymentMethodToken>;
  listPaymentMethods(customerReference: string): Promise<PaymentMethodToken[]>;
  chargePaymentMethod(request: ChargeRequest): Promise<{ transactionReference: string; status: string }>;
  createAchAuthorization(input: unknown): Promise<{ authorizationReference: string }>;
  setDefaultPaymentMethod(customerReference: string, paymentMethodReference: string): Promise<void>;
  removePaymentMethod(customerReference: string, paymentMethodReference: string): Promise<void>;
  retrieveTransaction(transactionReference: string): Promise<unknown>;
  processWebhook(request: Request): Promise<void>;
}

export class UnconfiguredPaymentProvider implements PaymentProvider {
  private unavailable(): never {
    throw new Error("Live payment processing is not configured for Portal V1");
  }
  async createPaymentMethod(): Promise<PaymentMethodToken> { return this.unavailable(); }
  async listPaymentMethods(): Promise<PaymentMethodToken[]> { return this.unavailable(); }
  async chargePaymentMethod(): Promise<{ transactionReference: string; status: string }> { return this.unavailable(); }
  async createAchAuthorization(): Promise<{ authorizationReference: string }> { return this.unavailable(); }
  async setDefaultPaymentMethod(): Promise<void> { return this.unavailable(); }
  async removePaymentMethod(): Promise<void> { return this.unavailable(); }
  async retrieveTransaction(): Promise<unknown> { return this.unavailable(); }
  async processWebhook(): Promise<void> { return this.unavailable(); }
}
