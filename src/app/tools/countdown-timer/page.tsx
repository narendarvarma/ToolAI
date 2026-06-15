"use client"

import { useState, useEffect } from "react"
import { Timer, Play, Pause, RotateCcw } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function CountdownTimer() {
  const toolContent = getToolContent("countdown-timer")
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      setIsPaused(false)
      // Play sound or show notification when timer ends
      if (typeof window !== "undefined") {
        alert("Time's up!")
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, isPaused, timeLeft])

  const startTimer = () => {
    if (!isRunning) {
      const totalSeconds = hours * 3600 + minutes * 60 + seconds
      if (totalSeconds > 0) {
        setTimeLeft(totalSeconds)
        setIsRunning(true)
        setIsPaused(false)
      }
    }
  }

  const pauseTimer = () => {
    setIsPaused(!isPaused)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setIsPaused(false)
    setTimeLeft(0)
  }

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Countdown Timer</h1>
        <p className="text-gray-400 text-base text-center mb-8">Set a countdown timer</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Time Input */}
          {!isRunning && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Hours</label>
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                  min="0"
                  max="23"
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all text-center text-2xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Minutes</label>
                <input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                  min="0"
                  max="59"
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all text-center text-2xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Seconds</label>
                <input
                  type="number"
                  value={seconds}
                  onChange={(e) => setSeconds(Math.max(0, parseInt(e.target.value) || 0))}
                  min="0"
                  max="59"
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all text-center text-2xl"
                />
              </div>
            </div>
          )}

          {/* Timer Display */}
          <div className="mb-6 p-8 bg-white/5 rounded-2xl border border-white/8">
            <p className="text-6xl md:text-8xl font-bold text-center text-white font-mono">
              {isRunning || timeLeft > 0 ? formatTime(timeLeft) : formatTime(hours * 3600 + minutes * 60 + seconds)}
            </p>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-3">
            {!isRunning ? (
              <button
                onClick={startTimer}
                disabled={hours === 0 && minutes === 0 && seconds === 0}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
              >
                <div className="flex items-center justify-center gap-2">
                  <Play className="h-6 w-6" />
                  Start
                </div>
              </button>
            ) : (
              <>
                <button
                  onClick={pauseTimer}
                  className="flex-1 py-4 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Pause className="h-6 w-6" />
                    {isPaused ? "Resume" : "Pause"}
                  </div>
                </button>
                <button
                  onClick={resetTimer}
                  className="flex-1 py-4 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#FF4DB6] transition-colors"
                >
                  <div className="flex items-center justify-center gap-2">
                    <RotateCcw className="h-6 w-6" />
                    Reset
                  </div>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        </div>

        {/* Tool Content Section */}
        <ToolContent content={toolContent} toolName="Countdown Timer" toolPath="/tools/countdown-timer" />

        {/* Related Tools */}
        <RelatedTools currentToolPath="/tools/countdown-timer" currentCategory={toolContent.category} />

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




