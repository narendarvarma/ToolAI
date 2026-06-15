"use client"

import { useState } from "react"
import { Linkedin, Sparkles, Copy, Check } from "lucide-react"
import Link from "next/link"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"
import { useRecentTools } from "@/hooks/use-recent-tools"
import { tokenManager } from "@/lib/token-manager"
import DailyUsageBar from "@/components/DailyUsageBar";

export default function AiLinkedinBio() {
  useRecentTools("/tools/ai-linkedin-bio", "AI LinkedIn Bio Generator", "Linkedin")
  const toolContent = getToolContent("ai-linkedin-bio")
  
  const used = tokenManager.getRequestsUsed()
  const limit = tokenManager.getDailyLimit()
  const remaining = tokenManager.getRemainingRequests()
  
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [skills, setSkills] = useState("")
  const [experience, setExperience] = useState("")
  const [bio, setBio] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateBio = async () => {
    if (!name || !role) return

    if (!tokenManager.canUseRequest()) {
      alert("Daily limit reached. Come back tomorrow.")
      return
    }

    setIsLoading(true)
    setBio("")

    // Simulated AI bio generation (in production, this would call an AI API)
    setTimeout(() => {
      const experienceText = experience ? ` with ${experience} years of experience` : ""
      const skillsArray = skills ? skills.split(",").map(s => s.trim()) : []
      const skillsText = skillsArray.length > 0 ? skillsArray.join(", ") : "various technologies"

      const generatedBio = `Passionate ${role}${experienceText} dedicated to delivering innovative solutions and driving business impact. Skilled in ${skillsText}, I combine technical expertise with strong problem-solving abilities to tackle complex challenges.

Throughout my career, I've developed a deep understanding of industry best practices and emerging trends. I thrive in collaborative environments where I can contribute my skills while continuously learning and growing.

My approach combines analytical thinking with creative problem-solving, allowing me to develop effective solutions that meet both technical requirements and business objectives. I'm committed to staying current with the latest developments in ${skillsArray[0] || "my field"} and applying this knowledge to create value.

I'm always excited to connect with professionals in the industry and explore opportunities for collaboration, knowledge sharing, and professional growth. Let's connect and discuss how we can work together to achieve great results.`

      setBio(generatedBio)
      tokenManager.useRequest()
      setIsLoading(false)
    }, 2000)
  }

  const copyBio = () => {
    navigator.clipboard.writeText(bio)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">AI LinkedIn Bio Generator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Generate a professional LinkedIn About section with AI assistance</p>

        <DailyUsageBar
          used={used}
          limit={limit}
          remaining={remaining}
          loaded={true}
        />

        {/* Ad below tool title */}
        <div className="ad-slot mb-8">
          <div id="ad-top"></div>
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8 mb-6">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="e.g., Rahul Sharma"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Current Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="e.g., Software Engineer, Data Analyst, Marketing Manager"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Years of Experience</label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="e.g., 3"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Key Skills (comma-separated)</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="e.g., Python, JavaScript, React, Node.js, SQL"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={generateBio}
            disabled={!name || !role || isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Sparkles className="h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Bio
              </>
            )}
          </button>
        </div>

        {/* Generated Bio */}
        {bio && (
          <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Generated LinkedIn Bio</h2>
              <button
                type="button"
                onClick={copyBio}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] text-sm hover:bg-[#00E5FF]/30 transition-colors"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <pre className="text-gray-300 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {bio}
              </pre>
            </div>
          </div>
        )}

        {/* Single bottom ad */}
        <div className="ad-slot mt-8">
          <div id="ad-bottom"></div>
        </div>

        {/* How to Use Section */}
        <HowToUse steps={[
          "Enter your name and current role",
          "Add your years of experience (optional)",
          "List your key skills separated by commas",
          "Click 'Generate Bio' to create your LinkedIn About section",
          "Copy and paste to your LinkedIn profile"
        ]} />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/ai-linkedin-bio" toolName="AI LinkedIn Bio Generator" />

        {/* Social Share */}
        <SocialShare title="AI LinkedIn Bio Generator - Generate professional LinkedIn bio" />

        {/* Tool Content Section */}
        <ToolContent content={toolContent} toolName="AI LinkedIn Bio Generator" toolPath="/tools/ai-linkedin-bio" />

        {/* Related Tools */}
        <RelatedTools currentToolPath="/tools/ai-linkedin-bio" currentCategory={toolContent.category} />

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
