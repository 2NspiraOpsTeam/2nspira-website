-- Contact delivery stores only daily content hashes/status/provider IDs, never inquiry bodies.
-- Matches contactDelivery.ts; the owner's mailbox is the inquiry review destination.
CREATE TABLE IF NOT EXISTS contact_delivery (
 id TEXT PRIMARY KEY,
 status TEXT NOT NULL CHECK(status IN ('sending','sent','failed','unknown')),
 provider_id TEXT,
 created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS contact_rate_limits (
 id TEXT PRIMARY KEY,
 count INTEGER NOT NULL,
 expires INTEGER NOT NULL
);
