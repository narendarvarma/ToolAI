"use client"

import { useState, useEffect } from "react"
import { X, Share2, Copy, Check, MessageCircle } from "lucide-react"

interface SharePromptProps {
  show: boolean
  onClose: () => void
  toolName: string
}

export default function SharePrompt({ show, onClose, toolName }: SharePromptProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 15000) // Auto-close after 15 seconds
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsAppShare = () => {
    const text = `🎉 Found this useful? Share GetTool AI with your friends! ${window.location.href}`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const handleTwitterShare = () => {
    const text = `🎉 Found this useful? Check out ${toolName} on GetTool AI! ${window.location.href}`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] shadow-lg z-50 p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white text-sm text-center md:text-left">
          🎉 Found this useful? Share GetTool AI with your friends!
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleWhatsAppShare}
            className="px-3 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors flex items-center gap-2 text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden md:inline">WhatsApp</span>
          </button>
          <button
            onClick={handleTwitterShare}
            className="px-3 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors flex items-center gap-2 text-sm"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden md:inline">Twitter</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="px-3 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors flex items-center gap-2 text-sm"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span className="hidden md:inline">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span className="hidden md:inline">Copy Link</span>
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
