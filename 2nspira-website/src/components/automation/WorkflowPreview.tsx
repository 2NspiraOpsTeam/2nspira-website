"use client";
import { useState } from "react";
import { ArrowRight, Check, CircleDot, Inbox, Layers3 } from "lucide-react";
import styles from "./WorkflowPreview.module.css";
const examples = [
  { name: "Client intake", before: ["An inbox request", "Copy to a spreadsheet", "Chase the next step"], after: ["Capture details once", "Assign the right owner", "See what happens next"], outcome: "A clearer start for your team and your customer." },
  { name: "Approvals", before: ["Send an email", "Search for the latest file", "Ask who approved it"], after: ["Submit one request", "Route it for review", "Keep a decision record"], outcome: "Clear ownership, with human review where it matters." },
  { name: "Reporting", before: ["Export separate files", "Reconcile by hand", "Repeat next week"], after: ["Connect useful data", "Check shared definitions", "See a consistent view"], outcome: "Less assembly work. More time to understand the information." },
];
export default function WorkflowPreview() {
  const [selected, setSelected] = useState(0);
  const example = examples[selected];
  return <div className="mt-8">
    <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Choose an example workflow">
      {examples.map((e, i) => <button key={e.name} type="button" aria-pressed={selected === i} aria-controls="workflow-comparison" onClick={() => setSelected(i)} className={`min-h-11 rounded-full border px-5 py-2.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${selected === i ? "border-accent bg-accent text-white" : "border-line bg-white text-ink hover:border-accent"}`}>{e.name}</button>)}
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
    <p className="mt-3 text-xs leading-6 text-muted">Illustrative workflows, not client results. Connections, permissions and safeguards depend on your systems and agreed scope.</p>
  </div>;
}
