"use client"

import { useState } from "react"
import { Mail, Send, MapPin, Phone } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Placeholder for form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white">Contact Us</h1>
        <p className="text-gray-400 mb-8">Have questions or feedback? We'd love to hear from you.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-white/8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00E5FF]/20 to-[#7C4DFF]/20 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-[#00E5FF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <p className="text-gray-400 text-sm">support@toolhub.ai</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-white/8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00E5FF]/20 to-[#7C4DFF]/20 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-[#00E5FF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Location</h3>
                  <p className="text-gray-400 text-sm">San Francisco, CA</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-white/8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00E5FF]/20 to-[#7C4DFF]/20 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-[#00E5FF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Response Time</h3>
                  <p className="text-gray-400 text-sm">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-32 resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Send className="h-5 w-5" />
                    Send Message
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
