"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("toolhub_cookie_consent")
    if (!hasConsented) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem("toolhub_cookie_consent", "true")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#0B0F1A] border-t border-white/10 p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-300 text-sm flex-1">
          We use cookies to improve your experience and serve relevant ads. By continuing, you agree to our{" "}
          <Link href="/cookie-policy" className="text-[#00E5FF] hover:underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/cookie-policy"
            className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors text-sm"
          >
            Learn More
          </Link>
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform text-sm"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
