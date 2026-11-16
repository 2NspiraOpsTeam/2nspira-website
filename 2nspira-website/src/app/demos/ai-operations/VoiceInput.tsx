"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Mic, Square } from "lucide-react";
import styles from "./operations.module.css";

type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: { results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
};
type SpeechWindow = Window & {
  SpeechRecognition?: new () => Recognition;
  webkitSpeechRecognition?: new () => Recognition;
};
const subscribe = () => () => {};
const speechSupported = () => { const speech = window as SpeechWindow; return Boolean(speech.SpeechRecognition || speech.webkitSpeechRecognition); };
export default function VoiceInput({ disabled, onTranscript, onListening }: {
  disabled: boolean;
  onTranscript: (text: string) => void;
  onListening: (listening: boolean) => void;
}) {
  const supported = useSyncExternalStore(subscribe, speechSupported, () => false);
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState("");
  const recognition = useRef<Recognition | null>(null);
  const transcriptCallback = useRef(onTranscript);
  const listeningCallback = useRef(onListening);
  useEffect(() => { transcriptCallback.current = onTranscript; listeningCallback.current = onListening; });
  useEffect(() => {
    return () => {
      const active = recognition.current;
      if (active) { active.onend = null; active.onresult = null; active.onerror = null; active.abort(); }
    };
  }, []);
  function start() {
    if (recognition.current || disabled) return;
    const speech = window as SpeechWindow;
    const Constructor = speech.SpeechRecognition || speech.webkitSpeechRecognition;
    if (!Constructor) return;
    const active = new Constructor();
    recognition.current = active;
    active.lang = "en-US";
    active.continuous = false;
    active.interimResults = false;
    let received = false;
    let failed = false;
    active.onresult = (event) => {
      const text = Array.from(event.results).filter(result => result.isFinal).map(result => result[0].transcript).join(" ").trim();
      if (text) {
        received = true;
        transcriptCallback.current(text.slice(0, 2000));
        setMessage(text.length > 2000 ? "Transcript limited to 2,000 characters. Review it before processing." : "Transcript ready. Review or edit your message, then choose Process request.");
      }
    };
    active.onerror = (event) => {
      failed = true;
      setMessage(event.error === "not-allowed" || event.error === "service-not-allowed"
        ? "Microphone access was not allowed. You can type your request or enable microphone access in your browser."
        : event.error === "no-speech" ? "No speech detected. Try again or type your request."
        : "Voice input could not finish. Your existing message is unchanged unless a transcript appeared. Try again or type instead.");
    };
    active.onend = () => {
      recognition.current = null;
      setListening(false);
      listeningCallback.current(false);
      if (!received && !failed) setMessage("No transcript received. Your message is unchanged. Try again or type instead.");
    };
    try {
      setMessage("Listening… Speak a fictional request. Stop when you are finished.");
      setListening(true);
      listeningCallback.current(true);
      active.start();
    } catch {
      recognition.current = null;
      setListening(false);
      listeningCallback.current(false);
      setMessage("Voice input is unavailable right now. Please type your request.");
    }
  }
  return <div className={styles.voice}>
    <button className={styles.secondary} type="button" disabled={!supported || (disabled && !listening)} aria-pressed={listening}
      onClick={() => listening ? recognition.current?.stop() : start()}>
      {listening ? <Square size={16} /> : <Mic size={16} />}{listening ? "Stop listening" : "Speak your request"}
    </button>
    <p className={styles.caption}>English voice input replaces the message below. Your browser may send audio to its speech service. Use fictional details only. Voice never approves or submits actions.</p>
    <p role="status" aria-live="polite" className={styles.caption}>{message || (supported ? "Microphone starts only when you choose Speak your request." : "Voice input is not supported in this browser. Type your request below.")}</p>
  </div>;
}
