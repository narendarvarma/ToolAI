"use client"

import { useState } from "react"
import { Link as LinkIcon, Copy, ArrowUpDown } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function URLEncoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState("encode")

  const encodeURL = () => {
    try {
      const encoded = encodeURIComponent(input)
      setOutput(encoded)
    } catch (e) {
      setOutput("Error: Invalid input for encoding")
    }
  }

  const decodeURL = () => {
    try {
      const decoded = decodeURIComponent(input)
      setOutput(decoded)
    } catch (e) {
      setOutput("Error: Invalid URL string")
    }
  }

  const handleConvert = () => {
    if (mode === "encode") {
      encodeURL()
    } else {
      decodeURL()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    alert("Output copied to clipboard!")
  }

  const swapMode = () => {
    setMode(mode === "encode" ? "decode" : "encode")
    setInput(output)
    setOutput("")
  }

  const clearAll = () => {
    setInput("")
    setOutput("")
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">URL Encoder/Decoder</h1>
        <p className="text-gray-400 text-base text-center mb-8">Encode and decode URL strings</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Mode Toggle */}
          <div className="mb-6">
            <div className="flex gap-3">
              <button
                onClick={() => setMode("encode")}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${mode === "encode" ? "bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white" : "bg-white/5 border border-white/8 text-gray-400 hover:text-white"}`}
              >
                Encode
              </button>
              <button
                onClick={() => setMode("decode")}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${mode === "decode" ? "bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white" : "bg-white/5 border border-white/8 text-gray-400 hover:text-white"}`}
              >
                Decode
              </button>
            </div>
          </div>

          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">
              {mode === "encode" ? "Input URL" : "Input Encoded URL"}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-32 resize-none font-mono text-sm"
              placeholder={mode === "encode" ? "Enter URL to encode..." : "Enter encoded URL to decode..."}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleConvert}
              disabled={!input}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
            >
              <div className="flex items-center justify-center gap-2">
                <LinkIcon className="h-5 w-5" />
                {mode === "encode" ? "Encode" : "Decode"}
              </div>
            </button>
            <button
              onClick={swapMode}
              disabled={!input || !output}
              className="py-3 px-6 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors disabled:opacity-50"
            >
              <ArrowUpDown className="h-5 w-5" />
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
              <label className="block text-sm font-medium mb-2 text-white">
                {mode === "encode" ? "Encoded URL" : "Decoded URL"}
              </label>
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <pre className="text-green-400 whitespace-pre-wrap font-mono text-sm break-all">{output}</pre>
              </div>
              <button
                onClick={copyToClipboard}
                className="mt-4 w-full py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  <Copy className="h-5 w-5" />
                  Copy Output
                </div>
              </button>
            </div>
          )}
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




