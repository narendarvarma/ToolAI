"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Menu, X, Moon, Sun } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("darkMode")
    if (stored !== null) {
      setIsDarkMode(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode))
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-white font-semibold text-xl">ToolHub AI</span>
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
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-400" />}
              </button>
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
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors py-2"
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-400" />}
              <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
