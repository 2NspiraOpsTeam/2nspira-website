-- Proposed additive tables for the EXISTING research D1. Local execution only.
-- No mi_* tables modified; production adoption requires review and authorization.
PRAGMA foreign_keys = ON;
CREATE TABLE hub_customers (
 customer_id TEXT PRIMARY KEY, name TEXT NOT NULL,
 source_url TEXT NOT NULL, observed_at TEXT NOT NULL,
 synthetic INTEGER NOT NULL DEFAULT 0 CHECK(synthetic IN (0,1))
);
CREATE TABLE hub_projects (
 project_id TEXT PRIMARY KEY, customer_id TEXT NOT NULL REFERENCES hub_customers(customer_id),
 name TEXT NOT NULL, status TEXT NOT NULL CHECK(status IN ('queued','in_progress','blocked','ready_for_review','done')),
 owner TEXT NOT NULL CHECK(owner IN ('cleo','adam','brian','maya','dax')),
 issue_url TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE hub_notes (
 note_id TEXT PRIMARY KEY, customer_id TEXT NOT NULL REFERENCES hub_customers(customer_id),
 body TEXT NOT NULL, actor TEXT NOT NULL, occurred_at TEXT NOT NULL
);
CREATE TABLE hub_audit (
 event_id TEXT PRIMARY KEY, actor TEXT NOT NULL, action TEXT NOT NULL,
 resource TEXT NOT NULL, outcome TEXT NOT NULL, occurred_at TEXT NOT NULL
);
CREATE INDEX hub_projects_customer ON hub_projects(customer_id);
CREATE INDEX hub_notes_customer_time ON hub_notes(customer_id,occurred_at DESC);
CREATE INDEX hub_audit_time ON hub_audit(occurred_at DESC);
