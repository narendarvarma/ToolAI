import { NextRequest, NextResponse } from "next/server"

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

interface Provider {
  name: string
  apiKey: string | undefined
  models: string[]
  endpoint: string | ((model: string) => string)
  extraHeaders?: Record<string, string>
  formatResponse: (data: any) => string
  formatBody: (model: string, messages: Message[], system?: string) => string
}

// ─── Rate limiting (in-memory, per IP) ───────────────────────────────────────

const rateLimit = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 20       // requests
const RATE_WINDOW = 60_000  // per 60 seconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

// ─── Fetch with timeout ───────────────────────────────────────────────────────

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = 15_000
): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

// ─── Standard OpenAI-compatible body ─────────────────────────────────────────

function openAIBody(model: string, messages: Message[], system?: string): string {
  return JSON.stringify({
    model,
    messages: system
      ? [{ role: "system", content: system }, ...messages]
      : messages,
    max_tokens: 2000,
    temperature: 0.7,
  })
}

// ─── Gemini body (preserves full conversation history) ───────────────────────

function geminiBody(messages: Message[], system?: string): string {
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }))
  return JSON.stringify({
    ...(system && {
      systemInstruction: { parts: [{ text: system }] },
    }),
    contents,
    generationConfig: { maxOutputTokens: 2000, temperature: 0.7 },
  })
}

// ─── Providers ────────────────────────────────────────────────────────────────

const PROVIDERS: Provider[] = [
  {
    name: "OpenRouter",
    apiKey: process.env.OPENROUTER_API_KEY, // ⚠️ never use NEXT_PUBLIC_ for secret keys
    models: [
      "google/gemma-4-26b-a4b-it:free",
      "meta-llama/llama-3.3-70b:free",
      "moonshotai/kimi-k2.6:free",
      "google/gemma-4-31b-it:free",
      "openai/gpt-oss-20b:free",
      "openai/gpt-oss-120b:free",
      "nousresearch/hermes-3-llama-3.1-405b:free",
    ],
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    extraHeaders: {
      "HTTP-Referer": process.env.SITE_URL || "https://gettoolai.in",
      "X-Title": "ToolHub AI",
    },
    formatBody: (model, messages, system) => openAIBody(model, messages, system),
    formatResponse: (data) => data.choices?.[0]?.message?.content || "",
  },
  {
    name: "Groq",
    apiKey: process.env.GROQ_API_KEY,
    models: ["llama-3.3-70b-versatile"],
    endpoint: "https://api.groq.com/openai/v1/chat/completions",
    formatBody: (model, messages, system) => openAIBody(model, messages, system),
    formatResponse: (data) => data.choices?.[0]?.message?.content || "",
  },
  {
    name: "Gemini",
    apiKey: process.env.GEMINI_API_KEY,
    models: ["gemini-2.0-flash", "gemini-1.5-flash"],
    endpoint: (model) =>
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    formatBody: (_model, messages, system) => geminiBody(messages, system),
    formatResponse: (data) =>
      data.candidates?.[0]?.content?.parts?.[0]?.text || "",
  },
  {
    name: "Cerebras",
    apiKey: process.env.CEREBRAS_API_KEY,
    models: ["llama-3.3-70b"],
    endpoint: "https://api.cerebras.ai/v1/chat/completions",
    formatBody: (model, messages, system) => openAIBody(model, messages, system),
    formatResponse: (data) => data.choices?.[0]?.message?.content || "",
  },
]

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 }
    )
  }

  // 2. Parse + validate input
  let messages: Message[], system: string | undefined
  try {
    const body = await req.json()
    messages = body.messages
    system = body.system

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages must be a non-empty array" },
        { status: 400 }
      )
    }

    // Sanitize: cap message count + content length
    messages = messages.slice(-20).map((m) => ({
      role: m.role,
      content: String(m.content).slice(0, 8000),
    }))

    if (system) system = String(system).slice(0, 2000)
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  // 3. Try providers in order
  let lastError = ""

  for (const provider of PROVIDERS) {
    if (!provider.apiKey) {
      console.log(`⏭️  Skipping ${provider.name} — API key not set`)
      continue
    }

    for (const model of provider.models) {
      try {
        const endpoint =
          typeof provider.endpoint === "function"
            ? provider.endpoint(model)
            : provider.endpoint

        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${provider.apiKey}`,
          ...provider.extraHeaders,
        }

        const res = await fetchWithTimeout(
          endpoint,
          { method: "POST", headers, body: provider.formatBody(model, messages, system) },
          15_000
        )

        if (!res.ok) {
          const errText = await res.text()
          console.log(`❌ ${provider.name}/${model} HTTP ${res.status}: ${errText.slice(0, 200)}`)
          lastError = `${provider.name}/${model}: HTTP ${res.status}`
          continue
        }

        const data = await res.json()

        if (data.error) {
          console.log(`❌ ${provider.name}/${model}: ${data.error.message}`)
          lastError = `${provider.name}/${model}: ${data.error.message}`
          continue
        }

        const result = provider.formatResponse(data)
        if (result) {
          console.log(`✅ ${provider.name}/${model} — ${result.length} chars`)
          return NextResponse.json({ result })
        }
      } catch (err: any) {
        const msg = err.name === "AbortError" ? "timeout" : err.message
        console.log(`❌ ${provider.name}/${model}: ${msg}`)
        lastError = `${provider.name}/${model}: ${msg}`
      }
    }
  }

  console.error(`💥 All providers failed. Last: ${lastError}`)
  return NextResponse.json(
    { error: "AI service temporarily unavailable. Please try again." },
    { status: 503 }
  )
}