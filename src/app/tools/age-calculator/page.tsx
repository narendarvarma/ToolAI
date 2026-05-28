"use client"

import { useState } from "react"
import { Calendar, Clock } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("")
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null)

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

    setResult({ years, months, days })
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Age Calculator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Calculate your age precisely</p>
        
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
              <div className="grid grid-cols-3 gap-4 text-center">
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
            </div>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <AdSlot adSlot="4000000002" className="w-full max-w-2xl" />
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
