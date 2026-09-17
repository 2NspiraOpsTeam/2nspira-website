const deploymentCommit = process.env.NEXT_PUBLIC_DEPLOYMENT_SHA ?? "development";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    { commit: deploymentCommit },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Deployment-Commit": deploymentCommit,
      },
    },
  );
}
