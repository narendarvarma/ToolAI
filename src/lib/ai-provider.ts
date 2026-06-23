interface Message {
  role: string;
  content: string;
}

export interface AIResponse {
  reply: string | null;
  model: string | null;
  provider: string | null;
  error?: string;
}

async function tryGemini(messages: Message[], maxTokens: number = 2000, retryCount: number = 0): Promise<AIResponse> {
  console.log("Trying Gemini")
  
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured")
  }

  const userMessage = messages.find(m => m.role === 'user')?.content || ''
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000)
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }],
        generationConfig: { maxOutputTokens: maxTokens }
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const error = await response.text()
      const status = response.status
      
      // Don't retry auth errors, rate limits, or invalid requests
      if (status === 401 || status === 403 || status === 429 || status === 400) {
        throw new Error(`Gemini API error: ${status} - ${error}`)
      }
      
      // Retry once for network errors
      if (retryCount === 0) {
        console.log("Gemini network error, retrying...")
        return tryGemini(messages, maxTokens, retryCount + 1)
      }
      
      throw new Error(`Gemini API error: ${status} - ${error}`)
    }

    const data = await response.json()
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!content || content.trim() === '') {
      throw new Error("Gemini returned empty response")
    }

    console.log("Gemini success")
    return { reply: content, model: 'gemini-2.5-flash', provider: 'Gemini' }
  } catch (error: any) {
    clearTimeout(timeoutId)
    
    if (error.name === 'AbortError') {
      console.log("Gemini timeout")
      throw new Error("Gemini timeout after 15 seconds")
    }
    
    // Retry once for network errors
    if (retryCount === 0 && error.message.includes('fetch') || error.message.includes('network')) {
      console.log("Gemini network error, retrying...")
      return tryGemini(messages, maxTokens, retryCount + 1)
    }
    
    console.log("Gemini failed")
    throw error
  }
}

async function tryGroq(messages: Message[], maxTokens: number = 2000, retryCount: number = 0): Promise<AIResponse> {
  console.log("Trying Groq")
  
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    throw new Error("GROQ_API_KEY not configured")
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000)
  
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        max_tokens: maxTokens
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const error = await response.text()
      const status = response.status
      
      // Don't retry auth errors, rate limits, or invalid requests
      if (status === 401 || status === 403 || status === 429 || status === 400) {
        throw new Error(`Groq API error: ${status} - ${error}`)
      }
      
      // Retry once for network errors
      if (retryCount === 0) {
        console.log("Groq network error, retrying...")
        return tryGroq(messages, maxTokens, retryCount + 1)
      }
      
      throw new Error(`Groq API error: ${status} - ${error}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content || content.trim() === '') {
      throw new Error("Groq returned empty response")
    }

    console.log("Groq success")
    return { reply: content, model: 'llama-3.3-70b-versatile', provider: 'Groq' }
  } catch (error: any) {
    clearTimeout(timeoutId)
    
    if (error.name === 'AbortError') {
      console.log("Groq timeout")
      throw new Error("Groq timeout after 15 seconds")
    }
    
    // Retry once for network errors
    if (retryCount === 0 && (error.message.includes('fetch') || error.message.includes('network'))) {
      console.log("Groq network error, retrying...")
      return tryGroq(messages, maxTokens, retryCount + 1)
    }
    
    console.log("Groq failed")
    throw error
  }
}

async function tryCerebras(messages: Message[], maxTokens: number = 2000, retryCount: number = 0): Promise<AIResponse> {
  console.log("Trying Cerebras")
  
  const apiKey = process.env.CEREBRAS_API_KEY
  if (!apiKey) {
    throw new Error("CEREBRAS_API_KEY not configured")
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000)
  
  try {
    const response = await fetch('https://api.cerebras.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama3.1-70b',
        messages,
        max_tokens: maxTokens
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const error = await response.text()
      const status = response.status
      
      // Don't retry auth errors, rate limits, or invalid requests
      if (status === 401 || status === 403 || status === 429 || status === 400) {
        throw new Error(`Cerebras API error: ${status} - ${error}`)
      }
      
      // Retry once for network errors
      if (retryCount === 0) {
        console.log("Cerebras network error, retrying...")
        return tryCerebras(messages, maxTokens, retryCount + 1)
      }
      
      throw new Error(`Cerebras API error: ${status} - ${error}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content || content.trim() === '') {
      throw new Error("Cerebras returned empty response")
    }

    console.log("Cerebras success")
    return { reply: content, model: 'llama3.1-70b', provider: 'Cerebras' }
  } catch (error: any) {
    clearTimeout(timeoutId)
    
    if (error.name === 'AbortError') {
      console.log("Cerebras timeout")
      throw new Error("Cerebras timeout after 15 seconds")
    }
    
    // Retry once for network errors
    if (retryCount === 0 && (error.message.includes('fetch') || error.message.includes('network'))) {
      console.log("Cerebras network error, retrying...")
      return tryCerebras(messages, maxTokens, retryCount + 1)
    }
    
    console.log("Cerebras failed")
    throw error
  }
}

async function tryOpenRouter(messages: Message[], maxTokens: number = 2000, retryCount: number = 0): Promise<AIResponse> {
  console.log("Trying OpenRouter")
  
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY not configured")
  }

  const FREE_MODELS = [
    // Preferred free models
    "openai/gpt-oss-120b:free",
    "openai/gpt-oss-20b:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "google/gemma-4-31b:free",
    "z-ai/glm-4.5-air:free",
    "moonshotai/kimi-k2.6:free",
    
    // Additional verified free fallbacks
    "meta-llama/llama-3.1-70b-instruct:free",
    "google/gemma-2-27b-it:free",
    "mistralai/mistral-7b-instruct:free",
    "nousresearch/hermes-3-llama-3.1-405b:free",
    "meta-llama/llama-3.1-8b-instruct:free",
    "meta-llama/llama-3-8b-instruct:free"
  ];

  for (const model of FREE_MODELS) {
    console.log(`Trying OpenRouter model: ${model}`)
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)
    
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://gettoolai.in',
          'X-Title': 'GetTool AI'
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: maxTokens
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const error = await response.text()
        const status = response.status
        
        // Don't retry auth errors, rate limits, or invalid model errors for this model
        if (status === 401 || status === 403 || status === 429 || status === 400) {
          console.log(`OpenRouter model ${model} failed with ${status}: ${error}`)
          continue
        }
        
        // Retry once for network errors
        if (retryCount === 0) {
          console.log(`OpenRouter model ${model} network error, retrying...`)
          clearTimeout(timeoutId)
          return tryOpenRouter(messages, maxTokens, retryCount + 1)
        }
        
        console.log(`OpenRouter model ${model} failed: ${status} - ${error}`)
        continue
      }

      const data = await response.json()
      const content = data.choices?.[0]?.message?.content

      if (!content || content.trim() === '') {
        console.log(`OpenRouter model ${model} returned empty response`)
        continue
      }

      console.log("OpenRouter success")
      return { reply: content, model, provider: 'OpenRouter' }
    } catch (error: any) {
      clearTimeout(timeoutId)
      
      if (error.name === 'AbortError') {
        console.log(`OpenRouter model ${model} timeout`)
        continue
      }
      
      // Retry once for network errors
      if (retryCount === 0 && (error.message.includes('fetch') || error.message.includes('network'))) {
        console.log(`OpenRouter model ${model} network error, retrying...`)
        return tryOpenRouter(messages, maxTokens, retryCount + 1)
      }
      
      console.log(`OpenRouter model ${model} error:`, error)
      continue
    }
  }

  console.log("OpenRouter failed")
  throw new Error("All OpenRouter models failed")
}

export async function generateAIResponse(
  messages: Message[],
  systemPrompt: string = "",
  maxTokens: number = 2000
): Promise<AIResponse> {
  const allMessages = systemPrompt
    ? [{ role: "system", content: systemPrompt }, ...messages]
    : messages

  const providers = [
    tryGemini,
    tryGroq,
    tryCerebras,
    tryOpenRouter
  ]

  for (const provider of providers) {
    try {
      return await provider(allMessages, maxTokens)
    } catch (error) {
      console.log(`Provider failed:`, error)
      continue
    }
  }

  return {
    reply: null,
    model: null,
    provider: null,
    error: "All AI providers unavailable"
  }
}
