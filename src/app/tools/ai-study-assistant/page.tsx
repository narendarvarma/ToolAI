"use client"

import { useState } from "react"
import { BookOpen, Copy, Wand2 } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"
import { tokenManager } from "@/lib/token-manager"

export default function AIStudyAssistant() {
  const [topic, setTopic] = useState("")
  const [question, setQuestion] = useState("")
  const [responseType, setResponseType] = useState("explanation")
  const [generatedResponse, setGeneratedResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateResponse = async () => {
    if (!topic) return

    // Check token limit (estimate: ~700 tokens for this operation)
    const estimatedTokens = 700
    if (!tokenManager.canUseTokens(estimatedTokens)) {
      alert(`Daily token limit reached. You have ${tokenManager.getRemainingTokens()} tokens remaining. Tokens reset daily at midnight.`)
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-haiku',
          messages: [
            {
              role: 'system',
              content: `You are an expert tutor and study assistant. Provide helpful, educational content. ${responseType === 'explanation' ? 'Give detailed explanations with examples.' : responseType === 'summary' ? 'Provide concise summaries of key concepts.' : responseType === 'examples' ? 'Focus on practical examples and practice problems.' : 'Create quiz questions to test understanding.'}`
            },
            {
              role: 'user',
              content: `Help me study: ${topic}${question ? `\n\nMy question: ${question}` : ''}`
            }
          ],
          max_tokens: 2000,
        }),
      })

      const data = await response.json()
      
      if (data.choices && data.choices[0]) {
        setGeneratedResponse(data.choices[0].message.content)
        // Deduct tokens
        tokenManager.useTokens(estimatedTokens)
      } else {
        throw new Error('No response from AI')
      }
    } catch (error) {
      console.error('Error generating response:', error)
      alert('Error generating response. Please try again.')
    }

    setIsGenerating(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedResponse)
    alert("Response copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">AI Study Assistant</h1>
        <p className="text-gray-400 text-base text-center mb-8">Get help with your studies using AI</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Topic Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Study Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="e.g., Calculus, History, Chemistry"
            />
          </div>

          {/* Question */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Your Question (optional)</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-24 resize-none"
              placeholder="Ask a specific question about the topic..."
            />
          </div>

          {/* Response Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Response Type</label>
            <select
              value={responseType}
              onChange={(e) => setResponseType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            >
              <option value="explanation">Detailed Explanation</option>
              <option value="summary">Quick Summary</option>
              <option value="examples">Examples & Practice</option>
              <option value="quiz">Quiz Questions</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateResponse}
            disabled={!topic || isGenerating}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            <div className="flex items-center justify-center gap-2">
              <Wand2 className="h-5 w-5" />
              {isGenerating ? "Generating..." : "Get Help"}
            </div>
          </button>

          {/* Generated Response */}
          {generatedResponse && (
            <div className="mt-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <p className="text-white whitespace-pre-wrap">{generatedResponse}</p>
              </div>
              <button
                onClick={copyToClipboard}
                className="mt-4 w-full py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  <Copy className="h-5 w-5" />
                  Copy Response
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        </div>

        <button
          onClick={() => window.location.href = "/"}
          className="mt-6 text-[#00E5FF] hover:underline"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}




