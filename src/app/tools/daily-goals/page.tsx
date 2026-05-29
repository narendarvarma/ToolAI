"use client"

import { useState } from "react"
import { Plus, Trash2, Check, Target } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function DailyGoals() {
  const [goals, setGoals] = useState<{ id: number; text: string; completed: boolean }[]>([])
  const [input, setInput] = useState("")

  const addGoal = () => {
    if (input.trim()) {
      setGoals([...goals, { id: Date.now(), text: input, completed: false }])
      setInput("")
    }
  }

  const toggleGoal = (id: number) => {
    setGoals(goals.map(goal => goal.id === id ? { ...goal, completed: !goal.completed } : goal))
  }

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id))
  }

  const completed = goals.filter(g => g.completed).length
  const progress = goals.length > 0 ? (completed / goals.length) * 100 : 0

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Daily Goals</h1>
        <p className="text-gray-400 text-base text-center mb-8">Track your daily goals and achievements</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Progress Bar */}
          {goals.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Progress</span>
                <span className="text-white">{completed}/{goals.length} completed</span>
              </div>
              <div className="h-3 bg-[#0B0F1A] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Input */}
          <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addGoal()}
                className="flex-1 px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="Add a new goal"
              />
              <button
                onClick={addGoal}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Goals List */}
          {goals.length === 0 ? (
            <div className="text-center py-12">
              <Target className="h-12 w-12 mx-auto mb-4 text-gray-500" />
              <p className="text-gray-400">No goals yet. Add one above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {goals.map(goal => (
                <div
                  key={goal.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    goal.completed
                      ? "bg-white/5 border-[#00E5FF]/20 opacity-60"
                      : "bg-white/5 border-white/8 hover:border-[#00E5FF]/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleGoal(goal.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        goal.completed
                          ? "bg-[#3B82F6] border-[#3B82F6]"
                          : "border-[#00E5FF]/50 hover:border-[#3B82F6]"
                      }`}
                    >
                      {goal.completed && <Check className="h-4 w-4 text-white" />}
                    </button>
                    <span className={`flex-1 ${goal.completed ? "line-through text-gray-500" : "text-white"}`}>
                      {goal.text}
                    </span>
                    <button
                      onClick={() => deleteGoal(goal.id)}
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




