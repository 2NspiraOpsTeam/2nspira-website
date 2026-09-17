import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const deploymentCommit = process.env.NEXT_PUBLIC_DEPLOYMENT_SHA ?? "development";

/**
 * www → apex canonical redirect.
 * Once 2nspira.com is the canonical production host, any request arriving on
 * www.2nspira.com (including legacy Wix-era bookmarks) 301-redirects to the
 * apex with path + query preserved. Non-www requests pass through untouched.
 */
export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  if (host.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.hostname = host.slice("www.".length);
    const response = NextResponse.redirect(url, 301);
    response.headers.set("X-Deployment-Commit", deploymentCommit);
    return response;
  }
  const response = NextResponse.next();
  response.headers.set("X-Deployment-Commit", deploymentCommit);
  return response;
}
