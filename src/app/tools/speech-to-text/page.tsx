"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, Square, FileText } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function SpeechToText() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onresult = (event: any) => {
        let finalTranscript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          }
        }
        setTranscript(prev => prev + finalTranscript)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const clearTranscript = () => {
    setTranscript("")
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Speech to Text</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert speech to text instantly</p>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Transcript Display */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Transcript</label>
            <div className="p-4 rounded-xl bg-[#0B0F1A] border border-white/8 min-h-40">
              <p className="text-white whitespace-pre-wrap">{transcript || "Your speech will appear here..."}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={startListening}
              disabled={isListening}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
            >
              <div className="flex items-center justify-center gap-2">
                <Mic className="h-5 w-5" />
                Start Listening
              </div>
            </button>
            <button
              onClick={stopListening}
              disabled={!isListening}
              className="flex-1 py-3 rounded-xl bg-[#111827] border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors disabled:opacity-50"
            >
              <div className="flex items-center justify-center gap-2">
                <Square className="h-5 w-5" />
                Stop
              </div>
            </button>
          </div>

          <button
            onClick={clearTranscript}
            className="w-full py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
          >
            Clear Transcript
          </button>
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
