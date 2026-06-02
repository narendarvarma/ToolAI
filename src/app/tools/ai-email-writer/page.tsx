"use client"

import { useState } from "react"
import { Mail, Copy, Wand2 } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"
import { tokenManager } from "@/lib/token-manager"
import { callAI } from "@/lib/ai"
import DailyUsageBar from "@/components/DailyUsageBar"

export default function AIEmailWriter() {
  const used = tokenManager.getRequestsUsed()
  const limit = tokenManager.getDailyLimit()
  const remaining = tokenManager.getRemainingRequests()

  const [recipient, setRecipient] = useState("")
  const [subject, setSubject] = useState("")
  const [keyPoints, setKeyPoints] = useState("")
  const [tone, setTone] = useState("professional")
  const [generatedEmail, setGeneratedEmail] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateEmail = async () => {
    if (!recipient || !subject) return

    if (!tokenManager.canUseRequest()) {
      alert("Daily limit reached. Come back tomorrow.")
      return
    }

    setIsGenerating(true)

    try {
      const reply = await callAI(`Write an email to ${recipient} with the subject: ${subject}. Use a ${tone} tone. ${keyPoints ? `Include these key points: ${keyPoints}` : ''}`, `You are a professional email writer. Write clear, effective emails.`)

      if (!reply) {
        throw new Error('No response from AI')
      }

      setGeneratedEmail(reply)
      tokenManager.useRequest()
    } catch (error) {
      console.error('Error generating email:', error)
      alert('Error generating email. Please try again.')
    }

    setIsGenerating(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail)
    alert("Email copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">AI Email Writer</h1>
        <p className="text-gray-400 text-base text-center mb-8">Write professional emails with AI assistance</p>

        <DailyUsageBar
          used={used}
          limit={limit}
          remaining={remaining}
          loaded={true}
        />

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Recipient */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Recipient</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Recipient name or title"
            />
          </div>

          {/* Subject */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Email subject"
            />
          </div>

          {/* Key Points */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Key Points (optional)</label>
            <textarea
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-24 resize-none"
              placeholder="Main points to include in the email"
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
              <option value="friendly">Friendly</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateEmail}
            disabled={!recipient || !subject || isGenerating}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            <div className="flex items-center justify-center gap-2">
              <Wand2 className="h-5 w-5" />
              {isGenerating ? "Generating..." : "Generate Email"}
            </div>
          </button>

          {/* Generated Email */}
          {generatedEmail && (
            <div className="mt-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <pre className="text-white whitespace-pre-wrap font-sans">{generatedEmail}</pre>
              </div>
              <button
                onClick={copyToClipboard}
                className="mt-4 w-full py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  <Copy className="h-5 w-5" />
                  Copy Email
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




