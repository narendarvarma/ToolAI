"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ArrowRight, Sparkles, Clock, Heart, Star, MessageCircle } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import { motion } from "framer-motion"
import {
  Calculator, Calendar, FileText, Image as ImageIcon, Mic, Lock, Share2,
  Scissors, RotateCw, Eraser, Wand2, Code, Mail, Download, BookOpen,
  Users, Activity, Upload, FileImage, QrCode, Smile, Clock as ClockIcon, RefreshCw,
  Hash, Type, Palette, Key, DollarSign, Plus, Type as TypeIcon,
  Shield, Timer, FileSpreadsheet, Globe, Flame
} from "lucide-react"
import Script from "next/script"
import { BASE_URL } from "@/lib/config"
import { useFavouriteTools } from "@/hooks/use-favourite-tools"
import { useToolRatings } from "@/hooks/use-tool-ratings"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ToolHub AI",
  "url": BASE_URL,
  "description": "66+ free online tools for PDF editing, image processing, AI assistance, student tools, productivity, and utilities. Fast, secure, and no signup required.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${BASE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
}

const tools = [
  // PDF Tools
  { name: "Image to PDF", path: "/tools/image-to-pdf", icon: FileText, category: "PDF Tools", description: "Convert images to PDF documents", isNew: false },
  { name: "PDF to Image", path: "/tools/pdf-to-image", icon: ImageIcon, category: "PDF Tools", description: "Convert PDF pages to images", isNew: false },
  { name: "Merge PDF", path: "/tools/merge-pdf", icon: FileText, category: "PDF Tools", description: "Combine multiple PDFs into one", isNew: false },
  { name: "Split PDF", path: "/tools/split-pdf", icon: Scissors, category: "PDF Tools", description: "Split PDF into separate files", isNew: false },
  { name: "Compress PDF", path: "/tools/compress-pdf", icon: FileText, category: "PDF Tools", description: "Reduce PDF file size", isNew: false },
  { name: "Add Watermark", path: "/tools/add-watermark", icon: FileText, category: "PDF Tools", description: "Add watermark to PDF files", isNew: true },
  { name: "Remove Pages", path: "/tools/remove-pages", icon: FileText, category: "PDF Tools", description: "Remove specific pages from PDF", isNew: false },
  { name: "Rotate PDF", path: "/tools/rotate-pdf", icon: RotateCw, category: "PDF Tools", description: "Rotate PDF pages", isNew: false },
  
  // Image Tools
  { name: "Background Remover", path: "/tools/background-remover", icon: Eraser, category: "Image Tools", description: "Remove image backgrounds", isNew: false },
  { name: "Image Compressor", path: "/tools/image-compressor", icon: ImageIcon, category: "Image Tools", description: "Compress images efficiently", isNew: false },
  { name: "Resize Image", path: "/tools/resize-image", icon: ImageIcon, category: "Image Tools", description: "Resize images to custom dimensions", isNew: false },
  { name: "Convert Format", path: "/tools/convert-format", icon: FileImage, category: "Image Tools", description: "Convert image formats", isNew: false },
  { name: "AI Image Enhancer", path: "/tools/ai-image-enhancer", icon: Wand2, category: "Image Tools", description: "Enhance images with AI", isNew: true },
  { name: "QR Generator", path: "/tools/qr-generator", icon: QrCode, category: "Image Tools", description: "Generate QR codes", isNew: false },
  { name: "Meme Generator", path: "/tools/meme-generator", icon: Smile, category: "Image Tools", description: "Create memes instantly", isNew: true },
  
  // AI Tools
  { name: "AI Resume Builder", path: "/tools/ai-resume-builder", icon: FileText, category: "AI Tools", description: "Build professional resumes", isNew: false },
  { name: "AI Email Writer", path: "/tools/ai-email-writer", icon: Mail, category: "AI Tools", description: "Write emails with AI", isNew: false },
  { name: "AI Notes Summarizer", path: "/tools/ai-notes-summarizer", icon: FileText, category: "AI Tools", description: "Summarize your notes", isNew: false },
  { name: "AI Caption Generator", path: "/tools/ai-caption-generator", icon: Wand2, category: "AI Tools", description: "Generate social media captions", isNew: false },
  { name: "AI Study Assistant", path: "/tools/ai-study-assistant", icon: BookOpen, category: "AI Tools", description: "Get help with studies", isNew: true },
  { name: "AI Code Helper", path: "/tools/ai-code-helper", icon: Code, category: "AI Tools", description: "Generate code with AI", isNew: false },
  { name: "AI Blog Generator", path: "/tools/ai-blog-generator", icon: FileText, category: "AI Tools", description: "Generate blog posts", isNew: false },
  { name: "AI Text Rewriter", path: "/tools/ai-text-rewriter", icon: RefreshCw, category: "AI Tools", description: "Rewrite text with AI", isNew: false },
  
  // Student Tools
  { name: "CGPA Calculator", path: "/tools/cgpa-calculator", icon: Calculator, category: "Student Tools", description: "Calculate your CGPA", isNew: false },
  { name: "Attendance Calculator", path: "/tools/attendance-calculator", icon: Users, category: "Student Tools", description: "Track attendance percentage", isNew: false },
  { name: "Study Planner", path: "/tools/study-planner", icon: Calendar, category: "Student Tools", description: "Plan your study sessions", isNew: true },
  { name: "Pomodoro Timer", path: "/tools/pomodoro-timer", icon: Clock, category: "Student Tools", description: "Focus with Pomodoro technique", isNew: false },
  { name: "Unit Converter", path: "/tools/unit-converter", icon: Calculator, category: "Student Tools", description: "Convert units easily", isNew: false },
  { name: "Notes Organizer", path: "/tools/notes-organizer", icon: FileText, category: "Student Tools", description: "Organize your notes", isNew: false },
  { name: "Timetable Generator", path: "/tools/timetable-generator", icon: Calendar, category: "Student Tools", description: "Create weekly schedules", isNew: true },
  { name: "Flashcard Generator", path: "/tools/flashcard-generator", icon: BookOpen, category: "Student Tools", description: "Create and study flashcards", isNew: false },
  { name: "Digital Notes", path: "/tools/digital-notes", icon: FileText, category: "Student Tools", description: "Take digital notes", isNew: false },
  
  // Productivity Tools
  { name: "To-Do List", path: "/tools/todo-list", icon: FileText, category: "Productivity Tools", description: "Manage your tasks", isNew: false },
  { name: "Expense Tracker", path: "/tools/expense-tracker", icon: Calculator, category: "Productivity Tools", description: "Track your expenses", isNew: true },
  { name: "Password Generator", path: "/tools/password-generator", icon: Lock, category: "Productivity Tools", description: "Generate secure passwords", isNew: false },
  { name: "Calendar Planner", path: "/tools/calendar-planner", icon: Calendar, category: "Productivity Tools", description: "Plan your schedule", isNew: false },
  { name: "Habit Tracker", path: "/tools/habit-tracker", icon: Calendar, category: "Productivity Tools", description: "Track your habits", isNew: false },
  { name: "Daily Goals", path: "/tools/daily-goals", icon: Calendar, category: "Productivity Tools", description: "Set daily goals", isNew: false },
  
  // Utility Tools
  { name: "Text to Speech", path: "/tools/text-to-speech", icon: Mic, category: "Utility Tools", description: "Convert text to speech", isNew: false },
  { name: "Speech to Text", path: "/tools/speech-to-text", icon: Mic, category: "Utility Tools", description: "Convert speech to text", isNew: false },
  { name: "Currency Converter", path: "/tools/currency-converter", icon: Calculator, category: "Utility Tools", description: "Convert currencies", isNew: false },
  { name: "Age Calculator", path: "/tools/age-calculator", icon: Calculator, category: "Utility Tools", description: "Calculate your age", isNew: false },
  { name: "BMI Calculator", path: "/tools/bmi-calculator", icon: Calculator, category: "Utility Tools", description: "Calculate your BMI", isNew: false },
  { name: "Internet Speed Test", path: "/tools/internet-speed-test", icon: Activity, category: "Utility Tools", description: "Test internet speed", isNew: false },
  { name: "File Sharing", path: "/tools/file-sharing", icon: Share2, category: "Utility Tools", description: "Share files easily", isNew: false },
  { name: "Word Counter", path: "/tools/word-counter", icon: Hash, category: "Utility Tools", description: "Count words and characters", isNew: false },
  { name: "JSON Formatter", path: "/tools/json-formatter", icon: Code, category: "Utility Tools", description: "Format and validate JSON", isNew: false },
  { name: "Color Picker", path: "/tools/color-picker", icon: Palette, category: "Utility Tools", description: "Pick and convert colors", isNew: false },
  { name: "Case Converter", path: "/tools/case-converter", icon: Type, category: "Utility Tools", description: "Convert text cases", isNew: false },
  { name: "Lorem Ipsum Generator", path: "/tools/lorem-ipsum", icon: FileText, category: "Utility Tools", description: "Generate placeholder text", isNew: false },
  { name: "Base64 Encoder", path: "/tools/base64-encoder", icon: Code, category: "Utility Tools", description: "Encode and decode Base64", isNew: false },
  { name: "URL Encoder", path: "/tools/url-encoder", icon: Code, category: "Utility Tools", description: "Encode and decode URLs", isNew: false },
  { name: "Time Zone Converter", path: "/tools/timezone-converter", icon: Clock, category: "Utility Tools", description: "Convert time zones", isNew: false },
  { name: "Date Calculator", path: "/tools/date-calculator", icon: Calendar, category: "Utility Tools", description: "Calculate dates", isNew: false },
  { name: "Tip Calculator", path: "/tools/tip-calculator", icon: DollarSign, category: "Utility Tools", description: "Calculate tips and split bills", isNew: false },
  { name: "Regex Tester", path: "/tools/regex-tester", icon: Code, category: "Utility Tools", description: "Test regular expressions", isNew: false },
  { name: "UUID Generator", path: "/tools/uuid-generator", icon: Key, category: "Utility Tools", description: "Generate unique IDs", isNew: false },
  { name: "Unix Timestamp", path: "/tools/unix-timestamp", icon: Clock, category: "Utility Tools", description: "Convert Unix timestamps", isNew: false },
  { name: "HTML Entity Encoder", path: "/tools/html-entity-encoder", icon: Code, category: "Utility Tools", description: "Encode and decode HTML entities", isNew: false },
  { name: "Markdown to HTML", path: "/tools/markdown-to-html", icon: FileText, category: "Utility Tools", description: "Convert Markdown to HTML", isNew: false },
  { name: "JSON to CSV", path: "/tools/json-to-csv", icon: FileSpreadsheet, category: "Utility Tools", description: "Convert JSON to CSV", isNew: false },
  { name: "Password Strength", path: "/tools/password-strength", icon: Shield, category: "Utility Tools", description: "Check password strength", isNew: false },
  { name: "Countdown Timer", path: "/tools/countdown-timer", icon: Timer, category: "Utility Tools", description: "Set countdown timers", isNew: false },
  { name: "Stopwatch", path: "/tools/stopwatch", icon: Timer, category: "Utility Tools", description: "Track time precisely", isNew: false },
  { name: "World Clock", path: "/tools/world-clock", icon: Globe, category: "Utility Tools", description: "Track time across cities", isNew: false },
  { name: "Calorie Calculator", path: "/tools/calorie-calculator", icon: Flame, category: "Utility Tools", description: "Calculate daily calorie needs", isNew: false },
]

const categories = [
  { name: "PDF Tools", description: "Manage and manipulate PDF files", color: "from-[#00E5FF] to-[#7C4DFF]" },
  { name: "Image Tools", description: "Edit and convert images", color: "from-[#7C4DFF] to-[#FF4DB6]" },
  { name: "AI Tools", description: "AI-powered productivity tools", color: "from-[#FF4DB6] to-[#00E5FF]" },
  { name: "Student Tools", description: "Tools for students and education", color: "from-[#00E5FF] to-[#7C4DFF]" },
  { name: "Productivity Tools", description: "Boost your productivity", color: "from-[#7C4DFF] to-[#FF4DB6]" },
  { name: "Utility Tools", description: "Everyday utility tools", color: "from-[#FF4DB6] to-[#00E5FF]" },
]

const popularTools = [
  { name: "Password Generator", path: "/tools/password-generator", icon: Lock, description: "Generate secure passwords", badge: "⭐ Popular" },
  { name: "Word Counter", path: "/tools/word-counter", icon: Hash, description: "Count words and characters", badge: "🔥 Trending" },
  { name: "QR Generator", path: "/tools/qr-generator", icon: QrCode, description: "Generate QR codes", badge: "✨ New" },
  { name: "PDF to Image", path: "/tools/pdf-to-image", icon: ImageIcon, description: "Convert PDF to images", badge: "⭐ Popular" },
  { name: "AI Blog Generator", path: "/tools/ai-blog-generator", icon: FileText, description: "Generate blog posts with AI", badge: "🔥 Trending" },
  { name: "CGPA Calculator", path: "/tools/cgpa-calculator", icon: Calculator, description: "Calculate your CGPA", badge: "⭐ Popular" },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [recentTools, setRecentTools] = useState<{name: string, url: string, icon: string}[]>([])
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const { favourites, toggleFavourite, isFavourite } = useFavouriteTools()
  const { getAverageRating, isClient } = useToolRatings("")
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  // Tool of the Day - based on date
  const today = new Date()
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
  const toolOfTheDay = tools[dayOfYear % tools.length]

  useEffect(() => {
    const stored = localStorage.getItem("toolhub_recent")
    if (stored) {
      const recentData = JSON.parse(stored)
      setRecentTools(recentData)
    }
  }, [])

  const clearHistory = () => {
    localStorage.removeItem("toolhub_recent")
    setRecentTools([])
  }

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '/' && searchInputRef.current) {
        e.preventDefault()
        searchInputRef.current.focus()
      }
      if (e.key === 'Escape') {
        setSearchQuery("")
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const handleFavouriteClick = (e: React.MouseEvent, toolPath: string) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavourite(toolPath)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const highlightText = (text: string, query: string) => {
    if (!query) return text
    const regex = new RegExp(`(${query})`, 'gi')
    return text.replace(regex, '<mark class="bg-[#00E5FF]/30 text-white px-1 rounded">$1</mark>')
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-14 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00E5FF]/20 to-[#7C4DFF]/20 border border-white/8 mb-6"
          >
            <Sparkles className="h-4 w-4 text-[#00E5FF]" />
            <span className="text-sm text-gray-300">{tools.length}+ Free Tools Available</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-4 text-white"
          >
            All Daily Tools in One
            <span className="bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] bg-clip-text text-transparent">
              {" "}Smart Platform
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Professional online tools for PDF, images, AI, students, productivity, and utilities. Clean, fast, and free.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search 66+ tools... try 'PDF', 'CGPA', 'password'"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#111827] border border-white/8 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              />
            </div>
            {searchQuery && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-gray-400"
              >
                {filteredTools.length > 0 
                  ? `Showing ${filteredTools.length} tools for '${searchQuery}'`
                  : `No tools found. Try 'calculator'`
                }
              </motion.div>
            )}
          </motion.div>

          {/* Category Chips */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`#${category.name.toLowerCase().replace(' ', '-')}`}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/8 text-white hover:bg-white/10 hover:border-[#00E5FF]/50 transition-all text-sm"
              >
                {category.name}
              </Link>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Banner Ad below navbar */}
      <div className="flex justify-center px-4">
        <div className="ad-slot w-full max-w-7xl" style={{minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
      </div>

      {/* Tool of the Day */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="py-14 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#00E5FF]/20 to-[#7C4DFF]/20 rounded-2xl p-6 border border-[#00E5FF]/30">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-[#00E5FF]" />
              <span className="text-lg font-semibold text-white">🌟 Tool of the Day</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#00E5FF]/30 to-[#7C4DFF]/30 flex items-center justify-center">
                {toolOfTheDay && <toolOfTheDay.icon className="h-8 w-8 text-[#00E5FF]" />}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-1">{toolOfTheDay?.name}</h3>
                <p className="text-gray-400">{toolOfTheDay?.description}</p>
              </div>
              <Link
                href={toolOfTheDay?.path || "/"}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
              >
                Try Now
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Total Tools Count Stats Bar */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="py-8 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const count = tools.filter(tool => tool.category === category.name).length
              return (
                <Link
                  key={category.name}
                  href={`#${category.name.toLowerCase().replace(' ', '-')}`}
                  className="p-4 rounded-xl bg-[#111827] border border-white/8 hover:border-[#00E5FF]/50 transition-all text-center group"
                >
                  <div className="text-2xl font-bold text-[#00E5FF] group-hover:scale-110 transition-transform">{count}</div>
                  <div className="text-sm text-gray-400 mt-1">{category.name}</div>
                </Link>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Recently Used Tools Section */}
      {recentTools.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="py-14 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-semibold mb-2 text-white">🕐 Recently Used</h2>
                <p className="text-gray-400">Quick access to your last used tools</p>
              </div>
              <button
                onClick={clearHistory}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Clear History
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentTools.slice(0, 3).map((tool, index) => {
                const toolData = tools.find(t => t.path === tool.url)
                const Icon = toolData?.icon || FileText
                return (
                  <motion.div
                    key={tool.url}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + (index * 0.05) }}
                  >
                    <Link
                      href={tool.url}
                      className="group bg-gradient-to-br from-[#111827] to-[#1a1f2e] rounded-2xl p-6 border border-white/8 hover:border-[#00E5FF]/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00E5FF]/10 transition-all duration-300 block relative"
                    >
                      <button
                        onClick={(e) => handleFavouriteClick(e, tool.url)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
                      >
                        <Heart className={`h-5 w-5 ${isFavourite(tool.url) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                      </button>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00E5FF]/20 to-[#7C4DFF]/20 flex items-center justify-center mb-4 group-hover:from-[#00E5FF]/30 group-hover:to-[#7C4DFF]/30 transition-all">
                        <Icon className="h-6 w-6 text-[#00E5FF]" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">{tool.name}</h3>
                      <p className="text-sm text-gray-400">{toolData?.description || ""}</p>
                      <div className="mt-4 flex items-center text-[#00E5FF] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Open Tool</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>
      )}

      {/* My Favourites Section */}
      {favourites.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="py-14 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-2 text-white">❤️ My Favourites</h2>
              <p className="text-gray-400">Your favourite tools</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.filter(tool => favourites.includes(tool.path)).slice(0, 6).map((tool, index) => {
                const Icon = tool.icon
                return (
                  <motion.div
                    key={tool.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + (index * 0.05) }}
                  >
                    <Link
                      href={tool.path}
                      className="group bg-gradient-to-br from-[#111827] to-[#1a1f2e] rounded-2xl p-6 border border-white/8 hover:border-[#00E5FF]/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00E5FF]/10 transition-all duration-300 block relative"
                    >
                      <button
                        onClick={(e) => handleFavouriteClick(e, tool.path)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
                      >
                        <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                      </button>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00E5FF]/20 to-[#7C4DFF]/20 flex items-center justify-center mb-4 group-hover:from-[#00E5FF]/30 group-hover:to-[#7C4DFF]/30 transition-all">
                        <Icon className="h-6 w-6 text-[#00E5FF]" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">{tool.name}</h3>
                      <p className="text-sm text-gray-400">{tool.description}</p>
                      <div className="mt-4 flex items-center text-[#00E5FF] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Open Tool</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>
      )}

      {/* Most Popular Tools Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="py-14 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-2 text-white">Most Popular Tools</h2>
            <p className="text-gray-400">Our most used tools by the community</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularTools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <motion.div
                  key={tool.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + (index * 0.05) }}
                >
                  <Link
                    href={tool.path}
                    className="group bg-gradient-to-br from-[#111827] to-[#1a1f2e] rounded-2xl p-6 border border-white/8 hover:border-[#00E5FF]/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00E5FF]/10 transition-all duration-300 block relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white text-xs font-semibold px-3 py-1 rounded-bl-xl">
                      {tool.badge}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00E5FF]/20 to-[#7C4DFF]/20 flex items-center justify-center mb-4 group-hover:from-[#00E5FF]/30 group-hover:to-[#7C4DFF]/30 transition-all">
                      <Icon className="h-6 w-6 text-[#00E5FF]" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{tool.name}</h3>
                    <p className="text-sm text-gray-400">{tool.description}</p>
                    <div className="mt-4 flex items-center text-[#00E5FF] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Open Tool</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white px-6 py-3 rounded-full shadow-lg z-50"
        >
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 fill-white" />
            <span>Added to favourites!</span>
          </div>
        </motion.div>
      )}

      {/* Banner ad between Most Popular Tools and PDF Tools */}
      <div className="flex justify-center px-4">
        <div className="ad-slot w-full max-w-7xl" style={{minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
      </div>

      {/* Tools by Category */}
      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          {categories.map((category, index) => {
            const categoryTools = filteredTools.filter(tool => tool.category === category.name)
            if (categoryTools.length === 0) return null
            
            return (
              <motion.div 
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                id={category.name.toLowerCase().replace(' ', '-')} 
                className="scroll-mt-20"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-semibold mb-2 text-white">{category.name}</h2>
                  <p className="text-gray-400">{category.description}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categoryTools.map((tool, toolIndex) => {
                    const Icon = tool.icon
                    return (
                      <motion.div
                        key={tool.path}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: (index * 0.1) + (toolIndex * 0.05) }}
                      >
                        <Link
                          href={tool.path}
                          className="group bg-[#111827] rounded-2xl p-6 border border-white/8 hover:border-[#00E5FF]/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00E5FF]/10 transition-all duration-300 block relative"
                        >
                          {tool.isNew && (
                            <div className="absolute top-4 left-4 bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white text-xs font-semibold px-3 py-1 rounded-full">
                              New This Week
                            </div>
                          )}
                          <button
                            onClick={(e) => handleFavouriteClick(e, tool.path)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
                          >
                            <Heart className={`h-5 w-5 ${isFavourite(tool.path) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                          </button>
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00E5FF]/20 to-[#7C4DFF]/20 flex items-center justify-center mb-4 group-hover:from-[#00E5FF]/30 group-hover:to-[#7C4DFF]/30 transition-all">
                            <Icon className="h-6 w-6 text-[#00E5FF]" />
                          </div>
                          <h3 
                            className="font-semibold text-white mb-2"
                            dangerouslySetInnerHTML={{ __html: highlightText(tool.name, searchQuery) }}
                          />
                          <p className="text-sm text-gray-400">{tool.description}</p>
                          {isClient && getAverageRating(tool.path) > 0 && (
                            <div className="mt-2 flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-sm text-gray-400">{getAverageRating(tool.path).toFixed(1)}</span>
                            </div>
                          )}
                          <div className="mt-4 flex items-center text-[#00E5FF] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>Open Tool</span>
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Ad after AI Tools section (index 2) */}
                {index === 2 && (
                  <div className="flex justify-center mt-8">
                    <AdSlot adSlot="4000000005" className="w-full max-w-2xl" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-[#00E5FF]/10 to-[#7C4DFF]/10 rounded-2xl p-8 border border-white/8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2 text-white">Get Notified About New Tools</h2>
              <p className="text-gray-400">Enter your email to receive updates when we add new tools</p>
            </div>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              />
              <button
                onClick={() => {
                  if (newsletterEmail) {
                    setNewsletterSubscribed(true)
                    setNewsletterEmail("")
                  }
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
              >
                Subscribe
              </button>
            </div>
            {newsletterSubscribed && (
              <p className="mt-4 text-center text-[#00E5FF] text-sm">
                ✓ Thanks for subscribing! You'll receive updates about new tools.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Banner ad at bottom before footer */}
      <div className="flex justify-center px-4">
        <div className="ad-slot w-full max-w-7xl" style={{minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
      </div>
    </div>
  )
}
