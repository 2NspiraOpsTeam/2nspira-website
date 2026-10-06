"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ActivationForm() {
  const token = useSearchParams().get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function activate(event: React.FormEvent) {
    event.preventDefault();
    if (!token) return setError("This activation link is invalid.");
    if (password !== confirm) return setError("Passwords do not match.");
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/portal/auth/activate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (!response.ok) throw new Error(response.status === 403 ? "This link has expired or has already been used." : "Activation failed. Please try again.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Activation failed. Please try again.");
    } finally { setBusy(false); }
  }

  return <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-6">
    <h1 className="mb-3 text-2xl font-semibold">Activate your 2Nspira account</h1>
    {done ? <p>Your account is ready. <Link className="underline" href="/portal/login">Sign in</Link></p> :
      token ? <form onSubmit={activate} className="space-y-4">
        <p>Choose a password to finish setting up your portal access.</p>
        <label className="block">Password<input className="mt-1 w-full rounded border p-3" type="password" autoComplete="new-password" minLength={8} required value={password} onChange={e => setPassword(e.target.value)} /></label>
        <label className="block">Confirm password<input className="mt-1 w-full rounded border p-3" type="password" autoComplete="new-password" minLength={8} required value={confirm} onChange={e => setConfirm(e.target.value)} /></label>
        {error && <p role="alert" className="text-red-700">{error}</p>}
        <button className="rounded bg-accent px-5 py-3 text-white disabled:opacity-50" disabled={busy}>{busy ? "Activating…" : "Activate account"}</button>
      </form> : <p role="alert">This activation link is invalid. Please request a new invitation.</p>}
  </main>;
}

export default function ActivatePage() {
  return <Suspense fallback={<main className="p-6">Loading activation…</main>}><ActivationForm /></Suspense>;
}
