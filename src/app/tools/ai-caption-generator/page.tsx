"use client"

import { useState } from "react"
import { Wand2, Copy } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"
import { tokenManager } from "@/lib/token-manager"

export default function AICaptionGenerator() {
  const [imageDescription, setImageDescription] = useState("")
  const [style, setStyle] = useState("engaging")
  const [generatedCaption, setGeneratedCaption] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateCaption = async () => {
    if (!imageDescription) return

    // Check token limit (estimate: ~300 tokens for this operation)
    const estimatedTokens = 300
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
              content: `You are a social media caption expert. Write ${style} captions that are engaging and include relevant hashtags. Keep captions concise and impactful.`
            },
            {
              role: 'user',
              content: `Generate a ${style} social media caption for this image: ${imageDescription}`
            }
          ],
          max_tokens: 500,
        }),
      })

      const data = await response.json()
      
      if (data.choices && data.choices[0]) {
        setGeneratedCaption(data.choices[0].message.content)
        // Deduct tokens
        tokenManager.useTokens(estimatedTokens)
      } else {
        throw new Error('No response from AI')
      }
    } catch (error) {
      console.error('Error generating caption:', error)
      alert('Error generating caption. Please try again.')
    }

    setIsGenerating(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCaption)
    alert("Caption copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">AI Caption Generator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Generate social media captions with AI</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Image Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Image Description</label>
            <textarea
              value={imageDescription}
              onChange={(e) => setImageDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-32 resize-none"
              placeholder="Describe your image..."
            />
          </div>

          {/* Style Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Caption Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            >
              <option value="engaging">Engaging</option>
              <option value="funny">Funny</option>
              <option value="inspirational">Inspirational</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateCaption}
            disabled={!imageDescription || isGenerating}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            <div className="flex items-center justify-center gap-2">
              <Wand2 className="h-5 w-5" />
              {isGenerating ? "Generating..." : "Generate Caption"}
            </div>
          </button>

          {/* Generated Caption */}
          {generatedCaption && (
            <div className="mt-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <p className="text-white">{generatedCaption}</p>
              </div>
              <button
                onClick={copyToClipboard}
                className="mt-4 w-full py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  <Copy className="h-5 w-5" />
                  Copy Caption
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




