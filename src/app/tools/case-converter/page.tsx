"use client"

import { useState } from "react"
import { Type, Copy, RefreshCw } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function CaseConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const toUpperCase = () => {
    setOutput(input.toUpperCase())
  }

  const toLowerCase = () => {
    setOutput(input.toLowerCase())
  }

  const toTitleCase = () => {
    const titleCase = input
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    setOutput(titleCase)
  }

  const toSentenceCase = () => {
    const sentenceCase = input
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase())
    setOutput(sentenceCase)
  }

  const toCamelCase = () => {
    const words = input
      .toLowerCase()
      .split(/[\s_-]+/)
      .filter(word => word.length > 0)
    
    if (words.length === 0) {
      setOutput("")
      return
    }
    
    const camelCase = words[0] + words.slice(1).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')
    
    setOutput(camelCase)
  }

  const toPascalCase = () => {
    const words = input
      .toLowerCase()
      .split(/[\s_-]+/)
      .filter(word => word.length > 0)
    
    if (words.length === 0) {
      setOutput("")
      return
    }
    
    const pascalCase = words.map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')
    
    setOutput(pascalCase)
  }

  const toSnakeCase = () => {
    const snakeCase = input
      .toLowerCase()
      .replace(/[\s_-]+/g, '_')
      .replace(/[^a-z0-9_]/g, '')
    setOutput(snakeCase)
  }

  const toKebabCase = () => {
    const kebabCase = input
      .toLowerCase()
      .replace(/[\s_]+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    setOutput(kebabCase)
  }

  const toConstantCase = () => {
    const constantCase = input
      .toUpperCase()
      .replace(/[\s_-]+/g, '_')
      .replace(/[^A-Z0-9_]/g, '')
    setOutput(constantCase)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    alert("Text copied to clipboard!")
  }

  const clearAll = () => {
    setInput("")
    setOutput("")
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Case Converter</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert text to different cases</p>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Enter your text</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-32 resize-none"
              placeholder="Type or paste your text here..."
            />
          </div>

          {/* Conversion Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <button
              onClick={toUpperCase}
              disabled={!input}
              className="py-3 px-4 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors disabled:opacity-50 text-sm"
            >
              UPPER CASE
            </button>
            <button
              onClick={toLowerCase}
              disabled={!input}
              className="py-3 px-4 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors disabled:opacity-50 text-sm"
            >
              lower case
            </button>
            <button
              onClick={toTitleCase}
              disabled={!input}
              className="py-3 px-4 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors disabled:opacity-50 text-sm"
            >
              Title Case
            </button>
            <button
              onClick={toSentenceCase}
              disabled={!input}
              className="py-3 px-4 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors disabled:opacity-50 text-sm"
            >
              Sentence case
            </button>
            <button
              onClick={toCamelCase}
              disabled={!input}
              className="py-3 px-4 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors disabled:opacity-50 text-sm"
            >
              camelCase
            </button>
            <button
              onClick={toPascalCase}
              disabled={!input}
              className="py-3 px-4 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors disabled:opacity-50 text-sm"
            >
              PascalCase
            </button>
            <button
              onClick={toSnakeCase}
              disabled={!input}
              className="py-3 px-4 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors disabled:opacity-50 text-sm"
            >
              snake_case
            </button>
            <button
              onClick={toKebabCase}
              disabled={!input}
              className="py-3 px-4 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors disabled:opacity-50 text-sm"
            >
              kebab-case
            </button>
          </div>

          <button
            onClick={toConstantCase}
            disabled={!input}
            className="w-full mb-6 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors disabled:opacity-50 text-sm"
          >
            CONSTANT_CASE
          </button>

          {/* Output */}
          {output && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white">Result</label>
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <p className="text-white whitespace-pre-wrap">{output}</p>
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
                  onClick={clearAll}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#FF4DB6] transition-colors"
                >
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="h-5 w-5" />
                    Clear
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
