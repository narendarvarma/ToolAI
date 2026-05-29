"use client"

import { useState } from "react"
import { Plus, Trash2, Check, Calendar as CalendarIcon } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function HabitTracker() {
  const [habits, setHabits] = useState<{ id: number; name: string; streak: number }[]>([])
  const [input, setInput] = useState("")

  const addHabit = () => {
    if (input.trim()) {
      setHabits([...habits, { id: Date.now(), name: input, streak: 0 }])
      setInput("")
    }
  }

  const completeHabit = (id: number) => {
    setHabits(habits.map(habit => habit.id === id ? { ...habit, streak: habit.streak + 1 } : habit))
  }

  const deleteHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Habit Tracker</h1>
        <p className="text-gray-400 text-base text-center mb-8">Build good habits and track your progress</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Input */}
          <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addHabit()}
                className="flex-1 px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="Add a new habit"
              />
              <button
                onClick={addHabit}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Habit List */}
          {habits.length === 0 ? (
            <div className="text-center py-12">
              <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-500" />
              <p className="text-gray-400">No habits yet. Add one above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {habits.map(habit => (
                <div
                  key={habit.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/8 hover:border-[#00E5FF]/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-white">{habit.name}</p>
                      <p className="text-sm text-gray-400">Current Streak: {habit.streak} days</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => completeHabit(habit.id)}
                        className="px-3 py-2 rounded-lg bg-[#3B82F6] text-white hover:bg-[#3B82F6]/80 transition-colors"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteHabit(habit.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
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




