PRAGMA foreign_keys = ON;

CREATE TABLE user (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, email_verified INTEGER NOT NULL DEFAULT 0, image TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL);
CREATE TABLE session (id TEXT PRIMARY KEY, expires_at INTEGER NOT NULL, token TEXT NOT NULL UNIQUE, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, ip_address TEXT, user_agent TEXT, user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE);
CREATE TABLE account (id TEXT PRIMARY KEY, account_id TEXT NOT NULL, provider_id TEXT NOT NULL, user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE, access_token TEXT, refresh_token TEXT, id_token TEXT, access_token_expires_at INTEGER, refresh_token_expires_at INTEGER, scope TEXT, password TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL);
CREATE UNIQUE INDEX account_provider_unique ON account(provider_id, account_id);
CREATE TABLE verification (id TEXT PRIMARY KEY, identifier TEXT NOT NULL, value TEXT NOT NULL, expires_at INTEGER NOT NULL, created_at INTEGER, updated_at INTEGER);

CREATE TABLE organization (id TEXT PRIMARY KEY, name TEXT NOT NULL, legal_name TEXT, demo INTEGER NOT NULL DEFAULT 0, billing_email TEXT NOT NULL, phone TEXT, address TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL);
CREATE TABLE organization_membership (id TEXT PRIMARY KEY, organization_id TEXT NOT NULL REFERENCES organization(id) ON DELETE CASCADE, user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE, role TEXT NOT NULL CHECK(role IN ('account_owner','billing_admin','standard_user','internal_admin')), created_at TEXT NOT NULL);
CREATE UNIQUE INDEX membership_org_user_unique ON organization_membership(organization_id, user_id);
CREATE TABLE service (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, category TEXT NOT NULL);
CREATE TABLE engagement (id TEXT PRIMARY KEY, organization_id TEXT NOT NULL REFERENCES organization(id), service_id TEXT NOT NULL REFERENCES service(id), status TEXT NOT NULL CHECK(status IN ('active','completed','paused')), billing_type TEXT NOT NULL CHECK(billing_type IN ('recurring','hourly','fixed_project')), billing_frequency TEXT, amount REAL, currency TEXT NOT NULL DEFAULT 'USD', start_date TEXT NOT NULL, renewal_date TEXT, next_billing_date TEXT);
CREATE TABLE invoice (id TEXT PRIMARY KEY, organization_id TEXT NOT NULL REFERENCES organization(id), engagement_id TEXT REFERENCES engagement(id), invoice_number TEXT NOT NULL UNIQUE, issue_date TEXT NOT NULL, due_date TEXT NOT NULL, status TEXT NOT NULL CHECK(status IN ('paid','due','overdue','draft','voided')), subtotal REAL NOT NULL, tax REAL NOT NULL DEFAULT 0, total REAL NOT NULL, balance REAL NOT NULL, currency TEXT NOT NULL DEFAULT 'USD');
CREATE TABLE invoice_line_item (id TEXT PRIMARY KEY, invoice_id TEXT NOT NULL REFERENCES invoice(id) ON DELETE CASCADE, description TEXT NOT NULL, quantity REAL NOT NULL, unit_price REAL NOT NULL, amount REAL NOT NULL);
CREATE TABLE payment_method_reference (id TEXT PRIMARY KEY, organization_id TEXT NOT NULL REFERENCES organization(id), provider TEXT NOT NULL, provider_reference TEXT NOT NULL, type TEXT NOT NULL CHECK(type IN ('card','bank_account')), brand TEXT NOT NULL, last_four TEXT NOT NULL, expiration_month INTEGER, expiration_year INTEGER, is_default INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL CHECK(status IN ('active','expired','removed')), created_at TEXT NOT NULL);
CREATE TABLE payment (id TEXT PRIMARY KEY, organization_id TEXT NOT NULL REFERENCES organization(id), invoice_id TEXT REFERENCES invoice(id), payment_method_reference_id TEXT REFERENCES payment_method_reference(id), provider TEXT NOT NULL, provider_transaction_reference TEXT, amount REAL NOT NULL, currency TEXT NOT NULL DEFAULT 'USD', status TEXT NOT NULL CHECK(status IN ('scheduled','processing','succeeded','failed','refunded')), paid_at TEXT);
CREATE TABLE billing_authorization (id TEXT PRIMARY KEY, organization_id TEXT NOT NULL REFERENCES organization(id), payment_method_reference_id TEXT NOT NULL REFERENCES payment_method_reference(id), billing_rule TEXT NOT NULL, active INTEGER NOT NULL DEFAULT 0, authorized_at TEXT NOT NULL, authorized_by_user_id TEXT NOT NULL REFERENCES user(id), revoked_at TEXT);
CREATE TABLE audit_event (id TEXT PRIMARY KEY, organization_id TEXT NOT NULL REFERENCES organization(id), actor_user_id TEXT REFERENCES user(id), action TEXT NOT NULL, entity_type TEXT NOT NULL, entity_id TEXT, metadata_json TEXT, occurred_at TEXT NOT NULL);

CREATE INDEX engagement_org_idx ON engagement(organization_id);
CREATE INDEX invoice_org_idx ON invoice(organization_id);
CREATE INDEX payment_org_idx ON payment(organization_id);
CREATE INDEX payment_method_org_idx ON payment_method_reference(organization_id);
CREATE INDEX audit_event_org_idx ON audit_event(organization_id);
