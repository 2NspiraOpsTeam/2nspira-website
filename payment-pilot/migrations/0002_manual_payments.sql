CREATE TABLE IF NOT EXISTS manual_payments (id TEXT PRIMARY KEY, data TEXT NOT NULL);
CREATE UNIQUE INDEX IF NOT EXISTS manual_payment_invoice_method
  ON manual_payments(json_extract(data, '$.invoiceId'), json_extract(data, '$.method'));
