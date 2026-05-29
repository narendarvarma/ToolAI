"use client"

import { Share2, Copy, Twitter, MessageCircle } from "lucide-react"
import { useState } from "react"

interface SocialShareProps {
  title: string
  url?: string
}

export default function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`, "_blank")
  }

  return (
    <div className="mt-8 bg-[#111827] rounded-2xl p-6 border border-white/8">
      <h2 className="text-xl font-semibold mb-4 text-white">Share this Tool</h2>
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={copyLink}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-white hover:border-[#00E5FF] transition-colors"
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copied!" : "Copy Link"}
        </button>
        <button
          onClick={shareTwitter}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-white hover:border-[#1DA1F2] transition-colors"
        >
          <Twitter className="h-4 w-4" />
          Twitter
        </button>
        <button
          onClick={shareWhatsApp}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-white hover:border-[#25D366] transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </button>
      </div>
    </div>
  )
}
