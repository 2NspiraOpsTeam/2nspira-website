export type Agent = 'cleo' | 'adam' | 'brian' | 'maya' | 'dax';
export type TaskStatus = 'queued' | 'in_progress' | 'blocked' | 'ready_for_review' | 'done';
export interface Customer { customer_id: string; name: string; source_url: string; observed_at: string; synthetic: 0 | 1 }
export interface Project { project_id: string; customer_id: string; name: string; status: TaskStatus; owner: Agent; issue_url: string; updated_at: string }
export interface Note { note_id: string; customer_id: string; body: string; actor: Agent; occurred_at: string }
export interface CustomerDetail { customer: Customer; projects: Project[]; notes: Note[] }
export interface Metric { value: number | null; status: 'not_connected' | 'verified'; unit: 'count' | 'USD' }
export interface Identity { token_sha256: string; actor: Agent; role: 'reader' | 'writer'; customer_ids: string[] }
export interface ResearchSnapshot { schema_version: string; source_observed_at: string; integration_status: string; top_opportunities: { candidate_id: string; title: string; score: number; confidence: string; observed_at: string; run_id: string }[] }
