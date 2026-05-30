"use client"

import { useState, useEffect } from "react"
import { tokenManager } from "@/lib/token-manager"

export default function DailyLimitPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // Check if limit is reached
    if (!tokenManager.canUseRequest()) {
      setIsOpen(true)
    }

    // Update countdown every second
    const interval = setInterval(() => {
      const time = tokenManager.getTimeUntilReset()
      setTimeLeft(time)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  const formatTime = (num: number) => String(num).padStart(2, "0")

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <div className="bg-[#1a1d27] border border-[#7c6af7] rounded-2xl p-9 max-w-[380px] w-[90%] text-center text-[#e8eaf0] shadow-[0_0_40px_rgba(124,106,247,0.3)]">
        <div className="text-6xl mb-3">⚡</div>
        <h2 className="text-2xl font-bold mb-3 text-white">Daily Tokens Completed!</h2>
        <p className="text-sm text-[#a0a4b8] mb-4">
          You've used all <strong className="text-white">{tokenManager.getDailyLimit()}</strong> free AI requests for today.
        </p>
        <div className="bg-[#12141d] border border-[#2a2d3a] rounded-xl px-4 py-3 text-base text-[#4ecdab] font-semibold mb-4">
          🕛 Resets in:{" "}
          <span className="font-mono">
            {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
          </span>
        </div>
        <p className="text-xs text-[#6b7080] mb-4">
          Come back tomorrow to continue using ToolHub AI tools for free!
        </p>
        <button
          onClick={handleClose}
          className="mt-4 bg-[#7c6af7] text-white border-none px-8 py-3 rounded-lg text-sm font-semibold cursor-pointer hover:opacity-85 transition-opacity"
        >
          Got it!
        </button>
      </div>
    </div>
  )
}
