"use client"

import { useState, useEffect } from "react"

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const hasConsented = localStorage.getItem("toolhub_cookie_consent")
    if (!hasConsented) {
      setTimeout(() => setShowConsent(true), 2000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("toolhub_cookie_consent", "true")
    setShowConsent(false)
  }

  const handlePrivacyPolicy = () => {
    window.location.href = "/privacy"
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#111827] border-t border-white/8 shadow-lg p-4 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-300 text-sm text-center md:text-left">
          🍪 We use cookies to enhance your experience and show relevant ads. By using ToolHub AI, you agree to our Privacy Policy.
        </p>
        <div className="flex gap-3">
          <button
            onClick={handlePrivacyPolicy}
            className="px-4 py-2 rounded-lg border border-white/8 text-white text-sm hover:bg-white/5 transition-colors"
          >
            Privacy Policy →
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white text-sm font-semibold hover:scale-[1.02] transition-transform"
          >
            ✅ Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
