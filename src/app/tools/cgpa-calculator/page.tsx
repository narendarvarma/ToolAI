"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Calculator, Download } from "lucide-react"
import { jsPDF } from "jspdf"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import RelatedTools from "@/components/related-tools"
import ToolFAQ from "@/components/tool-faq"
import SharePrompt from "@/components/share-prompt"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function CgpaCalculator() {
  useRecentTools("/tools/cgpa-calculator")
  const [courses, setCourses] = useState<{ id: number; name: string; credits: number; grade: number }[]>([])
  const [name, setName] = useState("")
  const [credits, setCredits] = useState("")
  const [grade, setGrade] = useState("")
  const [showSharePrompt, setShowSharePrompt] = useState(false)
  const [hasCalculated, setHasCalculated] = useState(false)

  useEffect(() => {
    if (courses.length > 0 && !hasCalculated) {
      setHasCalculated(true)
      setTimeout(() => setShowSharePrompt(true), 2000)
    }
  }, [courses.length, hasCalculated])

  const addCourse = () => {
    if (name.trim() && credits && grade) {
      setCourses([...courses, { id: Date.now(), name, credits: parseFloat(credits), grade: parseFloat(grade) }])
      setName("")
      setCredits("")
      setGrade("")
    }
  }

  const removeCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id))
  }

  const calculateCGPA = () => {
    if (courses.length === 0) return 0
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0)
    const totalPoints = courses.reduce((sum, course) => sum + course.credits * course.grade, 0)
    return totalPoints / totalCredits
  }

  const cgpa = calculateCGPA()

  const downloadPDF = () => {
    const pdf = new jsPDF()
    pdf.setFontSize(20)
    pdf.text("CGPA Calculator Result", 20, 20)
    pdf.setFontSize(12)
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30)
    pdf.setFontSize(14)
    pdf.text("Courses:", 20, 45)
    
    courses.forEach((course, index) => {
      pdf.setFontSize(12)
      pdf.text(`${index + 1}. ${course.name}`, 25, 55 + (index * 10))
      pdf.text(`   Credits: ${course.credits} | Grade: ${course.grade}`, 25, 60 + (index * 10))
    })
    
    pdf.setFontSize(14)
    pdf.text(`Your CGPA: ${cgpa.toFixed(2)} / 10.0`, 20, 55 + (courses.length * 10) + 15)
    pdf.save("cgpa-result.pdf")
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">CGPA Calculator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Calculate your Cumulative Grade Point Average</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Add Course Form */}
          <div className="mb-6 space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Course name"
            />
            <input
              type="number"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Credits"
            />
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            >
              <option value="">Select Grade</option>
              <option value="10">A (10)</option>
              <option value="9">A- (9)</option>
              <option value="8">B (8)</option>
              <option value="7">B- (7)</option>
              <option value="6">C (6)</option>
              <option value="5">C- (5)</option>
              <option value="4">D (4)</option>
              <option value="0">F (0)</option>
            </select>
            <button
              onClick={addCourse}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
            >
              <div className="flex items-center justify-center gap-2">
                <Plus className="h-5 w-5" />
                Add Course
              </div>
            </button>
          </div>

          {/* Courses List */}
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-500" />
              <p className="text-gray-400">No courses added yet</p>
            </div>
          ) : (
            <div className="space-y-3 mb-6">
              {courses.map(course => (
                <div
                  key={course.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/8 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-white">{course.name}</p>
                    <p className="text-sm text-gray-400">Credits: {course.credits} | Grade: {course.grade}</p>
                  </div>
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* CGPA Display */}
          {courses.length > 0 && (
            <div className="p-6 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30">
              <div className="text-center mb-4">
                <Calculator className="h-8 w-8 mx-auto mb-2 text-[#00E5FF]" />
                <p className="text-4xl font-bold text-white">{cgpa.toFixed(2)}</p>
                <p className="text-sm text-gray-400 mt-1">CGPA</p>
              </div>
              <button
                onClick={downloadPDF}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
              >
                <div className="flex items-center justify-center gap-2">
                  <Download className="h-5 w-5" />
                  Download Result as PDF
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        </div>

        {/* How to Use Section */}
        <HowToUse steps={[
          "Enter the course name in the input field",
          "Add the number of credits for the course",
          "Select your grade from the dropdown (A=10, A-=9, etc.)",
          "Click 'Add Course' to add it to your list",
          "Repeat for all courses and view your CGPA automatically"
        ]} />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/cgpa-calculator" toolName="CGPA Calculator" />

        {/* Related Tools */}
        <RelatedTools currentToolPath="/tools/cgpa-calculator" currentCategory="Student Tools" />

        {/* FAQ Section */}
        <ToolFAQ
          toolName="CGPA Calculator"
          faqs={[
            {
              question: "What is CGPA?",
              answer: "CGPA (Cumulative Grade Point Average) is a measure of a student's overall academic performance across all courses. It's calculated by taking the weighted average of grade points earned in all courses."
            },
            {
              question: "How is CGPA calculated?",
              answer: "CGPA = Sum of (Grade Points × Credits) / Total Credits. For example, if you have 3 courses with grades 8, 9, and 7 and credits 3, 4, and 3 respectively, your CGPA = (8×3 + 9×4 + 7×3) / (3+4+3) = 8.1."
            },
            {
              question: "What is a good CGPA?",
              answer: "Generally, 8.0+ is considered good in Indian universities. A CGPA of 7.5-8.0 is considered average, while 9.0+ is excellent. However, standards may vary by institution."
            },
            {
              question: "What grading system does this calculator use?",
              answer: "This calculator uses the standard 10-point grading system where A=10, A-=9, B=8, B-=7, C=6, C-=5, D=4, and F=0. You can adjust the grade points as needed."
            },
            {
              question: "Can I download my CGPA result?",
              answer: "Yes! Click the 'Download Result as PDF' button to download a PDF file containing your courses, grades, and calculated CGPA."
            }
          ]}
        />

        {/* Social Share */}
        <SocialShare title="CGPA Calculator - Calculate your CGPA instantly" />

        <button
          onClick={() => window.location.href = "/"}
          className="mt-6 text-[#00E5FF] hover:underline"
        >
          ← Back to Home
        </button>
      </div>

      {/* Share Prompt */}
      <SharePrompt
        show={showSharePrompt}
        onClose={() => setShowSharePrompt(false)}
        toolName="CGPA Calculator"
      />
    </div>
  )
}



