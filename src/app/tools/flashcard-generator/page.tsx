"use client"

import { useState } from "react"
import { BookOpen, Plus, Trash2, RotateCw, Copy, Download, Upload } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

interface Flashcard {
  id: string
  front: string
  back: string
}

export default function FlashcardGenerator() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [frontInput, setFrontInput] = useState("")
  const [backInput, setBackInput] = useState("")

  const addCard = () => {
    if (!frontInput.trim() || !backInput.trim()) return

    const newCard: Flashcard = {
      id: Date.now().toString(),
      front: frontInput,
      back: backInput
    }

    setFlashcards([...flashcards, newCard])
    setFrontInput("")
    setBackInput("")
  }

  const deleteCard = (id: string) => {
    setFlashcards(flashcards.filter(card => card.id !== id))
    if (currentCard >= flashcards.length - 1) {
      setCurrentCard(Math.max(0, flashcards.length - 2))
    }
  }

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  const nextCard = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1)
      setIsFlipped(false)
    }
  }

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1)
      setIsFlipped(false)
    }
  }

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5)
    setFlashcards(shuffled)
    setCurrentCard(0)
    setIsFlipped(false)
  }

  const exportCards = () => {
    const data = JSON.stringify(flashcards, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "flashcards.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const importCards = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string)
        setFlashcards(imported)
      } catch (error) {
        alert("Error importing flashcards. Please check the file format.")
      }
    }
    reader.readAsText(file)
  }

  const currentCardData = flashcards[currentCard]

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Flashcard Generator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Create and study digital flashcards</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Add New Card */}
          <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/8">
            <h3 className="text-lg font-semibold text-white mb-4">Add New Flashcard</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Front (Question)</label>
                <textarea
                  value={frontInput}
                  onChange={(e) => setFrontInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-24 resize-none"
                  placeholder="Enter the question or term..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Back (Answer)</label>
                <textarea
                  value={backInput}
                  onChange={(e) => setBackInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-24 resize-none"
                  placeholder="Enter the answer or definition..."
                />
              </div>
              <button
                onClick={addCard}
                disabled={!frontInput.trim() || !backInput.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
              >
                <div className="flex items-center justify-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add Flashcard
                </div>
              </button>
            </div>
          </div>

          {/* Flashcard Display */}
          {flashcards.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Study Mode</h3>
                <div className="flex gap-2">
                  <button
                    onClick={shuffleCards}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors"
                  >
                    <RotateCw className="h-5 w-5" />
                  </button>
                  <button
                    onClick={exportCards}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <label className="px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors cursor-pointer">
                    <Upload className="h-5 w-5" />
                    <input type="file" accept=".json" onChange={importCards} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="relative h-64 cursor-pointer" onClick={flipCard}>
                <div
                  className={`w-full h-full transition-transform duration-500 transform-style-3d ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front */}
                  <div
                    className={`absolute w-full h-full p-6 rounded-2xl border border-white/8 flex items-center justify-center transition-all ${
                      isFlipped ? "opacity-0" : "opacity-100"
                    }`}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="bg-gradient-to-br from-[#00E5FF]/20 to-[#7C4DFF]/20 w-full h-full rounded-xl p-6 flex items-center justify-center">
                      <p className="text-white text-xl text-center">{currentCardData?.front}</p>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className={`absolute w-full h-full p-6 rounded-2xl border border-white/8 flex items-center justify-center transition-all ${
                      isFlipped ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <div className="bg-gradient-to-br from-[#7C4DFF]/20 to-[#FF4DB6]/20 w-full h-full rounded-xl p-6 flex items-center justify-center">
                      <p className="text-white text-xl text-center">{currentCardData?.back}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={prevCard}
                  disabled={currentCard === 0}
                  className="px-6 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors disabled:opacity-50"
                >
                  Previous
                </button>
                <p className="text-gray-400">
                  {currentCard + 1} / {flashcards.length}
                </p>
                <button
                  onClick={nextCard}
                  disabled={currentCard === flashcards.length - 1}
                  className="px-6 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Card List */}
          {flashcards.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">All Flashcards ({flashcards.length})</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {flashcards.map((card, index) => (
                  <div
                    key={card.id}
                    className="p-4 bg-white/5 rounded-xl border border-white/8 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="text-white font-medium">{card.front}</p>
                      <p className="text-gray-400 text-sm">{card.back}</p>
                    </div>
                    <button
                      onClick={() => deleteCard(card.id)}
                      className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
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




