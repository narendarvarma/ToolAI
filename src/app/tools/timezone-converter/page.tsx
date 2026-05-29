"use client"

import { useState } from "react"
import { Clock, Copy } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

const timeZones = [
  { name: "UTC", offset: 0 },
  { name: "New York (EST)", offset: -5 },
  { name: "New York (EDT)", offset: -4 },
  { name: "Los Angeles (PST)", offset: -8 },
  { name: "Los Angeles (PDT)", offset: -7 },
  { name: "London (GMT)", offset: 0 },
  { name: "London (BST)", offset: 1 },
  { name: "Paris (CET)", offset: 1 },
  { name: "Paris (CEST)", offset: 2 },
  { name: "Berlin (CET)", offset: 1 },
  { name: "Berlin (CEST)", offset: 2 },
  { name: "Tokyo (JST)", offset: 9 },
  { name: "Sydney (AEST)", offset: 10 },
  { name: "Sydney (AEDT)", offset: 11 },
  { name: "Dubai (GST)", offset: 4 },
  { name: "Mumbai (IST)", offset: 5.5 },
  { name: "Singapore (SGT)", offset: 8 },
  { name: "Hong Kong (HKT)", offset: 8 },
  { name: "Moscow (MSK)", offset: 3 },
]

export default function TimeZoneConverter() {
  const [fromZone, setFromZone] = useState("UTC")
  const [toZone, setToZone] = useState("New York (EST)")
  const [inputTime, setInputTime] = useState("12:00")
  const [convertedTime, setConvertedTime] = useState("")

  const convertTime = () => {
    const [hours, minutes] = inputTime.split(":").map(Number)
    const fromOffset = timeZones.find(tz => tz.name === fromZone)?.offset || 0
    const toOffset = timeZones.find(tz => tz.name === toZone)?.offset || 0
    
    const totalMinutes = hours * 60 + minutes
    const fromMinutes = fromOffset * 60
    const toMinutes = toOffset * 60
    
    const convertedMinutes = totalMinutes - fromMinutes + toMinutes
    
    let convertedHours = Math.floor(convertedMinutes / 60)
    let convertedMins = convertedMinutes % 60
    
    // Handle day wrap
    if (convertedHours >= 24) {
      convertedHours -= 24
    } else if (convertedHours < 0) {
      convertedHours += 24
    }
    
    const formattedHours = convertedHours.toString().padStart(2, "0")
    const formattedMins = convertedMins.toString().padStart(2, "0")
    
    setConvertedTime(`${formattedHours}:${formattedMins}`)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${convertedTime} ${toZone}`)
    alert("Converted time copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Time Zone Converter</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert time between different time zones</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* From Zone */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">From Time Zone</label>
            <select
              value={fromZone}
              onChange={(e) => setFromZone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            >
              {timeZones.map(tz => (
                <option key={tz.name} value={tz.name}>{tz.name} (UTC{tz.offset >= 0 ? '+' : ''}{tz.offset})</option>
              ))}
            </select>
          </div>

          {/* Input Time */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Time</label>
            <input
              type="time"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            />
          </div>

          {/* To Zone */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">To Time Zone</label>
            <select
              value={toZone}
              onChange={(e) => setToZone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            >
              {timeZones.map(tz => (
                <option key={tz.name} value={tz.name}>{tz.name} (UTC{tz.offset >= 0 ? '+' : ''}{tz.offset})</option>
              ))}
            </select>
          </div>

          {/* Convert Button */}
          <button
            onClick={convertTime}
            className="w-full mb-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
          >
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-5 w-5" />
              Convert Time
            </div>
          </button>

          {/* Result */}
          {convertedTime && (
            <div className="p-4 bg-white/5 rounded-xl border border-white/8">
              <p className="text-white text-lg">
                <span className="text-gray-400">Converted Time:</span>{" "}
                <span className="text-[#00E5FF] font-semibold">{convertedTime}</span>
                {" "}{toZone}
              </p>
              <button
                onClick={copyToClipboard}
                className="mt-4 w-full py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  <Copy className="h-5 w-5" />
                  Copy Result
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




