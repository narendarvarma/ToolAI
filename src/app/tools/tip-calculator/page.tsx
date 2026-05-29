"use client"

import { useState } from "react"
import { DollarSign, Copy } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState("")
  const [tipPercentage, setTipPercentage] = useState(15)
  const [splitCount, setSplitCount] = useState(1)

  const bill = parseFloat(billAmount) || 0
  const tipAmount = bill * (tipPercentage / 100)
  const totalAmount = bill + tipAmount
  const amountPerPerson = totalAmount / splitCount

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Tip Calculator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Calculate tips and split bills</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Bill Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Bill Amount ($)</label>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              min="0"
              step="0.01"
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Enter bill amount"
            />
          </div>

          {/* Tip Percentage */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Tip Percentage: {tipPercentage}%</label>
            <input
              type="range"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(parseInt(e.target.value))}
              min="0"
              max="50"
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <button onClick={() => setTipPercentage(10)} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors">10%</button>
              <button onClick={() => setTipPercentage(15)} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors">15%</button>
              <button onClick={() => setTipPercentage(18)} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors">18%</button>
              <button onClick={() => setTipPercentage(20)} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors">20%</button>
              <button onClick={() => setTipPercentage(25)} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors">25%</button>
            </div>
          </div>

          {/* Split Count */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Split Between: {splitCount} {splitCount === 1 ? 'person' : 'people'}</label>
            <input
              type="number"
              value={splitCount}
              onChange={(e) => setSplitCount(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            />
          </div>

          {/* Results */}
          {bill > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <p className="text-sm text-gray-400 mb-1">Tip Amount</p>
                <p className="text-2xl font-bold text-[#00E5FF]">${tipAmount.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-[#00E5FF]">${totalAmount.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <p className="text-sm text-gray-400 mb-1">Per Person</p>
                <p className="text-2xl font-bold text-[#00E5FF]">${amountPerPerson.toFixed(2)}</p>
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




