"use client";

import { useState, useSyncExternalStore } from "react";
import { Wrench, Activity, Sparkles, Compass, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { buttonSecondary, cardFlat, h3 } from "@/components/ui";
import styles from "./ManagedSupportOptions.module.css";
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
const options = [
  { title: "Website care", Icon: Wrench, hint: "Keep the foundations in shape.", heading: "Care for the site you rely on.", intro: "Explore a maintenance plan for your existing website and its supported dependencies.", points: ["Hosting coordination and access review", "Planned maintenance and dependency updates", "Checks after agreed changes"], scope: "Confirm the site, providers, access, maintenance windows and backup responsibilities. Support for an existing site starts with a suitability review." },
  { title: "Monitoring & review", Icon: Activity, hint: "Know what needs attention.", heading: "Turn agreed checks into useful next steps.", intro: "Discuss what to check, how findings are reviewed and who handles the next action.", points: ["Agreed health checks and review cadence", "Issue records and responsible owners", "Useful reporting and escalation routes"], scope: "Confirm the systems, check frequency, notification routing and response expectations. Monitoring does not mean continuous human coverage." },
  { title: "Changes & improvements", Icon: Sparkles, hint: "Make the next change safely.", heading: "Keep improving without losing the thread.", intro: "Bring a content change, usability issue or focused enhancement for review.", points: ["A clear request and agreed priority", "Authorization before implementation", "Verification and a recorded outcome"], scope: "Confirm what is included, any additional cost, risks and acceptance checks. New project work and unlimited changes are not automatically included." },
  { title: "Support planning", Icon: Compass, hint: "Get responsibilities clear.", heading: "Start with a shared support plan.", intro: "Map the systems, people and providers involved before committing to ongoing coverage.", points: ["System inventory and named contacts", "Coverage boundaries and escalation", "Review, reporting and handover needs"], scope: "Confirm the scope, responsibilities and fees in writing. Broader Technology Advisory & Leadership is a separate engagement unless explicitly included." },
];

export default function ManagedSupportOptions() {
  const ready = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [selected, setSelected] = useState(0);
  const active = options[selected];
  if (!ready) return <div className="mt-8 grid gap-4 md:grid-cols-2">{options.map(option => <details key={option.title} className={`p-6 ${cardFlat}`}><summary className="min-h-11 cursor-pointer py-2 font-medium text-ink">{option.title} — {option.hint}</summary><p className="mt-3 leading-7 text-body">{option.intro}</p><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-body">{option.points.map(point => <li key={point}>{point}</li>)}</ul><p className="mt-4 text-sm leading-6 text-body">{option.scope}</p></details>)}</div>;
  return <div className="mt-8 min-w-0" data-support-options>
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4" role="group" aria-label="Choose a support area">
      {options.map(({title, Icon, hint}, index) => <button key={title} type="button" aria-pressed={selected === index} aria-controls="support-option-panel" onClick={() => setSelected(index)} className={`${styles.choice} ${selected === index ? styles.selected : ""}`}><span className={styles.icon}><Icon size={23} aria-hidden="true" /></span><span className="block font-medium text-ink">{title}</span><span className="mt-2 block text-sm leading-6 text-body">{hint}</span></button>)}
    </div>
    <div id="support-option-panel" className={`mt-5 p-6 sm:p-8 ${cardFlat}`}>
      <div key={active.title} className={`${styles.panel} grid items-start gap-6 lg:grid-cols-2`}>
        <div aria-live="polite" aria-atomic="true"><p className="text-sm font-semibold text-accent">{active.title}</p><h3 className={`mt-3 ${h3}`}>{active.heading}</h3><p className="mt-3 leading-7 text-body">{active.intro}</p><ul className="mt-5 space-y-3">{active.points.map(point => <li key={point} className="flex gap-3 text-sm leading-6 text-body"><Check size={18} className="mt-1 shrink-0 text-accent" aria-hidden="true" />{point}</li>)}</ul></div>
        <div className="rounded-2xl bg-canvas-deep p-5"><p className="font-medium text-ink">Clear scope. No assumptions.</p><details className="mt-3"><summary className="min-h-11 cursor-pointer rounded py-2 text-sm font-medium text-accent focus-visible:outline-2 focus-visible:outline-accent">What we agree before starting</summary><p className="mt-2 text-sm leading-7 text-body">{active.scope}</p></details><Link href="/contact?service=support#contact-message" className={`mt-5 ${buttonSecondary}`}>Discuss this support area<ArrowUpRight size={16} aria-hidden="true" /></Link></div>
      </div>
    </div>
  </div>;
}
