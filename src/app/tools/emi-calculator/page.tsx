"use client"

import { useState } from "react"
import { Calculator, TrendingUp, DollarSign } from "lucide-react"
import Link from "next/link"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import RelatedTools from "@/components/tool-faq"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function EmiCalculator() {
  useRecentTools("/tools/emi-calculator", "EMI Calculator", "Calculator")
  
  const [loanAmount, setLoanAmount] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [tenure, setTenure] = useState("")

  const calculateEMI = () => {
    if (!loanAmount || !interestRate || !tenure) return null

    const P = parseFloat(loanAmount)
    const annualRate = parseFloat(interestRate)
    const r = annualRate / 12 / 100
    const n = parseFloat(tenure)

    if (r === 0) {
      return {
        emi: P / n,
        totalAmount: P,
        totalInterest: 0
      }
    }

    const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const totalAmount = emi * n
    const totalInterest = totalAmount - P

    return {
      emi,
      totalAmount,
      totalInterest
    }
  }

  const result = calculateEMI()

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">EMI Calculator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Calculate your loan EMI, total interest, and total payment</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8">
          <div id="ad-top"></div>
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Loan Amount (₹)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="e.g., 500000"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Interest Rate (% per year)</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                step="0.1"
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="e.g., 8.5"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Tenure (months)</label>
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="e.g., 240"
              />
            </div>
          </div>

          {result && (
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30">
                <div className="text-center">
                  <Calculator className="h-8 w-8 mx-auto mb-2 text-[#00E5FF]" />
                  <p className="text-4xl font-bold text-white">₹{result.emi.toFixed(2)}</p>
                  <p className="text-sm text-gray-400 mt-1">Monthly EMI</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-green-400" />
                    <p className="text-sm text-gray-400">Total Amount Payable</p>
                  </div>
                  <p className="text-2xl font-bold text-white">₹{result.totalAmount.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-yellow-400" />
                    <p className="text-sm text-gray-400">Total Interest</p>
                  </div>
                  <p className="text-2xl font-bold text-white">₹{result.totalInterest.toFixed(2)}</p>
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
        <HowToUse steps={[
          "Enter the loan amount you want to borrow",
          "Enter the annual interest rate offered by the bank",
          "Enter the loan tenure in months",
          "View your monthly EMI, total interest, and total payment",
          "Use this for home loan, car loan, or personal loan planning"
        ]} />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/emi-calculator" toolName="EMI Calculator" />

        {/* FAQ Section */}
        <RelatedTools
          toolName="EMI Calculator"
          faqs={[
            {
              question: "What is EMI?",
              answer: "EMI stands for Equated Monthly Installment. It's a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMI is used to pay off both interest and principal each month."
            },
            {
              question: "How is EMI calculated?",
              answer: "EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is the loan amount, r is the monthly interest rate, and n is the number of monthly installments."
            },
            {
              question: "What happens if I prepay my loan?",
              answer: "Prepaying your loan reduces the outstanding principal, which can reduce your total interest payment. However, some banks charge prepayment penalties. Check with your lender before making prepayments."
            },
            {
              question: "What is a good interest rate for home loans in India?",
              answer: "Home loan interest rates in India typically range from 8% to 10% per annum. Rates vary based on the lender, your credit score, employment type, and loan amount. Floating rates are common and can change with market conditions."
            }
          ]}
        />

        {/* Social Share */}
        <SocialShare title="EMI Calculator - Calculate loan EMI instantly" />

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
