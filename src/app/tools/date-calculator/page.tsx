"use client"

import { useState } from "react"
import { Calendar, Copy } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function DateCalculator() {
  const toolContent = getToolContent("date-calculator")
  const [startDate, setStartDate] = useState("")
  const [daysToAdd, setDaysToAdd] = useState(0)
  const [resultDate, setResultDate] = useState("")
  const [mode, setMode] = useState("add")

  const calculateDate = () => {
    if (!startDate) return

    const date = new Date(startDate)
    
    if (mode === "add") {
      date.setDate(date.getDate() + daysToAdd)
    } else {
      date.setDate(date.getDate() - daysToAdd)
    }

    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    setResultDate(date.toLocaleDateString('en-US', options))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultDate)
    alert("Date copied to clipboard!")
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Date Calculator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Add or subtract days from a date</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Mode Toggle */}
          <div className="mb-6">
            <div className="flex gap-3">
              <button
                onClick={() => setMode("add")}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${mode === "add" ? "bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white" : "bg-white/5 border border-white/8 text-gray-400 hover:text-white"}`}
              >
                Add Days
              </button>
              <button
                onClick={() => setMode("subtract")}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${mode === "subtract" ? "bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white" : "bg-white/5 border border-white/8 text-gray-400 hover:text-white"}`}
              >
                Subtract Days
              </button>
            </div>
          </div>

          {/* Start Date */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={today}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            />
          </div>

          {/* Days */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">
              {mode === "add" ? "Days to Add" : "Days to Subtract"}
            </label>
            <input
              type="number"
              value={daysToAdd}
              onChange={(e) => setDaysToAdd(parseInt(e.target.value) || 0)}
              min="0"
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Enter number of days"
            />
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateDate}
            disabled={!startDate}
            className="w-full mb-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            <div className="flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5" />
              Calculate Date
            </div>
          </button>

          {/* Result */}
          {resultDate && (
            <div className="p-4 bg-white/5 rounded-xl border border-white/8">
              <p className="text-white text-lg">
                <span className="text-gray-400">Result:</span>{" "}
                <span className="text-[#00E5FF] font-semibold">{resultDate}</span>
              </p>
              <button
                onClick={copyToClipboard}
                className="mt-4 w-full py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  <Copy className="h-5 w-5" />
                  Copy Date
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

        {/* Tool Content Section */}
        <ToolContent content={toolContent} toolName="Date Calculator" toolPath="/tools/date-calculator" />

        {/* Related Tools */}
        <RelatedTools currentToolPath="/tools/date-calculator" currentCategory={toolContent.category} />

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




