import { NextRequest, NextResponse } from "next/server"

const FREE_MODELS = [
  "openrouter/auto",
  "meta-llama/llama-3.3-70b:free",
  "deepseek/deepseek-r1:free",
  "google/gemma-2-9b-it:free",
  "deepseek/deepseek-r1-distill-llama-70b:free",
]

export async function POST(req: NextRequest) {
  const { messages, system } = await req.json()

  const key = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
  if (!key) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY is not set" },
      { status: 500 }
    )
  }

  let result = ""
  let lastError = ""

  for (const model of FREE_MODELS) {
    try {
      console.log(`📡 Trying model: ${model}`)

      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${key}`,
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://toolhub.vercel.app",
          "X-Title": "ToolAI",
        },
        body: JSON.stringify({
          model,
          messages: system
            ? [{ role: "system", content: system }, ...messages]
            : messages,
          max_tokens: 2000,
          temperature: 0.7,
        }),
      })

      const data = await res.json()

      if (data.error) {
        console.log(`❌ Model ${model} failed: ${data.error.message}`)
        lastError = data.error.message || JSON.stringify(data.error)
        continue
      }

      result = data.choices?.[0]?.message?.content || ""
      if (result) {
        console.log(`✅ Success with model: ${model}`)
        break
      }

    } catch (err: any) {
      console.log(`❌ Model ${model} error: ${err.message}`)
      lastError = err.message
      continue
    }
  }

  if (!result) {
    return NextResponse.json(
      { error: `All models failed. Last error: ${lastError}` },
      { status: 500 }
    )
  }
  return NextResponse.json({ result })
}