"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const hasConsented = localStorage.getItem("toolhub_cookie")
    if (!hasConsented) {
      setTimeout(() => setShowConsent(true), 1500)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("toolhub_cookie", "accepted")
    setShowConsent(false)
  }

  const handlePrivacyPolicy = () => {
    router.push("/privacy")
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1e293b] shadow-2xl p-3 z-[9999]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-gray-800 dark:text-[#f1f5f9] text-sm text-center md:text-left">
          🍪 We use cookies to improve your experience and show relevant ads.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handlePrivacyPolicy}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-[#334155] text-gray-800 dark:text-[#f1f5f9] text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
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
