ALTER TABLE mi_runs ADD COLUMN canonical_hash TEXT;
ALTER TABLE mi_versions ADD COLUMN observed_at TEXT;
UPDATE mi_versions SET observed_at=(SELECT observed_at FROM mi_runs WHERE mi_runs.run_id=mi_versions.run_id);
CREATE UNIQUE INDEX mi_versions_observation ON mi_versions(candidate_id,observed_at);
