"use client"

import { useState, useEffect } from "react"
import { X, Share2, Copy, Check } from "lucide-react"

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
      }, 10000) // Auto-close after 10 seconds
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsAppShare = () => {
    const text = `Check out ${toolName} on ToolHub AI! ${window.location.href}`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] rounded-2xl p-6 max-w-md w-full border border-white/8 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-[#00E5FF]" />
            <h3 className="text-lg font-semibold text-white">Share ToolHub AI</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <p className="text-gray-400 mb-6">
          Got your result! 😊 Share ToolHub AI with friends to help them discover these amazing tools too!
        </p>

        <div className="space-y-3">
          <button
            onClick={handleCopyLink}
            className="w-full py-3 rounded-xl bg-white/5 border border-white/8 text-white hover:border-[#00E5FF]/50 transition-colors flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="h-5 w-5 text-green-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-5 w-5 text-gray-400" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2"
          >
            <Share2 className="h-5 w-5" />
            <span>Share on WhatsApp</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full text-sm text-gray-400 hover:text-white transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  )
}
