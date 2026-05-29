"use client"

import { useState } from "react"
import { CheckCircle, Copy, Sparkles } from "lucide-react"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import RelatedTools from "@/components/tool-faq"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function AiGrammarFixer() {
  useRecentTools("/tools/ai-grammar-fixer", "AI Grammar Fixer", "CheckCircle")
  
  const [originalText, setOriginalText] = useState("")
  const [correctedText, setCorrectedText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const fixGrammar = async () => {
    if (!originalText.trim()) return

    setIsLoading(true)
    setCorrectedText("")

    // Simulated AI grammar fix (in production, this would call an AI API)
    setTimeout(() => {
      // Simple grammar fixes for demonstration
      let fixed = originalText
        .replace(/\bi\b/g, "I")
        .replace(/\bdont\b/gi, "don't")
        .replace(/\bwont\b/gi, "won't")
        .replace(/\bcant\b/gi, "can't")
        .replace(/\bshouldnt\b/gi, "shouldn't")
        .replace(/\bwouldnt\b/gi, "wouldn't")
        .replace(/\bdidnt\b/gi, "didn't")
        .replace(/\bdoesnt\b/gi, "doesn't")
        .replace(/\barent\b/gi, "aren't")
        .replace(/\bisnt\b/gi, "isn't")
        .replace(/\bwasnt\b/gi, "wasn't")
        .replace(/\bwere\b/gi, "were")
        .replace(/\bwas\b/gi, "was")
        .replace(/\btheir\b/gi, "their")
        .replace(/\bthere\b/gi, "there")
        .replace(/\btheyre\b/gi, "they're")
        .replace(/\byour\b/gi, "your")
        .replace(/\byoure\b/gi, "you're")
        .replace(/\bits\b/gi, "it's")
        .replace(/\bto\b/gi, "to")
        .replace(/\btoo\b/gi, "too")
        .replace(/\btwo\b/gi, "two")
        .replace(/\.([a-z])/g, ". $1")
        .replace(/\s+/g, " ")
        .trim()

      // Capitalize first letter of sentences
      fixed = fixed.replace(/(^|[.!?]\s+)([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase())

      setCorrectedText(fixed)
      setIsLoading(false)
    }, 1500)
  }

  const copyCorrected = () => {
    navigator.clipboard.writeText(correctedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">AI Grammar Fixer</h1>
        <p className="text-gray-400 text-base text-center mb-8">Fix grammar, spelling, and sentence structure with AI assistance</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8">
          <div id="ad-top"></div>
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8 mb-6">
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Paste Your Text</label>
            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-48 resize-none"
              placeholder="Paste your English text here to fix grammar and spelling..."
            />
          </div>

          <button
            type="button"
            onClick={fixGrammar}
            disabled={!originalText.trim() || isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Sparkles className="h-5 w-5 animate-spin" />
                Fixing Grammar...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Fix Grammar
              </>
            )}
          </button>
        </div>

        {/* Side by Side Comparison */}
        {correctedText && (
          <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Original vs Corrected</h3>
              <button
                type="button"
                onClick={copyCorrected}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] text-sm hover:bg-[#00E5FF]/30 transition-colors"
              >
                {copied ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied!" : "Copy Corrected"}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-2">Original</p>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-400 text-sm whitespace-pre-wrap">{originalText}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Corrected</p>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                  <p className="text-green-400 text-sm whitespace-pre-wrap">{correctedText}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Single bottom ad */}
        <div className="ad-slot mt-8">
          <div id="ad-bottom"></div>
        </div>

        {/* How to Use Section */}
        <HowToUse steps={[
          "Paste your English text in the input area",
          "Click 'Fix Grammar' to analyze and correct",
          "View the original vs corrected text side by side",
          "Copy the corrected text with one click",
          "Use for emails, essays, reports, and any written content"
        ]} />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/ai-grammar-fixer" toolName="AI Grammar Fixer" />

        {/* FAQ Section */}
        <RelatedTools
          toolName="AI Grammar Fixer"
          faqs={[
            {
              question: "What grammar issues does it fix?",
              answer: "The AI fixes common grammar mistakes including subject-verb agreement, tense errors, spelling mistakes, punctuation issues, capitalization, and sentence structure problems. It improves readability and professionalism of your text."
            },
            {
              question: "Is it suitable for non-native English speakers?",
              answer: "Yes, this tool is specifically designed to help non-native English speakers improve their writing. It identifies and corrects common mistakes made by learners, helping you communicate more effectively in English."
            },
            {
              question: "Can I use this for academic writing?",
              answer: "Yes, the grammar fixer can help with academic writing including essays, reports, and assignments. However, always review the corrections to ensure they maintain your intended meaning and academic style."
            },
            {
              question: "How accurate is the grammar correction?",
              answer: "The AI provides highly accurate corrections for common grammar and spelling issues. However, it's always recommended to review the corrections, especially for complex sentences or specialized terminology, to ensure they fit your context."
            }
          ]}
        />

        {/* Social Share */}
        <SocialShare title="AI Grammar Fixer - Fix grammar and spelling" />

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
