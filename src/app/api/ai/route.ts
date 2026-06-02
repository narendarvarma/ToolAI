import { NextRequest, NextResponse } from "next/server"

const PROVIDERS = [
  {
    name: "OpenRouter",
    apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
    models: [
      "openrouter/owl-alpha",
      "google/gemma-4-26b-a4b-it:free",
      "meta-llama/llama-3.3-70b:free",
      "moonshotai/kimi-k2.6:free",
      "google/gemma-4-31b-it:free",
      "openai/gpt-oss-20b:free",
      "openai/gpt-oss-120b:free",
      "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
      "nousresearch/hermes-3-llama-3.1-405b:free"
    ],
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    headers: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://toolhub.vercel.app",
      "X-Title": "ToolAI",
    },
    formatResponse: (data: any) => data.choices?.[0]?.message?.content || ""
  },
  {
    name: "Groq",
    apiKey: process.env.GROQ_API_KEY,
    models: ["llama-3.3-70b-versatile"],
    endpoint: "https://api.groq.com/openai/v1/chat/completions",
    headers: {},
    formatResponse: (data: any) => data.choices?.[0]?.message?.content || ""
  },
  {
    name: "Gemini",
    apiKey: process.env.GEMINI_API_KEY,
    models: ["gemini-2.0-flash"],
    endpoint: (model: string) => `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    headers: {},
    formatResponse: (data: any) => data.candidates?.[0]?.content?.parts?.[0]?.text || "",
    isGemini: true
  },
  {
    name: "Cerebras",
    apiKey: process.env.CEREBRAS_API_KEY,
    models: ["llama-3.3-70b"],
    endpoint: "https://api.cerebras.ai/v1/chat/completions",
    headers: {},
    formatResponse: (data: any) => data.choices?.[0]?.message?.content || ""
  }
]

export async function POST(req: NextRequest) {
  const { messages, system } = await req.json()

  console.log(`🚀 AI Request Started`)
  console.log(`📝 Messages: ${messages.length} message(s)`)
  console.log(`🔧 System prompt: ${system ? 'Yes' : 'No'}`)

  let result = ""
  let lastError = ""

  for (const provider of PROVIDERS) {
    if (!provider.apiKey) {
      console.log(`⏭️ Skipping ${provider.name} - API key not set`)
      continue
    }

    console.log(`🔄 Trying provider: ${provider.name}`)

    for (const model of provider.models) {
      try {
        console.log(`📡 Trying model: ${model}`)

        const endpoint = typeof provider.endpoint === 'function' ? provider.endpoint(model) : provider.endpoint

        const body = provider.isGemini
          ? JSON.stringify({ contents: [{ parts: [{ text: messages.map((m: any) => m.content).join("\n") }] }] })
          : JSON.stringify({
              model,
              messages: system ? [{ role: "system", content: system }, ...messages] : messages,
              max_tokens: 2000,
              temperature: 0.7,
            })

        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${provider.apiKey}`,
        }
        Object.entries(provider.headers).forEach(([key, value]) => {
          headers[key] = value
        })

        const res = await fetch(endpoint, {
          method: "POST",
          headers,
          body,
        })

        const data = await res.json()

        if (data.error) {
          console.log(`❌ Model ${model} failed: ${data.error.message}`)
          lastError = `${provider.name}/${model}: ${data.error.message}`
          continue
        }

        result = provider.formatResponse(data)
        if (result) {
          console.log(`✅ Success with ${provider.name}/${model} - Response length: ${result.length} chars`)
          return NextResponse.json({ result })
        }

      } catch (err: any) {
        console.log(`❌ Model ${model} error: ${err.message}`)
        lastError = `${provider.name}/${model}: ${err.message}`
        continue
      }
    }
  }

  console.error(`💥 All providers and models failed. Last error:`, lastError)
  return NextResponse.json(
    { error: `All providers failed. Last error: ${lastError}` },
    { status: 500 }
  )
}