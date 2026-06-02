import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { messages, system } = await req.json()

  const provider = process.env.AI_PROVIDER || "groq"

  console.log(`🚀 AI Request - Provider: ${provider}`)
  console.log(`📝 Messages: ${messages.length} message(s)`)
  console.log(`🔧 System prompt: ${system ? 'Yes' : 'No'}`)

  try {
    let result = ""

    // ── GROQ ──────────────────────────────────────────
    if (provider === "groq") {
      console.log(`📡 Calling Groq API...`)
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: system
            ? [{ role: "system", content: system }, ...messages]
            : messages,
          max_tokens: 2000,
          temperature: 0.7,
        }),
      })
      const data = await res.json()
      if (data.error) {
        console.error(`❌ Groq API Error:`, data.error.message)
        throw new Error(data.error.message)
      }
      result = data.choices?.[0]?.message?.content || ""
      console.log(`✅ Groq API Success - Response length: ${result.length} chars`)
    }

    // ── GEMINI ────────────────────────────────────────
    else if (provider === "gemini") {
      console.log(`📡 Calling Gemini API...`)
      const prompt = messages.map((m: any) => m.content).join("\n")
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      )
      const data = await res.json()
      if (data.error) {
        console.error(`❌ Gemini API Error:`, data.error.message)
        throw new Error(data.error.message)
      }
      result = data.candidates?.[0]?.content?.parts?.[0]?.text || ""
      console.log(`✅ Gemini API Success - Response length: ${result.length} chars`)
    }

    // ── CEREBRAS ──────────────────────────────────────
    else if (provider === "cerebras") {
      console.log(`📡 Calling Cerebras API...`)
      const res = await fetch("https://api.cerebras.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.CEREBRAS_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b",
          messages: system
            ? [{ role: "system", content: system }, ...messages]
            : messages,
          max_tokens: 2000,
        }),
      })
      const data = await res.json()
      if (data.error) {
        console.error(`❌ Cerebras API Error:`, data.error.message)
        throw new Error(data.error.message)
      }
      result = data.choices?.[0]?.message?.content || ""
      console.log(`✅ Cerebras API Success - Response length: ${result.length} chars`)
    }

    // ── OPENROUTER ────────────────────────────────────
    else if (provider === "openrouter") {
      console.log(`📡 Calling OpenRouter API...`)
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://gettoolai.in",
          "X-Title": "AI Tools",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: system
            ? [{ role: "system", content: system }, ...messages]
            : messages,
          max_tokens: 2000,
        }),
      })
      const data = await res.json()
      if (data.error) {
        console.error(`❌ OpenRouter API Error:`, data.error.message)
        throw new Error(data.error.message)
      }
      result = data.choices?.[0]?.message?.content || ""
      console.log(`✅ OpenRouter API Success - Response length: ${result.length} chars`)
    }

    // ── UNKNOWN PROVIDER ───────────────────────────────
    else {
      console.error(`❌ Unknown provider: ${provider}`)
      throw new Error(`Unknown AI provider: ${provider}`)
    }

    console.log(`🎉 AI Request Completed Successfully`)
    return NextResponse.json({ result })

  } catch (err: any) {
    console.error(`💥 AI Request Failed:`, err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
