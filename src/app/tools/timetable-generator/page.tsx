"use client"

import { useState } from "react"
import { Plus, Trash2, Download, Clock } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function TimetableGenerator() {
  const [entries, setEntries] = useState<{ id: number; day: string; time: string; subject: string }[]>([])
  const [day, setDay] = useState("Monday")
  const [time, setTime] = useState("")
  const [subject, setSubject] = useState("")

  const addEntry = () => {
    if (day && time && subject.trim()) {
      setEntries([...entries, { id: Date.now(), day, time, subject }])
      setSubject("")
    }
  }

  const removeEntry = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id))
  }

  const downloadTimetable = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    let content = "Weekly Class Schedule\n\n"
    
    days.forEach(day => {
      content += `${day}:\n`
      const dayEntries = entries.filter(e => e.day === day)
      if (dayEntries.length === 0) {
        content += "  No classes\n"
      } else {
        dayEntries.forEach(entry => {
          content += `  ${entry.time} - ${entry.subject}\n`
        })
      }
      content += "\n"
    })

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "timetable.txt"
    link.click()
    URL.revokeObjectURL(url)
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Timetable Generator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Create your weekly class schedule</p>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Add Entry Form */}
          <div className="mb-6 space-y-4">
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            >
              {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            />
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Subject"
            />
            <button
              onClick={addEntry}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
            >
              <div className="flex items-center justify-center gap-2">
                <Plus className="h-5 w-5" />
                Add Entry
              </div>
            </button>
          </div>

          {/* Timetable Display */}
          {entries.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-500" />
              <p className="text-gray-400">No entries yet. Add one above!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/8">
                    {days.map(day => (
                      <th key={day} className="py-3 px-4 text-left text-white font-semibold">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {days.map(day => {
                      const dayEntries = entries.filter(e => e.day === day)
                      return (
                        <td key={day} className="py-3 px-4 border-b border-[#00E5FF]/20">
                          {dayEntries.length === 0 ? (
                            <span className="text-gray-500">-</span>
                          ) : (
                            <div className="space-y-2">
                              {dayEntries.map(entry => (
                                <div key={entry.id} className="p-2 rounded bg-white/5 border border-white/8">
                                  <p className="text-sm text-[#00E5FF]">{entry.time}</p>
                                  <p className="text-white">{entry.subject}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Download Button */}
          {entries.length > 0 && (
            <button
              onClick={downloadTimetable}
              className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
            >
              <div className="flex items-center justify-center gap-2">
                <Download className="h-5 w-5" />
                Download Timetable
              </div>
            </button>
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
