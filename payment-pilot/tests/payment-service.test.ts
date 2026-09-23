import { describe, expect, it } from 'vitest';
import type { PaymentProvider, ProviderWebhookEvent } from '../src/payment-provider';
import { PaymentService, mapStripeStatus, mapWebhookType } from '../src/payment-service';
import { MemoryPaymentStore } from '../src/store';
import type { SafePaymentMethod } from '../src/models';
import { resolveFeePolicy } from '../src/payment-policy';

class FakeStripeProvider implements PaymentProvider {
  readonly name = 'stripe'; calls = 0;
  method: SafePaymentMethod = { provider:'stripe', customerId:'cus_demo', paymentMethodId:'pm_demo', type:'card', brand:'visa', last4:'4242', expiryMonth:12, expiryYear:2030, verificationStatus:'verified', createdAt:new Date().toISOString() };
  async createCustomer() { return { id:'cus_demo' }; }
  async createSetupIntent() { return { id:'seti_demo', clientSecret:'seti_secret' }; }
  async retrieveSafePaymentMethod() { return this.method; }
  async chargeSavedMethod() { this.calls++; return { id:'pi_demo', status:'succeeded' }; }
  async verifyWebhook(): Promise<ProviderWebhookEvent> { return { id:'evt_demo', type:'payment_intent.succeeded', paymentId:'pi_demo' }; }
}

const makeSchedule = async (service: PaymentService, date = new Date(Date.now()+3*86400000)) => service.createSchedule({
  organization:'demo', service:'Website Hosting', customerId:'cus_demo', paymentMethodId:'pm_demo', paymentType:'card',
  amount:22500, frequency:'monthly', nextChargeAt:date.toISOString(), authorizationText:'authorized', authorizationVersion:'v1',
});

describe('Stripe payment pilot', () => {
  it('persists only safe Stripe payment metadata', async () => {
    const store=new MemoryPaymentStore(), provider=new FakeStripeProvider(), service=new PaymentService(provider,store);
    const saved=await service.saveVerifiedMethod('cus_demo','pm_demo');
    expect(saved).toMatchObject({paymentMethodId:'pm_demo',last4:'4242'});
    expect(JSON.stringify(saved)).not.toMatch(/accountNumber|routingNumber|cvc|cvv/i);
  });
  it('prevents duplicate charges with deterministic idempotency', async () => {
    const store=new MemoryPaymentStore(), provider=new FakeStripeProvider(), service=new PaymentService(provider,store);
    await service.saveVerifiedMethod('cus_demo','pm_demo'); const {schedule}=await makeSchedule(service);
    const a=await service.executeSchedule(schedule.id), b=await service.executeSchedule(schedule.id);
    expect(a.id).toBe(b.id); expect(provider.calls).toBe(1);
  });
  it('generates one three-day notice', async () => {
    const store=new MemoryPaymentStore(), provider=new FakeStripeProvider(), service=new PaymentService(provider,store);
    await service.saveVerifiedMethod('cus_demo','pm_demo'); await makeSchedule(service);
    expect(await service.createAdvanceNotices()).toHaveLength(1);
    expect(await service.createAdvanceNotices()).toHaveLength(0);
  });
  it('blocks a revoked schedule from charging', async () => {
    const store=new MemoryPaymentStore(), provider=new FakeStripeProvider(), service=new PaymentService(provider,store);
    await service.saveVerifiedMethod('cus_demo','pm_demo'); const {schedule}=await makeSchedule(service);
    await service.revokeSchedule(schedule.id);
    await expect(service.executeSchedule(schedule.id)).rejects.toThrow('not active'); expect(provider.calls).toBe(0);
  });
  it('processes a webhook retry once', async () => {
    const store=new MemoryPaymentStore(), provider=new FakeStripeProvider(), service=new PaymentService(provider,store);
    await service.saveVerifiedMethod('cus_demo','pm_demo'); const {schedule}=await makeSchedule(service); await service.executeSchedule(schedule.id);
    const event={id:'evt_1',type:'payment_intent.succeeded',paymentId:'pi_demo'};
    expect((await service.applyWebhook(event)).duplicate).toBe(false);
    expect((await service.applyWebhook(event)).duplicate).toBe(true);
  });
  it('normalizes ACH processing, failures, and returns', () => {
    expect(mapStripeStatus('processing','ach')).toBe('PROCESSING');
    expect(mapWebhookType('payment_intent.payment_failed')).toBe('FAILED');
    expect(mapWebhookType('charge.failed','ACH return R01')).toBe('RETURNED');
  });
  it('enforces explicit configurable fee paths', () => {
    expect(resolveFeePolicy('manual_ach', 2000).convenienceFee).toBe(0);
    expect(resolveFeePolicy('managed_ach', 2000)).toMatchObject({ convenienceFee: 2000, disclosureRequired: true });
    expect(resolveFeePolicy('recurring_card', 0).disclosureRequired).toBe(false);
  });
});
