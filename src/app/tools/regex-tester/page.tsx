"use client"

import { useState } from "react"
import { Code, CheckCircle, XCircle } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function RegexTester() {
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("g")
  const [testString, setTestString] = useState("")
  const [matches, setMatches] = useState<string[]>([])
  const [error, setError] = useState("")

  const testRegex = () => {
    if (!pattern) {
      setError("Please enter a regex pattern")
      setMatches([])
      return
    }

    try {
      const regex = new RegExp(pattern, flags)
      const foundMatches: string[] = []
      
      if (flags.includes("g")) {
        const match = testString.match(regex)
        if (match) {
          foundMatches.push(...match)
        }
      } else {
        const match = testString.match(regex)
        if (match) {
          foundMatches.push(match[0])
        }
      }
      
      setMatches(foundMatches)
      setError("")
    } catch (e) {
      setError((e as Error).message)
      setMatches([])
    }
  }

  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ""))
    } else {
      setFlags(flags + flag)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Regex Tester</h1>
        <p className="text-gray-400 text-base text-center mb-8">Test regular expressions against text</p>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Pattern */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Regex Pattern</label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all font-mono"
              placeholder="e.g., \d+ or [a-z]+"
            />
          </div>

          {/* Flags */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Flags</label>
            <div className="flex gap-3">
              <button
                onClick={() => toggleFlag("g")}
                className={`px-4 py-2 rounded-lg font-mono transition-all ${flags.includes("g") ? "bg-[#00E5FF] text-black" : "bg-white/5 border border-white/8 text-gray-400"}`}
              >
                g (global)
              </button>
              <button
                onClick={() => toggleFlag("i")}
                className={`px-4 py-2 rounded-lg font-mono transition-all ${flags.includes("i") ? "bg-[#00E5FF] text-black" : "bg-white/5 border border-white/8 text-gray-400"}`}
              >
                i (ignore case)
              </button>
              <button
                onClick={() => toggleFlag("m")}
                className={`px-4 py-2 rounded-lg font-mono transition-all ${flags.includes("m") ? "bg-[#00E5FF] text-black" : "bg-white/5 border border-white/8 text-gray-400"}`}
              >
                m (multiline)
              </button>
            </div>
          </div>

          {/* Test String */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Test String</label>
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-32 resize-none font-mono text-sm"
              placeholder="Enter text to test against..."
            />
          </div>

          {/* Test Button */}
          <button
            onClick={testRegex}
            disabled={!pattern}
            className="w-full mb-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            <div className="flex items-center justify-center gap-2">
              <Code className="h-5 w-5" />
              Test Regex
            </div>
          </button>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-400" />
                <span className="text-red-400">Error: {error}</span>
              </div>
            </div>
          )}

          {/* Matches */}
          {matches.length > 0 && (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-semibold">{matches.length} match{matches.length !== 1 ? "es" : ""} found</span>
              </div>
              <div className="space-y-2">
                {matches.map((match, index) => (
                  <div key={index} className="p-2 bg-white/5 rounded-lg">
                    <code className="text-green-400 text-sm">{match}</code>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <AdSlot adSlot="4000000005" className="w-full max-w-2xl" />
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
