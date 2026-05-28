"use client"

import { useState } from "react"
import { FileText, Download, Wand2 } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import { tokenManager } from "@/lib/token-manager"

export default function AIResumeBuilder() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [experience, setExperience] = useState("")
  const [skills, setSkills] = useState("")
  const [education, setEducation] = useState("")
  const [generatedResume, setGeneratedResume] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateResume = async () => {
    if (!name || !email) return

    // Check token limit (estimate: ~800 tokens for this operation)
    const estimatedTokens = 800
    if (!tokenManager.canUseTokens(estimatedTokens)) {
      alert(`Daily token limit reached. You have ${tokenManager.getRemainingTokens()} tokens remaining. Tokens reset daily at midnight.`)
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-haiku',
          messages: [
            {
              role: 'system',
              content: 'You are a professional resume writer. Create well-structured, professional resumes that highlight strengths and achievements. Use clear formatting and professional language.'
            },
            {
              role: 'user',
              content: `Create a professional resume for:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nExperience:\n${experience || 'Not provided'}\n\nSkills:\n${skills || 'Not provided'}\n\nEducation:\n${education || 'Not provided'}`
            }
          ],
          max_tokens: 2500,
        }),
      })

      const data = await response.json()
      
      if (data.choices && data.choices[0]) {
        setGeneratedResume(data.choices[0].message.content)
        // Deduct tokens
        tokenManager.useTokens(estimatedTokens)
      } else {
        throw new Error('No response from AI')
      }
    } catch (error) {
      console.error('Error generating resume:', error)
      alert('Error generating resume. Please try again.')
    }

    setIsGenerating(false)
  }

  const downloadResume = () => {
    const blob = new Blob([generatedResume], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "resume.txt"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">AI Resume Builder</h1>
        <p className="text-gray-400 text-base text-center mb-8">Build professional resumes with AI</p>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Personal Info */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Phone (optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="+1 234 567 890"
              />
            </div>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Work Experience</label>
            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-24 resize-none"
              placeholder="Describe your work experience..."
            />
          </div>

          {/* Skills */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Skills</label>
            <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-24 resize-none"
              placeholder="List your skills separated by commas..."
            />
          </div>

          {/* Education */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Education</label>
            <textarea
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-24 resize-none"
              placeholder="Describe your education..."
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generateResume}
            disabled={!name || !email || isGenerating}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            <div className="flex items-center justify-center gap-2">
              <Wand2 className="h-5 w-5" />
              {isGenerating ? "Generating..." : "Generate Resume"}
            </div>
          </button>

          {/* Generated Resume */}
          {generatedResume && (
            <div className="mt-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <pre className="text-white whitespace-pre-wrap font-sans">{generatedResume}</pre>
              </div>
              <button
                onClick={downloadResume}
                className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
              >
                <div className="flex items-center justify-center gap-2">
                  <Download className="h-5 w-5" />
                  Download Resume
                </div>
              </button>
            </div>
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
