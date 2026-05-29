"use client"

import { useState } from "react"
import { Copy, RefreshCw, Shield } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    let chars = ""
    if (includeUppercase) chars += uppercase
    if (includeLowercase) chars += lowercase
    if (includeNumbers) chars += numbers
    if (includeSymbols) chars += symbols

    if (chars === "") {
      setPassword("")
      return
    }

    let result = ""
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(result)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const calculateStrength = () => {
    if (!password) return { strength: "None", color: "text-gray-400", percentage: 0 }

    let score = 0
    if (length >= 8) score += 1
    if (length >= 12) score += 1
    if (length >= 16) score += 1
    if (includeUppercase) score += 1
    if (includeLowercase) score += 1
    if (includeNumbers) score += 1
    if (includeSymbols) score += 1

    if (score <= 3) return { strength: "Weak", color: "text-red-400", percentage: 33 }
    if (score <= 5) return { strength: "Medium", color: "text-yellow-400", percentage: 66 }
    return { strength: "Strong", color: "text-green-400", percentage: 100 }
  }

  const strength = calculateStrength()

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Password Generator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Generate secure passwords instantly</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>

        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Password Display */}
          <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={password}
                readOnly
                className="flex-1 px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all"
                placeholder="Generated password"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white hover:opacity-80 transition-opacity"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
            {copied && <p className="text-green-400 text-sm mt-2">✓ Copied to clipboard!</p>}
          </div>

          {/* Strength Meter */}
          {password && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Password Strength:</span>
                <span className={`text-sm font-semibold ${strength.color}`}>{strength.strength}</span>
              </div>
              <div className="h-2 rounded-full bg-gray-700 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    strength.strength === "Weak" ? "bg-red-400" :
                    strength.strength === "Medium" ? "bg-yellow-400" :
                    strength.strength === "Strong" ? "bg-green-400" : "bg-gray-400"
                  }`}
                  style={{ width: `${strength.percentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Length Slider */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">
              Password Length: {length}
            </label>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-[#0B0F1A] rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
            />
          </div>

          {/* Options */}
          <div className="mb-6 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-5 h-5 rounded accent-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/50"
              />
              <span className="text-white">Include Uppercase Letters</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-5 h-5 rounded accent-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/50"
              />
              <span className="text-white">Include Lowercase Letters</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-5 h-5 rounded accent-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/50"
              />
              <span className="text-white">Include Numbers</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-5 h-5 rounded accent-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/50"
              />
              <span className="text-white">Include Symbols</span>
            </label>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePassword}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
          >
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Generate Password
            </div>
          </button>
        </div>

        {/* Single bottom ad */}
        <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>

        {/* How to Use Section */}
        <HowToUse steps={[
          "Adjust the password length using the slider (8-64 characters)",
          "Select which character types to include (uppercase, lowercase, numbers, symbols)",
          "Click Generate Password to create a secure password",
          "Click the copy button to copy the password to clipboard",
          "Check the strength meter to ensure your password is strong enough"
        ]} />

        {/* Social Share */}
        <SocialShare title="Password Generator - Generate secure passwords instantly" />

        <button
          onClick={() => window.location.href = "/"}
          className="mt-6 text-[#00E5FF] hover:underline"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}




