"use client"

import { useState } from "react"
import { Plus, Trash2, Edit, Save, X, Search, FileText } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function NotesOrganizer() {
  const [notes, setNotes] = useState<{ id: number; title: string; content: string; category: string }[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("General")
  const [searchQuery, setSearchQuery] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const categories = [...new Set(notes.map(note => note.category))]

  const addNote = () => {
    if (title.trim() && content.trim()) {
      setNotes([...notes, { id: Date.now(), title, content, category }])
      setTitle("")
      setContent("")
    }
  }

  const removeNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const startEdit = (note: { id: number; title: string; content: string; category: string }) => {
    setEditingId(note.id)
    setTitle(note.title)
    setContent(note.content)
    setCategory(note.category)
  }

  const saveEdit = () => {
    if (editingId && title.trim() && content.trim()) {
      setNotes(notes.map(note => note.id === editingId ? { ...note, title, content, category } : note))
      setEditingId(null)
      setTitle("")
      setContent("")
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setTitle("")
    setContent("")
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Notes Organizer</h1>
        <p className="text-gray-400 text-base text-center mb-8">Organize your notes efficiently</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="Search notes..."
              />
            </div>
          </div>

          {/* Add/Edit Form */}
          <div className="mb-6 space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Note title"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-32 resize-none"
              placeholder="Note content"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            >
              <option value="General">General</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Ideas">Ideas</option>
            </select>
            {editingId ? (
              <div className="flex gap-3">
                <button
                  onClick={saveEdit}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Save className="h-5 w-5" />
                    Save
                  </div>
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
                >
                  <div className="flex items-center justify-center gap-2">
                    <X className="h-5 w-5" />
                    Cancel
                  </div>
                </button>
              </div>
            ) : (
              <button
                onClick={addNote}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
              >
                <div className="flex items-center justify-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add Note
                </div>
              </button>
            )}
          </div>

          {/* Notes List */}
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-500" />
              <p className="text-gray-400">No notes yet. Add one above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotes.map(note => (
                <div
                  key={note.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/8 hover:border-[#00E5FF]/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{note.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">{note.content}</p>
                      <span className="text-xs px-2 py-1 rounded-full bg-[#3B82F6]/20 text-[#00E5FF]">{note.category}</span>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => startEdit(note)}
                        className="text-[#00E5FF] hover:text-[#00E5FF]/80 transition-colors"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => removeNote(note.id)}
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




