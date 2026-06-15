"use client"

import { useState } from "react"
import { Calculator, Percent, TrendingUp } from "lucide-react"
import Link from "next/link"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function GstCalculator() {
  useRecentTools("/tools/gst-calculator", "GST Calculator", "Percent")
  const toolContent = getToolContent("gst-calculator")
  
  const [originalPrice, setOriginalPrice] = useState("")
  const [gstRate, setGstRate] = useState("18")
  const [finalPrice, setFinalPrice] = useState("")
  const [mode, setMode] = useState<"forward" | "reverse">("forward")

  const gstRates = ["5", "12", "18", "28"]

  const calculateGST = () => {
    if (mode === "forward") {
      if (!originalPrice || !gstRate) return null
      const price = parseFloat(originalPrice)
      const rate = parseFloat(gstRate)
      const gstAmount = (price * rate) / 100
      const total = price + gstAmount
      return { gstAmount, total, original: price }
    } else {
      if (!finalPrice || !gstRate) return null
      const price = parseFloat(finalPrice)
      const rate = parseFloat(gstRate)
      const original = price / (1 + rate / 100)
      const gstAmount = price - original
      return { gstAmount, total: price, original }
    }
  }

  const result = calculateGST()

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">GST Calculator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Calculate GST amount, final price, and reverse GST for Indian GST rates</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8">
          <div id="ad-top"></div>
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8 mb-6">
          {/* Mode Toggle */}
          <div className="mb-6">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode("forward")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${mode === "forward" ? "bg-[#00E5FF] text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
              >
                Calculate GST
              </button>
              <button
                type="button"
                onClick={() => setMode("reverse")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${mode === "reverse" ? "bg-[#00E5FF] text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
              >
                Reverse GST
              </button>
            </div>
          </div>

          {mode === "forward" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Original Price (₹)</label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                  placeholder="e.g., 1000"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">GST Rate (%)</label>
                <div className="flex gap-2 flex-wrap">
                  {gstRates.map(rate => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setGstRate(rate)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${gstRate === rate ? "bg-[#00E5FF] text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm text-gray-400 mb-2">Final Price with GST (₹)</label>
              <input
                type="number"
                value={finalPrice}
                onChange={(e) => setFinalPrice(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="e.g., 1180"
              />
              <div className="mt-4">
                <label className="block text-sm text-gray-400 mb-2">GST Rate (%)</label>
                <div className="flex gap-2 flex-wrap">
                  {gstRates.map(rate => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setGstRate(rate)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${gstRate === rate ? "bg-[#00E5FF] text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-6 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30">
                <div className="text-center">
                  <Calculator className="h-8 w-8 mx-auto mb-2 text-[#00E5FF]" />
                  <p className="text-4xl font-bold text-white">₹{result.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-400 mt-1">{mode === "forward" ? "Final Price (including GST)" : "Final Price"}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-yellow-400" />
                    <p className="text-sm text-gray-400">GST Amount</p>
                  </div>
                  <p className="text-2xl font-bold text-white">₹{result.gstAmount.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Percent className="h-5 w-5 text-green-400" />
                    <p className="text-sm text-gray-400">{mode === "forward" ? "Original Price" : "Price before GST"}</p>
                  </div>
                  <p className="text-2xl font-bold text-white">₹{result.original.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="ad-slot mt-8">
          <div id="ad-bottom"></div>
        </div>

        {/* How to Use Section */}
        <HowToUse steps={
          mode === "forward" ? [
            "Enter the original price before GST",
            "Select the GST rate (5%, 12%, 18%, or 28%)",
            "View the GST amount and final price",
            "Use for billing, invoicing, or price calculation"
          ] : [
            "Enter the final price including GST",
            "Select the GST rate applied",
            "View the original price before GST",
            "Use for reverse calculation from billed amount"
          ]
        } />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/gst-calculator" toolName="GST Calculator" />

        {/* Social Share */}
        <SocialShare title="GST Calculator - Calculate GST amount instantly" />

        {/* Tool Content Section */}
        <ToolContent content={toolContent} toolName="GST Calculator" toolPath="/tools/gst-calculator" />

        {/* Related Tools */}
        <RelatedTools currentToolPath="/tools/gst-calculator" currentCategory={toolContent.category} />

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
