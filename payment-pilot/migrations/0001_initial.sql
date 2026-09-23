CREATE TABLE IF NOT EXISTS payment_methods (id TEXT PRIMARY KEY, data TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS authorizations (id TEXT PRIMARY KEY, data TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS schedules (id TEXT PRIMARY KEY, data TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS payments (id TEXT PRIMARY KEY, data TEXT NOT NULL);
CREATE UNIQUE INDEX IF NOT EXISTS payments_idempotency ON payments(json_extract(data, '$.idempotencyKey'));
CREATE INDEX IF NOT EXISTS payments_provider_id ON payments(json_extract(data, '$.providerPaymentId'));
CREATE TABLE IF NOT EXISTS notifications (id TEXT PRIMARY KEY, data TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS webhook_events (id TEXT PRIMARY KEY, type TEXT NOT NULL, received_at TEXT NOT NULL);
