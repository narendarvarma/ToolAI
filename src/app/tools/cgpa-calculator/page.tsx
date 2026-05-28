"use client"

import { useState } from "react"
import { Plus, Trash2, Calculator } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function CgpaCalculator() {
  const [courses, setCourses] = useState<{ id: number; name: string; credits: number; grade: number }[]>([])
  const [name, setName] = useState("")
  const [credits, setCredits] = useState("")
  const [grade, setGrade] = useState("")

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

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">CGPA Calculator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Calculate your Cumulative Grade Point Average</p>
        
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
              <div className="text-center">
                <Calculator className="h-8 w-8 mx-auto mb-2 text-[#00E5FF]" />
                <p className="text-4xl font-bold text-white">{cgpa.toFixed(2)}</p>
                <p className="text-sm text-gray-400 mt-1">CGPA</p>
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
