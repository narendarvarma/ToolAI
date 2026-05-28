"use client"

import { useState } from "react"
import { Plus, Trash2, Check, BookOpen } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function StudyPlanner() {
  const [tasks, setTasks] = useState<{ id: number; subject: string; topic: string; date: string; priority: "high" | "medium" | "low"; completed: boolean }[]>([])
  const [subject, setSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [date, setDate] = useState("")
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium")

  const addTask = () => {
    if (subject.trim() && topic.trim() && date) {
      setTasks([...tasks, { id: Date.now(), subject, topic, date, priority, completed: false }])
      setSubject("")
      setTopic("")
      setDate("")
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Study Planner</h1>
        <p className="text-gray-400 text-base text-center mb-8">Plan your study sessions efficiently</p>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Add Task Form */}
          <div className="mb-6 space-y-4">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Subject"
            />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Topic"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as "high" | "medium" | "low")}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <button
              onClick={addTask}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
            >
              <div className="flex items-center justify-center gap-2">
                <Plus className="h-5 w-5" />
                Add Study Task
              </div>
            </button>
          </div>

          {/* Tasks List */}
          {sortedTasks.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-500" />
              <p className="text-gray-400">No study tasks yet. Add one above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedTasks.map(task => (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    task.completed
                      ? "bg-white/5 border-[#00E5FF]/20 opacity-60"
                      : "bg-white/5 border-white/8 hover:border-[#00E5FF]/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        task.completed
                          ? "bg-[#3B82F6] border-[#3B82F6]"
                          : "border-[#00E5FF]/50 hover:border-[#3B82F6]"
                      }`}
                    >
                      {task.completed && <Check className="h-4 w-4 text-white" />}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          task.priority === "high" ? "bg-red-500/20 text-red-400" :
                          task.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                          "bg-green-500/20 text-green-400"
                        }`}>
                          {task.priority}
                        </span>
                        <span className={`font-medium ${task.completed ? "line-through text-gray-500" : "text-white"}`}>
                          {task.subject}
                        </span>
                      </div>
                      <p className={`text-sm ${task.completed ? "line-through text-gray-500" : "text-gray-400"}`}>
                        {task.topic}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Due: {task.date}</p>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
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
