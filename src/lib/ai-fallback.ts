// AI Model Fallback Utility for Free OpenRouter Models

const FREE_MODELS = [
  "nvidia/nemotron-nano-3b-v1:free",
  "deepseek/deepseek-v4-flash:free",
  "moonshotai/kimi-k2.6:free",
  "google/gemma-4-26b-a4b-it:free",
  "google/gemma-4-31b-it:free",
  "minimax/minimax-m2.5:free",
  "liquid/lfm2.5-1.2b-instruct:free",
  "qwen/qwen3-next-80b-a3b-instruct:free",
];

let currentModelIndex = 0;
const exhaustedModels = new Set<number>();

export interface AIResponse {
  reply: string | null;
  model: string | null;
  error?: string;
}

export async function callWithFallback(
  messages: { role: string; content: string }[],
  systemPrompt: string = ""
): Promise<AIResponse> {
  const allMessages = systemPrompt
    ? [{ role: "system", content: systemPrompt }, ...messages]
    : messages;

  while (currentModelIndex < FREE_MODELS.length) {
    if (exhaustedModels.has(currentModelIndex)) {
      currentModelIndex++;
      continue;
    }

    const model = FREE_MODELS[currentModelIndex];

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://gettoolai.in",
          "X-Title": "ToolHub",
        },
        body: JSON.stringify({
          model: model,
          messages: allMessages,
          max_tokens: 1024,
        }),
      });

      // Success
      if (response.ok) {
        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content;
        console.log(`✅ Responded by: ${model}`);
        return { reply, model };
      }

      // Rate limit or payment — switch model
      if ([429, 402, 503, 502].includes(response.status)) {
        console.warn(`⚠️ Model ${model} hit limit (${response.status}), switching...`);
        exhaustedModels.add(currentModelIndex);
        currentModelIndex++;
        continue;
      }

      // Other error — also skip
      const err = await response.json().catch(() => ({}));
      console.error(`❌ Model ${model} error:`, err?.error?.message);
      exhaustedModels.add(currentModelIndex);
      currentModelIndex++;

    } catch (networkError) {
      console.error(`🔌 Network error on ${model}:`, networkError);
      exhaustedModels.add(currentModelIndex);
      currentModelIndex++;
    }
  }

  // All models exhausted
  return { 
    reply: null, 
    model: null, 
    error: "All free models exhausted. Try again later." 
  };
}

export function resetModelFallback() {
  currentModelIndex = 0;
  exhaustedModels.clear();
  console.log("🔁 Model fallback queue reset.");
}

// Auto-reset every 60 minutes (free model limits refresh)
if (typeof window !== 'undefined') {
  setInterval(resetModelFallback, 60 * 60 * 1000);
}
