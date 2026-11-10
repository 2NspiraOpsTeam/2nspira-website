-- Additive only. No existing careers, client or commerce records are changed.
CREATE TABLE IF NOT EXISTS platform_content (
 id INTEGER PRIMARY KEY CHECK(id=1), revision INTEGER NOT NULL,
 content_json TEXT NOT NULL CHECK(json_valid(content_json)),
 updated_at TEXT NOT NULL, updated_by TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS platform_history (
 revision INTEGER PRIMARY KEY, operation_id TEXT NOT NULL UNIQUE,
 content_json TEXT NOT NULL CHECK(json_valid(content_json)),
 created_at TEXT NOT NULL, created_by TEXT NOT NULL
);
