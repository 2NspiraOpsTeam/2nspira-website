import { route, response, publicJobs, settings } from "@/lib/careers/server";
export async function GET() {
  return route(async () =>
    response({ jobs: await publicJobs(), privacy: await settings() }),
  );
}
