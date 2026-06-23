// src/lib/ai-fallback.ts

const FREE_MODELS = [
  // Premium free models
  "openai/gpt-oss-120b:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "google/gemma-4-31b:free",
  "z-ai/glm-4.5-air:free",

  // Strong backups
  "openai/gpt-oss-20b:free",
  "google/gemma-4-26b-a4b:free",
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "qwen/qwen3-coder-480b-a35b:free",

  // Additional backups
  "nousresearch/hermes-3-405b-instruct:free",
  "nvidia/nemotron-3-super:free",
  "moonshotai/kimi-k2.6:free",
  "meta-llama/llama-3.2-3b-instruct:free",

  // Emergency fallbacks
  "nvidia/nemotron-3-nano-omni:free",
  "nvidia/nemotron-3-nano-30b-a3b:free",
  "liquid/lfm2.5-1.2b-instruct:free",
  "liquid/lfm2.5-1.2b-thinking:free"
];

interface Message {
  role: string;
  content: string;
}

export interface AIResponse {
  reply: string | null;
  model: string | null;
  error?: string;
}

export async function callWithFallback(
  messages: Message[],
  systemPrompt = ""
): Promise<AIResponse> {
  const allMessages = systemPrompt
    ? [{ role: "system", content: systemPrompt }, ...messages]
    : messages;

  for (const model of FREE_MODELS) {
    try {
      console.log("=================================");
      console.log("Trying model:", model);
      console.log(
        "Key exists:",
        !!process.env.OPENROUTER_API_KEY
      );
      console.log("=================================");

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "HTTP-Referer": "https://gettoolai.in",
            "X-Title": "GetTool AI",
          },
          body: JSON.stringify({
            model,
            messages: allMessages,
            max_tokens: 1024,
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();

      console.log("Status:", response.status);
      console.log("Response:", data);

      if (response.ok) {
        return {
          reply: data?.choices?.[0]?.message?.content || "",
          model,
        };
      }

      console.log(`❌ Failed model: ${model}`);
    } catch (error) {
      console.error(`❌ Error with ${model}:`, error);
    }
  }

  return {
    reply: null,
    model: null,
    error: "All free models are currently unavailable.",
  };
}