"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/portal/auth-client";

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("peter@demo.2nspira.com");
  const [password, setPassword] = useState("PortalDemo!2026");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true); setError("");
    const result = await authClient.signIn.email({ email, password, callbackURL: "/account" });
    setPending(false);
    if (result.error) { setError("We couldn’t sign you in. Check your email and password."); return; }
    router.push("/account"); router.refresh();
  }

  return <form onSubmit={submit} className="portal-signin-form">
    <label>Email address<input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
    <label>Password<input type="password" autoComplete="current-password" required minLength={10} value={password} onChange={(e) => setPassword(e.target.value)} /></label>
    {error && <p className="portal-form-error" role="alert">{error}</p>}
    <button type="submit" className="portal-primary-button" disabled={pending}>{pending ? "Signing in…" : "Sign in securely"}</button>
    <p className="portal-form-note">Account recovery and email verification delivery will be enabled with the production email provider.</p>
  </form>;
}
