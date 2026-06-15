"use client"

import { useState } from "react"
import { FileText, Hash, Type, Clock } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"

export default function WordCounter() {
  useRecentTools("/tools/word-counter")
  const [text, setText] = useState("")

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const characterCount = text.length
  const characterCountNoSpaces = text.replace(/\s/g, "").length
  const sentenceCount = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0
  const paragraphCount = text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0
  const readingTime = Math.ceil(wordCount / 200) // Average reading speed: 200 words/minute

  const clearText = () => {
    setText("")
  }

  const toolContent = getToolContent("word-counter")

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Word Counter</h1>
        <p className="text-gray-400 text-base text-center mb-8">Count words, characters, and more</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Text Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Enter your text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-64 resize-none"
              placeholder="Type or paste your text here..."
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-white/5 rounded-xl border border-white/8">
              <div className="flex items-center gap-2 mb-2">
                <Hash className="h-5 w-5 text-[#00E5FF]" />
                <span className="text-sm text-gray-400">Words</span>
              </div>
              <p className="text-2xl font-bold text-white">{wordCount}</p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/8">
              <div className="flex items-center gap-2 mb-2">
                <Type className="h-5 w-5 text-[#00E5FF]" />
                <span className="text-sm text-gray-400">Characters</span>
              </div>
              <p className="text-2xl font-bold text-white">{characterCount}</p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/8">
              <div className="flex items-center gap-2 mb-2">
                <Type className="h-5 w-5 text-[#7C4DFF]" />
                <span className="text-sm text-gray-400">No Spaces</span>
              </div>
              <p className="text-2xl font-bold text-white">{characterCountNoSpaces}</p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/8">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-[#00E5FF]" />
                <span className="text-sm text-gray-400">Sentences</span>
              </div>
              <p className="text-2xl font-bold text-white">{sentenceCount}</p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/8">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-[#7C4DFF]" />
                <span className="text-sm text-gray-400">Paragraphs</span>
              </div>
              <p className="text-2xl font-bold text-white">{paragraphCount}</p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/8">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-[#00E5FF]" />
                <span className="text-sm text-gray-400">Read Time</span>
              </div>
              <p className="text-2xl font-bold text-white">{readingTime}m</p>
            </div>
          </div>

          {/* Clear Button */}
          {text && (
            <button
              onClick={clearText}
              className="w-full py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#FF4DB6] transition-colors"
            >
              Clear Text
            </button>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>

        <HowToUse steps={[
          "Enter or paste your text in the text area",
          "View real-time word, character, sentence, and paragraph counts",
          "Check the estimated reading time for your text",
          "Use the Clear Text button to reset the counter"
        ]} />

        <SocialShare title="Word Counter" />
        <ToolContent content={toolContent} toolName="Word Counter Online Free" toolPath="/tools/word-counter" />
        <RelatedTools currentToolPath="/tools/word-counter" currentCategory={toolContent.category} />

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


