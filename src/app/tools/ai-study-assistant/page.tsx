"use client"

import { useState } from "react"
import { BookOpen, Copy, Wand2 } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import AIToolDisclaimer from "@/components/ai-tool-disclaimer"
import { getToolContent } from "@/lib/tool-content"
import { useRecentTools } from "@/hooks/use-recent-tools"
import { tokenManager } from "@/lib/token-manager"
import { callAI } from "@/lib/ai"
import DailyUsageBar from "@/components/DailyUsageBar"


export default function AIStudyAssistant() {
  const toolContent = getToolContent("ai-study-assistant")
  const used = tokenManager.getRequestsUsed()
  const limit = tokenManager.getDailyLimit()
  const remaining = tokenManager.getRemainingRequests()

  const [topic, setTopic] = useState("")
  const [question, setQuestion] = useState("")
  const [responseType, setResponseType] = useState("explanation")
  const [generatedResponse, setGeneratedResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateResponse = async () => {
    if (!topic) return

    if (!tokenManager.canUseRequest()) {
      alert("Daily limit reached. Come back tomorrow.")
      return
    }

    setIsGenerating(true)

    try {
      const reply = await callAI(`Help me study: ${topic}${question ? `\n\nMy question: ${question}` : ''}`, `You are an expert tutor and study assistant. Provide helpful, educational content. ${responseType === 'explanation' ? 'Give detailed explanations with examples.' : responseType === 'summary' ? 'Provide concise summaries of key concepts.' : responseType === 'examples' ? 'Focus on practical examples and practice problems.' : 'Create quiz questions to test understanding.'}`)

      if (!reply) {
        throw new Error('No response from AI')
      }

      setGeneratedResponse(reply)
      tokenManager.useRequest()
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
        <p className="text-gray-400 text-base text-center mb-4">Get help with your studies using AI</p>

        {/* Academic Integrity Disclaimer */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <BookOpen className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-yellow-500 font-semibold mb-1">Study Aid Disclaimer</h2>
              <p className="text-gray-300 text-sm">This tool is designed as a study aid to help you understand concepts and learn effectively. Please use the generated content as a reference only. Do not submit AI-generated work as your own. Always review, edit, and add your own insights to ensure academic integrity and genuine learning.</p>
            </div>
          </div>
        </div>

        <DailyUsageBar
          used={used}
          limit={limit}
          remaining={remaining}
          loaded={true}
        />

        <AIToolDisclaimer />

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

        {/* Tool Content Section */}
        <ToolContent content={toolContent} toolName="AI Study Assistant" toolPath="/tools/ai-study-assistant" />

        {/* Related Tools */}
        <RelatedTools currentToolPath="/tools/ai-study-assistant" currentCategory={toolContent.category} />

        <Link
          href="/"
          className="mt-6 text-[#00E5FF] hover:underline inline-block"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}




