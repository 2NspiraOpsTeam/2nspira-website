"use client";
import { useState, useSyncExternalStore } from "react";
const subscribeReady = () => () => {};
const readySnapshot = () => true;
const serverReadySnapshot = () => false;
import { ArrowRight, Check, CircleDot, Inbox, Layers3 } from "lucide-react";
import styles from "./WorkflowPreview.module.css";
const examples = [
  { name: "Client intake", before: ["An inbox request", "Copy to a spreadsheet", "Chase the next step"], after: ["Capture details once", "Assign the right owner", "See what happens next"], outcome: "A clearer start for your team and your customer." },
  { name: "Approvals", before: ["Send an email", "Search for the latest file", "Ask who approved it"], after: ["Submit one request", "Route it for review", "Keep a decision record"], outcome: "Clear ownership, with human review where it matters." },
  { name: "Reporting", before: ["Export separate files", "Reconcile by hand", "Repeat next week"], after: ["Connect useful data", "Check shared definitions", "See a consistent view"], outcome: "Less assembly work. More time to understand the information." },
];
export default function WorkflowPreview() {
  const ready = useSyncExternalStore(subscribeReady, readySnapshot, serverReadySnapshot);
  const [selected, setSelected] = useState(0);
  const [delivery, setDelivery] = useState<"ready" | "failed" | "recorded">("ready");
  const example = examples[selected];
  return <div className="mt-8">
    <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Choose an example workflow">
      {examples.map((e, i) => <button key={e.name} type="button" disabled={!ready} aria-pressed={selected === i} aria-controls="workflow-comparison" onClick={() => setSelected(i)} className={`min-h-11 rounded-full border px-5 disabled:cursor-wait disabled:opacity-60 py-2.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${selected === i ? "border-accent bg-accent text-white" : "border-line bg-white text-ink hover:border-accent"}`}>{e.name}</button>)}
    </div>
    <div id="workflow-comparison" className="grid gap-5 lg:grid-cols-2" aria-live="polite" aria-atomic="true">
      <div key={`${selected}-before`} className={`${styles.panel} rounded-3xl border border-line bg-canvas-deep p-6 sm:p-8`}>
        <p className="flex items-center gap-2 text-sm font-semibold text-muted"><Layers3 size={18} aria-hidden="true" />When work is disconnected</p>
        <ol className="mt-6 space-y-3">{example.before.map((step, i) => <li key={step} className="flex min-h-14 items-center gap-4 rounded-2xl border border-line bg-white px-4 py-3"><span className="text-sm font-medium text-muted">0{i + 1}</span><span className="font-medium text-ink">{step}</span><Inbox aria-hidden="true" className="ml-auto h-4 w-4 shrink-0 text-muted" /></li>)}</ol>
      </div>
      <div key={`${selected}-after`} className={`${styles.panel} rounded-3xl border border-accent/25 bg-accent-soft p-6 sm:p-8`}>
        <p className="flex items-center gap-2 text-sm font-semibold text-accent"><CircleDot size={18} aria-hidden="true" />A better-connected workflow</p>
        <ol className="mt-6 space-y-3">{example.after.map((step, i) => <li key={step} className="flex min-h-14 items-center gap-4 rounded-2xl border border-accent/15 bg-white px-4 py-3"><Check aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" /><span className="font-medium text-ink">{step}</span>{i < 2 && <ArrowRight aria-hidden="true" className="ml-auto h-4 w-4 shrink-0 text-accent" />}</li>)}</ol>
      </div>
      <p className="text-base font-medium text-ink lg:col-span-2">{example.outcome}</p>
    </div>
    <details className="mt-8 rounded-2xl border border-line bg-white p-6"><summary className="min-h-11 cursor-pointer rounded py-2 font-medium text-ink focus-visible:outline-2 focus-visible:outline-accent">Try an illustrative integration handoff</summary>
      <p className="mt-3 text-sm leading-7 text-body">Fictional walkthrough only. No external tools are connected and no records are sent or saved. Reloading resets this sample.</p>
      <ol className="mt-5 list-decimal space-y-3 pl-5 leading-7 text-body"><li>Trigger: a fictional request arrives.</li><li>Record: prepare one request with a stable reference.</li><li>Approval: the responsible human reviews it before the handoff.</li><li>Delivery: if the destination is unavailable, retain the same reference for a safe retry.</li><li>Handover: record the outcome and assign the operating owner.</li></ol>
      <div className="mt-5 flex flex-wrap gap-3"><button type="button" disabled={!ready || delivery !== "ready"} onClick={() => setDelivery("failed")} className="min-h-11 rounded-full border border-line px-5 py-2 text-sm font-medium text-ink disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-accent">Simulate unavailable destination</button><button type="button" disabled={!ready || delivery !== "failed"} onClick={() => setDelivery("recorded")} className="min-h-11 rounded-full border border-line px-5 py-2 text-sm font-medium text-ink disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-accent">Retry same request</button><button type="button" disabled={!ready || delivery === "ready"} onClick={() => setDelivery("ready")} className="min-h-11 rounded-full border border-line px-5 py-2 text-sm font-medium text-ink disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-accent">Reset sample</button></div>
      <p role="status" className="mt-4 leading-7 text-body">{delivery === "ready" ? "Sample request DEMO-001 is ready for an approved handoff." : delivery === "failed" ? "Destination unavailable. DEMO-001 remains pending; no completed record is shown." : "DEMO-001 recorded once in this sample. Retry is disabled; the operating owner can review the outcome."}</p>
    </details>
    <p className="mt-3 text-xs leading-6 text-muted">Illustrative workflows, not client results. Connections, permissions and safeguards depend on your systems and agreed scope.</p>
  </div>;
}
