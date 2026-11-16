import { env } from "cloudflare:workers";
import { handleOperations, type OperationsEnv } from "@/lib/operations/handler";
export const GET = (request: Request) =>
  handleOperations(request, env as unknown as OperationsEnv);
export const POST = (request: Request) =>
  handleOperations(request, env as unknown as OperationsEnv);
