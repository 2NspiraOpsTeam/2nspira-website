"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/portal/auth-client";

const nav = [
  ["Overview", "/account"],
  ["Services", "/account/services"],
  ["Billing", "/account/billing"],
  ["Invoices", "/account/invoices"],
  ["Account", "/account/settings"],
] as const;

export default function PortalShell({ children, organizationName, userName, userEmail }: { children: React.ReactNode; organizationName: string; userName: string; userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const initials = userName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const active = (href: string) => href === "/account" ? pathname === href : pathname.startsWith(href);

  async function logout() {
    await authClient.signOut();
    router.push("/account/sign-in");
    router.refresh();
  }

  const navigation = <nav aria-label="Client portal" className="space-y-1">{nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setMobileOpen(false)} aria-current={active(href) ? "page" : undefined} className="portal-nav-link"><span aria-hidden="true" className="portal-nav-dot" />{label}</Link>)}</nav>;

  return <div className="portal-root">
    <a href="#portal-main" className="skip-link">Skip to portal content</a>
    <aside className="portal-sidebar">
      <Link href="/account" className="portal-brand" aria-label="2Nspira client portal home"><Image src="/images/logo/2nspira-logo.png" alt="2Nspira" width={320} height={132} /><span>Client Portal</span></Link>
      <div className="portal-org"><span>Organization</span><strong>{organizationName}</strong><small>Secure client workspace</small></div>
      {navigation}
      <div className="portal-sidebar-note"><span aria-hidden="true">◇</span><p><strong>Need help?</strong><br />hello@2nspira.com</p></div>
    </aside>
    {mobileOpen && <button className="portal-mobile-backdrop" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    {mobileOpen && <div className="portal-mobile-panel is-open"><div className="portal-mobile-panel-head"><span>Client Portal</span><button onClick={() => setMobileOpen(false)} aria-label="Close navigation">×</button></div><div className="portal-org"><span>Organization</span><strong>{organizationName}</strong></div>{navigation}</div>}
    <div className="portal-workspace">
      <header className="portal-header">
        <button className="portal-menu-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation" aria-expanded={mobileOpen}>☰</button>
        <Link href="/account" className="portal-mobile-brand"><Image src="/images/logo/2nspira-logo.png" alt="2Nspira" width={320} height={132} /></Link>
        <div className="portal-profile-wrap">
          <button className="portal-profile" onClick={() => setProfileOpen((value) => !value)} aria-expanded={profileOpen} aria-haspopup="menu"><span className="portal-avatar">{initials}</span><span className="portal-profile-copy"><strong>{userName}</strong><small>{userEmail}</small></span><span aria-hidden="true">⌄</span></button>
          {profileOpen && <div className="portal-profile-menu" role="menu"><Link href="/account/settings" role="menuitem" onClick={() => setProfileOpen(false)}>Account settings</Link><button role="menuitem" onClick={logout}>Log out</button></div>}
        </div>
      </header>
      <main id="portal-main" className="portal-main">{children}</main>
      <footer className="portal-footer"><span>© {new Date().getFullYear()} 2Nspira</span><span>Secure client portal · Demo environment</span></footer>
    </div>
  </div>;
}
