import type { PaymentType, SafePaymentMethod } from './models';

export interface CreateSetupRequest {
  customerId: string;
  type: PaymentType;
}

export interface CreateChargeRequest {
  customerId: string;
  paymentMethodId: string;
  type: PaymentType;
  amount: number;
  currency: 'usd';
  idempotencyKey: string;
  description: string;
  metadata: Record<string, string>;
}

export interface ProviderCharge {
  id: string;
  status: string;
  clientSecret?: string | null;
}

export interface PaymentProvider {
  readonly name: string;
  createCustomer(name: string, metadata?: Record<string, string>): Promise<{ id: string }>;
  createSetupIntent(request: CreateSetupRequest): Promise<{ id: string; clientSecret: string | null }>;
  retrieveSafePaymentMethod(customerId: string, paymentMethodId: string): Promise<SafePaymentMethod>;
  chargeSavedMethod(request: CreateChargeRequest): Promise<ProviderCharge>;
  verifyWebhook(payload: string, signature: string): Promise<ProviderWebhookEvent>;
}

export interface ProviderWebhookEvent {
  id: string;
  type: string;
  paymentId?: string;
  providerStatus?: string;
  failureReason?: string;
}
