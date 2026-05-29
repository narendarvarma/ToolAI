"use client"

import { useState } from "react"
import { FileText, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import RelatedTools from "@/components/tool-faq"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function ResumeScoreChecker() {
  useRecentTools("/tools/resume-score", "Resume Score Checker", "FileText")
  
  const [resumeText, setResumeText] = useState("")
  const [score, setScore] = useState<number | null>(null)
  const [analysis, setAnalysis] = useState<any>(null)

  const analyzeResume = () => {
    if (!resumeText.trim()) return

    const checks = {
      contactInfo: /email|phone|linkedin|@|\.com/i.test(resumeText),
      skills: /skills|technologies|programming|languages/i.test(resumeText),
      experience: /experience|work|job|employment|company/i.test(resumeText),
      education: /education|degree|university|college|school/i.test(resumeText),
      projects: /project|portfolio|built|developed|created/i.test(resumeText),
      achievements: /achievement|award|honor|recognition|certificate/i.test(resumeText)
    }

    const presentCount = Object.values(checks).filter(Boolean).length
    const totalChecks = Object.keys(checks).length
    const calculatedScore = Math.round((presentCount / totalChecks) * 100)

    setScore(calculatedScore)
    setAnalysis(checks)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Needs Improvement"
    return "Poor"
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Resume Score Checker</h1>
        <p className="text-gray-400 text-base text-center mb-8">Analyze your resume for key sections and get improvement tips</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8">
          <div id="ad-top"></div>
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8 mb-6">
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Paste Your Resume Text</label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-64 resize-none"
              placeholder="Paste your resume content here..."
            />
          </div>
          <button
            type="button"
            onClick={analyzeResume}
            disabled={!resumeText.trim()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100"
          >
            Analyze Resume
          </button>
        </div>

        {/* Score Result */}
        {score !== null && analysis && (
          <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8 mb-6">
            <div className="text-center mb-6">
              <FileText className="h-12 w-12 mx-auto mb-2 text-[#00E5FF]" />
              <p className="text-5xl font-bold text-white">{score}/100</p>
              <p className={`text-lg font-semibold mt-2 ${getScoreColor(score)}`}>
                {getScoreLabel(score)}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white mb-4">Section Analysis</h3>
              
              <div className={`flex items-center justify-between p-3 rounded-lg ${analysis.contactInfo ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                <span className="text-white">Contact Information</span>
                {analysis.contactInfo ? <CheckCircle className="h-5 w-5 text-green-400" /> : <XCircle className="h-5 w-5 text-red-400" />}
              </div>

              <div className={`flex items-center justify-between p-3 rounded-lg ${analysis.skills ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                <span className="text-white">Skills Section</span>
                {analysis.skills ? <CheckCircle className="h-5 w-5 text-green-400" /> : <XCircle className="h-5 w-5 text-red-400" />}
              </div>

              <div className={`flex items-center justify-between p-3 rounded-lg ${analysis.experience ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                <span className="text-white">Work Experience</span>
                {analysis.experience ? <CheckCircle className="h-5 w-5 text-green-400" /> : <XCircle className="h-5 w-5 text-red-400" />}
              </div>

              <div className={`flex items-center justify-between p-3 rounded-lg ${analysis.education ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                <span className="text-white">Education</span>
                {analysis.education ? <CheckCircle className="h-5 w-5 text-green-400" /> : <XCircle className="h-5 w-5 text-red-400" />}
              </div>

              <div className={`flex items-center justify-between p-3 rounded-lg ${analysis.projects ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                <span className="text-white">Projects</span>
                {analysis.projects ? <CheckCircle className="h-5 w-5 text-green-400" /> : <XCircle className="h-5 w-5 text-red-400" />}
              </div>

              <div className={`flex items-center justify-between p-3 rounded-lg ${analysis.achievements ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                <span className="text-white">Achievements/Certificates</span>
                {analysis.achievements ? <CheckCircle className="h-5 w-5 text-green-400" /> : <XCircle className="h-5 w-5 text-red-400" />}
              </div>
            </div>

            {/* Tips */}
            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-400 mb-2">Improvement Tips</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {!analysis.contactInfo && <li>• Add your email, phone number, and LinkedIn profile</li>}
                    {!analysis.skills && <li>• Include a dedicated skills section with technical and soft skills</li>}
                    {!analysis.experience && <li>• Add work experience with company names and roles</li>}
                    {!analysis.education && <li>• Include your education details with degree and institution</li>}
                    {!analysis.projects && <li>• Highlight your projects with descriptions and technologies used</li>}
                    {!analysis.achievements && <li>• Add achievements, awards, or certifications</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Single bottom ad */}
        <div className="ad-slot mt-8">
          <div id="ad-bottom"></div>
        </div>

        {/* How to Use Section */}
        <HowToUse steps={[
          "Copy your resume text from your document",
          "Paste it into the text area above",
          "Click Analyze Resume to get your score",
          "Review which sections are present or missing",
          "Follow the improvement tips to enhance your resume"
        ]} />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/resume-score" toolName="Resume Score Checker" />

        {/* FAQ Section */}
        <RelatedTools
          toolName="Resume Score Checker"
          faqs={[
            {
              question: "How does the resume score work?",
              answer: "The checker analyzes your resume for 6 key sections: Contact Info, Skills, Experience, Education, Projects, and Achievements. Each section adds points to your score out of 100."
            },
            {
              question: "What is a good resume score?",
              answer: "A score of 80+ is excellent and means your resume has all key sections. 60-79 is good but may need minor improvements. Below 60 means important sections are missing."
            },
            {
              question: "Is my resume data stored?",
              answer: "No, your resume text is analyzed locally in your browser and never stored or sent to any server. Your privacy is protected."
            },
            {
              question: "What sections are most important?",
              answer: "Contact Information is critical so recruiters can reach you. Skills and Experience are the most important for getting hired. Projects show practical knowledge."
            }
          ]}
        />

        {/* Social Share */}
        <SocialShare title="Resume Score Checker - Analyze your resume instantly" />

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
