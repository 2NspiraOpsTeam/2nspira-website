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
  accountType?: string;
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

export type ManualPaymentMethod = 'manual_ach' | 'zelle';
export type ManualPaymentState =
  | 'AWAITING_PAYMENT' | 'CLIENT_REPORTED_SENT' | 'PENDING_VERIFICATION'
  | 'SETTLED' | 'PAYMENT_NOT_RECEIVED' | 'REJECTED';

export interface ManualPaymentAuditEvent {
  id: string;
  action: 'CLIENT_REPORTED_SENT' | 'PENDING_VERIFICATION' | 'CONFIRMED_RECEIVED' | 'PAYMENT_NOT_FOUND' | 'REQUESTED_MORE_INFORMATION';
  actorType: 'client' | '2nspira';
  actorUserId: string;
  at: string;
  note?: string;
}

export interface ManualPaymentRecord {
  id: string;
  invoiceId: string;
  organization: string;
  method: ManualPaymentMethod;
  expectedAmount: number;
  convenienceFee: 0;
  state: ManualPaymentState;
  invoiceState: 'OPEN' | 'SETTLED';
  clientReportedAt: string;
  clientUserId: string;
  acknowledgmentVersion: string;
  acknowledgmentText: string;
  referenceNumber?: string;
  clientNote?: string;
  attachmentReference?: string;
  verifiedAt?: string;
  verifiedBy?: string;
  verificationNote?: string;
  createdAt: string;
  updatedAt: string;
  audit: ManualPaymentAuditEvent[];
}
