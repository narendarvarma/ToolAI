"use client"

import { useState } from "react"
import { Calculator, Percent, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function PercentageCalculator() {
  useRecentTools("/tools/percentage-calculator", "Percentage Calculator", "Percent")
  const toolContent = getToolContent("percentage-calculator")
  
  const [obtained, setObtained] = useState("")
  const [total, setTotal] = useState("")
  const [percentage, setPercentage] = useState("")
  const [value, setValue] = useState("")
  const [oldValue, setOldValue] = useState("")
  const [newValue, setNewValue] = useState("")

  // Calculate percentage from marks
  const marksPercentage = obtained && total ? (parseFloat(obtained) / parseFloat(total)) * 100 : 0

  // Calculate value from percentage
  const calculatedValue = percentage && value ? (parseFloat(percentage) / 100) * parseFloat(value) : 0

  // Calculate percentage change
  const percentageChange = oldValue && newValue ? ((parseFloat(newValue) - parseFloat(oldValue)) / parseFloat(oldValue)) * 100 : 0

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Percentage Calculator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Calculate marks percentage, reverse percentage, and percentage change instantly</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8">
          <div id="ad-top"></div>
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8 space-y-8">
          
          {/* Marks to Percentage */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#00E5FF]" />
              Marks to Percentage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Marks Obtained</label>
                <input
                  type="number"
                  value={obtained}
                  onChange={(e) => setObtained(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                  placeholder="e.g., 85"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Total Marks</label>
                <input
                  type="number"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                  placeholder="e.g., 100"
                />
              </div>
            </div>
            {obtained && total && (
              <div className="p-4 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30">
                <p className="text-3xl font-bold text-white text-center">{marksPercentage.toFixed(2)}%</p>
                <p className="text-sm text-gray-400 text-center mt-1">Percentage</p>
              </div>
            )}
          </div>

          {/* Reverse Percentage */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Percent className="h-5 w-5 text-[#00E5FF]" />
              Reverse Percentage (What is X% of Y?)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Percentage (%)</label>
                <input
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                  placeholder="e.g., 25"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Value</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                  placeholder="e.g., 200"
                />
              </div>
            </div>
            {percentage && value && (
              <div className="p-4 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30">
                <p className="text-3xl font-bold text-white text-center">{calculatedValue.toFixed(2)}</p>
                <p className="text-sm text-gray-400 text-center mt-1">Result</p>
              </div>
            )}
          </div>

          {/* Percentage Change */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#00E5FF]" />
              Percentage Change (Increase/Decrease)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Old Value</label>
                <input
                  type="number"
                  value={oldValue}
                  onChange={(e) => setOldValue(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                  placeholder="e.g., 100"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">New Value</label>
                <input
                  type="number"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                  placeholder="e.g., 150"
                />
              </div>
            </div>
            {oldValue && newValue && (
              <div className={`p-4 rounded-xl border ${percentageChange >= 0 ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30' : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30'}`}>
                <div className="flex items-center justify-center gap-2">
                  {percentageChange >= 0 ? <TrendingUp className="h-6 w-6 text-green-400" /> : <TrendingDown className="h-6 w-6 text-red-400" />}
                  <p className={`text-3xl font-bold text-center ${percentageChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(2)}%
                  </p>
                </div>
                <p className="text-sm text-gray-400 text-center mt-1">
                  {percentageChange >= 0 ? 'Increase' : 'Decrease'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Single bottom ad */}
        <div className="ad-slot mt-8">
          <div id="ad-bottom"></div>
        </div>

        {/* How to Use Section */}
        <HowToUse steps={[
          "For marks percentage: Enter marks obtained and total marks",
          "For reverse percentage: Enter percentage and value to find X% of Y",
          "For percentage change: Enter old value and new value",
          "Results calculate instantly as you type",
          "Use this for exam marks, discounts, salary hikes, and more"
        ]} />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/percentage-calculator" toolName="Percentage Calculator" />

        {/* Social Share */}
        <SocialShare title="Percentage Calculator - Calculate marks, increase, decrease instantly" />

        {/* Tool Content Section */}
        <ToolContent content={toolContent} toolName="Percentage Calculator" toolPath="/tools/percentage-calculator" />

        {/* Related Tools */}
        <RelatedTools currentToolPath="/tools/percentage-calculator" currentCategory={toolContent.category} />

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
