import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
export function createDB() {
 const sqlite = new DatabaseSync(':memory:');
 sqlite.exec(readFileSync(new URL('../migrations/0001_hub.sql', import.meta.url), 'utf8'));
 function prepared(sql, values = []) {
  const statement = sqlite.prepare(sql);
  return { bind: (...next) => prepared(sql, next), first: async () => statement.get(...values) || null, all: async () => ({ results: statement.all(...values) }), run: async () => statement.run(...values) };
 }
 return { sqlite, prepare: prepared, batch: async statements => { sqlite.exec('BEGIN'); try { const result = []; for (const s of statements) result.push(await s.run()); sqlite.exec('COMMIT'); return result; } catch(e) { sqlite.exec('ROLLBACK'); throw e; } } };
}
export function seed(db) {
 db.sqlite.exec(`INSERT INTO hub_customers VALUES ('demo-orbit','Orbit Studio — synthetic','https://github.com/2NspiraOpsTeam/2nspira-website/issues/186','2026-11-08T00:00:00Z',1);
 INSERT INTO hub_projects VALUES ('demo-hub','demo-orbit','Synthetic customer dashboard','in_progress','cleo','https://github.com/2NspiraOpsTeam/2nspira-website/issues/187','2026-11-08T00:00:00Z');
 INSERT INTO hub_notes VALUES ('demo-note','demo-orbit','Synthetic note: confirm authorized scope before execution.','cleo','2026-11-08T00:00:00Z');`);
}
