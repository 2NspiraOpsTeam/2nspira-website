import { route, apply } from "@/lib/careers/server";
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  return route(async () => apply(request, (await params).id));
}
