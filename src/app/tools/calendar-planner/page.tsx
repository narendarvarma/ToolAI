"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Trash2, Calendar as CalendarIcon } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function CalendarPlanner() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState<{ id: number; date: string; title: string }[]>([])
  const [newEvent, setNewEvent] = useState("")

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const selectDate = (day: number) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
  }

  const addEvent = () => {
    if (newEvent.trim()) {
      const dateStr = selectedDate.toISOString().split('T')[0]
      setEvents([...events, { id: Date.now(), date: dateStr, title: newEvent }])
      setNewEvent("")
    }
  }

  const removeEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id))
  }

  const selectedDateStr = selectedDate.toISOString().split('T')[0]
  const selectedDateEvents = events.filter(event => event.date === selectedDateStr)

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Calendar Planner</h1>
        <p className="text-gray-400 text-base text-center mb-8">Plan your schedule efficiently</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <h2 className="text-xl font-bold text-white">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
              const dateStr = date.toISOString().split('T')[0]
              const isSelected = dateStr === selectedDateStr
              const hasEvent = events.some(event => event.date === dateStr)

              return (
                <button
                  key={day}
                  onClick={() => selectDate(day)}
                  className={`p-2 rounded-lg text-center transition-all ${
                    isSelected
                      ? "bg-[#3B82F6] text-white"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  <span className="block">{day}</span>
                  {hasEvent && <div className="w-1 h-1 bg-[#7C3AED] rounded-full mx-auto mt-1" />}
                </button>
              )
            })}
          </div>

          {/* Events Panel */}
          <div className="border-t border-white/8 pt-6">
            <h3 className="font-semibold mb-4 text-white">
              Events for {selectedDate.toLocaleDateString()}
            </h3>

            {/* Add Event */}
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                value={newEvent}
                onChange={(e) => setNewEvent(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addEvent()}
                className="flex-1 px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="Add event..."
              />
              <button
                onClick={addEvent}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            {/* Events List */}
            {selectedDateEvents.length === 0 ? (
              <div className="text-center py-8">
                <CalendarIcon className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                <p className="text-gray-400">No events for this day</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDateEvents.map(event => (
                  <div
                    key={event.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/8 flex items-center justify-between"
                  >
                    <span className="text-white">{event.title}</span>
                    <button
                      onClick={() => removeEvent(event.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
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




