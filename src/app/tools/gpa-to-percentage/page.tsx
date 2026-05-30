"use client"

import { useState } from "react"
import { Calculator, GraduationCap } from "lucide-react"
import Link from "next/link"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import RelatedTools from "@/components/tool-faq"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function GpaToPercentage() {
  useRecentTools("/tools/gpa-to-percentage", "GPA to Percentage Converter", "GraduationCap")
  
  const [cgpa, setCgpa] = useState("")
  const [university, setUniversity] = useState("anna")

  const calculatePercentage = () => {
    if (!cgpa) return 0
    const cgpaValue = parseFloat(cgpa)
    
    switch (university) {
      case "anna":
        return (cgpaValue - 0.75) * 10
      case "vtu":
        return cgpaValue * 10
      case "mumbai":
        return (cgpaValue - 0.5) * 10
      case "general":
        return cgpaValue * 9.5
      default:
        return cgpaValue * 10
    }
  }

  const percentage = calculatePercentage()

  const getUniversityName = (uni: string) => {
    switch (uni) {
      case "anna": return "Anna University"
      case "vtu": return "VTU (Visvesvaraya Technological University)"
      case "mumbai": return "Mumbai University"
      case "general": return "General Formula (CGPA × 9.5)"
      default: return "General"
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">GPA to Percentage Converter</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert CGPA to percentage using university-specific formulas for Indian engineering students</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8">
          <div id="ad-top"></div>
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Enter CGPA (out of 10)</label>
            <input
              type="number"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              min="0"
              max="10"
              step="0.01"
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="e.g., 8.5"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Select University Formula</label>
            <select
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            >
              <option value="anna">Anna University (CGPA - 0.75) × 10</option>
              <option value="vtu">VTU (CGPA × 10)</option>
              <option value="mumbai">Mumbai University (CGPA - 0.5) × 10</option>
              <option value="general">General Formula (CGPA × 9.5)</option>
            </select>
          </div>

          {cgpa && (
            <div className="p-6 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30">
              <div className="text-center">
                <GraduationCap className="h-8 w-8 mx-auto mb-2 text-[#00E5FF]" />
                <p className="text-4xl font-bold text-white">{percentage.toFixed(2)}%</p>
                <p className="text-sm text-gray-400 mt-1">Percentage</p>
                <p className="text-xs text-gray-500 mt-2">Using {getUniversityName(university)} formula</p>
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
          "Enter your CGPA (out of 10) in the input field",
          "Select your university from the dropdown",
          "View your percentage instantly using the correct formula",
          "Different universities use different conversion formulas",
          "Use this for job applications, higher studies, and resume"
        ]} />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/gpa-to-percentage" toolName="GPA to Percentage Converter" />

        {/* FAQ Section */}
        <RelatedTools
          toolName="GPA to Percentage Converter"
          faqs={[
            {
              question: "What is the Anna University CGPA to percentage formula?",
              answer: "Anna University uses the formula: Percentage = (CGPA - 0.75) × 10. For example, if your CGPA is 8.5, percentage = (8.5 - 0.75) × 10 = 77.5%."
            },
            {
              question: "What is the VTU CGPA to percentage formula?",
              answer: "VTU (Visvesvaraya Technological University) uses a simple formula: Percentage = CGPA × 10. For example, CGPA 8.5 = 85%."
            },
            {
              question: "What is the Mumbai University CGPA to percentage formula?",
              answer: "Mumbai University uses: Percentage = (CGPA - 0.5) × 10. For example, CGPA 8.5 = (8.5 - 0.5) × 10 = 80%."
            },
            {
              question: "What is the general CGPA to percentage formula?",
              answer: "The general formula used by many universities is: Percentage = CGPA × 9.5. This is commonly used by CBSE and many state boards."
            }
          ]}
        />

        {/* Social Share */}
        <SocialShare title="GPA to Percentage Converter - Convert CGPA using university formulas" />

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
