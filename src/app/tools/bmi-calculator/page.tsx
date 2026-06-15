"use client"

import { useState } from "react"
import { Activity, Scale } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function BMICalculator() {
  const toolContent = getToolContent("bmi-calculator")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [bmi, setBMI] = useState<number | null>(null)
  const [category, setCategory] = useState("")

  const calculateBMI = () => {
    if (!weight || !height) return

    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height) / 100 // Convert cm to m

    const bmiValue = weightNum / (heightNum * heightNum)
    setBMI(bmiValue)

    if (bmiValue < 18.5) setCategory("Underweight")
    else if (bmiValue < 25) setCategory("Normal weight")
    else if (bmiValue < 30) setCategory("Overweight")
    else setCategory("Obese")
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">BMI Calculator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Calculate your Body Mass Index</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Input Fields */}
          <div className="mb-6 grid grid-cols-2 gap-4">
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

          {/* Calculate Button */}
          <button
            onClick={calculateBMI}
            disabled={!weight || !height}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            Calculate BMI
          </button>

          {/* Result */}
          {bmi !== null && (
            <div className="mt-6 p-6 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-[#00E5FF]" />
                  <p className="text-4xl font-bold text-white">{bmi.toFixed(1)}</p>
                  <p className="text-sm text-gray-400">BMI</p>
                </div>
                <div className="text-center">
                  <Scale className="h-8 w-8 mx-auto mb-2 text-[#7C3AED]" />
                  <p className="text-2xl font-bold text-white">{category}</p>
                  <p className="text-sm text-gray-400">Category</p>
                </div>
              </div>

              {/* BMI Indicator Bar */}
              <div className="mt-4">
                <div className="h-4 rounded-full bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 relative">
                  <div
                    className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-gray-800 shadow-lg"
                    style={{
                      left: `${Math.min(Math.max((bmi - 15) / (35 - 15) * 100, 0), 100)}%`,
                      marginLeft: '-6px'
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>15</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>35</span>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>Under</span>
                  <span>Normal</span>
                  <span>Over</span>
                  <span>Obese</span>
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
          "Enter your weight in kilograms (kg)",
          "Enter your height in centimeters (cm)",
          "Click Calculate BMI to see your result",
          "View your BMI number and category",
          "Check the colored indicator bar to see where you stand"
        ]} />

        {/* Social Share */}
        <SocialShare title="BMI Calculator - Calculate your Body Mass Index" />

        {/* Tool Content Section */}
        <ToolContent content={toolContent} toolName="BMI Calculator" toolPath="/tools/bmi-calculator" />

        {/* Related Tools */}
        <RelatedTools currentToolPath="/tools/bmi-calculator" currentCategory={toolContent.category} />

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




