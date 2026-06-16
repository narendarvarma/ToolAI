"use client"
import GeneratingAnimation from "@/components/generating-animation"
import { useState, useRef } from "react"
import { Download, Wand2 } from "lucide-react"
import Link from "next/link"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"
import { tokenManager } from "@/lib/token-manager"
import { callAI } from "@/lib/ai"
import DailyUsageBar from "@/components/DailyUsageBar"

// ─── JSON repair helper ───────────────────────────────────────────────────────

function repairAndParseJSON(raw: string): any {
  // 1. Strip markdown fences
  let clean = raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim()

  // 2. Extract the JSON object
  const start = clean.indexOf("{")
  if (start === -1) throw new Error("No JSON object found in response")
  clean = clean.substring(start)

  const end = clean.lastIndexOf("}")
  if (end !== -1) clean = clean.substring(0, end + 1)

  // 3. Try parsing as-is first
  try {
    return JSON.parse(clean)
  } catch {}

  // 4. Attempt repair for truncated JSON
  // Remove trailing incomplete key/value or comma
  clean = clean
    .replace(/,\s*$/, "")           // trailing comma
    .replace(/,\s*[}\]]/g, (m) => m.replace(",", "")) // comma before closing bracket

  // Count unclosed brackets and close them
  const stack: string[] = []
  let inString = false
  let escape = false

  for (const ch of clean) {
    if (escape) { escape = false; continue }
    if (ch === "\\") { escape = true; continue }
    if (ch === '"') { inString = !inString; continue }
    if (inString) continue
    if (ch === "{") stack.push("}")
    else if (ch === "[") stack.push("]")
    else if (ch === "}" || ch === "]") stack.pop()
  }

  // Close any unclosed string
  if (inString) clean += '"'

  // Close remaining open brackets in reverse
  clean += stack.reverse().join("")

  try {
    return JSON.parse(clean)
  } catch (e: any) {
    throw new Error(`Could not parse AI response: ${e.message}`)
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AIResumeBuilder() {
  const toolContent = getToolContent("ai-resume-builder")
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [links, setLinks] = useState("")
  const [experience, setExperience] = useState("")
  const [skills, setSkills] = useState("")
  const [education, setEducation] = useState("")
  const [certs, setCerts] = useState("")
  const [generatedResume, setGeneratedResume] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const resumeRef = useRef<HTMLDivElement>(null)
  const used = tokenManager.getRequestsUsed()
  const limit = tokenManager.getDailyLimit()
  const remaining = tokenManager.getRemainingRequests()

  const generateResume = async () => {
    if (!name || !email) return

    if (!tokenManager.canUseRequest()) {
      alert(`Daily request limit reached. You have ${tokenManager.getRemainingRequests()} requests remaining. Requests reset daily at midnight.`)
      return
    }

    setIsGenerating(true)

    const userDetails = `
Name: ${name || "Not provided"}
Target Role: ${role || "Not provided"}
Email: ${email || "Not provided"}
Phone: ${phone || "Not provided"}
Location: ${location || "Not provided"}
LinkedIn/GitHub: ${links || "Not provided"}
Skills: ${skills || "Not provided"}
Experience: ${experience || "Not provided"}
Education: ${education || "Not provided"}
Certifications: ${certs || "None"}
    `.trim()

    // Compact prompt to save tokens for the response
    const prompt = `You are an ATS resume expert. Return ONLY valid JSON, no markdown, no code fences, no explanation.

Generate a complete professional resume for the user below. Fill every field with realistic role-appropriate content. Quantify achievements. Use action verbs.

USER:
${userDetails}

Return this exact JSON structure:
{"personalInfo":{"fullName":"","email":"","phone":"","location":"","linkedin":"","github":""},"summary":"2-3 sentence ATS-optimized summary","skills":{"programmingLanguages":[],"webDevelopment":[],"databases":[],"tools":[],"softSkills":[]},"experience":[{"jobTitle":"","company":"","startDate":"","endDate":"","responsibilities":["action verb + achievement"]}],"education":[{"degree":"","institution":"","year":"","score":""}],"projects":[{"title":"","description":"","technologies":[]}],"certifications":[],"languages":[]}`

    try {
      const reply = await callAI(prompt, "You are an expert ATS resume builder. Always return valid JSON format without markdown or code blocks.")

      if (!reply) throw new Error("No response from AI")

      const resume = repairAndParseJSON(reply)
      setGeneratedResume(resume)
      tokenManager.useRequest()
    } catch (error: any) {
      console.error("Error generating resume:", error)
      alert(error.message || "Error generating resume. Please try again.")
    }

    setIsGenerating(false)
  }

  const downloadPDF = async () => {
    const element = resumeRef.current
    if (!element) return

    const html2pdf = (await import("html2pdf.js")).default
    html2pdf()
      .set({
        margin: 0,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save()
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">AI Resume Builder</h1>
        <p className="text-gray-400 text-base text-center mb-8">Build professional resumes with AI</p>
        <DailyUsageBar used={used} limit={limit} remaining={remaining} loaded={true} />

        {/* Ad below tool title */}
        <div
          className="ad-slot mb-8"
          style={{
            width: "100%",
            minHeight: "90px",
            background: "#f5f5f5",
            border: "1px dashed #ccc",
            textAlign: "center",
            padding: "10px",
            margin: "16px 0",
            fontSize: "12px",
            color: "#999",
          }}
        >
          Advertisement
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
              <h2 className="text-lg font-bold mb-4 text-white">Your Details</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-400 uppercase">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all text-sm"
                    placeholder="e.g. Priya Sharma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-400 uppercase">Target Role</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all text-sm"
                    placeholder="e.g. Full Stack Developer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-400 uppercase">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all text-sm"
                    placeholder="priya@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-400 uppercase">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-400 uppercase">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all text-sm"
                    placeholder="Hyderabad, India"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-400 uppercase">LinkedIn / GitHub</label>
                  <input
                    type="text"
                    value={links}
                    onChange={(e) => setLinks(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all text-sm"
                    placeholder="linkedin.com/in/priya"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-400 uppercase">Skills</label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all text-sm"
                    placeholder="React, Node.js, Python, SQL..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-400 uppercase">Experience</label>
                  <textarea
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-20 resize-none text-sm"
                    placeholder="e.g. 3 years at TCS as backend developer, built payment APIs."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-400 uppercase">Education</label>
                  <input
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all text-sm"
                    placeholder="B.Tech CSE, JNTU Hyderabad, 2021, 8.2 CGPA"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-400 uppercase">Certifications</label>
                  <input
                    type="text"
                    value={certs}
                    onChange={(e) => setCerts(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all text-sm"
                    placeholder="AWS Solutions Architect 2023"
                  />
                </div>

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

                {isGenerating && (
                  <div className="mt-6">
                    <GeneratingAnimation type="resume" accentColor="#00E5FF" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1">
            <div className="bg-[#e8edf2] rounded-2xl p-6 min-h-[800px]">
              {!generatedResume ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center gap-3">
                  <div className="text-6xl">📄</div>
                  <p className="text-base">
                    Fill in your details and click
                    <br />
                    <strong>Generate Resume</strong>
                  </p>
                </div>
              ) : (
                <div>
                  <div
                    ref={resumeRef}
                    className="bg-white max-w-[780px] mx-auto shadow-lg rounded-lg overflow-hidden"
                    style={{ fontFamily: "Georgia, serif", color: "#1a1a1a" }}
                  >
                    {/* Resume Header */}
                    <div
                      className="p-8 pb-7"
                      style={{ background: "linear-gradient(135deg, #0f3460, #16213e)", color: "#fff" }}
                    >
                      <h1 className="text-3xl font-bold mb-1" style={{ letterSpacing: "0.5px" }}>
                        {generatedResume.personalInfo?.fullName || "Your Name"}
                      </h1>
                      <div
                        className="text-xs opacity-65 tracking-widest uppercase mb-3"
                        style={{ fontFamily: "Segoe UI, sans-serif" }}
                      >
                        {role || ""}
                      </div>
                      <div
                        className="flex flex-wrap gap-2 text-sm"
                        style={{ fontFamily: "Segoe UI, sans-serif", opacity: 0.85 }}
                      >
                        {generatedResume.personalInfo?.email && (
                          <span>✉ {generatedResume.personalInfo.email}</span>
                        )}
                        {generatedResume.personalInfo?.phone && (
                          <span>📞 {generatedResume.personalInfo.phone}</span>
                        )}
                        {generatedResume.personalInfo?.location && (
                          <span>📍 {generatedResume.personalInfo.location}</span>
                        )}
                        {generatedResume.personalInfo?.linkedin && (
                          <span>🔗 {generatedResume.personalInfo.linkedin}</span>
                        )}
                        {generatedResume.personalInfo?.github && (
                          <span>💻 {generatedResume.personalInfo.github}</span>
                        )}
                      </div>
                    </div>

                    {/* Resume Body */}
                    <div className="grid" style={{ gridTemplateColumns: "220px 1fr" }}>
                      {/* Left Column */}
                      <div
                        className="p-6 pr-4"
                        style={{ background: "#f4f7fc", borderRight: "1px solid #e2e8f0" }}
                      >
                        {/* Skills */}
                        <div className="mb-6">
                          <div
                            className="text-xs font-bold tracking-wider uppercase mb-2 pb-1 border-b-2"
                            style={{ color: "#185FA5", fontFamily: "Segoe UI, sans-serif" }}
                          >
                            Skills
                          </div>

                          {generatedResume.skills?.programmingLanguages?.length > 0 && (
                            <div className="mb-2">
                              <div
                                className="text-xs font-bold mb-1"
                                style={{ color: "#334155", fontFamily: "Segoe UI, sans-serif" }}
                              >
                                Languages
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {generatedResume.skills.programmingLanguages.map((skill: string, i: number) => (
                                  <span
                                    key={i}
                                    className="text-xs px-2 py-1 rounded-full"
                                    style={{ background: "#dbeafe", color: "#1e4d8c", fontFamily: "Segoe UI, sans-serif" }}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {generatedResume.skills?.webDevelopment?.length > 0 && (
                            <div className="mb-2">
                              <div
                                className="text-xs font-bold mb-1"
                                style={{ color: "#334155", fontFamily: "Segoe UI, sans-serif" }}
                              >
                                Web / Frontend
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {generatedResume.skills.webDevelopment.map((skill: string, i: number) => (
                                  <span
                                    key={i}
                                    className="text-xs px-2 py-1 rounded-full"
                                    style={{ background: "#dbeafe", color: "#1e4d8c", fontFamily: "Segoe UI, sans-serif" }}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {generatedResume.skills?.databases?.length > 0 && (
                            <div className="mb-2">
                              <div
                                className="text-xs font-bold mb-1"
                                style={{ color: "#334155", fontFamily: "Segoe UI, sans-serif" }}
                              >
                                Databases
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {generatedResume.skills.databases.map((skill: string, i: number) => (
                                  <span
                                    key={i}
                                    className="text-xs px-2 py-1 rounded-full"
                                    style={{ background: "#dbeafe", color: "#1e4d8c", fontFamily: "Segoe UI, sans-serif" }}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {generatedResume.skills?.tools?.length > 0 && (
                            <div className="mb-2">
                              <div
                                className="text-xs font-bold mb-1"
                                style={{ color: "#334155", fontFamily: "Segoe UI, sans-serif" }}
                              >
                                Tools
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {generatedResume.skills.tools.map((skill: string, i: number) => (
                                  <span
                                    key={i}
                                    className="text-xs px-2 py-1 rounded-full"
                                    style={{ background: "#dbeafe", color: "#1e4d8c", fontFamily: "Segoe UI, sans-serif" }}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {generatedResume.skills?.softSkills?.length > 0 && (
                            <div className="mb-2">
                              <div
                                className="text-xs font-bold mb-1"
                                style={{ color: "#334155", fontFamily: "Segoe UI, sans-serif" }}
                              >
                                Soft Skills
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {generatedResume.skills.softSkills.map((skill: string, i: number) => (
                                  <span
                                    key={i}
                                    className="text-xs px-2 py-1 rounded-full"
                                    style={{ background: "#dbeafe", color: "#1e4d8c", fontFamily: "Segoe UI, sans-serif" }}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Education */}
                        {generatedResume.education?.length > 0 && (
                          <div className="mb-6">
                            <div
                              className="text-xs font-bold tracking-wider uppercase mb-2 pb-1 border-b-2"
                              style={{ color: "#185FA5", fontFamily: "Segoe UI, sans-serif" }}
                            >
                              Education
                            </div>
                            {generatedResume.education.map((edu: any, i: number) => (
                              <div key={i} className="mb-3">
                                <div
                                  className="text-sm font-bold"
                                  style={{ color: "#0f3460", fontFamily: "Segoe UI, sans-serif" }}
                                >
                                  {edu.degree}
                                </div>
                                <div
                                  className="text-xs"
                                  style={{ color: "#185FA5", fontFamily: "Segoe UI, sans-serif" }}
                                >
                                  {edu.institution}
                                </div>
                                <div
                                  className="text-xs mb-1"
                                  style={{ color: "#64748b", fontFamily: "Segoe UI, sans-serif" }}
                                >
                                  {edu.year}
                                  {edu.score ? ` · ${edu.score}` : ""}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Certifications */}
                        {generatedResume.certifications?.length > 0 && (
                          <div className="mb-6">
                            <div
                              className="text-xs font-bold tracking-wider uppercase mb-2 pb-1 border-b-2"
                              style={{ color: "#185FA5", fontFamily: "Segoe UI, sans-serif" }}
                            >
                              Certifications
                            </div>
                            {generatedResume.certifications.map((cert: string, i: number) => (
                              <div
                                key={i}
                                className="text-xs mb-1"
                                style={{ color: "#334155", fontFamily: "Segoe UI, sans-serif" }}
                              >
                                🏅 {cert}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Languages */}
                        {generatedResume.languages?.length > 0 && (
                          <div className="mb-6">
                            <div
                              className="text-xs font-bold tracking-wider uppercase mb-2 pb-1 border-b-2"
                              style={{ color: "#185FA5", fontFamily: "Segoe UI, sans-serif" }}
                            >
                              Languages
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {generatedResume.languages.map((lang: string, i: number) => (
                                <span
                                  key={i}
                                  className="text-xs px-2 py-1 rounded-full"
                                  style={{ background: "#0f3460", color: "#fff", fontFamily: "Segoe UI, sans-serif" }}
                                >
                                  {lang}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Column */}
                      <div className="p-6 pl-7">
                        {/* Summary */}
                        {generatedResume.summary && (
                          <div className="mb-6">
                            <div
                              className="text-xs font-bold tracking-wider uppercase mb-2 pb-1 border-b-2"
                              style={{ color: "#185FA5", fontFamily: "Segoe UI, sans-serif" }}
                            >
                              Professional Summary
                            </div>
                            <div
                              className="text-sm leading-relaxed"
                              style={{ color: "#334155", fontFamily: "Segoe UI, sans-serif" }}
                            >
                              {generatedResume.summary}
                            </div>
                          </div>
                        )}

                        {/* Experience */}
                        {generatedResume.experience?.length > 0 && (
                          <div className="mb-6">
                            <div
                              className="text-xs font-bold tracking-wider uppercase mb-2 pb-1 border-b-2"
                              style={{ color: "#185FA5", fontFamily: "Segoe UI, sans-serif" }}
                            >
                              Experience
                            </div>
                            {generatedResume.experience.map((exp: any, i: number) => (
                              <div key={i} className="mb-5">
                                <div
                                  className="text-sm font-bold"
                                  style={{ color: "#0f3460", fontFamily: "Segoe UI, sans-serif" }}
                                >
                                  {exp.jobTitle}
                                </div>
                                <div
                                  className="text-xs font-semibold"
                                  style={{ color: "#185FA5", fontFamily: "Segoe UI, sans-serif" }}
                                >
                                  {exp.company}
                                </div>
                                <div
                                  className="text-xs mb-1"
                                  style={{ color: "#64748b", fontFamily: "Segoe UI, sans-serif" }}
                                >
                                  {exp.startDate} — {exp.endDate || "Present"}
                                </div>
                                <ul
                                  className="list-disc pl-4 text-xs"
                                  style={{ color: "#334155", fontFamily: "Segoe UI, sans-serif", lineHeight: "1.55" }}
                                >
                                  {exp.responsibilities?.map((resp: string, j: number) => (
                                    <li key={j} className="mb-1">
                                      {resp}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Projects */}
                        {generatedResume.projects?.length > 0 && (
                          <div className="mb-6">
                            <div
                              className="text-xs font-bold tracking-wider uppercase mb-2 pb-1 border-b-2"
                              style={{ color: "#185FA5", fontFamily: "Segoe UI, sans-serif" }}
                            >
                              Projects
                            </div>
                            {generatedResume.projects.map((proj: any, i: number) => (
                              <div key={i} className="mb-4">
                                <div
                                  className="text-sm font-bold"
                                  style={{ color: "#0f3460", fontFamily: "Segoe UI, sans-serif" }}
                                >
                                  {proj.title}
                                </div>
                                <div
                                  className="text-xs leading-relaxed mb-1"
                                  style={{ color: "#334155", fontFamily: "Segoe UI, sans-serif" }}
                                >
                                  {proj.description}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {proj.technologies?.map((tech: string, j: number) => (
                                    <span
                                      key={j}
                                      className="text-xs px-2 py-1 rounded-full"
                                      style={{ background: "#e0f2fe", color: "#0369a1", fontFamily: "Segoe UI, sans-serif" }}
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={downloadPDF}
                    className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Download className="h-5 w-5" />
                      Download PDF
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom ad */}
        <div className="flex justify-center mt-8">
          <div
            className="ad-slot mt-8"
            style={{
              width: "100%",
              minHeight: "90px",
              background: "#f5f5f5",
              border: "1px dashed #ccc",
              textAlign: "center",
              padding: "10px",
              margin: "16px 0",
              fontSize: "12px",
              color: "#999",
            }}
          >
            Advertisement
          </div>
        </div>

        <ToolContent content={toolContent} toolName="AI Resume Builder" toolPath="/tools/ai-resume-builder" />
        <RelatedTools currentToolPath="/tools/ai-resume-builder" currentCategory={toolContent.category} />

        <Link href="/" className="mt-6 text-[#00E5FF] hover:underline inline-block">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}