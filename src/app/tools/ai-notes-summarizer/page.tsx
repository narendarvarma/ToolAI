"use client"

import { useState } from "react"
import { FileText, Copy, Wand2 } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function AINotesSummarizer() {
  const [notes, setNotes] = useState("")
  const [summaryLength, setSummaryLength] = useState("medium")
  const [generatedSummary, setGeneratedSummary] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async () => {
    if (!notes) return

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
              content: `You are an expert at summarizing content. Create ${summaryLength} summaries that capture key information. ${summaryLength === 'short' ? 'Use bullet points for clarity.' : summaryLength === 'medium' ? 'Write a concise paragraph.' : 'Provide a detailed summary with multiple paragraphs.'}`
            },
            {
              role: 'user',
              content: `Summarize these notes:\n\n${notes}`
            }
          ],
          max_tokens: 1500,
        }),
      })

      const data = await response.json()
      
      if (data.choices && data.choices[0]) {
        setGeneratedSummary(data.choices[0].message.content)
      } else {
        throw new Error('No response from AI')
      }
    } catch (error) {
      console.error('Error generating summary:', error)
      alert('Error generating summary. Please try again.')
    }

    setIsGenerating(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSummary)
    alert("Summary copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">AI Notes Summarizer</h1>
        <p className="text-gray-400 text-base text-center mb-8">Summarize your notes with AI</p>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Notes Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Your Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-48 resize-none"
              placeholder="Paste your notes here..."
            />
          </div>

          {/* Summary Length */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Summary Length</label>
            <select
              value={summaryLength}
              onChange={(e) => setSummaryLength(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            >
              <option value="short">Short (bullet points)</option>
              <option value="medium">Medium (paragraph)</option>
              <option value="long">Long (detailed)</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateSummary}
            disabled={!notes || isGenerating}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            <div className="flex items-center justify-center gap-2">
              <Wand2 className="h-5 w-5" />
              {isGenerating ? "Summarizing..." : "Generate Summary"}
            </div>
          </button>

          {/* Generated Summary */}
          {generatedSummary && (
            <div className="mt-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <p className="text-white whitespace-pre-wrap">{generatedSummary}</p>
              </div>
              <button
                onClick={copyToClipboard}
                className="mt-4 w-full py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  <Copy className="h-5 w-5" />
                  Copy Summary
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <AdSlot adSlot="4000000005" className="w-full max-w-2xl" />
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
