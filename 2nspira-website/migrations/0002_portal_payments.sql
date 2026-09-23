PRAGMA foreign_keys = ON;

CREATE TABLE stripe_customer (
  organization_id TEXT PRIMARY KEY REFERENCES organization(id) ON DELETE CASCADE,
  customer_reference TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL
);

ALTER TABLE payment_method_reference ADD COLUMN account_type TEXT;
ALTER TABLE payment_method_reference ADD COLUMN verification_status TEXT NOT NULL DEFAULT 'verified';

ALTER TABLE payment RENAME TO payment_legacy;
CREATE TABLE payment (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL REFERENCES organization(id),
  invoice_id TEXT REFERENCES invoice(id),
  payment_method_reference_id TEXT REFERENCES payment_method_reference(id),
  provider TEXT NOT NULL,
  provider_transaction_reference TEXT,
  amount REAL NOT NULL,
  convenience_fee REAL NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL CHECK(status IN ('scheduled','notified','authorized','submitted','processing','settled','failed','returned','canceled','refunded','pending_verification')),
  provider_status TEXT,
  idempotency_key TEXT UNIQUE,
  failure_reason TEXT,
  paid_at TEXT,
  created_at TEXT,
  updated_at TEXT
);
INSERT INTO payment (id,organization_id,invoice_id,payment_method_reference_id,provider,provider_transaction_reference,amount,currency,status,paid_at)
SELECT id,organization_id,invoice_id,payment_method_reference_id,provider,provider_transaction_reference,amount,currency,CASE status WHEN 'succeeded' THEN 'settled' ELSE status END,paid_at FROM payment_legacy;
DROP TABLE payment_legacy;
CREATE INDEX payment_org_idx ON payment(organization_id);

CREATE TABLE billing_schedule (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL REFERENCES organization(id),
  engagement_id TEXT REFERENCES engagement(id),
  authorization_id TEXT NOT NULL REFERENCES billing_authorization(id),
  payment_method_reference_id TEXT NOT NULL REFERENCES payment_method_reference(id),
  frequency TEXT NOT NULL CHECK(frequency IN ('monthly','annual','specific')),
  amount REAL NOT NULL,
  convenience_fee REAL NOT NULL DEFAULT 0,
  next_charge_at TEXT NOT NULL,
  advance_notice_days INTEGER NOT NULL DEFAULT 3,
  status TEXT NOT NULL CHECK(status IN ('active','paused','revoked','completed')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX billing_schedule_org_idx ON billing_schedule(organization_id);

CREATE TABLE advance_notification (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL REFERENCES organization(id),
  schedule_id TEXT NOT NULL REFERENCES billing_schedule(id),
  charge_at TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('scheduled','sent','delivered','failed')),
  created_at TEXT NOT NULL,
  UNIQUE(schedule_id, charge_at)
);

CREATE TABLE stripe_webhook_event (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  processed_at TEXT NOT NULL
);

CREATE TABLE manual_payment (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL REFERENCES organization(id),
  invoice_id TEXT NOT NULL REFERENCES invoice(id),
  method TEXT NOT NULL CHECK(method IN ('manual_ach','zelle')),
  expected_amount REAL NOT NULL,
  state TEXT NOT NULL CHECK(state IN ('awaiting_payment','pending_verification','settled','payment_not_received','rejected')),
  client_reported_at TEXT NOT NULL,
  client_user_id TEXT NOT NULL REFERENCES user(id),
  acknowledgment_version TEXT NOT NULL,
  acknowledgment_text TEXT NOT NULL,
  reference_number TEXT,
  client_note TEXT,
  verified_at TEXT,
  verified_by TEXT REFERENCES user(id),
  verification_note TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(organization_id, invoice_id, method)
);
CREATE INDEX manual_payment_org_idx ON manual_payment(organization_id);

CREATE TABLE manual_payment_audit_event (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL REFERENCES organization(id),
  manual_payment_id TEXT NOT NULL REFERENCES manual_payment(id),
  actor_user_id TEXT NOT NULL REFERENCES user(id),
  action TEXT NOT NULL,
  note TEXT,
  occurred_at TEXT NOT NULL
);
CREATE INDEX manual_payment_audit_org_idx ON manual_payment_audit_event(organization_id);
