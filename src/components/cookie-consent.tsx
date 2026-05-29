"use client"

import { useState, useEffect } from "react"

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookieConsent")
    if (!hasConsented) {
      setShowConsent(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true")
    setShowConsent(false)
  }

  const handleLearnMore = () => {
    window.location.href = "/privacy"
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-700 text-sm text-center md:text-left">
          We use cookies to improve your experience and display relevant ads. By continuing, you agree to our Privacy Policy.
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleLearnMore}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition-colors"
          >
            Learn More →
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-lg bg-[#00E5FF] text-white text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
