-- Isolated demo session JSON contains versioned proposals, approved sandbox cases/tasks and audit events.
-- No careers/customer rows are referenced. Content expires after one hour.
CREATE TABLE IF NOT EXISTS operations_demo_sessions (
 id TEXT PRIMARY KEY, revision INTEGER NOT NULL DEFAULT 0,
 state_json TEXT NOT NULL, expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS operations_demo_expiry ON operations_demo_sessions(expires_at);
-- Durable atomic request reservations. 100 model calls/day, each <=1200 output tokens.
CREATE TABLE IF NOT EXISTS operations_demo_budget (
 day TEXT PRIMARY KEY, requests INTEGER NOT NULL CHECK(requests BETWEEN 0 AND 100)
);
