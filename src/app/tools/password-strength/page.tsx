"use client"

import { useState } from "react"
import { Shield, Check, X } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function PasswordStrength() {
  const [password, setPassword] = useState("")
  const [strength, setStrength] = useState(0)
  const [feedback, setFeedback] = useState<string[]>([])

  const checkStrength = (pwd: string) => {
    let score = 0
    const feedbackList: string[] = []

    if (pwd.length === 0) {
      setStrength(0)
      setFeedback([])
      return
    }

    // Length check
    if (pwd.length >= 8) {
      score += 1
    } else {
      feedbackList.push("Add at least 8 characters")
    }

    if (pwd.length >= 12) {
      score += 1
    }

    // Uppercase check
    if (/[A-Z]/.test(pwd)) {
      score += 1
    } else {
      feedbackList.push("Add uppercase letters")
    }

    // Lowercase check
    if (/[a-z]/.test(pwd)) {
      score += 1
    } else {
      feedbackList.push("Add lowercase letters")
    }

    // Numbers check
    if (/\d/.test(pwd)) {
      score += 1
    } else {
      feedbackList.push("Add numbers")
    }

    // Special characters check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      score += 1
    } else {
      feedbackList.push("Add special characters")
    }

    // No common patterns
    const commonPatterns = ["password", "123456", "qwerty", "abc123"]
    if (!commonPatterns.some(pattern => pwd.toLowerCase().includes(pattern))) {
      score += 1
    } else {
      feedbackList.push("Avoid common patterns")
    }

    setStrength(Math.min(score, 5))
    setFeedback(feedbackList)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value
    setPassword(pwd)
    checkStrength(pwd)
  }

  const getStrengthLabel = () => {
    if (strength === 0) return "Very Weak"
    if (strength === 1) return "Weak"
    if (strength === 2) return "Fair"
    if (strength === 3) return "Good"
    if (strength === 4) return "Strong"
    return "Very Strong"
  }

  const getStrengthColor = () => {
    if (strength === 0) return "bg-red-500"
    if (strength === 1) return "bg-orange-500"
    if (strength === 2) return "bg-yellow-500"
    if (strength === 3) return "bg-green-400"
    if (strength === 4) return "bg-green-500"
    return "bg-emerald-500"
  }

  const getStrengthWidth = () => {
    return `${(strength / 5) * 100}%`
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Password Strength Checker</h1>
        <p className="text-gray-400 text-base text-center mb-8">Check how strong your password is</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Enter Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Enter your password..."
            />
          </div>

          {/* Strength Meter */}
          {password && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Password Strength</span>
                <span className={`font-semibold ${getStrengthColor().replace('bg-', 'text-')}`}>{getStrengthLabel()}</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                  style={{ width: getStrengthWidth() }}
                />
              </div>
            </div>
          )}

          {/* Feedback */}
          {feedback.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Suggestions to improve:</h3>
              <div className="space-y-2">
                {feedback.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/8">
                    <X className="h-5 w-5 text-red-400" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Success Message */}
          {strength >= 4 && feedback.length === 0 && (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-semibold">Great! Your password is strong.</span>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/8">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#00E5FF]" />
              Password Tips
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Use at least 12 characters</li>
              <li>• Mix uppercase and lowercase letters</li>
              <li>• Include numbers and special characters</li>
              <li>• Avoid common words or patterns</li>
              <li>• Use a unique password for each account</li>
            </ul>
          </div>
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




