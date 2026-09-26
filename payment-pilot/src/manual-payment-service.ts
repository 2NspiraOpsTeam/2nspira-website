import type { ManualPaymentAuditEvent, ManualPaymentMethod, ManualPaymentRecord } from './models';
import type { PaymentStore } from './store';

const id = (prefix: string) => `${prefix}_${crypto.randomUUID()}`;

export class ManualPaymentService {
  constructor(private readonly store: PaymentStore) {}

  async reportSent(input: {
    invoiceId: string; organization: string; method: ManualPaymentMethod; expectedAmount: number;
    clientUserId: string; acknowledgmentAccepted: boolean; acknowledgmentVersion: string;
    acknowledgmentText: string; referenceNumber?: string; clientNote?: string; attachmentReference?: string;
  }) {
    if (!input.acknowledgmentAccepted) throw new Error('Payment-sent acknowledgment is required');
    if (!Number.isInteger(input.expectedAmount) || input.expectedAmount <= 0) throw new Error('Expected amount must be positive integer cents');
    const existing = await this.store.findManualPayment(input.invoiceId, input.method);
    if (existing) return { payment: existing, duplicate: true };
    const now = new Date().toISOString();
    const reported: ManualPaymentAuditEvent = { id:id('audit'), action:'CLIENT_REPORTED_SENT', actorType:'client', actorUserId:input.clientUserId, at:now };
    const pending: ManualPaymentAuditEvent = { id:id('audit'), action:'PENDING_VERIFICATION', actorType:'client', actorUserId:input.clientUserId, at:now };
    const payment: ManualPaymentRecord = {
      id:id('manual'), invoiceId:input.invoiceId, organization:input.organization, method:input.method,
      expectedAmount:input.expectedAmount, convenienceFee:0, state:'PENDING_VERIFICATION', invoiceState:'OPEN',
      clientReportedAt:now, clientUserId:input.clientUserId,
      acknowledgmentVersion:input.acknowledgmentVersion, acknowledgmentText:input.acknowledgmentText,
      referenceNumber:cleanOptional(input.referenceNumber), clientNote:cleanOptional(input.clientNote),
      attachmentReference:cleanOptional(input.attachmentReference), createdAt:now, updatedAt:now,
      audit:[reported,pending],
    };
    await this.store.saveManualPayment(payment);
    return { payment, duplicate:false };
  }

  async confirmReceived(idValue: string, userId: string, note?: string) {
    return this.transition(idValue, 'CONFIRMED_RECEIVED', 'SETTLED', userId, note);
  }

  async markNotFound(idValue: string, userId: string, note?: string) {
    return this.transition(idValue, 'PAYMENT_NOT_FOUND', 'PAYMENT_NOT_RECEIVED', userId, note);
  }

  async requestMoreInformation(idValue: string, userId: string, note: string) {
    if (!note?.trim()) throw new Error('Information request note is required');
    return this.transition(idValue, 'REQUESTED_MORE_INFORMATION', 'PENDING_VERIFICATION', userId, note);
  }

  private async transition(idValue: string, action: ManualPaymentAuditEvent['action'], state: ManualPaymentRecord['state'], userId: string, note?: string) {
    const payment = await this.store.getManualPayment(idValue);
    if (!payment) throw new Error('Manual payment record not found');
    if (payment.state === 'SETTLED') throw new Error('Settled manual payment cannot be changed');
    const now = new Date().toISOString();
    payment.state = state;
    payment.invoiceState = state === 'SETTLED' ? 'SETTLED' : 'OPEN';
    payment.updatedAt = now;
    payment.audit.push({ id:id('audit'), action, actorType:'2nspira', actorUserId:userId, at:now, note:cleanOptional(note) });
    if (state === 'SETTLED') { payment.verifiedAt=now; payment.verifiedBy=userId; payment.verificationNote=cleanOptional(note); }
    await this.store.saveManualPayment(payment);
    return payment;
  }
}

function cleanOptional(value?: string) {
  const cleaned = value?.trim();
  return cleaned ? cleaned.slice(0, 500) : undefined;
}
