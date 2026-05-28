"use client"

import { useState } from "react"
import { DollarSign, ArrowRightLeft } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [result, setResult] = useState<number | null>(null)

  const exchangeRates: Record<string, number> = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    INR: 83.0,
    CAD: 1.25,
    AUD: 1.35,
  }

  const convert = () => {
    if (!amount) return

    const amountNum = parseFloat(amount)
    const fromRate = exchangeRates[fromCurrency]
    const toRate = exchangeRates[toCurrency]
    const converted = (amountNum / fromRate) * toRate
    setResult(converted)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Currency Converter</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert currencies instantly</p>
        
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
                {Object.keys(exchangeRates).map(currency => (
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
                {Object.keys(exchangeRates).map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Convert Button */}
          <button
            onClick={convert}
            disabled={!amount}
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
        <div className="flex justify-center mt-8">
          <AdSlot adSlot="4000000005" className="w-full max-w-2xl" />
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
