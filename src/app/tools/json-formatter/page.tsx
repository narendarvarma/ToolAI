"use client"

import { useState } from "react"
import { Code, CheckCircle, XCircle, Copy, Download } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function JSONFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [error, setError] = useState("")

  const formatJSON = () => {
    if (!input.trim()) {
      setOutput("")
      setIsValid(null)
      setError("")
      return
    }

    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setIsValid(true)
      setError("")
    } catch (e) {
      setOutput("")
      setIsValid(false)
      setError((e as Error).message)
    }
  }

  const minifyJSON = () => {
    if (!input.trim()) {
      setOutput("")
      setIsValid(null)
      setError("")
      return
    }

    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setIsValid(true)
      setError("")
    } catch (e) {
      setOutput("")
      setIsValid(false)
      setError((e as Error).message)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    alert("JSON copied to clipboard!")
  }

  const downloadJSON = () => {
    const blob = new Blob([output], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "formatted.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setInput("")
    setOutput("")
    setIsValid(null)
    setError("")
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">JSON Formatter</h1>
        <p className="text-gray-400 text-base text-center mb-8">Format, validate, and minify JSON</p>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Input JSON</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-48 resize-none font-mono text-sm"
              placeholder='{"key": "value"}'
            />
          </div>

          {/* Validation Status */}
          {isValid !== null && (
            <div className={`mb-6 p-4 rounded-xl border ${isValid ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <div className="flex items-center gap-2">
                {isValid ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}
                <span className={isValid ? 'text-green-400' : 'text-red-400'}>
                  {isValid ? 'Valid JSON' : 'Invalid JSON'}
                </span>
              </div>
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={formatJSON}
              disabled={!input}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
            >
              <div className="flex items-center justify-center gap-2">
                <Code className="h-5 w-5" />
                Format
              </div>
            </button>
            <button
              onClick={minifyJSON}
              disabled={!input}
              className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors disabled:opacity-50"
            >
              Minify
            </button>
            <button
              onClick={clearAll}
              disabled={!input}
              className="py-3 px-6 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#FF4DB6] transition-colors disabled:opacity-50"
            >
              Clear
            </button>
          </div>

          {/* Output */}
          {output && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white">Output</label>
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <pre className="text-green-400 whitespace-pre-wrap font-mono text-sm">{output}</pre>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Copy className="h-5 w-5" />
                    Copy
                  </div>
                </button>
                <button
                  onClick={downloadJSON}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Download className="h-5 w-5" />
                    Download
                  </div>
                </button>
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
