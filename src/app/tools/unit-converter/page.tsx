"use client"

import { useState } from "react"
import { ArrowRightLeft } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function UnitConverter() {
  const [category, setCategory] = useState("length")
  const [value, setValue] = useState("")
  const [fromUnit, setFromUnit] = useState("m")
  const [toUnit, setToUnit] = useState("ft")
  const [result, setResult] = useState<number | null>(null)

  const conversions: Record<string, Record<string, number>> = {
    length: { m: 1, ft: 3.28084, in: 39.3701, cm: 100, km: 0.001, mi: 0.000621371 },
    weight: { kg: 1, lb: 2.20462, g: 1000, oz: 35.274, mg: 1000000, ton: 0.001 },
    temperature: { c: 1, f: 1, k: 1 },
  }

  const unitLabels: Record<string, Record<string, string>> = {
    length: { m: "Meters", ft: "Feet", in: "Inches", cm: "Centimeters", km: "Kilometers", mi: "Miles" },
    weight: { kg: "Kilograms", lb: "Pounds", g: "Grams", oz: "Ounces", mg: "Milligrams", ton: "Tons" },
    temperature: { c: "Celsius", f: "Fahrenheit", k: "Kelvin" },
  }

  const convert = () => {
    if (!value) return

    const valueNum = parseFloat(value)
    let converted: number

    if (category === "temperature") {
      if (fromUnit === "c" && toUnit === "f") converted = (valueNum * 9/5) + 32
      else if (fromUnit === "c" && toUnit === "k") converted = valueNum + 273.15
      else if (fromUnit === "f" && toUnit === "c") converted = (valueNum - 32) * 5/9
      else if (fromUnit === "f" && toUnit === "k") converted = (valueNum - 32) * 5/9 + 273.15
      else if (fromUnit === "k" && toUnit === "c") converted = valueNum - 273.15
      else if (fromUnit === "k" && toUnit === "f") converted = (valueNum - 273.15) * 9/5 + 32
      else converted = valueNum
    } else {
      const fromRate = conversions[category][fromUnit]
      const toRate = conversions[category][toUnit]
      converted = (valueNum / fromRate) * toRate
    }

    setResult(converted)
  }

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Unit Converter</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert between different units</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
                setFromUnit(Object.keys(conversions[e.target.value])[0])
                setToUnit(Object.keys(conversions[e.target.value])[1])
              }}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            >
              <option value="length">Length</option>
              <option value="weight">Weight</option>
              <option value="temperature">Temperature</option>
            </select>
          </div>

          {/* Value Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Enter value"
            />
          </div>

          {/* Unit Selection */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              >
                {Object.keys(conversions[category]).map(unit => (
                  <option key={unit} value={unit}>{unitLabels[category][unit]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              >
                {Object.keys(conversions[category]).map(unit => (
                  <option key={unit} value={unit}>{unitLabels[category][unit]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={swapUnits}
            className="w-full mb-6 py-2 rounded-xl bg-white/5 border border-white/8 text-white hover:border-[#3B82F6] transition-colors"
          >
            <div className="flex items-center justify-center gap-2">
              <ArrowRightLeft className="h-5 w-5" />
              Swap Units
            </div>
          </button>

          {/* Convert Button */}
          <button
            onClick={convert}
            disabled={!value}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            Convert
          </button>

          {/* Result */}
          {result !== null && (
            <div className="mt-6 p-6 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30">
              <p className="text-4xl font-bold text-white text-center">{result.toFixed(4)}</p>
              <p className="text-sm text-gray-400 text-center">{unitLabels[category][toUnit]}</p>
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




