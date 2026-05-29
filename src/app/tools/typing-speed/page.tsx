"use client"

import { useState, useEffect, useRef } from "react"
import { Keyboard, Clock, Target, RotateCcw } from "lucide-react"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import RelatedTools from "@/components/tool-faq"
import { useRecentTools } from "@/hooks/use-recent-tools"

const sampleText = "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is commonly used for typing practice. Regular practice improves your typing speed and accuracy significantly. Focus on accuracy first, then gradually increase your speed over time."

export default function TypingSpeedTest() {
  useRecentTools("/tools/typing-speed", "Typing Speed Test", "Keyboard")
  
  const [userInput, setUserInput] = useState("")
  const [isStarted, setIsStarted] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const [errors, setErrors] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const startTest = () => {
    setIsStarted(true)
    setIsFinished(false)
    setUserInput("")
    setTimeElapsed(0)
    setWpm(0)
    setAccuracy(0)
    setErrors(0)
    
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => {
        if (prev >= 60) {
          finishTest()
          return prev
        }
        return prev + 1
      })
    }, 1000)
  }

  const finishTest = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setIsStarted(false)
    setIsFinished(true)
    
    const words = sampleText.split(" ")
    const userWords = userInput.split(" ")
    const correctWords = userWords.filter((word, index) => word === words[index]).length
    const totalWords = userWords.length
    const errorCount = userWords.filter((word, index) => word !== words[index]).length
    
    const calculatedWpm = Math.round((correctWords / timeElapsed) * 60) || 0
    const calculatedAccuracy = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0
    
    setWpm(calculatedWpm)
    setAccuracy(calculatedAccuracy)
    setErrors(errorCount)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isStarted) return
    setUserInput(e.target.value)
    
    if (e.target.value.length >= sampleText.length) {
      finishTest()
    }
  }

  const resetTest = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setIsStarted(false)
    setIsFinished(false)
    setUserInput("")
    setTimeElapsed(0)
    setWpm(0)
    setAccuracy(0)
    setErrors(0)
  }

  const getCharClass = (index: number) => {
    if (!isStarted && !isFinished) return "text-gray-400"
    if (index >= userInput.length) return "text-gray-600"
    if (userInput[index] === sampleText[index]) return "text-green-400"
    return "text-red-400 bg-red-500/20"
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Typing Speed Test</h1>
        <p className="text-gray-400 text-base text-center mb-8">Measure your typing speed, accuracy, and improve your skills</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8">
          <div id="ad-top"></div>
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8 mb-6">
          {!isStarted && !isFinished && (
            <div className="text-center mb-6">
              <button
                type="button"
                onClick={startTest}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
              >
                Start Test
              </button>
            </div>
          )}

          {/* Timer */}
          {(isStarted || isFinished) && (
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-white">
                <Clock className="h-5 w-5 text-[#00E5FF]" />
                <span className="text-2xl font-bold">{timeElapsed}s</span>
              </div>
              {isFinished && (
                <>
                  <div className="flex items-center gap-2 text-white">
                    <Target className="h-5 w-5 text-green-400" />
                    <span className="text-2xl font-bold">{wpm} WPM</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Keyboard className="h-5 w-5 text-yellow-400" />
                    <span className="text-2xl font-bold">{accuracy}%</span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Sample Text */}
          <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-lg leading-relaxed font-mono">
              {sampleText.split("").map((char, index) => (
                <span key={index} className={getCharClass(index)}>
                  {char}
                </span>
              ))}
            </p>
          </div>

          {/* Input Area */}
          <textarea
            value={userInput}
            onChange={handleInputChange}
            disabled={!isStarted || isFinished}
            className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-32 resize-none font-mono"
            placeholder={isStarted ? "Start typing..." : "Click Start Test to begin"}
          />

          {/* Reset Button */}
          {(isStarted || isFinished) && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={resetTest}
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Restart
              </button>
            </div>
          )}

          {/* Results */}
          {isFinished && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30 text-center">
                <p className="text-3xl font-bold text-white">{wpm}</p>
                <p className="text-sm text-gray-400">Words Per Minute</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 text-center">
                <p className="text-3xl font-bold text-white">{accuracy}%</p>
                <p className="text-sm text-gray-400">Accuracy</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl border border-red-500/30 text-center">
                <p className="text-3xl font-bold text-white">{errors}</p>
                <p className="text-sm text-gray-400">Errors</p>
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
          "Click 'Start Test' to begin the timer",
          "Type the text shown in the box above",
          "The test runs for 60 seconds or until you finish",
          "View your WPM, accuracy, and errors",
          "Click 'Restart' to try again and improve"
        ]} />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/typing-speed" toolName="Typing Speed Test" />

        {/* FAQ Section */}
        <RelatedTools
          toolName="Typing Speed Test"
          faqs={[
            {
              question: "What is a good typing speed?",
              answer: "Average typing speed is 40 WPM. Professional typists can reach 65-75 WPM. 80+ WPM is considered excellent. For most office jobs, 40-50 WPM is sufficient. Practice regularly to improve your speed."
            },
            {
              question: "How is WPM calculated?",
              answer: "WPM (Words Per Minute) is calculated by dividing the number of correctly typed words by the time taken in minutes. A word is typically counted as 5 characters. We calculate it based on correct words typed in the given time."
            },
            {
              question: "How can I improve my typing speed?",
              answer: "Practice regularly, focus on accuracy first, learn touch typing (without looking at the keyboard), use proper finger placement, and gradually increase speed. Use this test daily to track your progress."
            },
            {
              question: "Why is accuracy important?",
              answer: "Accuracy is more important than speed. Typing fast with many errors requires corrections, which slows you down. Aim for 95%+ accuracy before focusing on increasing speed. Good accuracy saves time on proofreading."
            }
          ]}
        />

        {/* Social Share */}
        <SocialShare title="Typing Speed Test - Measure your typing speed" />

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
