"use client"

import { useState, useEffect } from "react"
import { DollarSign, ArrowRightLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function CurrencyConverter() {
  const toolContent = getToolContent("currency-converter")
  const [amount, setAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [rates, setRates] = useState<Record<string, number>>({})

  const currencies = ["USD", "EUR", "GBP", "INR", "AED", "SGD", "JPY", "CAD", "AUD", "CHF", "CNY"]

  useEffect(() => {
    fetchRates()
  }, [])

  const fetchRates = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD")
      const data = await response.json()
      setRates(data.rates)
    } catch (error) {
      console.error("Failed to fetch rates:", error)
      // Fallback to hardcoded rates if API fails
      setRates({
        USD: 1,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110.0,
        INR: 83.0,
        CAD: 1.25,
        AUD: 1.35,
        CHF: 0.92,
        CNY: 7.2,
        SGD: 1.35,
        AED: 3.67,
      })
    } finally {
      setLoading(false)
    }
  }

  const convert = () => {
    if (!amount || !rates[fromCurrency] || !rates[toCurrency]) return

    const amountNum = parseFloat(amount)
    const fromRate = rates[fromCurrency]
    const toRate = rates[toCurrency]
    const converted = (amountNum / fromRate) * toRate
    setResult(converted)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Currency Converter</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert currencies instantly</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Enter amount"
            />
          </div>

          {/* Currency Selection */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Refresh Rates Button */}
          <button
            onClick={fetchRates}
            disabled={loading}
            className="w-full mb-4 py-2 rounded-xl bg-white/5 border border-white/8 text-white hover:border-[#3B82F6] transition-colors disabled:opacity-50"
          >
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Loading Rates...' : 'Refresh Exchange Rates'}
            </div>
          </button>

          {/* Convert Button */}
          <button
            onClick={convert}
            disabled={!amount || loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            <div className="flex items-center justify-center gap-2">
              <ArrowRightLeft className="h-5 w-5" />
              Convert
            </div>
          </button>

          {/* Result */}
          {result !== null && (
            <div className="mt-6 p-6 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30">
              <div className="flex items-center justify-center gap-3">
                <DollarSign className="h-8 w-8 text-[#00E5FF]" />
                <div className="text-center">
                  <p className="text-4xl font-bold text-white">{result.toFixed(2)}</p>
                  <p className="text-sm text-gray-400">{toCurrency}</p>
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
          "Enter the amount you want to convert",
          "Select the source currency (From)",
          "Select the target currency (To)",
          "Click Convert to see the result",
          "Refresh rates for the latest exchange rates"
        ]} />

        {/* Social Share */}
        <SocialShare title="Currency Converter - Convert currencies instantly" />

        {/* Tool Content Section */}
        <ToolContent content={toolContent} toolName="Currency Converter" toolPath="/tools/currency-converter" />

        {/* Related Tools */}
        <RelatedTools currentToolPath="/tools/currency-converter" currentCategory={toolContent.category} />

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




