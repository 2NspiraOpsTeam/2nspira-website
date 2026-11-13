"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Send, X, RotateCcw, ArrowUpRight } from "lucide-react";
import styles from "./WebsiteChat.module.css";

type Entry = { role: "user" | "assistant"; text: string; sources?: { title: string; href: string }[] };
const starters = ["How can you help my business with AI?", "Can you build a website with a client portal?", "What does a fractional CIO do?"];
const demoAnswers = [
  "We help you turn AI experimentation into practical, responsible adoption: assessing readiness, prioritizing opportunities, training teams, and setting governance and privacy guardrails. Tell our team about the workflow you want to improve to explore a suitable starting point.",
  "Our Websites & Digital Platforms work connects customer-facing experiences with business operations. That can include client portals, payments, integrations and AI-ready architecture. Scope, pricing and timing depend on your project; our team can discuss those details with you.",
  "A fractional CIO provides senior technology leadership without a full-time executive hire. 2Nspira helps with technology strategy, modernization priorities, investment decisions, governance and vendor guidance. Contact our team to explore what would fit your organization.",
];

export function ChatPanel({ demo = false, onClose }: { demo?: boolean; onClose?: () => void }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [limited, setLimited] = useState(false);
  const [used, setUsed] = useState(0);
  const locked = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => { bottom.current?.scrollIntoView({ block: "nearest" }); }, [entries, busy, notice]);
  function reset() {
    controller.current?.abort();
    setEntries([]); setQuestion("");
    if (!limited || demo) setNotice("");
    // Clearing does not reset a live provider/server limit.
    if (demo) { setUsed(0); setLimited(false); }
    input.current?.focus();
  }
  async function ask(value: string) {
    const text = value.trim();
    if (locked.current || limited || !text || text.length > 600) return;
    locked.current = true; setBusy(true); setNotice("");
    controller.current = new AbortController();
    const timer = setTimeout(() => controller.current?.abort(), 20000);
    try {
      if (demo) {
        await new Promise(resolve => setTimeout(resolve, 450));
        if (controller.current.signal.aborted) return;
        if (used >= 3) { setLimited(true); setNotice("The sample free allowance is used up. Your next step is a conversation with our team."); return; }
        const index = starters.indexOf(text);
        setEntries(previous => [...previous, { role: "user", text }, { role: "assistant", text: index >= 0 ? demoAnswers[index] : "This is a scripted demonstration, not a live AI answer. Try one of the example questions to explore the experience, or contact our team about your project.", sources: [{ title: "Explore our services", href: "/services" }] }]);
        setUsed(n => n + 1); setQuestion(""); return;
      }
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: text }), signal: controller.current.signal });
      const data = await response.json();
      if (!response.ok) {
        setNotice(typeof data.message === "string" ? data.message : "We could not complete your question. Please contact the team.");
        if (response.status === 429) setLimited(true);
        return;
      }
      if (typeof data.answer !== "string") throw new Error("Missing answer");
      // Only static same-site sources may become clickable links; AI prose is text.
      const sources = Array.isArray(data.sources) ? data.sources.filter((s: { href?: unknown; title?: unknown }) => typeof s.title === "string" && typeof s.href === "string" && ["/ai-enablement", "/automation-systems-optimization", "/websites", "/fractional-cio", "/managed-services-support", "/contact"].includes(s.href)) : [];
      setEntries(previous => [...previous.slice(-14), { role: "user", text }, { role: "assistant", text: data.answer, sources }]);
      setQuestion("");
    } catch {
      setNotice("We could not connect to the assistant. Your question is still here; you can retry or contact our team.");
    } finally { clearTimeout(timer); locked.current = false; setBusy(false); }
  }
  return <section className={styles.panel} aria-label={demo ? "Chatbot demonstration" : "Ask 2Nspira AI"}>
    <header className={styles.header}>
      <div className={styles.mark}><MessageCircle size={21} aria-hidden="true" /></div>
      <div><h2>Ask 2Nspira</h2><p>{demo ? "Interactive sample · no AI calls" : "AI guide · human expertise, one click away"}</p></div>
      {onClose && <button type="button" onClick={onClose} aria-label="Close assistant" className={styles.icon}><X size={21} /></button>}
    </header>
    <div className={styles.conversation}>
      <div className={styles.welcome}><span className={styles.eyebrow}>A practical place to start</span><h3>What would you like to make possible?</h3><p>Explore our services, find a starting point, or connect with the people behind 2Nspira.</p></div>
      {entries.length === 0 && <div className={styles.starters}>{starters.map(s => <button key={s} disabled={!ready || busy || limited} onClick={() => void ask(s)}>{s}<ArrowUpRight size={16} aria-hidden="true" /></button>)}</div>}
      <div role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions text">{entries.map((entry, i) => <div key={i} className={entry.role === "user" ? styles.user : styles.answer}><span className={styles.speaker}>{entry.role === "user" ? "You" : demo ? "Sample answer" : "2Nspira AI"}</span><p>{entry.text}</p>{entry.sources && <nav aria-label="Related service pages" className={styles.sources}>{entry.sources.map(s => <a key={s.href} href={s.href}>{s.title} ↗</a>)}</nav>}</div>)}</div>
      {busy && <p role="status" className={styles.status}>Preparing an answer…</p>}
      {notice && <div role="status" className={styles.notice}><p>{notice}</p><a href="/contact">Contact 2Nspira <ArrowUpRight size={16} aria-hidden="true" /></a>{limited && !demo && <button onClick={() => { setLimited(false); setNotice(""); }}>Try again later</button>}</div>}
      <div ref={bottom} />
    </div>
    <div className={styles.composer}>
      <p className={styles.privacy}>{demo ? "Scripted preview. Three sample answers, then a limit handoff. No questions leave this browser." : "AI can make mistakes. Questions go to our AI provider; do not share confidential or personal information. Each question is answered independently."} <a href="/privacy-policy">Privacy</a></p>
      <form onSubmit={e => { e.preventDefault(); void ask(question); }}>
        <label className={styles.label} htmlFor={demo ? "demo-question" : "chat-question"}>Your question</label>
        <div className={styles.inputRow}><textarea ref={input} id={demo ? "demo-question" : "chat-question"} value={question} onChange={e => setQuestion(e.target.value)} maxLength={600} rows={2} disabled={!ready || busy || limited} placeholder="Ask about your next project…" /><button type="submit" disabled={!ready || busy || limited || !question.trim()} aria-label="Send question"><Send size={18} /></button></div>
        <div className={styles.controls}><span>{question.length}/600{demo ? ` · ${used}/3 sample answers` : ""}</span><button type="button" onClick={reset} disabled={busy}><RotateCcw size={13} aria-hidden="true" />{demo ? "Restart demo" : "Clear chat"}</button></div>
      </form>
      <a className={styles.contact} href="/contact">Prefer a person? Talk to our team ↗</a>
    </div>
  </section>;
}
function ChatLauncher() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (open) dialog.current?.showModal(); else dialog.current?.close(); }, [open]);
  return <><button ref={launcher} disabled={!ready} type="button" className={styles.launcher} onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}><MessageCircle size={20} aria-hidden="true" />Ask 2Nspira</button><dialog ref={dialog} className={styles.dialog} aria-label="Ask 2Nspira AI assistant" onCancel={() => setOpen(false)} onClose={() => { setOpen(false); launcher.current?.focus(); }} onClick={e => { if (e.target === dialog.current) setOpen(false); }}>{open && <ChatPanel onClose={() => setOpen(false)} />}</dialog></>;
}

export default function WebsiteChat() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/portal") || pathname === "/chatbot-demo") return null;
  return <ChatLauncher key={pathname} />;
}
