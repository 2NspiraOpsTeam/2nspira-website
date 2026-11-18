import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const deploymentCommit = process.env.NEXT_PUBLIC_DEPLOYMENT_SHA ?? "development";

/**
 * Session cookies issued by the client-portal-v1 worker (source of truth for
 * credentials and sessions). The website only enforces "the right kind of
 * session cookie is present" before serving authenticated pages; credential
 * validation always happens on the worker.
 */
const ADMIN_SESSION_COOKIE = "admin_session";
const CLIENT_SESSION_COOKIE = "client_portal_session";

/**
 * Enforce the production canonical origin in one hop while preserving the
 * request path and query. Preview and local-development hosts pass through.
 * Also gates /admin/* and /portal/* pages on the matching session cookie,
 * redirecting anonymous users to the single login entry point (/portal/login).
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!request.cookies.get(ADMIN_SESSION_COOKIE)?.value) {
      return secureResponse(redirectToLogin(request), pathname);
    }
  } else if (
    pathname.startsWith("/portal") &&
    pathname !== "/portal/login" &&
    pathname !== "/portal/activate" &&
    pathname !== "/portal/register"
  ) {
    if (!request.cookies.get(CLIENT_SESSION_COOKIE)?.value) {
      return secureResponse(redirectToLogin(request), pathname);
    }
  }

  const hostname = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim();
  const protocol = forwardedProtocol || request.nextUrl.protocol.replace(":", "");
  const isProductionHost = hostname === "2nspira.com" || hostname === "www.2nspira.com";
  const needsCanonicalRedirect =
    isProductionHost &&
    (protocol !== "https" || hostname === "www.2nspira.com");

  if (needsCanonicalRedirect) {
    const url = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, "https://2nspira.com");
    const response = new NextResponse(null, {
      status: 301,
      headers: { Location: url.toString() },
    });
    response.headers.set("X-Deployment-Commit", deploymentCommit);
    return secureResponse(response, pathname);
  }
  const response = NextResponse.next();
  response.headers.set("X-Deployment-Commit", deploymentCommit);
  return secureResponse(response, pathname);
}

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/portal/login";
  url.search = "";
  return NextResponse.redirect(url, 307);
}

/** Apply to redirects as well as rendered pages; APIs never enter shared caches. */
function secureResponse(response: NextResponse, pathname: string) {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  // Preserve intentional iframe embedding of public demonstrations.
  if (/^\/(?:admin|portal)(?:\/|$)/.test(pathname) || pathname.startsWith("/api/")) {
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Content-Security-Policy", "frame-ancestors 'none'");
  }
  return response;
}
