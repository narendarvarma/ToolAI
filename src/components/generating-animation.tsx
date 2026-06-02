"use client"

import { useEffect, useState } from "react"

const resume_builder = [
  { icon: "🧠", text: "Reading your details..." },
  { icon: "✍️", text: "Crafting your summary..." },
  { icon: "💼", text: "Building experience section..." },
  { icon: "🛠️", text: "Organizing your skills..." },
  { icon: "🎓", text: "Formatting education..." },
  { icon: "🚀", text: "Polishing projects..." },
  { icon: "✅", text: "Finalizing your resume..." },
]

const PPT_STEPS = [
  { icon: "🧠", text: "Understanding your topic..." },
  { icon: "🗂️", text: "Planning slide structure..." },
  { icon: "🎨", text: "Designing layouts..." },
  { icon: "📝", text: "Writing slide content..." },
  { icon: "📊", text: "Adding data & visuals..." },
  { icon: "✨", text: "Applying theme & colors..." },
  { icon: "📦", text: "Packaging your presentation..." },
]

const ANALYZER_STEPS = [
  { icon: "🧠", text: "Reading your resume..." },
  { icon: "📊", text: "Calculating overall score..." },
  { icon: "✅", text: "Identifying strengths..." },
  { icon: "❌", text: "Finding weaknesses..." },
  { icon: "🤖", text: "Checking ATS compatibility..." },
  { icon: "📝", text: "Analyzing sections..." },
  { icon: "🎯", text: "Generating improvements..." },
]

const RESUME_ANALYZER_STEPS = [
  { icon: "📂", text: "Reading your resume..." },
  { icon: "🔍", text: "Scanning for keywords..." },
  { icon: "🤖", text: "Running ATS check..." },
  { icon: "📊", text: "Scoring each section..." },
  { icon: "💡", text: "Building improvement tips..." },
  { icon: "✅", text: "Finalizing your report..." },
]

const BLOG_STEPS = [
  { icon: "🧠", text: "Understanding your topic..." },
  { icon: "📋", text: "Planning structure..." },
  { icon: "✍️", text: "Writing introduction..." },
  { icon: "📝", text: "Drafting content..." },
  { icon: "🎨", text: "Adding examples..." },
  { icon: "✨", text: "Polishing language..." },
  { icon: "✅", text: "Finalizing blog post..." },
]

const EMAIL_STEPS = [
  { icon: "🧠", text: "Understanding your request..." },
  { icon: "📋", text: "Planning email structure..." },
  { icon: "✍️", text: "Writing greeting..." },
  { icon: "📝", text: "Drafting body content..." },
  { icon: "🎯", text: "Adding call-to-action..." },
  { icon: "✨", text: "Polishing tone..." },
  { icon: "✅", text: "Finalizing email..." },
]

const CODE_STEPS = [
  { icon: "🧠", text: "Understanding requirements..." },
  { icon: "📋", text: "Planning code structure..." },
  { icon: "⚙️", text: "Writing functions..." },
  { icon: "🔧", text: "Adding logic..." },
  { icon: "🐛", text: "Checking for errors..." },
  { icon: "✨", text: "Adding comments..." },
  { icon: "✅", text: "Finalizing code..." },
]

const GENERAL_STEPS = [
  { icon: "🧠", text: "Processing your request..." },
  { icon: "📋", text: "Planning structure..." },
  { icon: "✍️", text: "Generating content..." },
  { icon: "🎨", text: "Refining output..." },
  { icon: "✨", text: "Polishing details..." },
  { icon: "✅", text: "Finalizing result..." },
]

interface GeneratingAnimationProps {
  type?: "resume" | "ppt" | "analyzer" | "resume_analyzer" | "blog" | "email" | "code" | "general"
  title?: string
  accentColor?: string
}

export default function GeneratingAnimation({ 
  type = "general", 
  title,
  accentColor = "#00E5FF" 
}: GeneratingAnimationProps) {
  const stepsMap: Record<string, typeof resume_builder> = {
    resume: resume_builder,
    ppt: PPT_STEPS,
    analyzer: ANALYZER_STEPS,
    resume_analyzer: RESUME_ANALYZER_STEPS,
    blog: BLOG_STEPS,
    email: EMAIL_STEPS,
    code: CODE_STEPS,
    general: GENERAL_STEPS,
  }

  const steps = stepsMap[type] || GENERAL_STEPS
  const [currentStep, setCurrentStep] = useState(0)
  const [dots, setDots] = useState("")
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev < steps.length - 1 ? prev + 1 : prev
        setCompletedSteps((c) => [...c, prev])
        return next
      })
    }, 1400)

    const dotTimer = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."))
    }, 400)

    return () => {
      clearInterval(stepTimer)
      clearInterval(dotTimer)
    }
  }, [steps.length])

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      {/* Pulse ring */}
      <div className="relative mb-8">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl animate-pulse"
          style={{
            background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}44)`,
            boxShadow: `0 0 0 0 ${accentColor}66`,
          }}
        >
          {steps[currentStep].icon}
        </div>
        <div
          className="absolute inset-0 rounded-full border-2 animate-[ring_1.5s_ease-out_infinite]"
          style={{ borderColor: `${accentColor}4D` }}
        />
      </div>

      {/* Current step text */}
      <p
        className="text-base font-semibold mb-2 min-h-[28px]"
        style={{ color: accentColor }}
      >
        {title || steps[currentStep].text}
        {dots}
      </p>

      {/* Progress bar */}
      <div className="w-72 h-1 bg-gray-700 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-600"
          style={{
            width: `${((currentStep + 1) / steps.length) * 100}%`,
            background: accentColor,
          }}
        />
      </div>

      {/* Step list */}
      <div className="flex flex-col gap-2 w-72">
        {steps.map((step, i) => {
          const isDone = completedSteps.includes(i)
          const isActive = i === currentStep
          const isPending = i > currentStep

          return (
            <div
              key={i}
              className="flex items-center gap-2.5 transition-opacity duration-400"
              style={{ opacity: isPending ? 0.35 : 1 }}
            >
              <div
                className="w-5.5 h-5.5 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-400"
                style={{
                  background: isDone ? "#22c55e" : isActive ? accentColor : "#e2e8f0",
                  color: isDone || isActive ? "#fff" : "#94a3b8",
                  animation: isActive ? "stepPulse 1s ease-in-out infinite" : "none",
                }}
              >
                {isDone ? "✓" : i + 1}
              </div>
              <span
                className="text-sm transition-all duration-400"
                style={{
                  color: isDone ? "#22c55e" : isActive ? accentColor : "#94a3b8",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {step.text}
              </span>
            </div>
          )
        })}
      </div>

      <style>{`
        @keyframes ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes stepPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  )
}
