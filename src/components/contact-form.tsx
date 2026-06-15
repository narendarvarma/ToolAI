"use client"

import { useState } from "react"
import { Mail, Send, MapPin, Phone, CheckCircle, Twitter, Linkedin, Github, Facebook } from "lucide-react"

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

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
                  <p className="text-gray-400 text-sm">servicestoolai@gmail.com</p>
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
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-16 w-16 text-green-400 mb-4" />
                <h2 className="text-2xl font-semibold text-white mb-2">✅ Message sent!</h2>
                <p className="text-gray-400 text-center">We'll reply within 24 hours.</p>
              </div>
            ) : (
              <form 
                action="https://formspree.io/f/maqkkyvy" 
                method="POST"
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Message</label>
                  <textarea
                    name="message"
                    className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-32 resize-none"
                    placeholder="Your message..."
                    required
                  />
                </div>

                {/* Honeypot field to prevent spam */}
                <input
                  type="text"
                  name="_gotcha"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Send className="h-5 w-5" />
                    Send Message
                  </div>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-[#111827] rounded-2xl p-6 border border-white/8">
              <h3 className="font-semibold text-white mb-2">How quickly will you respond to my message?</h3>
              <p className="text-gray-400 text-sm">We typically respond within 24 hours on business days.</p>
            </div>
            <div className="bg-[#111827] rounded-2xl p-6 border border-white/8">
              <h3 className="font-semibold text-white mb-2">Can I request a new tool?</h3>
              <p className="text-gray-400 text-sm">Yes! We love hearing from users. Send us your tool suggestions and we'll consider adding them.</p>
            </div>
            <div className="bg-[#111827] rounded-2xl p-6 border border-white/8">
              <h3 className="font-semibold text-white mb-2">Are all tools really free?</h3>
              <p className="text-gray-400 text-sm">Yes, every tool on ToolHub AI is 100% free with no hidden charges.</p>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-white">Follow Us</h2>
          <div className="flex gap-4">
            <a href="#" aria-label="Follow ToolHub AI on Twitter" className="w-12 h-12 rounded-xl bg-[#111827] border border-white/8 flex items-center justify-center text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF]/50 transition-all">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Follow ToolHub AI on LinkedIn" className="w-12 h-12 rounded-xl bg-[#111827] border border-white/8 flex items-center justify-center text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF]/50 transition-all">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" aria-label="View ToolHub AI on GitHub" className="w-12 h-12 rounded-xl bg-[#111827] border border-white/8 flex items-center justify-center text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF]/50 transition-all">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Follow ToolHub AI on Facebook" className="w-12 h-12 rounded-xl bg-[#111827] border border-white/8 flex items-center justify-center text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF]/50 transition-all">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
