CREATE TABLE IF NOT EXISTS career_jobs (id TEXT PRIMARY KEY, data TEXT NOT NULL, status TEXT NOT NULL CHECK(status IN ('draft','published','closed')), revision INTEGER NOT NULL, updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS career_settings (id INTEGER PRIMARY KEY CHECK(id=1), data TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS career_applications (id TEXT PRIMARY KEY, job_id TEXT NOT NULL REFERENCES career_jobs(id), request_key TEXT NOT NULL UNIQUE, payload_hash TEXT NOT NULL, data TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'New' CHECK(status IN ('New','Reviewing','Interviewing','Closed')), created_at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS career_applications_role ON career_applications(job_id,created_at);
CREATE TABLE IF NOT EXISTS career_mail (id TEXT PRIMARY KEY, application_id TEXT NOT NULL REFERENCES career_applications(id) ON DELETE CASCADE, kind TEXT NOT NULL, recipient TEXT NOT NULL, subject TEXT NOT NULL, body TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'pending', provider_id TEXT, updated_at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS career_mail_pending ON career_mail(status,updated_at);
CREATE TABLE IF NOT EXISTS career_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS career_files (key TEXT NOT NULL, part INTEGER NOT NULL, data TEXT NOT NULL, created_at TEXT NOT NULL, PRIMARY KEY(key,part));
