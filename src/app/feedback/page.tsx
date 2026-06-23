"use client"

import { useState } from "react"
import { Send, MessageSquare, Lightbulb, Megaphone, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import Script from "next/script"
import { BASE_URL } from "@/lib/config"

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "problem" as "problem" | "suggestion" | "promotion",
    subject: "",
    message: "",
    toolName: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to submit feedback")
      }

      setSubmitted(true)
      setFormData({
        name: "",
        email: "",
        type: "problem",
        subject: "",
        message: "",
        toolName: ""
      })
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Feedback & Suggestions - GetTool AI",
    "description": "Report problems, suggest new tools, or request promotions. We value your feedback.",
    "url": `${BASE_URL}/feedback`
  }

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-[#00E5FF] hover:underline inline-block mb-6">
            ← Back to Home
          </Link>

          <h1 className="text-3xl font-bold mb-3 text-white">Feedback & Suggestions</h1>
          <p className="text-gray-400 mb-8">We'd love to hear from you. Report problems, suggest new tools, or request promotions.</p>

          {submitted ? (
            <div className="bg-[#111827] rounded-2xl p-8 border border-green-500/30 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">Thank You!</h2>
              <p className="text-gray-400 mb-6">Your feedback has been submitted successfully. We'll review it and get back to you if needed.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#111827] rounded-2xl p-6 border border-white/8">
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-white">Feedback Type *</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "problem" })}
                    className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                      formData.type === "problem"
                        ? "bg-red-500/20 border-red-500/50 text-red-400"
                        : "bg-white/5 border-white/8 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-sm">Problem</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "suggestion" })}
                    className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                      formData.type === "suggestion"
                        ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-400"
                        : "bg-white/5 border-white/8 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    <Lightbulb className="h-5 w-5" />
                    <span className="text-sm">Suggestion</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "promotion" })}
                    className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                      formData.type === "promotion"
                        ? "bg-[#00E5FF]/20 border-[#00E5FF]/50 text-[#00E5FF]"
                        : "bg-white/5 border-white/8 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    <Megaphone className="h-5 w-5" />
                    <span className="text-sm">Promotion</span>
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F1A] border border-white/8 text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F1A] border border-white/8 text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
                    placeholder="Optional"
                  />
                </div>
              </div>

              {formData.type === "problem" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-white">Tool Name</label>
                  <input
                    type="text"
                    value={formData.toolName}
                    onChange={(e) => setFormData({ ...formData, toolName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F1A] border border-white/8 text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
                    placeholder="Which tool has the problem?"
                  />
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-white">Subject *</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#0B0F1A] border border-white/8 text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
                  placeholder="Brief description"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-white">Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-[#0B0F1A] border border-white/8 text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors resize-none"
                  placeholder={
                    formData.type === "problem"
                      ? "Describe the problem you encountered..."
                      : formData.type === "suggestion"
                      ? "Tell us about your tool idea or suggestion..."
                      : "Describe your promotion request..."
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Submit Feedback
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By submitting, you agree to our privacy policy. We'll only use your information to respond to your feedback.
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
