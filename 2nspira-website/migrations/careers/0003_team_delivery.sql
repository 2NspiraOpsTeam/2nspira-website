-- Additive website content storage; no applicant or portal data is changed.
CREATE TABLE IF NOT EXISTS team_delivery_content (
 id INTEGER PRIMARY KEY CHECK(id=1), revision INTEGER NOT NULL DEFAULT 0,
 draft_json TEXT NOT NULL CHECK(json_valid(draft_json)),
 published_json TEXT CHECK(published_json IS NULL OR json_valid(published_json)),
 updated_at TEXT NOT NULL, updated_by TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS team_delivery_photos (
 id TEXT PRIMARY KEY, mime TEXT NOT NULL, data TEXT NOT NULL,
 created_at TEXT NOT NULL, created_by TEXT NOT NULL
);
