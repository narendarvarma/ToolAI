"use client"

import { useState } from "react"
import { Briefcase, ExternalLink, Copy, Wand2 } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"
import { tokenManager } from "@/lib/token-manager"
import { callAI } from "@/lib/ai"
import DailyUsageBar from "@/components/DailyUsageBar"

interface Internship {
  title: string
  company: string
  location: string
  duration: string
  stipend: string
  requiredSkills: string[]
  matchedSkills: string[]
  description: string
  applyLinks: { platform: string; url: string }[]
}

interface AIResponse {
  internships: Internship[]
}

export default function InternshipFinder() {
  const used = tokenManager.getRequestsUsed()
  const limit = tokenManager.getDailyLimit()
  const remaining = tokenManager.getRemainingRequests()

  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")
  const [domain, setDomain] = useState("")
  const [location, setLocation] = useState("")
  const [duration, setDuration] = useState("")
  const [internships, setInternships] = useState<Internship[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState("")
  const [showPrompt, setShowPrompt] = useState(false)
  const [lastPrompt, setLastPrompt] = useState("")

  const addSkill = () => {
    const val = skillInput.trim().toLowerCase()
    if (!val) return
    if (skills.includes(val)) {
      setSkillInput("")
      return
    }
    setSkills([...skills, val])
    setSkillInput("")
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill))
  }

  const buildPrompt = () => {
    return `You are an expert internship search assistant for students.

A student has the following skills: ${skills.join(', ')}.
Filters:
- Domain: ${domain || 'any domain'}
- Location preference: ${location || 'any location'}
- Duration preference: ${duration || 'any duration'}

Your task: Find and suggest 6 realistic internship opportunities that best match these skills and filters.

For each internship, provide:
1. A real job title commonly used in the industry
2. A real or realistic company name
3. Location (city or remote)
4. Duration
5. Stipend/salary (use realistic ₹ amounts for India, $ for USA, or "Unpaid")
6. 3–5 required skills (include which of the student's skills match)
7. A one-sentence description of what the intern will do
8. 2 direct apply links with platform names from: LinkedIn, Internshala, Wellfound, AngelList, Indeed, Unstop, Naukri, Glassdoor, or the company's careers page. Use realistic URL patterns.

Respond ONLY with valid JSON. No markdown code fences, no extra text, no explanation. Output format:

{
  "internships": [
    {
      "title": "string",
      "company": "string",
      "location": "string",
      "duration": "string",
      "stipend": "string",
      "requiredSkills": ["skill1", "skill2", "skill3"],
      "matchedSkills": ["matched_skill1"],
      "description": "string",
      "applyLinks": [
        { "platform": "LinkedIn", "url": "https://linkedin.com/jobs/..." },
        { "platform": "Internshala", "url": "https://internshala.com/internship/..." }
      ]
    }
  ]
}`
  }

  const findInternships = async () => {
    if (skills.length === 0) {
      setError("Please add at least one skill before searching.")
      return
    }

    if (!tokenManager.canUseRequest()) {
      alert("Daily limit reached. Come back tomorrow.")
      return
    }

    setIsSearching(true)
    setError("")
    const prompt = buildPrompt()
    setLastPrompt(prompt)

    try {
      const reply = await callAI(prompt, "")

      if (!reply) {
        throw new Error('No response from AI')
      }

      const cleaned = reply.replace(/```json|```/g, '').trim()
      const json = JSON.parse(cleaned) as AIResponse
      setInternships(json.internships || [])
      tokenManager.useRequest()
    } catch (err: any) {
      console.error('Error finding internships:', err)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const getMatchClass = (job: Internship) => {
    const matched = (job.matchedSkills || []).map(s => s.toLowerCase())
    const matchCount = matched.filter(s => skills.includes(s)).length
    const total = Math.max(skills.length, 1)
    const pct = Math.round((matchCount / total) * 100)
    
    if (pct >= 70) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    if (pct >= 40) return "bg-purple-500/10 text-purple-400 border-purple-500/20"
    return "bg-gray-500/10 text-gray-400 border-gray-500/20"
  }

  const getMatchLabel = (job: Internship) => {
    const matched = (job.matchedSkills || []).map(s => s.toLowerCase())
    const matchCount = matched.filter(s => skills.includes(s)).length
    const total = Math.max(skills.length, 1)
    const pct = Math.round((matchCount / total) * 100)
    
    if (pct >= 70) return "Strong Match"
    if (pct >= 40) return "Good Match"
    return "Partial"
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Internship Finder</h1>
        <p className="text-gray-400 text-base text-center mb-8">Find internships matched to your skills with AI</p>

        <DailyUsageBar
          used={used}
          limit={limit}
          remaining={remaining}
          loaded={true}
        />

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Skills Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Your Skills</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                className="flex-1 px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="e.g. Python, React, Machine Learning, SQL..."
              />
              <button
                onClick={addSkill}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
              >
                + Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3 min-h-[32px]">
              {skills.length === 0 ? (
                <span className="text-gray-500 text-sm">No skills added yet — type and press Enter</span>
              ) : (
                skills.map(skill => (
                  <span key={skill} className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/25 text-purple-300 text-sm px-3 py-1 rounded-full">
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-purple-300 hover:text-white transition-colors"
                      title="Remove"
                    >
                      ×
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Domain</label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              >
                <option value="">All Domains</option>
                <option value="technology">Technology</option>
                <option value="data science and AI/ML">Data Science & AI/ML</option>
                <option value="web development">Web Development</option>
                <option value="design and UX">Design & UX</option>
                <option value="marketing and growth">Marketing & Growth</option>
                <option value="finance and business">Finance & Business</option>
                <option value="research and academia">Research & Academia</option>
                <option value="cybersecurity">Cybersecurity</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              >
                <option value="">Any Location</option>
                <option value="Remote">Remote</option>
                <option value="India">India</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bangalore">Bangalore</option>
                <option value="USA">USA</option>
                <option value="Europe">Europe</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              >
                <option value="">Any Duration</option>
                <option value="1-2 months">1–2 months</option>
                <option value="2-3 months">2–3 months</option>
                <option value="3-6 months">3–6 months</option>
                <option value="6+ months">6+ months</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={findInternships}
            disabled={skills.length === 0 || isSearching}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            <div className="flex items-center justify-center gap-2">
              <Briefcase className="h-5 w-5" />
              {isSearching ? "Searching..." : "Find Internships"}
            </div>
          </button>

          {/* View Prompt Toggle */}
          <button
            onClick={() => setShowPrompt(!showPrompt)}
            className="mt-4 text-sm text-gray-400 hover:text-[#00E5FF] transition-colors flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            {showPrompt ? "Hide AI Prompt" : "View AI Prompt"}
          </button>

          {/* Prompt Preview */}
          {showPrompt && (
            <div className="mt-4 p-4 bg-[#0B0F1A] rounded-xl border border-white/8">
              <pre className="text-gray-400 text-xs whitespace-pre-wrap font-mono">
                {lastPrompt || "Add skills and click search to see the prompt."}
              </pre>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              ⚠ {error}
            </div>
          )}

          {/* Loading */}
          {isSearching && (
            <div className="mt-6 text-center py-12">
              <div className="inline-block w-9 h-9 border-2 border-gray-600 border-t-[#00E5FF] rounded-full animate-spin mb-4"></div>
              <div className="text-gray-400">Finding the best internships for your skills...</div>
            </div>
          )}

          {/* Results */}
          {internships.length > 0 && !isSearching && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-white">Opportunities Found</h2>
                <span className="text-sm text-gray-400">{internships.length} results</span>
              </div>

              {internships.map((job, index) => (
                <div key={index} className="mb-4 bg-[#111827] rounded-xl border border-white/8 p-5 hover:border-white/13 transition-all relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00E5FF] to-[#7C4DFF]"></div>
                  
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">{job.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{job.company}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getMatchClass(job)}`}>
                      {getMatchLabel(job)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-400">
                    <span>📍 {job.location}</span>
                    <span>📅 {job.duration}</span>
                    <span>💰 {job.stipend}</span>
                  </div>

                  <p className="text-gray-400 text-sm mt-3">{job.description}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {(job.requiredSkills || []).map(skill => {
                      const isMatch = skills.includes(skill.toLowerCase()) || (job.matchedSkills || []).map(s => s.toLowerCase()).includes(skill.toLowerCase())
                      return (
                        <span key={skill} className={`text-xs px-3 py-1 rounded-full border ${isMatch ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'border-white/8 text-gray-400'}`}>
                          {skill}
                        </span>
                      )
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {(job.applyLinks || []).map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg transition-all ${i === 0 ? 'bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white' : 'bg-white/5 border border-white/8 text-gray-400 hover:border-white/13'}`}
                      >
                        <ExternalLink className="h-3 w-3" />
                        Apply on {link.platform}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isSearching && internships.length === 0 && !error && (
            <div className="mt-8 text-center py-12 text-gray-400">
              No internships found yet. Add your skills and click search.
            </div>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
            Advertisement
          </div>
        </div>

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
