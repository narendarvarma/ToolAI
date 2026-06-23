"use client"

import { useState } from "react"
import { RefreshCw, Copy, Wand2 } from "lucide-react"
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

export default function AITextRewriter() {
  const toolContent = getToolContent("ai-text-rewriter")
  const used = tokenManager.getRequestsUsed()
  const limit = tokenManager.getDailyLimit()
  const remaining = tokenManager.getRemainingRequests()

  const [originalText, setOriginalText] = useState("")
  const [rewriteStyle, setRewriteStyle] = useState("professional")
  const [rewrittenText, setRewrittenText] = useState("")
  const [isRewriting, setIsRewriting] = useState(false)

  const rewriteText = async () => {
    if (!originalText) return

    if (!tokenManager.canUseRequest()) {
      alert("Daily limit reached. Come back tomorrow.")
      return
    }

    setIsRewriting(true)

    try {
      const reply = await callAI(`Rewrite this text:\n\n${originalText}`, `You are a professional text rewriter. Rewrite text to improve clarity, flow, and engagement. Use a ${rewriteStyle} style. Maintain the original meaning but make it more effective. ${rewriteStyle === 'formal' ? 'Use formal language and professional tone.' : rewriteStyle === 'casual' ? 'Use conversational, friendly language.' : rewriteStyle === 'creative' ? 'Be creative and engaging with vivid language.' : 'Keep it clear, professional, and direct.'}`)

      if (!reply) {
        throw new Error('No response from AI')
      }

      setRewrittenText(reply)
      tokenManager.useRequest()
    } catch (error) {
      console.error('Error rewriting text:', error)
      alert('Error rewriting text. Please try again.')
    }

    setIsRewriting(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rewrittenText)
    alert("Rewritten text copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">AI Text Rewriter</h1>
        <p className="text-gray-400 text-base text-center mb-4">Rewrite and improve your text with AI</p>

        {/* Content Integrity Disclaimer */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Wand2 className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-blue-500 font-semibold mb-1">Content Disclaimer</h2>
              <p className="text-gray-300 text-sm">This tool rewrites text to improve clarity and flow. Always review the rewritten content to ensure it accurately represents your original meaning. Do not use for academic submissions without proper attribution and review.</p>
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
          {/* Original Text */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Original Text</label>
            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-48 resize-none"
              placeholder="Enter the text you want to rewrite..."
            />
          </div>

          {/* Rewrite Style */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Rewrite Style</label>
            <select
              value={rewriteStyle}
              onChange={(e) => setRewriteStyle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            >
              <option value="professional">Professional</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
              <option value="creative">Creative</option>
              <option value="concise">Concise</option>
            </select>
          </div>

          {/* Rewrite Button */}
          <button
            onClick={rewriteText}
            disabled={!originalText || isRewriting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="h-5 w-5" />
              {isRewriting ? "Rewriting..." : "Rewrite Text"}
            </div>
          </button>

          {/* Rewritten Text */}
          {rewrittenText && (
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2 text-white">Rewritten Text</label>
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <p className="text-white whitespace-pre-wrap">{rewrittenText}</p>
              </div>
              <button
                onClick={copyToClipboard}
                className="mt-4 w-full py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  <Copy className="h-5 w-5" />
                  Copy Rewritten Text
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
        <ToolContent content={toolContent} toolName="AI Text Rewriter" toolPath="/tools/ai-text-rewriter" />

        {/* Related Tools */}
        <RelatedTools currentToolPath="/tools/ai-text-rewriter" currentCategory={toolContent.category} />

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




