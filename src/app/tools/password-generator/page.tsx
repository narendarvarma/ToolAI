"use client"

import { useState } from "react"
import { Copy, RefreshCw, Shield } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)

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
    alert("Password copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Password Generator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Generate secure passwords instantly</p>
        
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
          </div>

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
        <div className="flex justify-center mt-8">
          <AdSlot adSlot="4000000008" className="w-full max-w-2xl" />
        </div>

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
