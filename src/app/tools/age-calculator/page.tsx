"use client"

import { useState } from "react"
import { Calendar, Clock } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("")
  const [result, setResult] = useState<{ years: number; months: number; days: number; nextBirthday: string; daysUntilBirthday: number } | null>(null)

  const calculateAge = () => {
    if (!birthDate) return

    const birth = new Date(birthDate)
    const today = new Date()

    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    let days = today.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      days += lastMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    // Calculate next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday <= today) {
      nextBirthday.setFullYear(today.getFullYear() + 1)
    }

    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    const nextBirthdayStr = nextBirthday.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    setResult({ years, months, days, nextBirthday: nextBirthdayStr, daysUntilBirthday })
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Age Calculator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Calculate your age precisely</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Date Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Date of Birth</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            />
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateAge}
            disabled={!birthDate}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            Calculate Age
          </button>

          {/* Result */}
          {result && (
            <div className="mt-6 p-6 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30">
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div>
                  <Clock className="h-8 w-8 mx-auto mb-2 text-[#00E5FF]" />
                  <p className="text-3xl font-bold text-white">{result.years}</p>
                  <p className="text-sm text-gray-400">Years</p>
                </div>
                <div>
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-[#7C3AED]" />
                  <p className="text-3xl font-bold text-white">{result.months}</p>
                  <p className="text-sm text-gray-400">Months</p>
                </div>
                <div>
                  <Clock className="h-8 w-8 mx-auto mb-2 text-[#00E5FF]" />
                  <p className="text-3xl font-bold text-white">{result.days}</p>
                  <p className="text-sm text-gray-400">Days</p>
                </div>
              </div>

              {/* Next Birthday */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-center">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-[#00E5FF]" />
                  <p className="text-lg font-semibold text-white mb-1">Next Birthday</p>
                  <p className="text-sm text-gray-400 mb-2">{result.nextBirthday}</p>
                  <p className="text-2xl font-bold text-[#00E5FF]">{result.daysUntilBirthday} days away!</p>
                </div>
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
          "Select your date of birth from the date picker",
          "Click Calculate Age to see your exact age",
          "View your age in years, months, and days",
          "See when your next birthday is and how many days away"
        ]} />

        {/* Social Share */}
        <SocialShare title="Age Calculator - Calculate your age precisely" />

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




