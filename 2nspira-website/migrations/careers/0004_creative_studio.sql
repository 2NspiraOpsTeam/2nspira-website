-- Additive content-only tables. Existing careers, portal and commerce data are unchanged.
CREATE TABLE IF NOT EXISTS creative_studio_content (
 id INTEGER PRIMARY KEY CHECK(id=1), revision INTEGER NOT NULL,
 draft_json TEXT NOT NULL CHECK(json_valid(draft_json)),
 published_json TEXT CHECK(published_json IS NULL OR json_valid(published_json)),
 updated_at TEXT NOT NULL, updated_by TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS creative_studio_images (
 id TEXT PRIMARY KEY, mime TEXT NOT NULL, data TEXT NOT NULL,
 created_at TEXT NOT NULL, created_by TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS creative_studio_history (
 revision INTEGER PRIMARY KEY, content_json TEXT NOT NULL CHECK(json_valid(content_json)),
 published_json TEXT, created_at TEXT NOT NULL, created_by TEXT NOT NULL
);
