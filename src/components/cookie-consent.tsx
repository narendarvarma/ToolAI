"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const router = useRouter()

 type CookiePreferences = {
    essential: boolean
    analytics: boolean
    advertising: boolean
  }

  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: true,
    advertising: true
  })

  useEffect(() => {
    const hasConsented = localStorage.getItem("gettool_cookie_consent")
    if (!hasConsented) {
      setTimeout(() => setShowConsent(true), 1500)
    } else {
      // Load saved preferences
      try {
        const savedPrefs = JSON.parse(hasConsented)
        setPreferences(savedPrefs)
      } catch {
        setPreferences({ essential: true, analytics: true, advertising: true })
      }
    }
  }, [])

  const handleAcceptAll = () => {
    const prefs = { essential: true, analytics: true, advertising: true }
    localStorage.setItem("gettool_cookie_consent", JSON.stringify(prefs))
    setShowConsent(false)
  }

  const handleRejectNonEssential = () => {
    const prefs = { essential: true, analytics: false, advertising: false }
    localStorage.setItem("gettool_cookie_consent", JSON.stringify(prefs))
    setShowConsent(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem("gettool_cookie_consent", JSON.stringify(preferences))
    setShowConsent(false)
  }

  const handlePrivacyPolicy = () => {
    router.push("/privacy")
  }

  const handleCookiePolicy = () => {
    router.push("/cookie-policy")
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#111827] border-t border-white/10 shadow-2xl p-4 z-[9999]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-2">🍪 Cookie Preferences</h3>
            <p className="text-gray-400 text-sm mb-3">
              We use cookies to enhance your experience, analyze site traffic, and serve personalized advertisements through Google AdSense. You can choose which cookies to accept.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <button
                onClick={handlePrivacyPolicy}
                className="text-[#00E5FF] hover:underline"
              >
                Privacy Policy
              </button>
              <button
                onClick={handleCookiePolicy}
                className="text-[#00E5FF] hover:underline"
              >
                Cookie Policy
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowConsent(false)}
            className="text-gray-400 hover:text-white ml-4"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <h4 className="text-white font-medium text-sm">Essential Cookies</h4>
              <p className="text-gray-400 text-xs">Required for the website to function properly</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.essential}
              disabled
              className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-[#00E5FF] cursor-not-allowed"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <h4 className="text-white font-medium text-sm">Analytics Cookies (Google Analytics)</h4>
              <p className="text-gray-400 text-xs">Help us understand how visitors use our website</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
              className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-[#00E5FF] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <h4 className="text-white font-medium text-sm">Advertising Cookies (Google AdSense)</h4>
              <p className="text-gray-400 text-xs">Used to serve personalized advertisements</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.advertising}
              onChange={(e) => setPreferences({ ...preferences, advertising: e.target.checked })}
              className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-[#00E5FF] cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white text-sm font-semibold hover:scale-[1.02] transition-transform"
          >
            Accept All
          </button>
          <button
            onClick={handleRejectNonEssential}
            className="px-4 py-2 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Reject Non-Essential
          </button>
          <button
            onClick={handleSavePreferences}
            className="px-4 py-2 rounded-lg border border-[#00E5FF]/50 text-[#00E5FF] text-sm font-medium hover:bg-[#00E5FF]/10 transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}
