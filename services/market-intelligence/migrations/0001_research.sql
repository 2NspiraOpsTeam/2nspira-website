CREATE TABLE mi_runs (
 run_id TEXT PRIMARY KEY, observed_at TEXT NOT NULL, imported_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
 actor TEXT NOT NULL, issue_url TEXT NOT NULL, record_version TEXT NOT NULL, payload_hash TEXT NOT NULL
);
CREATE TABLE mi_opportunities (
 candidate_id TEXT PRIMARY KEY, title TEXT NOT NULL, category TEXT NOT NULL, score REAL NOT NULL CHECK(score BETWEEN 0 AND 100),
 stage TEXT NOT NULL, confidence TEXT NOT NULL, observed_at TEXT NOT NULL, run_id TEXT NOT NULL REFERENCES mi_runs(run_id),
 record_json TEXT NOT NULL CHECK(json_valid(record_json))
);
CREATE TABLE mi_versions (
 run_id TEXT NOT NULL REFERENCES mi_runs(run_id), candidate_id TEXT NOT NULL,
 record_json TEXT NOT NULL CHECK(json_valid(record_json)), PRIMARY KEY(run_id,candidate_id)
);
CREATE TABLE mi_documents (
 run_id TEXT NOT NULL REFERENCES mi_runs(run_id), name TEXT NOT NULL, content TEXT NOT NULL,
 sha256 TEXT NOT NULL, PRIMARY KEY(run_id,name)
);
CREATE TABLE mi_sources (
 run_id TEXT NOT NULL REFERENCES mi_runs(run_id), candidate_id TEXT NOT NULL, url TEXT NOT NULL,
 PRIMARY KEY(run_id,candidate_id,url)
);
CREATE TABLE mi_audit (
 event_id TEXT PRIMARY KEY, occurred_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
 actor TEXT NOT NULL, action TEXT NOT NULL, resource TEXT NOT NULL, outcome TEXT NOT NULL
);
CREATE INDEX mi_opportunities_score ON mi_opportunities(score DESC);
CREATE INDEX mi_versions_candidate ON mi_versions(candidate_id);
CREATE INDEX mi_audit_time ON mi_audit(occurred_at DESC);
