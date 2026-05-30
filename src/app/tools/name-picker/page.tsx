"use client"

import { useState } from "react"
import { Users, Shuffle, Trophy, Trash2, RotateCcw } from "lucide-react"
import Link from "next/link"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import RelatedTools from "@/components/tool-faq"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function NamePicker() {
  useRecentTools("/tools/name-picker", "Random Name Picker", "Users")
  
  const [names, setNames] = useState("")
  const [nameList, setNameList] = useState<string[]>([])
  const [winner, setWinner] = useState("")
  const [isSpinning, setIsSpinning] = useState(false)
  const [removeWinner, setRemoveWinner] = useState(true)

  const parseNames = () => {
    const parsed = names
      .split(/[\n,]+/)
      .map(n => n.trim())
      .filter(n => n.length > 0)
    setNameList(parsed)
  }

  const pickWinner = () => {
    if (nameList.length === 0) {
      parseNames()
      if (nameList.length === 0) return
    }

    setIsSpinning(true)
    let spins = 0
    const maxSpins = 20
    const spinInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * nameList.length)
      setWinner(nameList[randomIndex])
      spins++
      
      if (spins >= maxSpins) {
        clearInterval(spinInterval)
        setIsSpinning(false)
        const finalWinner = nameList[Math.floor(Math.random() * nameList.length)]
        setWinner(finalWinner)
        
        if (removeWinner) {
          setNameList(nameList.filter(n => n !== finalWinner))
          setNames(nameList.filter(n => n !== finalWinner).join("\n"))
        }
      }
    }, 100)
  }

  const resetAll = () => {
    setNames("")
    setNameList([])
    setWinner("")
    setRemoveWinner(true)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Random Name Picker</h1>
        <p className="text-gray-400 text-base text-center mb-8">Pick a random winner from a list of names with animation</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8">
          <div id="ad-top"></div>
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8 mb-6">
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Enter Names (one per line or comma-separated)</label>
            <textarea
              value={names}
              onChange={(e) => setNames(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-40 resize-none"
              placeholder="John&#10;Jane&#10;Mike&#10;Sarah&#10;Tom"
            />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input
                type="checkbox"
                checked={removeWinner}
                onChange={(e) => setRemoveWinner(e.target.checked)}
                className="w-5 h-5 rounded"
              />
              <span className="text-sm">Remove winner after picking</span>
            </label>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={pickWinner}
              disabled={isSpinning || (names.trim() === "" && nameList.length === 0)}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <Shuffle className="h-5 w-5" />
              {isSpinning ? "Picking..." : "Pick Random Winner"}
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              Reset
            </button>
          </div>

          {/* Winner Display */}
          {winner && (
            <div className="p-8 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30 text-center">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-[#00E5FF]" />
              <p className="text-sm text-gray-400 mb-2">Winner</p>
              <p className="text-4xl font-bold text-white">{winner}</p>
            </div>
          )}

          {/* Remaining Names */}
          {nameList.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-400">Remaining Names ({nameList.length})</p>
                <button
                  type="button"
                  onClick={() => {
                    setNameList([])
                    setNames("")
                  }}
                  className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <Trash2 className="h-3 w-3" />
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {nameList.map((name, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/5 rounded-lg text-white text-sm border border-white/10"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="ad-slot mt-8">
          <div id="ad-bottom"></div>
        </div>

        {/* How to Use Section */}
        <HowToUse steps={[
          "Enter names separated by newlines or commas",
          "Check 'Remove winner' if you want to pick multiple winners",
          "Click 'Pick Random Winner' to start the animation",
          "The winner will be displayed with a celebration effect",
          "Winner is removed from the list if option is checked"
        ]} />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/name-picker" toolName="Random Name Picker" />

        {/* FAQ Section */}
        <RelatedTools
          toolName="Random Name Picker"
          faqs={[
            {
              question: "How does the random name picker work?",
              answer: "The picker uses JavaScript's Math.random() function to select a random name from your list. The animation effect shows names cycling through before landing on the winner, adding excitement to the selection process."
            },
            {
              question: "Can I pick multiple winners?",
              answer: "Yes! Enable the 'Remove winner after picking' option. After each winner is selected, they're removed from the list, so you can keep picking until all names are exhausted. This is perfect for selecting multiple prize winners."
            },
            {
              question: "What formats can I use to enter names?",
              answer: "You can enter names separated by newlines (each name on a new line) or separated by commas. For example: 'John, Jane, Mike' or each on a new line. Both formats work the same way."
            },
            {
              question: "Is this truly random?",
              answer: "The picker uses JavaScript's Math.random() which is a pseudo-random number generator. While not cryptographically secure, it's sufficiently random for casual use like classroom activities, giveaways, and group selections."
            }
          ]}
        />

        {/* Social Share */}
        <SocialShare title="Random Name Picker - Pick random winner from list" />

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
