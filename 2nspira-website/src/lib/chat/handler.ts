import { sources, systemPrompt } from "./knowledge";
export interface ChatEnv {
  CHAT_API_KEY?: string;
  // Deployment attestation: operator must verify an unbilled Free organization.
  CHAT_FREE_ONLY?: string;
  CHAT_RATE_LIMIT?: { limit(input: { key: string }): Promise<{ success: boolean }> };
}
const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
function reply(status: number, message: string, code: string, retry = false) {
  return Response.json({ message, code, contactUrl: "/contact" }, { status, headers: { ...headers, ...(retry ? { "Retry-After": "60" } : {}) } });
}
export async function handleChat(request: Request, env: ChatEnv, providerFetch: typeof fetch = fetch): Promise<Response> {
  const url = new URL(request.url);
  if (request.headers.get("origin") !== url.origin) return reply(403, "Please ask from the 2Nspira website.", "origin");
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply(415, "Please send a text question.", "validation");
  // Bound the actual stream, not just a caller-supplied content-length.
  let raw = "";
  const reader = request.body?.getReader();
  if (!reader) return reply(400, "Please enter a question.", "validation");
  const decoder = new TextDecoder();
  let bytes = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      bytes += part.value.byteLength;
      if (bytes > 4096) { await reader.cancel(); return reply(413, "Please keep your question under 600 characters.", "validation"); }
      raw += decoder.decode(part.value, { stream: true });
    }
    raw += decoder.decode();
  } catch { return reply(400, "We could not read that question. Please try again.", "validation"); }
  let question: unknown;
  try { const payload = JSON.parse(raw); question = payload?.question; } catch { return reply(400, "Please enter a valid question.", "validation"); }
  if (typeof question !== "string" || !question.trim() || question.length > 600) return reply(422, "Enter a question between 1 and 600 characters.", "validation");
  if (!env.CHAT_API_KEY || env.CHAT_FREE_ONLY !== "verified" || !env.CHAT_RATE_LIMIT) return reply(503, "Our AI assistant is not available right now. The team can help through our contact page.", "unavailable");
  try {
    const ip = request.headers.get("cf-connecting-ip") ?? "local";
    const hash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${url.hostname}:${ip}`))), x => x.toString(16).padStart(2, "0")).join("");
    const visitor = await env.CHAT_RATE_LIMIT.limit({ key: `visitor:${hash}` });
    const shared = await env.CHAT_RATE_LIMIT.limit({ key: "site" });
    if (!visitor.success || !shared.success) return reply(429, "Our free chat allowance is taking a breather. Please contact 2Nspira for more information, or try again later.", "limit", true);
    // No automatic retries, paid fallback, tools, conversation uploads or storage.
    const response = await providerFetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.CHAT_API_KEY}` },
      body: JSON.stringify({ model: "qwen/qwen3.8-27b", messages: [{ role: "system", content: systemPrompt }, { role: "user", content: question.trim() }], max_completion_tokens: 384, temperature: 0.2, reasoning_effort: "none" }),
      signal: AbortSignal.timeout(15000),
    });
    if (response.status === 429) return reply(429, "Our free AI allowance has been reached. Please contact 2Nspira for more information, or try again later.", "limit", true);
    if (!response.ok) return reply(503, "Our AI assistant is temporarily unavailable. Please contact the team for help.", "unavailable");
    const data = await response.json() as { choices?: { message?: { content?: unknown } }[] };
    const answer = data.choices?.[0]?.message?.content;
    if (typeof answer !== "string" || !answer.trim() || answer.length > 6000) return reply(503, "We could not complete that answer. Please contact the team or try again.", "unavailable");
    return Response.json({ answer: answer.trim(), sources: sources.map(({ title, href }) => ({ title, href })) }, { headers });
  } catch { return reply(503, "Our AI assistant could not connect. Please contact the team or try again.", "unavailable"); }
}
