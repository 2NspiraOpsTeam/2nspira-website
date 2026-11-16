"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./engagement.module.css";
const scenes = [
  { title: "Find an answer", prompt: "Where is our approved guidance?", result: "Bring relevant guidance together.", text: "Explore selected knowledge sources, then check the answer against the original guidance.", image: "/images/hero/ai-human-led-v3.webp", alt: "Illustrative team reviewing connected information in a shared workspace." },
  { title: "Prepare a response", prompt: "What should we say next?", result: "Start with a draft. Finish with judgment.", text: "Use approved context to prepare a response. Your team checks accuracy, tone and what should be shared.", image: "/images/posts/ai-agents-human-accountability-20261030.webp", alt: "Concept illustration of a human overseeing connected AI workspaces." },
  { title: "Move work forward", prompt: "Who owns the next step?", result: "Connect the handoff. Keep the approval.", text: "Explore a fictional invoice dispute: AI proposes a case, a task and a reply. You decide what happens next.", image: "/images/demos/ai-invoice-workflow-20261116.webp", alt: "Concept illustration of invoices moving toward a human approval checkpoint." }
];
export default function WorkflowExplorer() {
 const [selected, setSelected] = useState(0);
 const scene = scenes[selected];
 return <div className={styles.explorer}>
  <div className={styles.controls} role="group" aria-label="Explore a workflow">{scenes.map((item, i) => <button key={item.title} type="button" aria-pressed={selected === i} aria-controls="workflow-preview" onClick={() => setSelected(i)}><span>0{i + 1}</span>{item.title}<span aria-hidden="true">↗</span></button>)}</div>
  <div id="workflow-preview" className={styles.preview}>
   {/* Native image keeps this lightweight interactive preview independent of image-loader state. */}
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img src={scene.image} alt={scene.alt} width={1536} height={864} loading="lazy" />
   <div className={styles.previewCopy} aria-live="polite" aria-atomic="true"><p className={styles.kicker}>{scene.prompt}</p><h3>{scene.result}</h3><p>{scene.text}</p><Link href="/demos/ai-operations">Try the invoice-dispute demo →</Link></div>
  </div>
  <p className={styles.note}>Illustrative possibilities, not client results. Fictional sandbox · Human approval · No outbound email.</p>
 </div>;
}
