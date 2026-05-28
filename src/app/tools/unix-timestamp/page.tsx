"use client"

import { useState, useEffect } from "react"
import { Clock, Copy, RefreshCw } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function UnixTimestampConverter() {
  const [currentTimestamp, setCurrentTimestamp] = useState(0)
  const [inputTimestamp, setInputTimestamp] = useState("")
  const [inputDate, setInputDate] = useState("")
  const [convertedDate, setConvertedDate] = useState("")
  const [convertedTimestamp, setConvertedTimestamp] = useState("")

  useEffect(() => {
    const updateCurrentTimestamp = () => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000))
    }
    
    updateCurrentTimestamp()
    const interval = setInterval(updateCurrentTimestamp, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const timestampToDate = () => {
    if (!inputTimestamp) return
    
    const timestamp = parseInt(inputTimestamp)
    if (isNaN(timestamp)) {
      setConvertedDate("Invalid timestamp")
      return
    }
    
    const date = new Date(timestamp * 1000)
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }
    setConvertedDate(date.toLocaleDateString('en-US', options))
  }

  const dateToTimestamp = () => {
    if (!inputDate) return
    
    const date = new Date(inputDate)
    if (isNaN(date.getTime())) {
      setConvertedTimestamp("Invalid date")
      return
    }
    
    setConvertedTimestamp(Math.floor(date.getTime() / 1000).toString())
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  const copyCurrentTimestamp = () => {
    navigator.clipboard.writeText(currentTimestamp.toString())
    alert("Current timestamp copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Unix Timestamp Converter</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert between Unix timestamps and dates</p>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Current Timestamp */}
          <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Current Unix Timestamp</p>
                <p className="text-2xl font-bold text-[#00E5FF]">{currentTimestamp}</p>
              </div>
              <button
                onClick={copyCurrentTimestamp}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Timestamp to Date */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Timestamp to Date</h3>
            <div className="flex gap-3 mb-4">
              <input
                type="number"
                value={inputTimestamp}
                onChange={(e) => setInputTimestamp(e.target.value)}
                placeholder="Enter Unix timestamp"
                className="flex-1 px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              />
              <button
                onClick={timestampToDate}
                disabled={!inputTimestamp}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
              >
                <Clock className="h-5 w-5" />
              </button>
            </div>
            {convertedDate && (
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <p className="text-white">{convertedDate}</p>
              </div>
            )}
          </div>

          {/* Date to Timestamp */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Date to Timestamp</h3>
            <div className="flex gap-3 mb-4">
              <input
                type="datetime-local"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              />
              <button
                onClick={dateToTimestamp}
                disabled={!inputDate}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
            {convertedTimestamp && (
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <p className="text-white text-lg">
                  <span className="text-gray-400">Unix Timestamp:</span>{" "}
                  <span className="text-[#00E5FF] font-semibold">{convertedTimestamp}</span>
                </p>
              </div>
            )}
          </div>
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
