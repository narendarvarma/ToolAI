"use client"

import { useState } from "react"
import { Calculator, Percent, TrendingDown } from "lucide-react"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import RelatedTools from "@/components/tool-faq"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function DiscountCalculator() {
  useRecentTools("/tools/discount-calculator", "Discount Calculator", "Percent")
  
  const [originalPrice, setOriginalPrice] = useState("")
  const [discountPercent, setDiscountPercent] = useState("")
  const [finalPrice, setFinalPrice] = useState("")
  const [originalPriceReverse, setOriginalPriceReverse] = useState("")
  const [mode, setMode] = useState<"forward" | "reverse">("forward")

  const calculateDiscount = () => {
    if (mode === "forward") {
      if (!originalPrice || !discountPercent) return null
      const price = parseFloat(originalPrice)
      const discount = parseFloat(discountPercent)
      const discountAmount = (price * discount) / 100
      const final = price - discountAmount
      return { discountAmount, final, original: price }
    } else {
      if (!finalPrice || !originalPriceReverse) return null
      const price = parseFloat(finalPrice)
      const original = parseFloat(originalPriceReverse)
      const discountAmount = original - price
      const discountPercent = (discountAmount / original) * 100
      return { discountAmount, final: price, original, discountPercent }
    }
  }

  const result = calculateDiscount()

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Discount Calculator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Calculate discount amount, final price, and reverse discount percentage</p>

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
                Calculate Discount
              </button>
              <button
                type="button"
                onClick={() => setMode("reverse")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${mode === "reverse" ? "bg-[#00E5FF] text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
              >
                Reverse Discount
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
                <label className="block text-sm text-gray-400 mb-2">Discount Percentage (%)</label>
                <input
                  type="number"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                  placeholder="e.g., 20"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Original Price (₹)</label>
                <input
                  type="number"
                  value={originalPriceReverse}
                  onChange={(e) => setOriginalPriceReverse(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                  placeholder="e.g., 1000"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Final Price after Discount (₹)</label>
                <input
                  type="number"
                  value={finalPrice}
                  onChange={(e) => setFinalPrice(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                  placeholder="e.g., 800"
                />
              </div>
            </div>
          )}

          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-6 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30">
                <div className="text-center">
                  <Calculator className="h-8 w-8 mx-auto mb-2 text-[#00E5FF]" />
                  <p className="text-4xl font-bold text-white">₹{result.final.toFixed(2)}</p>
                  <p className="text-sm text-gray-400 mt-1">{mode === "forward" ? "Final Price after Discount" : "Final Price"}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="h-5 w-5 text-green-400" />
                    <p className="text-sm text-gray-400">Discount Amount</p>
                  </div>
                  <p className="text-2xl font-bold text-white">₹{result.discountAmount.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Percent className="h-5 w-5 text-yellow-400" />
                    <p className="text-sm text-gray-400">{mode === "forward" ? "You Save" : "Discount Percentage"}</p>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {mode === "forward" 
                      ? `₹${result.discountAmount.toFixed(2)}`
                      : `${result.discountPercent?.toFixed(2)}%`
                    }
                  </p>
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
            "Enter the original price before discount",
            "Enter the discount percentage",
            "View the discount amount and final price",
            "Use for shopping, sales, and offers"
          ] : [
            "Enter the original price before discount",
            "Enter the final price after discount",
            "View the discount percentage",
            "Use to find what discount was applied"
          ]
        } />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/discount-calculator" toolName="Discount Calculator" />

        {/* FAQ Section */}
        <RelatedTools
          toolName="Discount Calculator"
          faqs={[
            {
              question: "How do I calculate discount?",
              answer: "Discount Amount = Original Price × (Discount Percentage / 100). Final Price = Original Price - Discount Amount. For example, if original price is ₹1000 and discount is 20%, discount amount is ₹200 and final price is ₹800."
            },
            {
              question: "What is reverse discount calculation?",
              answer: "Reverse discount finds the discount percentage from original and final prices. Formula: Discount Percentage = ((Original Price - Final Price) / Original Price) × 100. This is useful when you see a sale price and want to know the discount percentage."
            },
            {
              question: "Can I calculate multiple discounts?",
              answer: "This calculator handles single discounts. For multiple discounts (like 20% off then additional 10% off), calculate them sequentially: first apply 20% to get intermediate price, then apply 10% on that intermediate price."
            },
            {
              question: "What are common discount percentages?",
              answer: "Common discounts include 10% (small sale), 20% (moderate sale), 25% (quarter off), 50% (half price), and 70%+ (clearance sale). During festivals like Diwali, Black Friday, or end-of-season sales, discounts can go up to 70-80%."
            }
          ]}
        />

        {/* Social Share */}
        <SocialShare title="Discount Calculator - Calculate discount instantly" />

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
