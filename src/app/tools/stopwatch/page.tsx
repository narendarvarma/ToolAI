"use client"

import { useState, useEffect } from "react"
import { Timer, Play, Pause, RotateCcw } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10)
      }, 10)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  const startStop = () => {
    setIsRunning(!isRunning)
  }

  const reset = () => {
    setIsRunning(false)
    setTime(0)
    setLaps([])
  }

  const lap = () => {
    if (isRunning) {
      setLaps([...laps, time])
    }
  }

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000)
    const minutes = Math.floor((milliseconds % 3600000) / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    const centiseconds = Math.floor((milliseconds % 1000) / 10)

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Stopwatch</h1>
        <p className="text-gray-400 text-base text-center mb-8">Track time with precision</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Timer Display */}
          <div className="mb-6 p-8 bg-white/5 rounded-2xl border border-white/8">
            <p className="text-5xl md:text-7xl font-bold text-center text-white font-mono">
              {formatTime(time)}
            </p>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={startStop}
              className={`flex-1 py-4 rounded-xl font-semibold hover:scale-[1.02] transition-transform shadow-lg ${
                isRunning 
                  ? "bg-white/5 border border-white/8 text-white hover:border-[#FF4DB6]" 
                  : "bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white shadow-[#00E5FF]/20"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                {isRunning ? "Pause" : "Start"}
              </div>
            </button>
            <button
              onClick={lap}
              disabled={!isRunning}
              className="flex-1 py-4 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors disabled:opacity-50"
            >
              Lap
            </button>
            <button
              onClick={reset}
              className="py-4 px-6 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#FF4DB6] transition-colors"
            >
              <RotateCcw className="h-6 w-6" />
            </button>
          </div>

          {/* Laps */}
          {laps.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Laps</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {laps.map((lapTime, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/8">
                    <span className="text-gray-400">Lap {index + 1}</span>
                    <span className="text-white font-mono">{formatTime(lapTime)}</span>
                  </div>
                ))}
              </div>
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




