"use client"
import GeneratingAnimation from "@/components/generating-animation"
import { useState, useRef } from "react"
import { FileText, Download, Wand2 } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"
import { tokenManager } from "@/lib/token-manager"
import { callAI } from "@/lib/ai"
import DailyUsageBar from "@/components/DailyUsageBar"

export default function AIResumeBuilder() {
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

    // Check request limit
    if (!tokenManager.canUseRequest()) {
      alert(`Daily request limit reached. You have ${tokenManager.getRemainingRequests()} requests remaining. Requests reset daily at midnight.`)
      return
    }

    setIsGenerating(true)

    const userDetails = `
Name: ${name || 'Not provided'}
Target Role: ${role || 'Not provided'}
Email: ${email || 'Not provided'}
Phone: ${phone || 'Not provided'}
Location: ${location || 'Not provided'}
LinkedIn/GitHub: ${links || 'Not provided'}
Skills: ${skills || 'Not provided'}
Experience: ${experience || 'Not provided'}
Education: ${education || 'Not provided'}
Certifications: ${certs || 'None'}
    `.trim()

    const prompt = `
You are an expert ATS Resume Builder with 10+ years of experience crafting
resumes that pass Applicant Tracking Systems and impress hiring managers.

TASK: Generate a complete, professional resume in structured JSON format.

STRICT RULES:
1. Return ONLY valid JSON. No markdown, no backticks, no explanation, no preamble.
2. Every field must have a value — never leave fields empty or null.
3. If information is missing, generate realistic, role-appropriate content.
4. Experience bullet points must start with strong action verbs (Engineered, Led, Built, Optimized, Delivered, Reduced, Increased, Designed, Automated, Architected).
5. Make achievements quantified where possible (e.g., "Reduced load time by 40%", "Led team of 5").
6. Summary must be 2-3 sentences, ATS-keyword-rich, tailored to the target role.
7. Generate at least 2 experience entries, 2 projects, and 4+ skills per category.
8. Certifications must be an array of plain strings.
9. Languages must be an array of plain strings (e.g., ["English", "Hindi", "Telugu"]).

OUTPUT this exact JSON structure and nothing else:
{
  "personalInfo": {
    "fullName": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": ""
  },
  "summary": "",
  "skills": {
    "programmingLanguages": [],
    "webDevelopment": [],
    "databases": [],
    "tools": [],
    "softSkills": []
  },
  "experience": [
    {
      "jobTitle": "",
      "company": "",
      "startDate": "",
      "endDate": "",
      "responsibilities": []
    }
  ],
  "education": [
    {
      "degree": "",
      "institution": "",
      "year": "",
      "score": ""
    }
  ],
  "projects": [
    {
      "title": "",
      "description": "",
      "technologies": []
    }
  ],
  "certifications": [],
  "languages": []
}

USER DETAILS:
${userDetails}
`

    try {
      const reply = await callAI(prompt, "")

      if (!reply) {
        throw new Error('No response from AI')
      }

      const clean = reply
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

    const start = clean.indexOf("{");
    const end = clean.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("No JSON found");
    }

    const jsonString = clean.substring(start, end + 1);

    console.log("AI Response:", jsonString);

    const resume = JSON.parse(jsonString);

    setGeneratedResume(resume);
    tokenManager.useRequest();
    } catch (error) {
      console.error('Error generating resume:', error)
      alert('Error generating resume. Please try again.')
    }

    setIsGenerating(false)
  }

  const downloadPDF = async () => {
    const element = resumeRef.current
    if (!element) return

    const html2pdf = (await import('html2pdf.js')).default
    html2pdf().set({
      margin: 0,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(element).save()
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">AI Resume Builder</h1>
        <p className="text-gray-400 text-base text-center mb-8">Build professional resumes with AI</p>
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
                    placeholder="e.g. 3 years at TCS as backend developer, built payment APIs. 1 year at startup doing React dashboards."
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
                      <GeneratingAnimation
                            type="resume"
                            accentColor="#00E5FF"
                          />
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
                  <p className="text-base">Fill in your details and click<br /><strong>Generate Resume</strong></p>
                </div>
              ) : (
                <div>
                  <div 
                    ref={resumeRef}
                    className="bg-white max-w-[780px] mx-auto shadow-lg rounded-lg overflow-hidden"
                    style={{ fontFamily: 'Georgia, serif', color: '#1a1a1a' }}
                  >
                    {/* Resume Header */}
                    <div className="p-8 pb-7" style={{ background: 'linear-gradient(135deg, #0f3460, #16213e)', color: '#fff' }}>
                      <h1 className="text-3xl font-bold mb-1" style={{ letterSpacing: '0.5px' }}>
                        {generatedResume.personalInfo?.fullName || 'Your Name'}
                      </h1>
                      <div className="text-xs opacity-65 tracking-widest uppercase mb-3" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
                        {role || ''}
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm" style={{ fontFamily: 'Segoe UI, sans-serif', opacity: 0.85 }}>
                        {generatedResume.personalInfo?.email && <span>✉ {generatedResume.personalInfo.email}</span>}
                        {generatedResume.personalInfo?.phone && <span>📞 {generatedResume.personalInfo.phone}</span>}
                        {generatedResume.personalInfo?.location && <span>📍 {generatedResume.personalInfo.location}</span>}
                        {generatedResume.personalInfo?.linkedin && <span>🔗 {generatedResume.personalInfo.linkedin}</span>}
                        {generatedResume.personalInfo?.github && <span>💻 {generatedResume.personalInfo.github}</span>}
                      </div>
                    </div>

                    {/* Resume Body */}
                    <div className="grid" style={{ gridTemplateColumns: '220px 1fr' }}>
                      {/* Left Column */}
                      <div className="p-6 pr-4" style={{ background: '#f4f7fc', borderRight: '1px solid #e2e8f0' }}>
                        {/* Skills */}
                        <div className="mb-6">
                          <div className="text-xs font-bold tracking-wider uppercase mb-2 pb-1 border-b-2" style={{ color: '#185FA5', fontFamily: 'Segoe UI, sans-serif' }}>
                            Skills
                          </div>
                          {generatedResume.skills?.programmingLanguages?.length && (
                            <div className="mb-2">
                              <div className="text-xs font-bold mb-1" style={{ color: '#334155', fontFamily: 'Segoe UI, sans-serif' }}>Languages</div>
                              <div className="flex flex-wrap gap-1">
                                {generatedResume.skills.programmingLanguages.map((skill: string, i: number) => (
                                  <span key={i} className="text-xs px-2 py-1 rounded-full" style={{ background: '#dbeafe', color: '#1e4d8c', fontFamily: 'Segoe UI, sans-serif' }}>
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {generatedResume.skills?.webDevelopment?.length && (
                            <div className="mb-2">
                              <div className="text-xs font-bold mb-1" style={{ color: '#334155', fontFamily: 'Segoe UI, sans-serif' }}>Web / Frontend</div>
                              <div className="flex flex-wrap gap-1">
                                {generatedResume.skills.webDevelopment.map((skill: string, i: number) => (
                                  <span key={i} className="text-xs px-2 py-1 rounded-full" style={{ background: '#dbeafe', color: '#1e4d8c', fontFamily: 'Segoe UI, sans-serif' }}>
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {generatedResume.skills?.databases?.length && (
                            <div className="mb-2">
                              <div className="text-xs font-bold mb-1" style={{ color: '#334155', fontFamily: 'Segoe UI, sans-serif' }}>Databases</div>
                              <div className="flex flex-wrap gap-1">
                                {generatedResume.skills.databases.map((skill: string, i: number) => (
                                  <span key={i} className="text-xs px-2 py-1 rounded-full" style={{ background: '#dbeafe', color: '#1e4d8c', fontFamily: 'Segoe UI, sans-serif' }}>
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {generatedResume.skills?.tools?.length && (
                            <div className="mb-2">
                              <div className="text-xs font-bold mb-1" style={{ color: '#334155', fontFamily: 'Segoe UI, sans-serif' }}>Tools</div>
                              <div className="flex flex-wrap gap-1">
                                {generatedResume.skills.tools.map((skill: string, i: number) => (
                                  <span key={i} className="text-xs px-2 py-1 rounded-full" style={{ background: '#dbeafe', color: '#1e4d8c', fontFamily: 'Segoe UI, sans-serif' }}>
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {generatedResume.skills?.softSkills?.length && (
                            <div className="mb-2">
                              <div className="text-xs font-bold mb-1" style={{ color: '#334155', fontFamily: 'Segoe UI, sans-serif' }}>Soft Skills</div>
                              <div className="flex flex-wrap gap-1">
                                {generatedResume.skills.softSkills.map((skill: string, i: number) => (
                                  <span key={i} className="text-xs px-2 py-1 rounded-full" style={{ background: '#dbeafe', color: '#1e4d8c', fontFamily: 'Segoe UI, sans-serif' }}>
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Education */}
                        {generatedResume.education?.length && (
                          <div className="mb-6">
                            <div className="text-xs font-bold tracking-wider uppercase mb-2 pb-1 border-b-2" style={{ color: '#185FA5', fontFamily: 'Segoe UI, sans-serif' }}>
                              Education
                            </div>
                            {generatedResume.education.map((edu: any, i: number) => (
                              <div key={i} className="mb-3">
                                <div className="text-sm font-bold" style={{ color: '#0f3460', fontFamily: 'Segoe UI, sans-serif' }}>{edu.degree}</div>
                                <div className="text-xs" style={{ color: '#185FA5', fontFamily: 'Segoe UI, sans-serif' }}>{edu.institution}</div>
                                <div className="text-xs mb-1" style={{ color: '#64748b', fontFamily: 'Segoe UI, sans-serif' }}>
                                  {edu.year}{edu.score ? ` · ${edu.score}` : ''}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Certifications */}
                        {generatedResume.certifications?.length && (
                          <div className="mb-6">
                            <div className="text-xs font-bold tracking-wider uppercase mb-2 pb-1 border-b-2" style={{ color: '#185FA5', fontFamily: 'Segoe UI, sans-serif' }}>
                              Certifications
                            </div>
                            {generatedResume.certifications.map((cert: string, i: number) => (
                              <div key={i} className="text-xs mb-1" style={{ color: '#334155', fontFamily: 'Segoe UI, sans-serif' }}>
                                🏅 {cert}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Languages */}
                        {generatedResume.languages?.length && (
                          <div className="mb-6">
                            <div className="text-xs font-bold tracking-wider uppercase mb-2 pb-1 border-b-2" style={{ color: '#185FA5', fontFamily: 'Segoe UI, sans-serif' }}>
                              Languages
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {generatedResume.languages.map((lang: string, i: number) => (
                                <span key={i} className="text-xs px-2 py-1 rounded-full" style={{ background: '#0f3460', color: '#fff', fontFamily: 'Segoe UI, sans-serif' }}>
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
                            <div className="text-xs font-bold tracking-wider uppercase mb-2 pb-1 border-b-2" style={{ color: '#185FA5', fontFamily: 'Segoe UI, sans-serif' }}>
                              Professional Summary
                            </div>
                            <div className="text-sm leading-relaxed" style={{ color: '#334155', fontFamily: 'Segoe UI, sans-serif' }}>
                              {generatedResume.summary}
                            </div>
                          </div>
                        )}

                        {/* Experience */}
                        {generatedResume.experience?.length && (
                          <div className="mb-6">
                            <div className="text-xs font-bold tracking-wider uppercase mb-2 pb-1 border-b-2" style={{ color: '#185FA5', fontFamily: 'Segoe UI, sans-serif' }}>
                              Experience
                            </div>
                            {generatedResume.experience.map((exp: any, i: number) => (
                              <div key={i} className="mb-5">
                                <div className="text-sm font-bold" style={{ color: '#0f3460', fontFamily: 'Segoe UI, sans-serif' }}>{exp.jobTitle}</div>
                                <div className="text-xs font-semibold" style={{ color: '#185FA5', fontFamily: 'Segoe UI, sans-serif' }}>{exp.company}</div>
                                <div className="text-xs mb-1" style={{ color: '#64748b', fontFamily: 'Segoe UI, sans-serif' }}>
                                  {exp.startDate} — {exp.endDate || 'Present'}
                                </div>
                                <ul className="list-disc pl-4 text-xs" style={{ color: '#334155', fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.55' }}>
                                  {exp.responsibilities?.map((resp: string, j: number) => (
                                    <li key={j} className="mb-1">{resp}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Projects */}
                        {generatedResume.projects?.length && (
                          <div className="mb-6">
                            <div className="text-xs font-bold tracking-wider uppercase mb-2 pb-1 border-b-2" style={{ color: '#185FA5', fontFamily: 'Segoe UI, sans-serif' }}>
                              Projects
                            </div>
                            {generatedResume.projects.map((proj: any, i: number) => (
                              <div key={i} className="mb-4">
                                <div className="text-sm font-bold" style={{ color: '#0f3460', fontFamily: 'Segoe UI, sans-serif' }}>{proj.title}</div>
                                <div className="text-xs leading-relaxed mb-1" style={{ color: '#334155', fontFamily: 'Segoe UI, sans-serif' }}>
                                  {proj.description}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {proj.technologies?.map((tech: string, j: number) => (
                                    <span key={j} className="text-xs px-2 py-1 rounded-full" style={{ background: '#e0f2fe', color: '#0369a1', fontFamily: 'Segoe UI, sans-serif' }}>
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




