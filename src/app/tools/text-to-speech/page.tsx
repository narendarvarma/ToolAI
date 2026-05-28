"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, Play, Pause } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function TextToSpeech() {
  const [text, setText] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voice, setVoice] = useState("")
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices()
        setVoices(availableVoices)
        if (availableVoices.length > 0) {
          setVoice(availableVoices[0].name)
        }
      }
      loadVoices()
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  const speak = () => {
    if (!text || !("speechSynthesis" in window)) return

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    const selectedVoice = voices.find(v => v.name === voice)
    if (selectedVoice) utterance.voice = selectedVoice

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  const stop = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Text to Speech</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert text to speech instantly</p>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Text Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Enter Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-40 resize-none"
              placeholder="Enter text to convert to speech..."
            />
          </div>

          {/* Voice Selection */}
          {voices.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white">Select Voice</label>
              <select
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              >
                {voices.map(v => (
                  <option key={v.name} value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={speak}
              disabled={!text || isSpeaking}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
            >
              <div className="flex items-center justify-center gap-2">
                <Play className="h-5 w-5" />
                Speak
              </div>
            </button>
            <button
              onClick={stop}
              disabled={!isSpeaking}
              className="flex-1 py-3 rounded-xl bg-[#111827] border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors disabled:opacity-50"
            >
              <div className="flex items-center justify-center gap-2">
                <Pause className="h-5 w-5" />
                Stop
              </div>
            </button>
          </div>
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <AdSlot adSlot="2000000005" className="w-full max-w-2xl" />
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
