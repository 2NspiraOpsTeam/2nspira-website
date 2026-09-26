import type { PaymentProvider, ProviderWebhookEvent } from './payment-provider';
import type { AutopayAuthorization, BillingSchedule, Frequency, NotificationEvent, PaymentRecord, PaymentState, PaymentType } from './models';
import type { PaymentStore } from './store';

const id = (prefix: string) => `${prefix}_${crypto.randomUUID()}`;
const addFrequency = (date: Date, frequency: Frequency) => {
  const next = new Date(date);
  if (frequency === 'monthly') next.setUTCMonth(next.getUTCMonth() + 1);
  if (frequency === 'annual') next.setUTCFullYear(next.getUTCFullYear() + 1);
  return next;
};

export class PaymentService {
  constructor(private readonly provider: PaymentProvider, private readonly store: PaymentStore) {}

  async saveVerifiedMethod(customerId: string, paymentMethodId: string) {
    const method = await this.provider.retrieveSafePaymentMethod(customerId, paymentMethodId);
    await this.store.savePaymentMethod(method);
    return method;
  }

  async createSchedule(input: {
    organization: string; service: string; customerId: string; paymentMethodId: string;
    paymentType: PaymentType; amount: number; convenienceFee?: number; frequency: Frequency;
    nextChargeAt: string; authorizationText: string; authorizationVersion: string;
    authorizedAt?: string; advanceNoticeDays?: number;
  }) {
    if (input.amount <= 0 || !Number.isInteger(input.amount)) throw new Error('Amount must be positive integer cents');
    if ((input.convenienceFee ?? 0) < 0) throw new Error('Convenience fee cannot be negative');
    const method = await this.store.getPaymentMethod(input.paymentMethodId);
    if (!method || method.customerId !== input.customerId || method.type !== input.paymentType) throw new Error('Stored payment method mismatch');
    const now = new Date().toISOString();
    const authorization: AutopayAuthorization = {
      id: id('auth'), organization: input.organization, service: input.service,
      customerId: input.customerId, paymentMethodId: input.paymentMethodId,
      paymentType: input.paymentType, amount: input.amount, frequency: input.frequency,
      authorizationText: input.authorizationText, authorizationVersion: input.authorizationVersion,
      authorizedAt: input.authorizedAt ?? now, status: 'active',
    };
    const schedule: BillingSchedule = {
      id: id('sched'), authorizationId: authorization.id, organization: input.organization,
      service: input.service, customerId: input.customerId, paymentMethodId: input.paymentMethodId,
      paymentType: input.paymentType, amount: input.amount, convenienceFee: input.convenienceFee ?? 0,
      frequency: input.frequency, nextChargeAt: new Date(input.nextChargeAt).toISOString(),
      advanceNoticeDays: input.advanceNoticeDays ?? 3, status: 'active', createdAt: now,
    };
    await this.store.saveAuthorization(authorization);
    await this.store.saveSchedule(schedule);
    return { authorization, schedule };
  }

  async createAdvanceNotices(now = new Date()) {
    const created: NotificationEvent[] = [];
    for (const schedule of await this.store.listSchedules()) {
      if (schedule.status !== 'active') continue;
      const chargeDate = new Date(schedule.nextChargeAt);
      const noticeAt = new Date(chargeDate);
      noticeAt.setUTCDate(noticeAt.getUTCDate() - schedule.advanceNoticeDays);
      if (now < noticeAt || now >= chargeDate) continue;
      if (await this.store.findNotification(schedule.id, schedule.nextChargeAt)) continue;
      const method = await this.store.getPaymentMethod(schedule.paymentMethodId);
      if (!method) continue;
      const notice: NotificationEvent = {
        id: id('notice'), scheduleId: schedule.id, service: schedule.service,
        amount: schedule.amount + schedule.convenienceFee, chargeDate: schedule.nextChargeAt,
        maskedMethod: `${method.type === 'card' ? method.brand ?? 'card' : method.bankName ?? 'bank'} •••• ${method.last4}`,
        updatePaymentMethodUrl: `/dev/payments-pilot?schedule=${encodeURIComponent(schedule.id)}&action=payment-method`,
        manageAutopayUrl: `/dev/payments-pilot?schedule=${encodeURIComponent(schedule.id)}&action=manage`,
        status: 'scheduled', createdAt: now.toISOString(),
      };
      await this.store.saveNotification(notice);
      created.push(notice);
    }
    return created;
  }

  async executeSchedule(scheduleId: string) {
    const schedule = await this.store.getSchedule(scheduleId);
    if (!schedule || schedule.status !== 'active') throw new Error('Schedule is not active');
    const auth = await this.store.getAuthorization(schedule.authorizationId);
    if (!auth || auth.status !== 'active') throw new Error('Autopay authorization is not active');
    const chargeDate = schedule.nextChargeAt.slice(0, 10);
    const idempotencyKey = `schedule:${schedule.id}:${chargeDate}`;
    const existing = await this.store.findPaymentByIdempotencyKey(idempotencyKey);
    if (existing) return existing;
    const now = new Date().toISOString();
    const payment: PaymentRecord = {
      id: id('pay'), scheduleId, amount: schedule.amount, convenienceFee: schedule.convenienceFee,
      state: 'SUBMITTED', idempotencyKey, createdAt: now, updatedAt: now,
    };
    await this.store.savePayment(payment);
    try {
      const result = await this.provider.chargeSavedMethod({
        customerId: schedule.customerId, paymentMethodId: schedule.paymentMethodId,
        type: schedule.paymentType, amount: schedule.amount + schedule.convenienceFee,
        currency: 'usd', idempotencyKey, description: schedule.service,
        metadata: { scheduleId: schedule.id, authorizationId: schedule.authorizationId },
      });
      payment.providerPaymentId = result.id;
      payment.providerStatus = result.status;
      payment.state = mapStripeStatus(result.status, schedule.paymentType);
      payment.updatedAt = new Date().toISOString();
      await this.store.savePayment(payment);
      return payment;
    } catch (error) {
      payment.state = 'FAILED';
      payment.failureReason = error instanceof Error ? error.message : 'Provider request failed';
      payment.updatedAt = new Date().toISOString();
      await this.store.savePayment(payment);
      throw error;
    }
  }

  async revokeSchedule(scheduleId: string) {
    const schedule = await this.store.getSchedule(scheduleId);
    if (!schedule) return false;
    schedule.status = 'revoked';
    const auth = await this.store.getAuthorization(schedule.authorizationId);
    if (auth) { auth.status = 'revoked'; auth.revokedAt = new Date().toISOString(); await this.store.saveAuthorization(auth); }
    await this.store.saveSchedule(schedule);
    return true;
  }

  async applyWebhook(event: ProviderWebhookEvent) {
    if (!await this.store.recordWebhookEvent(event.id, event.type)) return { duplicate: true };
    if (!event.paymentId) return { duplicate: false, updated: false };
    const payment = await this.store.findPaymentByProviderId(event.paymentId);
    if (!payment) return { duplicate: false, updated: false };
    payment.providerStatus = event.type;
    const nextState = mapWebhookType(event.type, event.failureReason);
    payment.state = payment.state === 'RETURNED' && nextState === 'FAILED' ? 'RETURNED' : nextState;
    payment.failureReason = event.failureReason;
    payment.updatedAt = new Date().toISOString();
    await this.store.savePayment(payment);
    if (payment.state === 'SETTLED') {
      const schedule = await this.store.getSchedule(payment.scheduleId);
      if (schedule) {
        if (schedule.frequency === 'specific') schedule.status = 'completed';
        else schedule.nextChargeAt = addFrequency(new Date(schedule.nextChargeAt), schedule.frequency).toISOString();
        await this.store.saveSchedule(schedule);
      }
    }
    return { duplicate: false, updated: true, state: payment.state };
  }
}

export function mapStripeStatus(status: string, type: PaymentType): PaymentState {
  if (status === 'succeeded') return 'SETTLED';
  if (status === 'processing') return 'PROCESSING';
  if (status === 'canceled') return 'CANCELED';
  if (status === 'requires_action' || status === 'requires_confirmation') return 'AUTHORIZED';
  if (status === 'requires_payment_method') return 'FAILED';
  return type === 'ach' ? 'PROCESSING' : 'SUBMITTED';
}

export function mapWebhookType(type: string, reason?: string): PaymentState {
  if (type === 'payment_intent.succeeded') return 'SETTLED';
  if (type === 'payment_intent.processing') return 'PROCESSING';
  if (type === 'payment_intent.canceled') return 'CANCELED';
  if (type === 'charge.failed' && /return|ach|bank/i.test(reason ?? '')) return 'RETURNED';
  if (type === 'payment_intent.payment_failed' || type === 'charge.failed') return 'FAILED';
  return 'SUBMITTED';
}
