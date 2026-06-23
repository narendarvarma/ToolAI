"use client"

import { useState } from "react"
import { FileText, Copy, Wand2 } from "lucide-react"
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

export default function AINotesSummarizer() {
  const toolContent = getToolContent("ai-notes-summarizer")
  const used = tokenManager.getRequestsUsed()
  const limit = tokenManager.getDailyLimit()
  const remaining = tokenManager.getRemainingRequests()

  const [notes, setNotes] = useState("")
  const [summaryLength, setSummaryLength] = useState("medium")
  const [generatedSummary, setGeneratedSummary] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async () => {
    if (!notes) return

    if (!tokenManager.canUseRequest()) {
      alert("Daily limit reached. Come back tomorrow.")
      return
    }

    setIsGenerating(true)

    try {
      const reply = await callAI(`Summarize these notes:\n\n${notes}`, `You are an expert at summarizing content. Create ${summaryLength} summaries that capture key information. ${summaryLength === 'short' ? 'Use bullet points for clarity.' : summaryLength === 'medium' ? 'Write a concise paragraph.' : 'Provide a detailed summary with multiple paragraphs.'}`)

      if (!reply) {
        throw new Error('No response from AI')
      }

      setGeneratedSummary(reply)
      tokenManager.useRequest()
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
        <p className="text-gray-400 text-base text-center mb-4">Summarize your notes with AI</p>

        {/* Content Integrity Disclaimer */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-blue-500 font-semibold mb-1">Study Aid Disclaimer</h2>
              <p className="text-gray-300 text-sm">This tool summarizes your notes to help you review and understand key concepts. Always review the summary for accuracy and add your own insights. Use as a study aid, not a replacement for your own understanding and analysis.</p>
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
          <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        </div>

        {/* Tool Content Section */}
        <ToolContent content={toolContent} toolName="AI Notes Summarizer" toolPath="/tools/ai-notes-summarizer" />

        {/* Related Tools */}
        <RelatedTools currentToolPath="/tools/ai-notes-summarizer" currentCategory={toolContent.category} />

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




