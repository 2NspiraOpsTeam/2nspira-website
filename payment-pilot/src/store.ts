import type { AutopayAuthorization, BillingSchedule, ManualPaymentMethod, ManualPaymentRecord, NotificationEvent, PaymentRecord, SafePaymentMethod } from './models';

export interface PaymentStore {
  savePaymentMethod(value: SafePaymentMethod): Promise<void>;
  getPaymentMethod(id: string): Promise<SafePaymentMethod | null>;
  saveAuthorization(value: AutopayAuthorization): Promise<void>;
  getAuthorization(id: string): Promise<AutopayAuthorization | null>;
  saveSchedule(value: BillingSchedule): Promise<void>;
  getSchedule(id: string): Promise<BillingSchedule | null>;
  listSchedules(): Promise<BillingSchedule[]>;
  savePayment(value: PaymentRecord): Promise<void>;
  findPaymentByIdempotencyKey(key: string): Promise<PaymentRecord | null>;
  findPaymentByProviderId(id: string): Promise<PaymentRecord | null>;
  saveNotification(value: NotificationEvent): Promise<void>;
  findNotification(scheduleId: string, chargeDate: string): Promise<NotificationEvent | null>;
  recordWebhookEvent(id: string, type: string): Promise<boolean>;
  saveManualPayment(value: ManualPaymentRecord): Promise<void>;
  getManualPayment(id: string): Promise<ManualPaymentRecord | null>;
  findManualPayment(invoiceId: string, method: ManualPaymentMethod): Promise<ManualPaymentRecord | null>;
}

export class MemoryPaymentStore implements PaymentStore {
  methods = new Map<string, SafePaymentMethod>();
  authorizations = new Map<string, AutopayAuthorization>();
  schedules = new Map<string, BillingSchedule>();
  payments = new Map<string, PaymentRecord>();
  notifications = new Map<string, NotificationEvent>();
  events = new Set<string>();
  manualPayments = new Map<string, ManualPaymentRecord>();
  async savePaymentMethod(v: SafePaymentMethod) { this.methods.set(v.paymentMethodId, structuredClone(v)); }
  async getPaymentMethod(id: string) { return structuredClone(this.methods.get(id) ?? null); }
  async saveAuthorization(v: AutopayAuthorization) { this.authorizations.set(v.id, structuredClone(v)); }
  async getAuthorization(id: string) { return structuredClone(this.authorizations.get(id) ?? null); }
  async saveSchedule(v: BillingSchedule) { this.schedules.set(v.id, structuredClone(v)); }
  async getSchedule(id: string) { return structuredClone(this.schedules.get(id) ?? null); }
  async listSchedules(): Promise<BillingSchedule[]> { return [...this.schedules.values()].map(v => structuredClone(v)); }
  async savePayment(v: PaymentRecord) { this.payments.set(v.id, structuredClone(v)); }
  async findPaymentByIdempotencyKey(key: string) { return structuredClone([...this.payments.values()].find(v => v.idempotencyKey === key) ?? null); }
  async findPaymentByProviderId(id: string) { return structuredClone([...this.payments.values()].find(v => v.providerPaymentId === id) ?? null); }
  async saveNotification(v: NotificationEvent) { this.notifications.set(`${v.scheduleId}:${v.chargeDate}`, structuredClone(v)); }
  async findNotification(scheduleId: string, chargeDate: string) { return structuredClone(this.notifications.get(`${scheduleId}:${chargeDate}`) ?? null); }
  async recordWebhookEvent(id: string) { if (this.events.has(id)) return false; this.events.add(id); return true; }
  async saveManualPayment(v: ManualPaymentRecord) { this.manualPayments.set(v.id, structuredClone(v)); }
  async getManualPayment(id: string) { return structuredClone(this.manualPayments.get(id) ?? null); }
  async findManualPayment(invoiceId: string, method: ManualPaymentMethod) { return structuredClone([...this.manualPayments.values()].find(v => v.invoiceId === invoiceId && v.method === method) ?? null); }
}

export class D1PaymentStore implements PaymentStore {
  constructor(private readonly db: D1Database) {}
  private async put(table: string, id: string, value: unknown) {
    await this.db.prepare(`INSERT INTO ${table} (id, data) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET data=excluded.data`).bind(id, JSON.stringify(value)).run();
  }
  private async get<T>(table: string, id: string): Promise<T | null> {
    const row = await this.db.prepare(`SELECT data FROM ${table} WHERE id = ?`).bind(id).first<{ data: string }>();
    return row ? JSON.parse(row.data) as T : null;
  }
  async savePaymentMethod(v: SafePaymentMethod) { await this.put('payment_methods', v.paymentMethodId, v); }
  async getPaymentMethod(id: string) { return this.get<SafePaymentMethod>('payment_methods', id); }
  async saveAuthorization(v: AutopayAuthorization) { await this.put('authorizations', v.id, v); }
  async getAuthorization(id: string) { return this.get<AutopayAuthorization>('authorizations', id); }
  async saveSchedule(v: BillingSchedule) { await this.put('schedules', v.id, v); }
  async getSchedule(id: string) { return this.get<BillingSchedule>('schedules', id); }
  async listSchedules() {
    const rows = await this.db.prepare('SELECT data FROM schedules ORDER BY id').all<{ data: string }>();
    return rows.results.map(r => JSON.parse(r.data) as BillingSchedule);
  }
  async savePayment(v: PaymentRecord) { await this.put('payments', v.id, v); }
  async findPaymentByIdempotencyKey(key: string) {
    const row = await this.db.prepare("SELECT data FROM payments WHERE json_extract(data, '$.idempotencyKey') = ? LIMIT 1").bind(key).first<{ data: string }>();
    return row ? JSON.parse(row.data) as PaymentRecord : null;
  }
  async findPaymentByProviderId(id: string) {
    const row = await this.db.prepare("SELECT data FROM payments WHERE json_extract(data, '$.providerPaymentId') = ? LIMIT 1").bind(id).first<{ data: string }>();
    return row ? JSON.parse(row.data) as PaymentRecord : null;
  }
  async saveNotification(v: NotificationEvent) { await this.put('notifications', `${v.scheduleId}:${v.chargeDate}`, v); }
  async findNotification(scheduleId: string, chargeDate: string) { return this.get<NotificationEvent>('notifications', `${scheduleId}:${chargeDate}`); }
  async recordWebhookEvent(id: string, type: string) {
    const result = await this.db.prepare('INSERT OR IGNORE INTO webhook_events (id, type, received_at) VALUES (?, ?, ?)').bind(id, type, new Date().toISOString()).run();
    return result.meta.changes === 1;
  }
  async saveManualPayment(v: ManualPaymentRecord) { await this.put('manual_payments', v.id, v); }
  async getManualPayment(id: string) { return this.get<ManualPaymentRecord>('manual_payments', id); }
  async findManualPayment(invoiceId: string, method: ManualPaymentMethod) {
    const row = await this.db.prepare("SELECT data FROM manual_payments WHERE json_extract(data, '$.invoiceId') = ? AND json_extract(data, '$.method') = ? LIMIT 1").bind(invoiceId, method).first<{ data: string }>();
    return row ? JSON.parse(row.data) as ManualPaymentRecord : null;
  }
}
