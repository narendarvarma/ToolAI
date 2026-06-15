"use client"

import { useState } from "react"
import { Activity, Flame } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"

export default function CalorieCalculator() {
  const [gender, setGender] = useState("male")
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [activityLevel, setActivityLevel] = useState("moderate")
  const [bmr, setBmr] = useState(0)
  const [dailyCalories, setDailyCalories] = useState(0)

  const calculateCalories = () => {
    const ageNum = parseInt(age) || 0
    const weightNum = parseFloat(weight) || 0
    const heightNum = parseFloat(height) || 0

    if (!ageNum || !weightNum || !heightNum) return

    // Mifflin-St Jeor Equation
    let bmrValue: number
    if (gender === "male") {
      bmrValue = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
    } else {
      bmrValue = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161
    }

    // Activity multipliers
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    }

    const multiplier = activityMultipliers[activityLevel] || 1.55
    const dailyCal = Math.round(bmrValue * multiplier)

    setBmr(Math.round(bmrValue))
    setDailyCalories(dailyCal)
  }

  const toolContent = getToolContent("calorie-calculator")

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Calorie Calculator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Calculate your daily calorie needs</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Gender */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Gender</label>
            <div className="flex gap-3">
              <button
                onClick={() => setGender("male")}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${gender === "male" ? "bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white" : "bg-white/5 border border-white/8 text-gray-400 hover:text-white"}`}
              >
                Male
              </button>
              <button
                onClick={() => setGender("female")}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${gender === "female" ? "bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white" : "bg-white/5 border border-white/8 text-gray-400 hover:text-white"}`}
              >
                Female
              </button>
            </div>
          </div>

          {/* Age, Weight, Height */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Age (years)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="70"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="175"
              />
            </div>
          </div>

          {/* Activity Level */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Activity Level</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            >
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Light (1-3 days/week)</option>
              <option value="moderate">Moderate (3-5 days/week)</option>
              <option value="active">Active (6-7 days/week)</option>
              <option value="veryActive">Very Active (hard exercise daily)</option>
            </select>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateCalories}
            disabled={!age || !weight || !height}
            className="w-full mb-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            <div className="flex items-center justify-center gap-2">
              <Flame className="h-5 w-5" />
              Calculate Calories
            </div>
          </button>

          {/* Results */}
          {dailyCalories > 0 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <p className="text-sm text-gray-400 mb-1">BMR (Basal Metabolic Rate)</p>
                <p className="text-2xl font-bold text-[#00E5FF]">{bmr} kcal</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <p className="text-sm text-gray-400 mb-1">Daily Calorie Needs</p>
                <p className="text-2xl font-bold text-[#00E5FF]">{dailyCalories} kcal</p>
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
        <ToolContent content={toolContent} toolName="Calorie Calculator Online Free" toolPath="/tools/calorie-calculator" />
        <RelatedTools currentToolPath="/tools/calorie-calculator" currentCategory={toolContent.category} />

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



