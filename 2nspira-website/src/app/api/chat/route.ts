import { env } from "cloudflare:workers";
import { handleChat, type ChatEnv } from "@/lib/chat/handler";
export async function POST(request: Request) {
  return handleChat(request, env as unknown as ChatEnv);
}
