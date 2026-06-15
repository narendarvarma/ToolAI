"use client"

import { useState } from "react"
import { Hash, Copy, Check } from "lucide-react"
import Link from "next/link"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"
import { useRecentTools } from "@/hooks/use-recent-tools"

const numberToWordsIndian = (num: number): string => {
  if (num === 0) return "Zero"
  
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"]
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
  
  const convertLessThanThousand = (n: number): string => {
    if (n === 0) return ""
    if (n < 20) return ones[n]
    const digit = n % 10
    const ten = Math.floor(n / 10)
    return tens[ten] + (digit ? " " + ones[digit] : "")
  }
  
  const convert = (n: number): string => {
    if (n === 0) return ""
    
    let words = ""
    
    if (n >= 10000000) {
      words += convert(Math.floor(n / 10000000)) + " Crore "
      n %= 10000000
    }
    
    if (n >= 100000) {
      words += convert(Math.floor(n / 100000)) + " Lakh "
      n %= 100000
    }
    
    if (n >= 1000) {
      words += convert(Math.floor(n / 1000)) + " Thousand "
      n %= 1000
    }
    
    if (n >= 100) {
      words += ones[Math.floor(n / 100)] + " Hundred "
      n %= 100
    }
    
    if (n > 0) {
      words += convertLessThanThousand(n)
    }
    
    return words.trim()
  }
  
  return convert(num)
}

const numberToWordsInternational = (num: number): string => {
  if (num === 0) return "Zero"
  
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"]
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
  
  const convertLessThanThousand = (n: number): string => {
    if (n === 0) return ""
    if (n < 20) return ones[n]
    const digit = n % 10
    const ten = Math.floor(n / 10)
    return tens[ten] + (digit ? " " + ones[digit] : "")
  }
  
  const convert = (n: number): string => {
    if (n === 0) return ""
    
    let words = ""
    
    if (n >= 1000000000) {
      words += convert(Math.floor(n / 1000000000)) + " Billion "
      n %= 1000000000
    }
    
    if (n >= 1000000) {
      words += convert(Math.floor(n / 1000000)) + " Million "
      n %= 1000000
    }
    
    if (n >= 1000) {
      words += convert(Math.floor(n / 1000)) + " Thousand "
      n %= 1000
    }
    
    if (n >= 100) {
      words += ones[Math.floor(n / 100)] + " Hundred "
      n %= 100
    }
    
    if (n > 0) {
      words += convertLessThanThousand(n)
    }
    
    return words.trim()
  }
  
  return convert(num)
}

export default function NumberToWords() {
  useRecentTools("/tools/number-to-words", "Number to Words Converter", "Hash")
  const toolContent = getToolContent("number-to-words")
  
  const [number, setNumber] = useState("")
  const [copied, setCopied] = useState("")
  
  const numValue = parseFloat(number)
  const indianWords = !isNaN(numValue) ? numberToWordsIndian(numValue) : ""
  const internationalWords = !isNaN(numValue) ? numberToWordsInternational(numValue) : ""
  
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(""), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Number to Words Converter</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert numbers to words in Indian and international formats</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8">
          <div id="ad-top"></div>
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8 mb-6">
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Enter Number</label>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="e.g., 1500000"
            />
          </div>

          {indianWords && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-400">Indian Format (Lakhs, Crores)</p>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(indianWords, "indian")}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] text-sm hover:bg-[#00E5FF]/30 transition-colors"
                  >
                    {copied === "indian" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied === "indian" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-2xl font-bold text-white">{indianWords}</p>
              </div>

              <div className="p-4 bg-gradient-to-r from-[#10B981]/20 to-[#059669]/20 rounded-xl border border-[#10B981]/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-400">International Format (Millions, Billions)</p>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(internationalWords, "international")}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#10B981]/20 text-[#10B981] text-sm hover:bg-[#10B981]/30 transition-colors"
                  >
                    {copied === "international" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied === "international" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-2xl font-bold text-white">{internationalWords}</p>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-gray-400 mb-2">Cheque Writing Format</p>
                <p className="text-lg font-semibold text-white">{indianWords} Only</p>
              </div>
            </div>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="ad-slot mt-8">
          <div id="ad-bottom"></div>
        </div>

        {/* How to Use Section */}
        <HowToUse steps={[
          "Enter the number you want to convert",
          "View the Indian format (Lakhs, Crores)",
          "View the international format (Millions, Billions)",
          "Copy the format you need",
          "Use for cheque writing, official documents, or invoices"
        ]} />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/number-to-words" toolName="Number to Words Converter" />

        {/* Social Share */}
        <SocialShare title="Number to Words Converter - Convert numbers to words" />

        {/* Tool Content Section */}
        <ToolContent content={toolContent} toolName="Number to Words Converter" toolPath="/tools/number-to-words" />

        {/* Related Tools */}
        <RelatedTools currentToolPath="/tools/number-to-words" currentCategory={toolContent.category} />

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
