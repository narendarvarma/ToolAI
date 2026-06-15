"use client"

import { useState, useEffect } from "react"
import { FileText, Plus, Trash2, Save, Download, Upload, Edit, Eye } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"
import { useRecentTools } from "@/hooks/use-recent-tools"

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export default function DigitalNotes() {
  const toolContent = getToolContent("digital-notes")
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("digitalNotes")
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("digitalNotes", JSON.stringify(notes))
  }, [notes])

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setNotes([newNote, ...notes])
    setSelectedNote(newNote)
    setTitle(newNote.title)
    setContent(newNote.content)
    setIsEditing(true)
  }

  const updateNote = () => {
    if (!selectedNote) return

    const updatedNote: Note = {
      ...selectedNote,
      title,
      content,
      updatedAt: new Date().toISOString()
    }

    setNotes(notes.map(note => note.id === selectedNote.id ? updatedNote : note))
    setSelectedNote(updatedNote)
    setIsEditing(false)
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
    if (selectedNote?.id === id) {
      setSelectedNote(null)
      setTitle("")
      setContent("")
    }
  }

  const selectNote = (note: Note) => {
    setSelectedNote(note)
    setTitle(note.title)
    setContent(note.content)
    setIsEditing(false)
  }

  const exportNotes = () => {
    const data = JSON.stringify(notes, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "digital-notes.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const importNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string)
        setNotes(imported)
      } catch (error) {
        alert("Error importing notes. Please check the file format.")
      }
    }
    reader.readAsText(file)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Digital Notes</h1>
        <p className="text-gray-400 text-base text-center mb-8">Create and organize your digital notes</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          <div className="flex gap-3 mb-6">
            <button
              onClick={createNote}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
            >
              <div className="flex items-center justify-center gap-2">
                <Plus className="h-5 w-5" />
                New Note
              </div>
            </button>
            <button
              onClick={exportNotes}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
            >
              <Download className="h-5 w-5" />
            </button>
            <label className="px-6 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors cursor-pointer">
              <Upload className="h-5 w-5" />
              <input type="file" accept=".json" onChange={importNotes} className="hidden" />
            </label>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Notes List */}
            <div className="lg:col-span-1">
              <h2 className="text-lg font-semibold text-white mb-4">Notes ({notes.length})</h2>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {notes.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No notes yet. Create your first note!</p>
                  </div>
                ) : (
                  notes.map(note => (
                    <div
                      key={note.id}
                      onClick={() => selectNote(note)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedNote?.id === note.id
                          ? "bg-[#00E5FF]/10 border-[#00E5FF]/50"
                          : "bg-white/5 border-white/8 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-1">{note.title}</h4>
                          <p className="text-gray-400 text-sm line-clamp-2">{note.content || "Empty note"}</p>
                          <p className="text-gray-500 text-xs mt-2">{formatDate(note.updatedAt)}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNote(note.id)
                          }}
                          className="ml-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Note Editor */}
            <div className="lg:col-span-2">
              {selectedNote ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">Note Editor</h2>
                    <div className="flex gap-2">
                      {isEditing ? (
                        <button
                          onClick={updateNote}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform"
                        >
                          <div className="flex items-center gap-2">
                            <Save className="h-4 w-4" />
                            Save
                          </div>
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            Edit
                          </div>
                        </button>
                      )}
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                          placeholder="Note title..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Content</label>
                        <textarea
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-80 resize-none"
                          placeholder="Write your note here..."
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-white/5 rounded-xl border border-white/8">
                      <h2 className="text-2xl font-bold text-white mb-4">{selectedNote.title}</h2>
                      <div className="text-gray-300 whitespace-pre-wrap">{selectedNote.content || "No content"}</div>
                      <div className="mt-6 pt-4 border-t border-white/8">
                        <p className="text-gray-500 text-sm">
                          Created: {formatDate(selectedNote.createdAt)}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Updated: {formatDate(selectedNote.updatedAt)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-12 text-center text-gray-400">
                  <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Select a note to view or create a new one</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        </div>

        {/* Tool Content Section */}
        <ToolContent content={toolContent} toolName="Digital Notes" toolPath="/tools/digital-notes" />

        {/* Related Tools */}
        <RelatedTools currentToolPath="/tools/digital-notes" currentCategory={toolContent.category} />

        <Link
          href="/"
          className="mt-6 text-[#00E5FF] hover:underline inline-block"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}




