export type PaymentType = 'card' | 'ach';
export type Frequency = 'monthly' | 'annual' | 'specific';
export type PaymentState =
  | 'SCHEDULED' | 'NOTIFIED' | 'AUTHORIZED' | 'SUBMITTED'
  | 'PROCESSING' | 'SETTLED' | 'FAILED' | 'RETURNED' | 'CANCELED';

export interface SafePaymentMethod {
  provider: 'stripe';
  customerId: string;
  paymentMethodId: string;
  type: PaymentType;
  brand?: string;
  last4: string;
  expiryMonth?: number;
  expiryYear?: number;
  bankName?: string;
  verificationStatus: 'pending' | 'verified' | 'failed';
  createdAt: string;
}

export interface AutopayAuthorization {
  id: string;
  organization: string;
  service: string;
  customerId: string;
  paymentMethodId: string;
  paymentType: PaymentType;
  amount: number;
  frequency: Frequency;
  authorizationText: string;
  authorizationVersion: string;
  authorizedAt: string;
  status: 'active' | 'revoked';
  revokedAt?: string;
}

export interface BillingSchedule {
  id: string;
  authorizationId: string;
  organization: string;
  service: string;
  customerId: string;
  paymentMethodId: string;
  paymentType: PaymentType;
  amount: number;
  convenienceFee: number;
  frequency: Frequency;
  nextChargeAt: string;
  advanceNoticeDays: number;
  status: 'active' | 'paused' | 'revoked' | 'completed';
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  scheduleId: string;
  amount: number;
  convenienceFee: number;
  state: PaymentState;
  providerStatus?: string;
  providerPaymentId?: string;
  idempotencyKey: string;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationEvent {
  id: string;
  scheduleId: string;
  service: string;
  amount: number;
  chargeDate: string;
  maskedMethod: string;
  updatePaymentMethodUrl: string;
  manageAutopayUrl: string;
  status: 'scheduled' | 'sent' | 'delivered' | 'failed';
  createdAt: string;
}
