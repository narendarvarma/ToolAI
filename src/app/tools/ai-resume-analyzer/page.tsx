"use client"

import { useState, useRef } from "react"
import { FileText, Wand2, Copy, CheckCircle, XCircle, AlertCircle, Upload, BarChart2, Lightbulb, Target, Star } from "lucide-react"
import Link from "next/link"
import GeneratingAnimation from "@/components/generating-animation"
import DailyUsageBar from "@/components/DailyUsageBar"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import AIToolDisclaimer from "@/components/ai-tool-disclaimer"
import { getToolContent } from "@/lib/tool-content"
import { tokenManager } from "@/lib/token-manager";
export default function ResumeAnalyzerPage() {
  const toolContent = getToolContent("ai-resume-analyzer")
  const used = tokenManager.getRequestsUsed()
  const limit = tokenManager.getDailyLimit()
  const remaining = tokenManager.getRemainingRequests()

  const [file, setFile]               = useState<File | null>(null)
  const [fileName, setFileName]       = useState("")
  const [resumeText, setResumeText]   = useState("")
  const [extracting, setExtracting]   = useState(false)
  const [result, setResult]           = useState("")
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState("")
  const [isDragging, setIsDragging]   = useState(false)
  const [copied, setCopied]           = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ---- Extract text from file ----
  async function extractTextFromFile(f: File): Promise<string> {
    if (f.type === "text/plain") {
      return await f.text()
    }

    if (f.name.endsWith(".pdf") || f.type === "application/pdf") {
      const pdfjsLib = await import("pdfjs-dist")
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
      const arrayBuffer = await f.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      let text = ""
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        text += content.items.map((item: any) => item.str).join(" ") + "\n"
      }
      return text
    }

    if (f.name.endsWith(".docx")) {
      const mammoth = await import("mammoth")
      const arrayBuffer = await f.arrayBuffer()
      const res = await mammoth.extractRawText({ arrayBuffer })
      return res.value
    }

    throw new Error("Unsupported file type. Please upload PDF or DOCX.")
  }

  // ---- Handle file selection ----
  async function handleFile(f: File) {
    setError("")
    setResult("")
    setFileName(f.name)
    setFile(f)
    setExtracting(true)

    try {
      const text = await extractTextFromFile(f)
      if (!text.trim()) throw new Error("Could not extract text. Try a different file.")
      setResumeText(text)
    } catch (err: any) {
      setError(err.message)
      setFileName("")
      setFile(null)
      setResumeText("")
    } finally {
      setExtracting(false)
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) handleFile(f)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  // ---- Analyze ----
  async function analyzeResume() {
    if (!resumeText.trim()) {
      setError("Please upload your resume file first.")
      return
    }
    if (!tokenManager.canUseRequest()) {
      setError("Daily limit reached. Come back tomorrow.")
      return
    }

    setLoading(true)
    setError("")
    setResult("")

    try {
      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Analysis failed")
      setResult(data.result)
      tokenManager.useRequest()
    } catch (err: any) {
      setError(err.message || "Error analyzing resume. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ---- Parse result into sections ----
  function parseResult(text: string) {
    const sections = [
      { key: "OVERALL SCORE",           icon: <Star className="w-4 h-4" />,         color: "#FFD700" },
      { key: "QUICK SUMMARY",           icon: <BarChart2 className="w-4 h-4" />,    color: "#00E5FF" },
      { key: "STRENGTHS",               icon: <CheckCircle className="w-4 h-4" />,  color: "#22c55e" },
      { key: "WEAKNESSES",              icon: <XCircle className="w-4 h-4" />,      color: "#ef4444" },
      { key: "ATS COMPATIBILITY SCORE", icon: <Target className="w-4 h-4" />,       color: "#a855f7" },
      { key: "SECTION-BY-SECTION",      icon: <FileText className="w-4 h-4" />,     color: "#00E5FF" },
      { key: "IMPACT",                  icon: <Lightbulb className="w-4 h-4" />,    color: "#f59e0b" },
      { key: "MISSING SECTIONS",        icon: <AlertCircle className="w-4 h-4" />,  color: "#f97316" },
      { key: "TOP 5 IMPROVEMENTS",      icon: <Star className="w-4 h-4" />,         color: "#7C4DFF" },
      { key: "INDUSTRY FIT",            icon: <Target className="w-4 h-4" />,       color: "#22c55e" },
    ]

    // Split by **HEADER** pattern
    const parts = text.split(/\*\*([A-Z][^*]+)\*\*/g)
    const parsed: { title: string; content: string; meta: typeof sections[0] }[] = []

    for (let i = 1; i < parts.length; i += 2) {
      const title   = parts[i].trim()
      const content = parts[i + 1]?.trim() || ""
      const meta    = sections.find(s => title.toUpperCase().includes(s.key)) || {
        key: "DEFAULT",
        icon: <FileText className="w-4 h-4" />,
        color: "#00E5FF"
      }
      parsed.push({ title, content, meta })
    }

    return parsed
  }

  // ---- Extract score from title like "OVERALL SCORE: 82/100" ----
  function extractScore(title: string): number | null {
    const match = title.match(/(\d+)\s*\/\s*100/)
    return match ? parseInt(match[1]) : null
  }

  const sections = result ? parseResult(result) : []

  const overallScore = sections.find(s =>
    s.title.toUpperCase().includes("OVERALL SCORE")
  )
  const atsScore = sections.find(s =>
    s.title.toUpperCase().includes("ATS")
  )

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00E5FF]/20 to-[#7C4DFF]/20 border border-[#00E5FF]/30 mb-4">
            <FileText className="w-7 h-7 text-[#00E5FF]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Resume Analyzer</h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Upload your resume and get an instant ATS score, section breakdown, and actionable improvement tips.
          </p>
        </div>

        {/* Daily usage bar */}
        <DailyUsageBar used={used} limit={limit} remaining={remaining} loaded={true} />

        <AIToolDisclaimer />

        {/* Upload area */}
        <div
          onClick={() => !extracting && fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={e => { e.preventDefault(); setIsDragging(false) }}
          onDrop={handleDrop}
          className={`
            relative rounded-2xl border-2 border-dashed transition-all cursor-pointer mb-6
            flex flex-col items-center justify-center p-12 text-center
            ${isDragging
              ? "border-[#00E5FF] bg-[#00E5FF]/5"
              : file
              ? "border-[#22c55e]/50 bg-[#22c55e]/5"
              : "border-white/10 bg-[#111827] hover:border-[#00E5FF]/40 hover:bg-[#00E5FF]/5"
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleInputChange}
            className="hidden"
          />

          {extracting ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#00E5FF] font-medium">Extracting text from {fileName}...</p>
            </div>
          ) : file && resumeText ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#22c55e]/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#22c55e]" />
              </div>
              <div>
                <p className="text-white font-semibold">{fileName}</p>
                <p className="text-[#22c55e] text-sm mt-1">
                  ✅ {resumeText.split(" ").length} words extracted
                </p>
              </div>
              <button
                onClick={e => { e.stopPropagation(); fileInputRef.current?.click() }}
                className="text-xs text-gray-400 hover:text-[#00E5FF] transition-colors border border-white/10 px-3 py-1 rounded-lg"
              >
                Change file
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg">
                  {isDragging ? "Drop your resume here" : "Upload your resume"}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Drag & drop or click to browse
                </p>
              </div>
              <div className="flex gap-2">
                {["PDF", "DOCX", "TXT"].map(fmt => (
                  <span key={fmt} className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">
                    {fmt}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 bg-red-900/30 border border-red-500/50 text-red-300 rounded-xl px-4 py-3 mb-6 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Analyze button */}
        <button
          onClick={analyzeResume}
          disabled={loading || !tokenManager.canUseRequest() || !resumeText || extracting}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold text-base hover:scale-[1.01] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-40 disabled:hover:scale-100 disabled:shadow-none"
        >
          <div className="flex items-center justify-center gap-2">
            <Wand2 className="h-5 w-5" />
            {loading
              ? "Analyzing..."
              : extracting
              ? "Extracting file..."
              : !tokenManager.canUseRequest()
              ? "🚫 Daily Limit Reached"
              : !resumeText
              ? "Upload a resume to continue"
              : "Analyze My Resume"}
          </div>
        </button>

        {/* Loading animation */}
        {loading && (
          <div className="mt-8">
            <GeneratingAnimation type="resume_analyzer" accentColor="#00E5FF" />
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="mt-10 space-y-4">

            {/* Score cards row */}
            {(overallScore || atsScore) && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[overallScore, atsScore].filter(Boolean).map((s, i) => {
                  const score = extractScore(s!.title)
                  const isGood = score !== null && score >= 70
                  const isMid  = score !== null && score >= 50 && score < 70
                  const color  = isGood ? "#22c55e" : isMid ? "#f59e0b" : "#ef4444"
                  return (
                    <div key={i} className="bg-[#111827] rounded-2xl p-6 border border-white/8 text-center">
                      <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">
                        {s!.title.replace(/:\s*\d+\/100/, "").trim()}
                      </p>
                      {score !== null ? (
                        <>
                          <p className="text-5xl font-bold mb-1" style={{ color }}>
                            {score}
                          </p>
                          <p className="text-gray-500 text-sm">/ 100</p>
                          <div className="mt-3 w-full bg-white/5 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all"
                              style={{ width: `${score}%`, background: color }}
                            />
                          </div>
                          <p className="text-xs mt-2 font-medium" style={{ color }}>
                            {isGood ? "✅ Strong" : isMid ? "⚠️ Average" : "❌ Needs Work"}
                          </p>
                        </>
                      ) : (
                        <p className="text-gray-300 text-sm mt-2">{s!.content.slice(0, 80)}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {/* All sections */}
            {sections.map((section, i) => {
              const isScore = section.title.toUpperCase().includes("OVERALL SCORE") ||
                              section.title.toUpperCase().includes("ATS COMPATIBILITY")
              if (isScore) return null // already shown above

              return (
                <div key={i} className="bg-[#111827] rounded-2xl border border-white/8 overflow-hidden">
                  {/* Section header */}
                  <div
                    className="flex items-center gap-3 px-5 py-4 border-b border-white/5"
                    style={{ borderLeft: `3px solid ${section.meta.color}` }}
                  >
                    <span style={{ color: section.meta.color }}>{section.meta.icon}</span>
                    <h2 className="font-semibold text-white text-sm">{section.title}</h2>
                  </div>

                  {/* Section content */}
                  <div className="px-5 py-4">
                    <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {section.content
                        .split("\n")
                        .filter(line => line.trim())
                        .map((line, j) => {
                          const isStrength = line.startsWith("✅") || line.startsWith("-") && section.title.includes("STRENGTH")
                          const isWeakness = line.startsWith("❌") || line.startsWith("-") && section.title.includes("WEAK")
                          const isBullet   = line.match(/^[-•*]/) || line.match(/^\d+\./)
                          const isImprove  = line.startsWith("✅")
                          const isOld      = line.startsWith("❌")

                          return (
                            <div
                              key={j}
                              className={`mb-2 ${
                                isImprove
                                  ? "text-green-400 bg-green-500/10 rounded-lg px-3 py-2"
                                  : isOld
                                  ? "text-red-400 bg-red-500/10 rounded-lg px-3 py-2"
                                  : isBullet
                                  ? "flex items-start gap-2"
                                  : ""
                              }`}
                            >
                              {isBullet && !isImprove && !isOld && (
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                  style={{ background: section.meta.color }} />
                              )}
                              <span>{isBullet ? line.replace(/^[-•*]\s*/, "").replace(/^\d+\.\s*/, "") : line}</span>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Copy button */}
            <button
              onClick={copyResult}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-white/10 px-4 py-2 rounded-xl transition mt-2"
            >
              <Copy className="h-4 w-4" />
              {copied ? "✅ Copied!" : "Copy Full Report"}
            </button>
          </div>
        )}

        {/* Tool Content Section */}
        <ToolContent content={toolContent} toolName="AI Resume Analyzer" toolPath="/tools/ai-resume-analyzer" />

        {/* Related Tools */}
        <RelatedTools currentToolPath="/tools/ai-resume-analyzer" currentCategory={toolContent.category} />

        <Link href="/" className="mt-8 text-[#00E5FF] hover:underline inline-block text-sm">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}