"use client"

import { useState } from "react"
import { Calculator, TrendingUp, DollarSign } from "lucide-react"
import Link from "next/link"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import RelatedTools from "@/components/tool-faq"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function LoanEligibility() {
  useRecentTools("/tools/loan-eligibility", "Loan Eligibility Calculator", "Calculator")
  
  const [monthlySalary, setMonthlySalary] = useState("")
  const [existingEmi, setExistingEmi] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [tenure, setTenure] = useState("")

  const calculateEligibility = () => {
    if (!monthlySalary || !interestRate || !tenure) return null

    const salary = parseFloat(monthlySalary)
    const emi = parseFloat(existingEmi) || 0
    const rate = parseFloat(interestRate)
    const months = parseFloat(tenure)

    // Banks typically allow EMI up to 50-60% of monthly income
    const maxEmi = salary * 0.5
    const availableForEmi = maxEmi - emi

    if (availableForEmi <= 0) {
      return null
    }

    // Calculate loan amount using EMI formula
    const r = rate / 12 / 100
    let loanAmount: number

    if (r === 0) {
      loanAmount = availableForEmi * months
    } else {
      loanAmount = availableForEmi * ((Math.pow(1 + r, months) - 1) / (r * Math.pow(1 + r, months)))
    }

    return {
      loanAmount,
      maxEmi,
      availableForEmi
    }
  }

  const result = calculateEligibility()

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Loan Eligibility Calculator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Calculate maximum loan amount you're eligible for based on your income</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8">
          <div id="ad-top"></div>
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Monthly Salary (₹)</label>
              <input
                type="number"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="e.g., 50000"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Existing EMIs (₹)</label>
              <input
                type="number"
                value={existingEmi}
                onChange={(e) => setExistingEmi(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="e.g., 10000"
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
              <label className="block text-sm text-gray-400 mb-2">Loan Tenure (months)</label>
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
                  <p className="text-4xl font-bold text-white">₹{result.loanAmount.toFixed(0)}</p>
                  <p className="text-sm text-gray-400 mt-1">Maximum Loan Amount Eligible</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-green-400" />
                    <p className="text-sm text-gray-400">Max EMI Allowed</p>
                  </div>
                  <p className="text-2xl font-bold text-white">₹{result.maxEmi.toFixed(0)}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-yellow-400" />
                    <p className="text-sm text-gray-400">Available for New EMI</p>
                  </div>
                  <p className="text-2xl font-bold text-white">₹{result.availableForEmi.toFixed(0)}</p>
                </div>
              </div>
            </div>
          )}

          {result === null && monthlySalary && existingEmi && (
            <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-center">
              Your existing EMIs exceed 50% of your income. You may not be eligible for additional loans.
            </div>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="ad-slot mt-8">
          <div id="ad-bottom"></div>
        </div>

        {/* How to Use Section */}
        <HowToUse steps={[
          "Enter your monthly take-home salary",
          "Enter any existing loan EMIs you're paying",
          "Enter the interest rate you expect",
          "Enter the loan tenure in months",
          "View your maximum eligible loan amount"
        ]} />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/loan-eligibility" toolName="Loan Eligibility Calculator" />

        {/* FAQ Section */}
        <RelatedTools
          toolName="Loan Eligibility Calculator"
          faqs={[
            {
              question: "How is loan eligibility calculated?",
              answer: "Banks typically allow EMI up to 50-60% of your monthly income. We calculate your maximum EMI (50% of salary), subtract existing EMIs, and use the remaining amount to calculate the maximum loan you can afford based on interest rate and tenure."
            },
            {
              question: "What factors affect loan eligibility?",
              answer: "Key factors include monthly income, existing loan obligations (EMIs), credit score, employment stability, age, and the loan tenure. Higher income and lower existing debts increase eligibility. Good credit score helps get better rates."
            },
            {
              question: "What is the typical EMI to income ratio?",
              answer: "Most Indian banks follow the 50% rule - your total EMIs (including the new loan) should not exceed 50% of your monthly income. Some banks may allow up to 60% for borrowers with excellent credit scores."
            },
            {
              question: "Can I increase my loan eligibility?",
              answer: "Yes, you can increase eligibility by increasing tenure (up to bank limits), adding a co-applicant with income, improving credit score, reducing existing debts, or choosing a lender with more flexible criteria."
            }
          ]}
        />

        {/* Social Share */}
        <SocialShare title="Loan Eligibility Calculator - Check your loan eligibility" />

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
