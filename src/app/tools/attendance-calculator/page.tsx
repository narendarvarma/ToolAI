"use client"

import { useState } from "react"
import { Plus, Trash2, Calculator, Users } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function AttendanceCalculator() {
  const [subjects, setSubjects] = useState<{ id: number; name: string; total: number; attended: number }[]>([])
  const [name, setName] = useState("")
  const [total, setTotal] = useState("")
  const [attended, setAttended] = useState("")

  const addSubject = () => {
    if (name.trim() && total && attended) {
      setSubjects([...subjects, { id: Date.now(), name, total: parseFloat(total), attended: parseFloat(attended) }])
      setName("")
      setTotal("")
      setAttended("")
    }
  }

  const removeSubject = (id: number) => {
    setSubjects(subjects.filter(subject => subject.id !== id))
  }

  const calculateOverallAttendance = () => {
    if (subjects.length === 0) return 0
    const totalClasses = subjects.reduce((sum, subject) => sum + subject.total, 0)
    const totalAttended = subjects.reduce((sum, subject) => sum + subject.attended, 0)
    return (totalAttended / totalClasses) * 100
  }

  const overallAttendance = calculateOverallAttendance()

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Attendance Calculator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Track your attendance percentage</p>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Add Subject Form */}
          <div className="mb-6 space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Subject name"
            />
            <input
              type="number"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Total classes"
            />
            <input
              type="number"
              value={attended}
              onChange={(e) => setAttended(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Classes attended"
            />
            <button
              onClick={addSubject}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
            >
              <div className="flex items-center justify-center gap-2">
                <Plus className="h-5 w-5" />
                Add Subject
              </div>
            </button>
          </div>

          {/* Subjects List */}
          {subjects.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-500" />
              <p className="text-gray-400">No subjects added yet</p>
            </div>
          ) : (
            <div className="space-y-3 mb-6">
              {subjects.map(subject => {
                const percentage = (subject.attended / subject.total) * 100
                return (
                  <div
                    key={subject.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/8"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-white">{subject.name}</p>
                        <p className="text-sm text-gray-400">Attended: {subject.attended}/{subject.total}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className={`font-semibold ${percentage >= 75 ? "text-green-400" : percentage >= 60 ? "text-yellow-400" : "text-red-400"}`}>
                          {percentage.toFixed(1)}%
                        </p>
                        <button
                          onClick={() => removeSubject(subject.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="h-2 bg-[#0B0F1A] rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${percentage >= 75 ? "bg-green-500" : percentage >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Overall Attendance */}
          {subjects.length > 0 && (
            <div className="p-6 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30">
              <div className="text-center">
                <Calculator className="h-8 w-8 mx-auto mb-2 text-[#00E5FF]" />
                <p className="text-4xl font-bold text-white">{overallAttendance.toFixed(1)}%</p>
                <p className="text-sm text-gray-400 mt-1">Overall Attendance</p>
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
