"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    "PDF Tools",
    "Image Tools",
    "AI Tools",
    "Student Tools",
    "Productivity Tools",
    "Utility Tools"
  ]

  return (
    <nav className="sticky top-0 z-50 bg-[#0B0F1A]/95 backdrop-blur-sm border-b border-white/8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="GetTool AI Logo" className="w-8 h-8" />
            <span className="text-white font-semibold text-xl">GetTool AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                className="pl-10 pr-4 py-2 rounded-xl bg-[#111827] border border-white/8 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all w-64"
              />
            </div>
            <div className="flex items-center gap-4">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/#${category.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {category}
                </Link>
              ))}
              <Link
                href="/about"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-white transition-colors text-sm relative group"
              >
                Contact
                <Link
                  href="/admin/feedback"
                  className="absolute -right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00E5FF] opacity-30 hover:opacity-100 transition-opacity cursor-pointer"
                  title="Admin"
                />
              </Link>
              <Link
                href="/faq"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                FAQ
              </Link>
              <Link
                href="/feedback"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold text-sm hover:scale-[1.02] transition-transform"
              >
                Feedback
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/8">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#111827] border border-white/8 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              />
            </div>
            <div className="space-y-3 mb-4">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/#${category.toLowerCase().replace(' ', '-')}`}
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                >
                  {category}
                </Link>
              ))}
              <Link
                href="/about"
                className="block text-gray-300 hover:text-white transition-colors py-2"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block text-gray-300 hover:text-white transition-colors py-2 relative group"
              >
                Contact
                <Link
                  href="/admin/feedback"
                  className="absolute -right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00E5FF] opacity-30 hover:opacity-100 transition-opacity cursor-pointer"
                  title="Admin"
                />
              </Link>
              <Link
                href="/faq"
                className="block text-gray-300 hover:text-white transition-colors py-2"
              >
                FAQ
              </Link>
              <Link
                href="/feedback"
                className="block px-4 py-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold text-sm text-center hover:scale-[1.02] transition-transform"
              >
                Feedback
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
