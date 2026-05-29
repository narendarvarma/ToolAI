"use client"

import { useState } from "react"
import { Wand2, Download, Copy } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"
import { tokenManager } from "@/lib/token-manager"

export default function AIBlogGenerator() {
  const [topic, setTopic] = useState("")
  const [keywords, setKeywords] = useState("")
  const [tone, setTone] = useState("professional")
  const [generatedBlog, setGeneratedBlog] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateBlog = async () => {
    if (!topic) return

    // Check token limit (estimate: ~900 tokens for this operation)
    const estimatedTokens = 900
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
              content: `You are a professional blog writer. Write engaging, well-structured blog posts. Use a ${tone} tone. ${keywords ? `Include these keywords: ${keywords}` : ''}`
            },
            {
              role: 'user',
              content: `Write a blog post about: ${topic}`
            }
          ],
          max_tokens: 2000,
        }),
      })

      const data = await response.json()
      
      if (data.choices && data.choices[0]) {
        setGeneratedBlog(data.choices[0].message.content)
        // Deduct tokens
        tokenManager.useTokens(estimatedTokens)
      } else {
        throw new Error('No response from AI')
      }
    } catch (error) {
      console.error('Error generating blog:', error)
      alert('Error generating blog. Please try again.')
    }

    setIsGenerating(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedBlog)
    alert("Blog copied to clipboard!")
  }

  const downloadBlog = () => {
    const blob = new Blob([generatedBlog], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "blog-post.txt"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">AI Blog Generator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Generate blog posts with AI</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Topic Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Blog Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Enter blog topic"
            />
          </div>

          {/* Keywords */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Keywords (optional)</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Enter keywords separated by commas"
            />
          </div>

          {/* Tone Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
              <option value="formal">Formal</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateBlog}
            disabled={!topic || isGenerating}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            <div className="flex items-center justify-center gap-2">
              <Wand2 className="h-5 w-5" />
              {isGenerating ? "Generating..." : "Generate Blog"}
            </div>
          </button>

          {/* Generated Content */}
          {generatedBlog && (
            <div className="mt-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <pre className="text-white whitespace-pre-wrap font-sans">{generatedBlog}</pre>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Copy className="h-5 w-5" />
                    Copy
                  </div>
                </button>
                <button
                  onClick={downloadBlog}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Download className="h-5 w-5" />
                    Download
                  </div>
                </button>
              </div>
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




