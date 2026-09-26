import type { PaymentType } from './models';

export type PaymentPath = 'recurring_card' | 'manual_ach' | 'managed_ach';

export interface FeePolicy {
  path: PaymentPath;
  paymentType: PaymentType;
  autopay: boolean;
  convenienceFee: number;
  disclosureRequired: boolean;
}

export function resolveFeePolicy(path: PaymentPath, configuredFee = 0): FeePolicy {
  if (!Number.isInteger(configuredFee) || configuredFee < 0) throw new Error('Fee must be non-negative integer cents');
  if (path === 'manual_ach') return { path, paymentType: 'ach', autopay: false, convenienceFee: 0, disclosureRequired: false };
  if (path === 'managed_ach') return { path, paymentType: 'ach', autopay: true, convenienceFee: configuredFee, disclosureRequired: configuredFee > 0 };
  return { path, paymentType: 'card', autopay: true, convenienceFee: configuredFee, disclosureRequired: configuredFee > 0 };
}
