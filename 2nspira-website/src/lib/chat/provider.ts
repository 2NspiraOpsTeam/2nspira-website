// Shared server-only transport. No tools, history, outbound communication or paid fallback.
export const AI_MODEL = "qwen/qwen3.8-27b";
export function requestCompletion(
  key: string,
  messages: { role: "system" | "user"; content: string }[],
  options: { tokens: number; timeout: number; json?: boolean },
  providerFetch: typeof fetch = fetch,
) {
  return providerFetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: AI_MODEL,
      messages,
      max_completion_tokens: options.tokens,
      temperature: 0.2,
      reasoning_effort: "none",
      ...(options.json ? { response_format: { type: "json_object" } } : {}),
    }),
    signal: AbortSignal.timeout(options.timeout),
  });
}
