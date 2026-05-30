"use client"

import { useState, useEffect } from "react"
import { Play, Pause, RotateCw, Clock } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState<"work" | "short" | "long">("work")
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000)
    } else if (time === 0) {
      setIsRunning(false)
      setCompleted(completed + 1)
      playSound()
      alert("Time's up!")
    }
    return () => clearInterval(interval)
  }, [isRunning, time])

  const playSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = "sine"
    gainNode.gain.value = 0.3

    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    if (mode === "work") setTime(25 * 60)
    else if (mode === "short") setTime(5 * 60)
    else setTime(15 * 60)
  }

  const switchMode = (newMode: "work" | "short" | "long") => {
    setMode(newMode)
    setIsRunning(false)
    if (newMode === "work") setTime(25 * 60)
    else if (newMode === "short") setTime(5 * 60)
    else setTime(15 * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Pomodoro Timer</h1>
        <p className="text-gray-400 text-base text-center mb-8">Boost your productivity with focused work sessions</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Mode Selection */}
          <div className="mb-6 flex gap-3">
            <button
              onClick={() => switchMode("work")}
              className={`flex-1 py-3 rounded-xl transition-all ${
                mode === "work"
                  ? "bg-[#3B82F6] text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              Work (25m)
            </button>
            <button
              onClick={() => switchMode("short")}
              className={`flex-1 py-3 rounded-xl transition-all ${
                mode === "short"
                  ? "bg-[#7C3AED] text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              Short (5m)
            </button>
            <button
              onClick={() => switchMode("long")}
              className={`flex-1 py-3 rounded-xl transition-all ${
                mode === "long"
                  ? "bg-[#7C3AED] text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              Long (15m)
            </button>
          </div>

          {/* Timer Display */}
          <div className="mb-6 p-8 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30">
            <div className="text-center">
              <Clock className="h-16 w-16 mx-auto mb-4 text-[#00E5FF]" />
              <p className="text-6xl font-bold text-white">{formatTime(time)}</p>
              <p className="text-sm text-gray-400 mt-2 capitalize">{mode} session</p>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={toggleTimer}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
            >
              <div className="flex items-center justify-center gap-2">
                {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                {isRunning ? "Pause" : "Start"}
              </div>
            </button>
            <button
              onClick={resetTimer}
              className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <RotateCw className="h-5 w-5" />
                Reset
              </div>
            </button>
          </div>

          {/* Completed Count */}
          <div className="text-center">
            <p className="text-gray-400">Completed Pomodoros: <span className="text-white font-bold">{completed}</span></p>
          </div>
        </div>

        {/* Single bottom ad */}
        <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>

        {/* How to Use Section */}
        <HowToUse steps={[
          "Select a timer mode: Work (25min), Short break (5min), or Long break (15min)",
          "Click Start to begin the countdown",
          "Work or take a break until the timer ends",
          "A sound alert will play when time is up",
          "Click Reset to restart the timer at any time"
        ]} />

        {/* Social Share */}
        <SocialShare title="Pomodoro Timer - Boost your productivity with focused work sessions" />

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




