import { describe, expect, it } from 'vitest';
import { ManualPaymentService } from '../src/manual-payment-service';
import { MemoryPaymentStore } from '../src/store';

const acknowledgment = 'I confirm that I initiated this payment. I understand the invoice remains pending until 2Nspira confirms receipt.';
const input = (method: 'manual_ach' | 'zelle' = 'manual_ach') => ({
  invoiceId:'inv_1001', organization:'demo-client', method, expectedAmount:1000000,
  clientUserId:'client_user_1', acknowledgmentAccepted:true,
  acknowledgmentVersion:'v1.0', acknowledgmentText:acknowledgment,
  referenceNumber:'confirmation-123', clientNote:'Sent from business account',
});

describe('manual payment lifecycle', () => {
  it.each(['manual_ach','zelle'] as const)('supports %s acknowledgment without settlement', async method => {
    const store=new MemoryPaymentStore(), service=new ManualPaymentService(store);
    const {payment}=await service.reportSent(input(method));
    expect(payment).toMatchObject({method,state:'PENDING_VERIFICATION',invoiceState:'OPEN',convenienceFee:0});
    expect(payment.audit.map(e=>e.action)).toEqual(['CLIENT_REPORTED_SENT','PENDING_VERIFICATION']);
  });

  it('requires explicit acknowledgment', async () => {
    const service=new ManualPaymentService(new MemoryPaymentStore());
    await expect(service.reportSent({...input(),acknowledgmentAccepted:false})).rejects.toThrow('acknowledgment');
  });

  it('deduplicates repeated client acknowledgments', async () => {
    const store=new MemoryPaymentStore(), service=new ManualPaymentService(store);
    const first=await service.reportSent(input()), second=await service.reportSent(input());
    expect(second.duplicate).toBe(true); expect(second.payment.id).toBe(first.payment.id); expect(store.manualPayments.size).toBe(1);
  });

  it('settles only after 2Nspira receipt confirmation', async () => {
    const store=new MemoryPaymentStore(), service=new ManualPaymentService(store);
    const {payment}=await service.reportSent(input());
    expect(payment.invoiceState).toBe('OPEN');
    const settled=await service.confirmReceived(payment.id,'ops_user_1','Matched to bank receipt');
    expect(settled).toMatchObject({state:'SETTLED',invoiceState:'SETTLED',verifiedBy:'ops_user_1'});
    expect(settled.audit.at(-1)?.action).toBe('CONFIRMED_RECEIVED');
  });

  it('supports payment-not-found and request-more-information with audit preservation', async () => {
    const store=new MemoryPaymentStore(), service=new ManualPaymentService(store);
    const {payment}=await service.reportSent(input('zelle'));
    const notFound=await service.markNotFound(payment.id,'ops_user_2','No matching deposit');
    expect(notFound).toMatchObject({state:'PAYMENT_NOT_RECEIVED',invoiceState:'OPEN'});
    const requested=await service.requestMoreInformation(payment.id,'ops_user_2','Please confirm the reference number');
    expect(requested).toMatchObject({state:'PENDING_VERIFICATION',invoiceState:'OPEN'});
    expect(requested.audit.map(e=>e.action)).toEqual(['CLIENT_REPORTED_SENT','PENDING_VERIFICATION','PAYMENT_NOT_FOUND','REQUESTED_MORE_INFORMATION']);
  });

  it('treats optional attachment as evidence only', async () => {
    const service=new ManualPaymentService(new MemoryPaymentStore());
    const {payment}=await service.reportSent({...input(),attachmentReference:'receipt/object-ref'});
    expect(payment.attachmentReference).toBe('receipt/object-ref');
    expect(payment.invoiceState).toBe('OPEN');
  });
});
