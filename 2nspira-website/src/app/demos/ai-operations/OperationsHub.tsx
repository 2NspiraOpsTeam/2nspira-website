"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Inbox,
  ShieldCheck,
  Sparkles,
  Workflow,
  RotateCcw,
  FileText,
  Send,
} from "lucide-react";
import { initial, invoices, samples, type State } from "@/lib/operations/model";
import styles from "./operations.module.css";
import VoiceInput from "./VoiceInput";
type Snapshot = { revision: number; state: State };
export default function OperationsHub() {
  const [snapshot, setSnapshot] = useState<Snapshot>({
      revision: 0,
      state: initial(),
    }),
    [ready, setReady] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const [selected, setSelected] = useState(0),
    [input, setInput] = useState(samples[0].text),
    [custom, setCustom] = useState(false),
    [confirm, setConfirm] = useState<
      "case" | "task" | "email" | "reset" | null
    >(null);
  const [listening, setListening] = useState(false);
  const outcome = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null),
    locked = useRef(false);
  const { state, revision } = snapshot;
  async function load() {
    try {
      const res = await fetch("/api/demos/operations", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw Error(data.message);
      setSnapshot(data);
      if (data.state.input) setInput(data.state.input);
      setError("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setReady(true);
    }
  }
  useEffect(() => {
    void load();
  }, []);
  useEffect(() => {
    if (confirm) dialog.current?.showModal();
    else dialog.current?.close();
  }, [confirm]);
  async function action(action: string, extra: Record<string, unknown> = {}) {
    if (locked.current) return false;
    locked.current = true;
    setBusy(true);
    setError("");
    try {
      let current = revision;
      if (action === "analyze") {
        // Establish a private session before the first request; GET never creates visitor state.
        if (state.phase === "empty") {
          const start = await fetch("/api/demos/operations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "start" }),
          });
          const data = await start.json();
          if (!start.ok) throw Error(data.message);
          current = data.revision;
          setSnapshot(data);
        }
      }
      const response = await fetch("/api/demos/operations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, revision: current, ...extra }),
      });
      const data = await response.json();
      if (!response.ok) throw Error(data.message);
      setSnapshot(data);
      if (action === "approve" || action === "send") {
        requestAnimationFrame(() => outcome.current?.scrollIntoView({ block: "start", behavior: "instant" }));
      }
      if (action === "start") {
        setInput(samples[0].text);
        setSelected(0);
        setCustom(false);
      }
      return true;
    } catch (e) {
      setError((e as Error).message); // Recover the authoritative state after an uncertain response without repeating a mutation.
      try {
        const r = await fetch("/api/demos/operations", { cache: "no-store" });
        if (r.ok) setSnapshot(await r.json());
      } catch {}
      return false;
    } finally {
      setBusy(false);
      locked.current = false;
    }
  }
  const analyzing = (busy && !state.proposal) || state.phase === "analyzing";
  const controlsBusy = busy || listening;
  function approval(part: "case" | "task" | "email") {
    setConfirm(part);
  }
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <div className={styles.intro}>
        <Link href="/demos/ai-invoice-workflow" className={styles.back}>
          ← AI Invoice Workflow overview
        </Link>
        <div className={styles.topline}>
          <span>
            <span className={styles.dot} /> INTERACTIVE DEMONSTRATION
          </span>
          <span>Real AI · Synthetic records · No outbound email</span>
        </div>
        <div className={styles.heroGrid}><div><h1>
          AI prepares the work.
          <br />
          <em>Your people decide.</em>
        </h1>
        <p className={styles.lead}>
          Turn an incoming request into a clear next step. Explore a real
          AI-assisted workflow—with a human in control of every action.
        </p>
        <a className={styles.heroStart} href="#operations-workspace">Step into the workspace ↓</a></div><figure className={styles.heroArtwork}><Image src="/images/demos/ai-operations-copper-20261116.webp" alt="Illustration of scattered invoices becoming connected cases, tasks and replies through a human approval gateway." width={1672} height={941} sizes="(min-width:900px) 600px, 100vw" unoptimized priority /><figcaption>Connected work. Human judgment.</figcaption></figure></div>
        <details className={styles.supportDetail}><summary>Want this kind of workflow for your business?</summary><p><Link href="/accounts-receivable-workflow-automation">Explore invoice workflow support</Link> or <Link href="/contact?service=automation#contact-message">discuss your invoice workflow</Link>. This sandbox demonstrates a capability, not customer results.</p></details>
        <div className={styles.badges}>
          <span>
            <ShieldCheck size={16} /> Approval before action
          </span>
          <span>
            <Sparkles size={16} /> Real Groq-powered analysis
          </span>
          <span>
            <Workflow size={16} /> Saved sandbox records
          </span>
        </div>
      </div>
      <section
        id="operations-workspace"
        className={styles.workspace}
        aria-label="AI Operations Hub workspace"
      >
        <header className={styles.workspaceHeader}>
          <div className={styles.brand}>
            <span className={styles.brandIcon}>
              <Workflow size={23} />
            </span>
            <div>
              <strong>Operations Hub</strong>
              <small>2Nspira · fictional business workspace</small>
            </div>
          </div>
          <button
            className={styles.secondary}
            disabled={!ready || controlsBusy}
            onClick={() => setConfirm("reset")}
          >
            <RotateCcw size={15} /> Reset demo
          </button>
        </header>
        <div className={styles.notice}>
          <ShieldCheck size={18} />
          <p>
            You manage internal billing requests and disputes. Review what AI prepares,
            then watch approved work appear in your saved sandbox workspace. Sessions expire after one hour. Use fictional
            information only; input is processed by Groq.
          </p>
        </div>
        <div className={styles.columns}>
          <aside className={styles.inbox}>
            <div className={styles.sectionLabel}>
              <Inbox size={17} /> 01 / SIMULATED INBOX
            </div>
            <h2>Choose a billing email</h2>
            <p className={styles.muted}>
              Explore internal handoffs for billing disputes, payment questions
              and invoice clarification.
            </p>
            <div className={styles.samples}>
              {samples.map((sample, i) => (
                <button
                  key={sample.title}
                  className={`${styles.sample} ${!custom && selected === i ? styles.selected : ""}`}
                  aria-pressed={!custom && selected === i}
                  disabled={controlsBusy}
                  onClick={() => {
                    setSelected(i);
                    setInput(sample.text);
                    setCustom(false);
                  }}
                >
                  <small>{sample.team}</small>
                  <strong>{sample.title}</strong>
                  <ArrowRight size={16} />
                </button>
              ))}
            </div>
            <button
              className={styles.custom}
              aria-pressed={custom}
              disabled={controlsBusy}
              onClick={() => {
                setCustom(true);
                setInput("");
              }}
            >
              + Write a fictional request
            </button>
            <VoiceInput disabled={!ready || busy} onListening={setListening} onTranscript={(text) => { setInput(text); setCustom(true); }} />
            <label className={styles.field}>
              Incoming email or request
              <textarea
                value={input}
                maxLength={2000}
                rows={6}
                disabled={controlsBusy}
                onChange={(e) => {
                  setInput(e.target.value);
                  setCustom(true);
                }}
              />
            </label>
            <div className={styles.count}>
              {input.length.toLocaleString()} / 2,000 characters
            </div>
            <button
              className={styles.primary}
              disabled={
                !ready || controlsBusy || !input.trim() || state.phase === "analyzing"
              }
              onClick={() => void action("analyze", { input })}
            >
              <Sparkles size={17} />
              {analyzing
                ? "Analyzing with real AI…"
                : state.proposal
                  ? "Process as a new request"
                  : "Process request"}
            </button>
            {state.proposal && (
              <p className={styles.caption}>
                Processing again replaces this session’s current sandbox records
                and approvals. Reset clears them.
              </p>
            )}
          </aside>
          <div className={styles.results}>
            <div className={styles.sectionLabel}>
              <Sparkles size={17} /> 02 / AI PREPARATION
            </div>
            <div role="status" aria-live="polite">
              {!ready ? (
                <p>Loading your saved workspace…</p>
              ) : analyzing ? (
                <div className={styles.processing}>
                  <Sparkles />
                  <h2>Waiting for real AI analysis</h2>
                  <p>
                    The model is preparing classification, routing and a reply.
                    Nothing has been approved or created.
                  </p>
                  <p>
                    No staged animation or invented result. This can take up to
                    20 seconds.
                  </p>
                </div>
              ) : state.phase === "error" ? (
                <div className={styles.empty}>
                  <h2>Analysis paused</h2>
                  <p>{state.error}</p>
                  <p>Use Process request to retry with the selected input.</p>
                </div>
              ) : !state.proposal ? (
                <div className={styles.empty}>
                  <div className={styles.orbit}>
                    <Workflow size={38} />
                  </div>
                  <h2>One request. A clearer path forward.</h2>
                  <p>
                    AI will summarize the issue, suggest a team, and prepare a
                    case, internal task and reply for your review.
                  </p>
                  <ol>
                    <li>Read a fictional message</li>
                    <li>Run real AI analysis</li>
                    <li>Review and approve each action</li>
                    <li>See the saved case, task and simulated reply</li>
                  </ol>
                  <span className={styles.tag}>No records created yet</span>
                </div>
              ) : null}
            </div>
            {error && (
              <div role="alert" className={styles.error}>
                {error}
                <button onClick={() => void load()} disabled={controlsBusy}>
                  Reload saved state
                </button>
              </div>
            )}
            {state.proposal && !analyzing && (
              <>
                <article className={styles.summary}>
                  <div className={styles.summaryTop}>
                    <span className={styles.tag}>
                      {state.proposal.classification}
                    </span>
                    <span className={styles.tag}>
                      {state.proposal.priority} priority
                    </span>
                  </div>
                  <h2>{state.proposal.caseTitle}</h2>
                  <p>{state.proposal.summary}</p>
                  <details className={styles.received}>
                    <summary>View the received request</summary>
                    <p>{state.input}</p>
                  </details>
                  <small>
                    Suggested owner: <strong>{state.proposal.team}</strong> · AI
                    proposal, not a verified conclusion
                  </small>
                </article>
                <div className={styles.sectionLabel}>
                  <ShieldCheck size={17} /> <span id="approval-queue">03 / HUMAN APPROVAL QUEUE</span>
                </div>
                <ReviewCard
                  key={`case-${state.input}`}
                  kind="case"
                  title="Proposed case"
                  state={state}
                  busy={controlsBusy}
                  onSave={(text, extra) =>
                    action("edit", { part: "case", text, ...extra })
                  }
                  onApprove={() => approval("case")}
                  onReject={() => action("reject", { part: "case" })}
                />
                <ReviewCard
                  key={`task-${state.input}`}
                  kind="task"
                  title="Internal investigation task"
                  state={state}
                  busy={controlsBusy}
                  onSave={(text) => action("edit", { part: "task", text })}
                  onApprove={() => approval("task")}
                  onReject={() => action("reject", { part: "task" })}
                />
                <ReviewCard
                  key={`email-${state.input}`}
                  kind="email"
                  title="Reply draft · simulated outbox"
                  state={state}
                  busy={controlsBusy}
                  onSave={(text) => action("edit", { part: "email", text })}
                  onApprove={() => approval("email")}
                  onReject={() => action("reject", { part: "email" })}
                />
                {state.email.status === "approved" && !state.sent && (
                  <button
                    className={styles.primary}
                    disabled={controlsBusy}
                    onClick={() => void action("send", { part: "email" })}
                  >
                    <Send size={16} /> Simulate sending approved reply
                  </button>
                )}
                <section ref={outcome} className={styles.outcomes} aria-labelledby="outcome-title" tabIndex={-1}>
                  <div className={styles.sectionLabel}><Workflow size={17} /> 04 / AFTER APPROVAL</div>
                  <h2 id="outcome-title">{state.case.id && state.task.id && state.sent ? "From incoming request to coordinated follow-through." : "Watch your approvals turn into work."}</h2>
                  <p role="status" aria-live="polite">{state.case.id && state.task.id && state.sent
                    ? "Your case is saved, its investigation task is linked, and your reviewed reply is in the simulated outbox. The investigation itself remains open."
                    : !state.case.id ? "Approve the case above to create the first saved record. Nothing is executed before your approval."
                    : !state.task.id ? "Case created. Next, review and approve the investigation task to give the team a clear next step."
                    : !state.sent ? "Case and task created. Review the reply, then choose Simulate sending approved reply to see it in the outbox."
                    : "The simulated reply is recorded. You can still review the remaining case and task proposals above."}</p>
                  <a className={styles.back} href="#approval-queue">Return to the approval queue ↑</a>
                  <div className={styles.executionGrid}>
                    <article className={styles.executionCard}>
                      <span className={styles.tag}>{state.case.id ? "Created · Open" : state.case.status === "rejected" ? "Rejected · Not created" : "Awaiting approval"}</span>
                      <h3>Case workspace</h3>
                      {state.case.id ? <><strong>{state.case.id}</strong><h4>{state.proposal.caseTitle}</h4><p>Owner: {state.proposal.team} · {state.proposal.priority} priority</p><p>{state.proposal.summary}</p></> : <p>A saved case will give this request an owner and a place to track follow-through.</p>}
                    </article>
                    <article className={styles.executionCard}>
                      <span className={styles.tag}>{state.task.id ? "Created · To do" : state.task.status === "rejected" ? "Rejected · Not created" : "Awaiting approval"}</span>
                      <h3>Team task board</h3>
                      {state.task.id ? <><strong>{state.task.id}</strong><p>{state.proposal.task}</p><p>Assigned team: {state.proposal.team}</p><p>Linked case: {state.case.id}</p><small>Task created, not completed. A person performs the investigation.</small></> : <p>The approved task will appear here, linked to its case and assigned team.</p>}
                    </article>
                    <article className={styles.executionCard}>
                      <span className={styles.tag}>{state.sent ? "Simulated sent" : state.email.status === "approved" ? "Approved · Ready to simulate" : state.email.status === "rejected" ? "Rejected · Not sent" : "Awaiting approval"}</span>
                      <h3>Simulated outbox</h3>
                      {state.sent ? <><p className={styles.proposal}>{state.proposal.draft}</p><small>No email was dispatched. This is the exact approved reply saved in your session.</small></> : <p>{state.email.status === "approved" ? "Your approved draft is ready. Use Simulate sending approved reply above; approval alone does not send it." : "Approve the reply, then explicitly simulate sending it. The saved message will appear here."}</p>}
                    </article>
                  </div>
                  <p className={styles.caption}>These are saved sandbox records, not connected business apps. Refresh to see your progress during this one-hour session. No refund, payment change or external message occurs.</p>
                  {Boolean(state.case.id || state.task.id || state.sent) && <div className={styles.nextStep}>
                    <h3>What could this look like for your team?</h3>
                    <p>Bring one recurring handoff. We’ll discuss the people, tools and approvals involved, and where AI-assisted work could fit. Your real systems would need a separately scoped integration.</p>
                    <Link className={styles.primary} href="/contact?service=automation#contact-message">Explore this for my business <ArrowRight size={16} /></Link>
                  </div>}
                </section>
              </>
            )}
          </div>
        </div>
        <div className={styles.bottomGrid}>
          <section className={styles.ledger}>
            <div className={styles.sectionLabel}>
              <FileText size={17} /> SYNTHETIC INVOICE RECORDS
            </div>
            <h2>The evidence, not an assumption.</h2>
            <p>
              Only these fictional records are supplied to AI. No accounting
              platform is connected.
            </p>
            {invoices.map((invoice) => (
              <div key={invoice.invoice} className={styles.invoice}>
                <strong>
                  {invoice.invoice} <span>{invoice.amount}</span>
                </strong>
                {invoice.entries.map((entry) => (
                  <small key={entry}>{entry}</small>
                ))}
                <p>{invoice.note}</p>
              </div>
            ))}
          </section>
          <section className={styles.timeline}>
            <div className={styles.sectionLabel}>
              <Workflow size={17} /> SAVED WORKFLOW TIMELINE
            </div>
            <h2>See who did what.</h2>
            {state.audit.length ? (
              <ol>
                {state.audit.map((item, i) => (
                  <li key={`${item.at}-${i}`}>
                    <span className={styles.auditDot} />
                    <small>
                      {item.actor} ·{" "}
                      {new Date(item.at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                    <p>{item.event}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p>
                Your activity will appear here after the request is received.
                The timeline reflects actual server events.
              </p>
            )}
          </section>
        </div>
      </section>
      <section className={styles.foot}>
        <h2>The pattern travels. The integration is specific.</h2>
        <p>
          Finance, client services, onboarding, operations: AI can help prepare
          the handoff. This demo connects only synthetic invoice context and its
          own sandbox records—not your inbox, HR system, project tools or
          accounting software.
        </p>
        <details>
          <summary>Privacy, limits and how this demonstration works</summary>
          <p>
            Requests go to the existing Groq service, using the website’s
            free-only configuration. Each run reserves one of 100 daily model
            requests with up to 1,200 output tokens; provider limits may be
            lower. Eight actions per minute per visitor apply. No automatic
            provider retries or paid fallback. Proposals, approved sandbox
            cases/tasks and audit records are stored in an isolated session for
            one hour, inaccessible after expiry and purged on subsequent demo
            activity. Reset deletes your previous session. Provider retention is
            governed by Groq’s policies; never enter confidential information.
            The reviewer identity here is a simulated role, not authenticated
            enterprise approval.
          </p>
        </details>
      </section>
      <dialog
        ref={dialog}
        className={styles.dialog}
        onCancel={() => setConfirm(null)}
        onClose={() => setConfirm(null)}
        aria-labelledby="approval-title"
      >
        <h2 id="approval-title">
          {confirm === "reset"
            ? "Reset this demonstration?"
            : `Approve this ${confirm}?`}
        </h2>
        <p>
          {confirm === "reset"
            ? "This clears your current sandbox cases, tasks, drafts and timeline. Other visitors are unaffected."
            : confirm === "email"
              ? "Approve the exact saved draft shown below. Sending remains a separate, simulated action. No real email can be sent."
              : `You are authorizing creation of this ${confirm} in your private demo session, not in a real business system.`}
        </p>
        {confirm && confirm !== "reset" && state.proposal && (
          <blockquote>
            {confirm === "case"
              ? `${state.proposal.caseTitle} · ${state.proposal.team} · ${state.proposal.priority}`
              : confirm === "task"
                ? state.proposal.task
                : state.proposal.draft}
          </blockquote>
        )}
        <div className={styles.actions}>
          <button className={styles.secondary} onClick={() => setConfirm(null)}>
            Cancel
          </button>
          <button
            className={styles.primary}
            disabled={controlsBusy}
            onClick={() => {
              const choice = confirm;
              setConfirm(null);
              if (choice === "reset") void action("start");
              else if (choice) void action("approve", { part: choice });
            }}
          >
            {confirm === "reset" ? "Reset my demo" : "Confirm approval"}
          </button>
        </div>
      </dialog>
    </main>
  );
}
function ReviewCard({
  kind,
  title,
  state,
  busy,
  onSave,
  onApprove,
  onReject,
}: {
  kind: "case" | "task" | "email";
  title: string;
  state: State;
  busy: boolean;
  onSave: (text: string, extra?: Record<string, string>) => Promise<boolean>;
  onApprove: () => void;
  onReject: () => Promise<boolean>;
}) {
  const p = state.proposal!,
    item = state[kind],
    value = kind === "case" ? p.caseTitle : kind === "task" ? p.task : p.draft;
  const [editing, setEditing] = useState(false),
    [text, setText] = useState(value),
    [team, setTeam] = useState(p.team),
    [priority, setPriority] = useState(p.priority);
  const immutable =
    (kind !== "email" && item.status === "approved") ||
    (kind === "email" && state.sent);
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{title}</h3>
        <span
          className={`${styles.tag} ${item.status === "approved" ? styles.approved : ""}`}
        >
          {kind === "email" && state.sent
            ? "Simulated sent"
            : item.status === "pending"
              ? "Pending review"
              : item.status}
        </span>
      </div>
      {editing ? (
        <>
          <label className={styles.field}>
            {kind === "email"
              ? "Reply text"
              : kind === "case"
                ? "Case title"
                : "Task instructions"}
            <textarea
              rows={kind === "email" ? 7 : 3}
              maxLength={kind === "email" ? 1600 : kind === "case" ? 160 : 500}
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={busy}
            />
          </label>
          {kind === "case" && (
            <>
              <label className={styles.field}>
                Assigned team
                <input
                  value={team}
                  maxLength={100}
                  onChange={(e) => setTeam(e.target.value)}
                />
              </label>
              <label className={styles.field}>
                Priority
                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as typeof priority)
                  }
                >
                  <option>Low</option>
                  <option>Normal</option>
                  <option>High</option>
                </select>
              </label>
            </>
          )}
          <div className={styles.actions}>
            <button
              className={styles.primary}
              disabled={busy || !text.trim() || !team.trim()}
              onClick={async () => {
                if (await onSave(text, { team, priority })) setEditing(false);
              }}
            >
              Save for fresh review
            </button>
            <button
              className={styles.secondary}
              disabled={busy}
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className={styles.proposal}>{value}</p>
          {kind === "case" && (
            <small>
              {p.team} · {p.priority} priority
            </small>
          )}
          {kind === "task" && (
            <small>
              Assigned to {p.team}
              {state.case.id
                ? ` · Linked to ${state.case.id}`
                : " · Requires an approved case"}
            </small>
          )}
          {item.id && (
            <p className={styles.record}>
              <Check size={15} /> Saved sandbox record:{" "}
              <strong>{item.id}</strong>
            </p>
          )}
          <div className={styles.actions}>
            {!immutable && (
              <button
                className={styles.secondary}
                disabled={busy}
                onClick={() => {
                  setText(value);
                  setTeam(p.team);
                  setPriority(p.priority);
                  setEditing(true);
                }}
              >
                {item.status === "rejected" ? "Revise for review" : "Edit"}
              </button>
            )}
            {item.status === "pending" && (
              <>
                <button
                  className={styles.primary}
                  disabled={
                    busy ||
                    (kind === "task" && state.case.status !== "approved")
                  }
                  onClick={onApprove}
                >
                  {kind === "email"
                    ? "Review & approve reply"
                    : `Review & create ${kind}`}
                </button>
                <button
                  className={styles.reject}
                  disabled={busy}
                  onClick={() => void onReject()}
                >
                  Reject
                </button>
              </>
            )}
          </div>
        </>
      )}
    </article>
  );
}
