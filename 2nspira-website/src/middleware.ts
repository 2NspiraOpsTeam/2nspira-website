import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}
