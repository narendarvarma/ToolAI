"use client"

import { useState } from "react"
import { Calculator, Users } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function AttendanceCalculator() {
  useRecentTools("/tools/attendance-calculator", "Attendance Calculator", "Users")
  const [totalClasses, setTotalClasses] = useState("")
  const [attendedClasses, setAttendedClasses] = useState("")
  const [calculated, setCalculated] = useState(false)

  const calculateAttendance = () => {
    if (totalClasses && attendedClasses) {
      setCalculated(true)
    }
  }

  const attendance = totalClasses && attendedClasses ? (parseFloat(attendedClasses) / parseFloat(totalClasses)) * 100 : 0

  const getStatus = (percentage: number) => {
    if (percentage >= 75) {
      const canMiss = Math.max(0, Math.floor((parseFloat(totalClasses) * 0.75) - parseFloat(attendedClasses)))
      return { 
        text: "✅ Safe", 
        color: "text-green-400", 
        message: `You can miss ${canMiss} more classes` 
      }
    }
    if (percentage >= 65) {
      const needed = Math.ceil((parseFloat(totalClasses) * 0.75) - parseFloat(attendedClasses))
      return { 
        text: "⚠️ At Risk", 
        color: "text-yellow-400", 
        message: `Attend ${needed} classes to reach 75%` 
      }
    }
    const needed = Math.ceil((parseFloat(totalClasses) * 0.75) - parseFloat(attendedClasses))
    return { 
      text: "❌ Detained Risk", 
      color: "text-red-400", 
      message: `Attend ${needed} classes urgently` 
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Attendance Calculator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Track your attendance percentage</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Input Form */}
          <div className="mb-6 space-y-4">
            <input
              type="number"
              value={totalClasses}
              onChange={(e) => setTotalClasses(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Total Classes Held"
              min="1"
            />
            <input
              type="number"
              value={attendedClasses}
              onChange={(e) => setAttendedClasses(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Classes Attended"
              min="0"
            />
            <button
              onClick={calculateAttendance}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
            >
              <div className="flex items-center justify-center gap-2">
                <Calculator className="h-5 w-5" />
                Calculate Attendance
              </div>
            </button>
          </div>

          {/* Result */}
          {calculated && (
            <div className="p-6 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30">
              <div className="text-center mb-4">
                <Calculator className="h-8 w-8 mx-auto mb-2 text-[#00E5FF]" />
                <p className="text-4xl font-bold text-white">{attendance.toFixed(1)}%</p>
                <p className="text-sm text-gray-400 mt-1">Your Attendance</p>
                <p className={`text-lg font-semibold mt-2 ${getStatus(attendance).color}`}>
                  {getStatus(attendance).text}
                </p>
                <p className="text-sm text-gray-400 mt-2">{getStatus(attendance).message}</p>
              </div>

              {/* Formula */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-gray-500 text-center">
                  Formula: (Classes Attended / Total Classes) × 100 = {attendance.toFixed(1)}%
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>

        {/* How to Use Section */}
        <HowToUse steps={[
          "Enter the total number of classes held",
          "Enter the number of classes you attended",
          "Click Calculate Attendance to get your percentage",
          "Check your status: Safe (≥75%), At Risk (65-74%), or Detained Risk (<65%)",
          "See how many classes you can miss or need to attend to reach 75%"
        ]} />

        {/* Social Share */}
        <SocialShare title="Attendance Calculator - Track your attendance percentage" />

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




