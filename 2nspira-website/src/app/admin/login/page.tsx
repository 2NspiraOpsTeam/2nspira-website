import { redirect } from "next/navigation";

/**
 * Single-login model: /portal/login is the one user-facing sign-in for both
 * admin and client accounts. This route only exists so existing links,
 * 401 handlers, and bookmarks keep working — it hands off immediately.
 */
export default function AdminLoginPage() {
  redirect("/portal/login");
}
