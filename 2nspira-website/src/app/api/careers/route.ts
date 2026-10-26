import {
  route,
  response,
  publicJobs,
  publicPrivacy,
} from "@/lib/careers/server";
export async function GET() {
  return route(async () =>
    response({ jobs: await publicJobs(), privacy: await publicPrivacy() }),
  );
}
