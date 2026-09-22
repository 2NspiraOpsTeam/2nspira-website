import Link from "next/link";
import Image from "next/image";
import SignInForm from "@/components/portal/SignInForm";

export default function SignInPage() {
  return <main className="portal-signin"><section className="portal-signin-brand"><Link href="/"><Image src="/images/logo/2nspira-logo.png" alt="2Nspira home" width={320} height={132} priority /></Link><div><p>CLIENT PORTAL</p><h1>A calmer way to see the work, billing, and relationship in one place.</h1><span>Your services, invoices, payments, and account details—organized around your business, not a billing platform.</span></div><small>Secure by design · Organization-scoped access</small></section><section className="portal-signin-panel"><div className="portal-signin-box"><p className="portal-kicker">WELCOME BACK</p><h2>Sign in to your account</h2><p>Use your 2Nspira client credentials to continue.</p><div className="portal-demo-callout"><strong>Demo account</strong><span>Pre-filled credentials represent fictional test data only.</span></div><SignInForm /><Link href="/" className="portal-text-link">← Return to 2nspira.com</Link></div></section></main>;
}
