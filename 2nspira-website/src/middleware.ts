import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const deploymentCommit = process.env.NEXT_PUBLIC_DEPLOYMENT_SHA ?? "development";

/**
 * Enforce the production canonical origin in one hop while preserving the
 * request path and query. Preview and local-development hosts pass through.
 */
export function middleware(request: NextRequest) {
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
    return response;
  }
  const response = NextResponse.next();
  response.headers.set("X-Deployment-Commit", deploymentCommit);
  return response;
}
