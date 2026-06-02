import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { messages, system } = await req.json()

  const key = process.env.OPENROUTER_API_KEY
  if (!key) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY is not set in environment variables" },
      { status: 500 }
    )
  }

  console.log(`🚀 AI Request - OpenRouter`)
  console.log(`� Messages: ${messages.length} message(s)`)
  console.log(`🔧 System prompt: ${system ? 'Yes' : 'No'}`)

  try {
    console.log(`📡 Calling OpenRouter API...`)
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://gettoolai.in",
        "X-Title": "ToolAI",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: system
          ? [{ role: "system", content: system }, ...messages]
          : messages,
        max_tokens: 2000,
        temperature: 0.7,
      }),
    })

    const data = await res.json()

    if (data.error) {
      console.error(`❌ OpenRouter API Error:`, data.error.message || JSON.stringify(data.error))
      throw new Error(data.error.message || JSON.stringify(data.error))
    }

    const result = data.choices?.[0]?.message?.content || ""
    console.log(`✅ OpenRouter API Success - Response length: ${result.length} chars`)
    return NextResponse.json({ result })

  } catch (err: any) {
    console.error(`💥 AI Request Failed:`, err.message)
    return NextResponse.json(
      { error: err.message || "AI request failed" },
      { status: 500 }
    )
  }
}
