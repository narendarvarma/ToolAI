"use client"

import { useState } from "react"
import { FileText, Copy, RefreshCw } from "lucide-react"
import AdSlot from "@/components/ad-slot"

const loremWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur",
  "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa",
  "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
]

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3)
  const [sentences, setSentences] = useState(5)
  const [generatedText, setGeneratedText] = useState("")

  const generateLoremIpsum = () => {
    let result = []
    
    for (let p = 0; p < paragraphs; p++) {
      let paragraph = []
      
      for (let s = 0; s < sentences; s++) {
        let sentence = []
        const sentenceLength = Math.floor(Math.random() * 8) + 6 // 6-14 words per sentence
        
        for (let w = 0; w < sentenceLength; w++) {
          const word = loremWords[Math.floor(Math.random() * loremWords.length)]
          sentence.push(w === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word)
        }
        
        paragraph.push(sentence.join(" ") + ".")
      }
      
      result.push(paragraph.join(" "))
    }
    
    setGeneratedText(result.join("\n\n"))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText)
    alert("Lorem Ipsum text copied to clipboard!")
  }

  const regenerate = () => {
    generateLoremIpsum()
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Lorem Ipsum Generator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Generate placeholder text for designs</p>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Settings */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Paragraphs</label>
              <input
                type="number"
                value={paragraphs}
                onChange={(e) => setParagraphs(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                min="1"
                max="20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Sentences per Paragraph</label>
              <input
                type="number"
                value={sentences}
                onChange={(e) => setSentences(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                min="1"
                max="20"
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateLoremIpsum}
            className="w-full mb-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
          >
            <div className="flex items-center justify-center gap-2">
              <FileText className="h-5 w-5" />
              Generate Lorem Ipsum
            </div>
          </button>

          {/* Generated Text */}
          {generatedText && (
            <div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <p className="text-white whitespace-pre-wrap">{generatedText}</p>
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
                  onClick={regenerate}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors"
                >
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="h-5 w-5" />
                    Regenerate
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
