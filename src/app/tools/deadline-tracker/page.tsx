"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Trash2, Plus, AlertTriangle } from "lucide-react"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import RelatedTools from "@/components/tool-faq"
import { useRecentTools } from "@/hooks/use-recent-tools"

interface Assignment {
  id: number
  subject: string
  deadline: string
  priority: "High" | "Medium" | "Low"
  completed: boolean
}

export default function DeadlineTracker() {
  useRecentTools("/tools/deadline-tracker", "Assignment Deadline Tracker", "Calendar")
  
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [subject, setSubject] = useState("")
  const [deadline, setDeadline] = useState("")
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium")

  useEffect(() => {
    const saved = localStorage.getItem("deadline_tracker_assignments")
    if (saved) {
      setAssignments(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("deadline_tracker_assignments", JSON.stringify(assignments))
  }, [assignments])

  const addAssignment = () => {
    if (subject && deadline) {
      const newAssignment: Assignment = {
        id: Date.now(),
        subject,
        deadline,
        priority,
        completed: false
      }
      setAssignments([...assignments, newAssignment].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()))
      setSubject("")
      setDeadline("")
      setPriority("Medium")
    }
  }

  const removeAssignment = (id: number) => {
    setAssignments(assignments.filter(a => a.id !== id))
  }

  const toggleComplete = (id: number) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, completed: !a.completed } : a))
  }

  const getDaysRemaining = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-400"
      case "Medium": return "text-yellow-400"
      case "Low": return "text-green-400"
      default: return "text-gray-400"
    }
  }

  const getDaysColor = (days: number) => {
    if (days < 0) return "text-red-500"
    if (days <= 2) return "text-red-400"
    if (days <= 5) return "text-yellow-400"
    return "text-green-400"
  }

  const sortedAssignments = [...assignments].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  })

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Assignment Deadline Tracker</h1>
        <p className="text-gray-400 text-base text-center mb-8">Track your assignment deadlines with priority levels and color-coded alerts</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8">
          <div id="ad-top"></div>
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Subject Name</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="e.g., Mathematics"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Deadline Date</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as "High" | "Medium" | "Low")}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={addAssignment}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
          >
            <div className="flex items-center justify-center gap-2">
              <Plus className="h-5 w-5" />
              Add Assignment
            </div>
          </button>
        </div>

        {/* Assignments List */}
        {sortedAssignments.length === 0 ? (
          <div className="bg-[#111827] rounded-2xl p-12 shadow-lg border border-white/8 text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-500" />
            <p className="text-gray-400">No assignments added yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedAssignments.map(assignment => {
              const daysRemaining = getDaysRemaining(assignment.deadline)
              return (
                <div
                  key={assignment.id}
                  className={`p-4 rounded-xl border ${assignment.completed ? 'bg-white/5 border-white/10 opacity-60' : 'bg-white/5 border-white/8'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={assignment.completed}
                        onChange={() => toggleComplete(assignment.id)}
                        className="w-5 h-5 rounded"
                      />
                      <div>
                        <p className={`font-medium ${assignment.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
                          {assignment.subject}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-gray-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(assignment.deadline).toLocaleDateString()}
                          </span>
                          <span className={`text-sm font-semibold ${getPriorityColor(assignment.priority)}`}>
                            {assignment.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-semibold ${getDaysColor(daysRemaining)}`}>
                        {daysRemaining < 0 ? `${Math.abs(daysRemaining)} days overdue` : daysRemaining === 0 ? 'Due today' : `${daysRemaining} days left`}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeAssignment(assignment.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Single bottom ad */}
        <div className="ad-slot mt-8">
          <div id="ad-bottom"></div>
        </div>

        {/* How to Use Section */}
        <HowToUse steps={[
          "Enter subject name and deadline date",
          "Select priority level (High/Medium/Low)",
          "Click Add Assignment to save",
          "Assignments are sorted by nearest deadline",
          "Color coding: Red (under 2 days), Orange (under 5 days), Green (safe)"
        ]} />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/deadline-tracker" toolName="Assignment Deadline Tracker" />

        {/* FAQ Section */}
        <RelatedTools
          toolName="Assignment Deadline Tracker"
          faqs={[
            {
              question: "How does the deadline tracker save my data?",
              answer: "Your assignments are saved to localStorage in your browser, so they persist even after you close the tab. Data is stored locally and never sent to any server."
            },
            {
              question: "What do the color codes mean?",
              answer: "Red (under 2 days remaining) means urgent, Orange (under 5 days) means approaching soon, Green means you have enough time. Overdue assignments show in dark red."
            },
            {
              question: "Can I mark assignments as completed?",
              answer: "Yes, click the checkbox next to any assignment to mark it as completed. Completed assignments are moved to the bottom and shown with strikethrough text."
            },
            {
              question: "How are assignments sorted?",
              answer: "Assignments are automatically sorted by deadline date, with the nearest deadline shown first. Completed assignments are moved to the bottom of the list."
            }
          ]}
        />

        {/* Social Share */}
        <SocialShare title="Assignment Deadline Tracker - Track deadlines with priority" />

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
