"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ArrowRight, Sparkles } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import { motion } from "framer-motion"
import { 
  Calculator, Calendar, FileText, Image as ImageIcon, Mic, Lock, Share2, 
  Scissors, RotateCw, Eraser, Wand2, Code, Mail, Download, BookOpen,
  Users, Activity, Upload, FileImage, QrCode, Smile, Clock, RefreshCw,
  Hash, Type, Palette, Key, DollarSign, Plus, Type as TypeIcon,
  Shield, Timer, FileSpreadsheet, Globe, Flame
} from "lucide-react"

const tools = [
  // PDF Tools
  { name: "Image to PDF", path: "/tools/image-to-pdf", icon: FileText, category: "PDF Tools", description: "Convert images to PDF documents" },
  { name: "PDF to Image", path: "/tools/pdf-to-image", icon: ImageIcon, category: "PDF Tools", description: "Convert PDF pages to images" },
  { name: "Merge PDF", path: "/tools/merge-pdf", icon: FileText, category: "PDF Tools", description: "Combine multiple PDFs into one" },
  { name: "Split PDF", path: "/tools/split-pdf", icon: Scissors, category: "PDF Tools", description: "Split PDF into separate files" },
  { name: "Compress PDF", path: "/tools/compress-pdf", icon: FileText, category: "PDF Tools", description: "Reduce PDF file size" },
  { name: "Add Watermark", path: "/tools/add-watermark", icon: FileText, category: "PDF Tools", description: "Add watermark to PDF files" },
  { name: "Remove Pages", path: "/tools/remove-pages", icon: FileText, category: "PDF Tools", description: "Remove specific pages from PDF" },
  { name: "Rotate PDF", path: "/tools/rotate-pdf", icon: RotateCw, category: "PDF Tools", description: "Rotate PDF pages" },
  
  // Image Tools
  { name: "Background Remover", path: "/tools/background-remover", icon: Eraser, category: "Image Tools", description: "Remove image backgrounds" },
  { name: "Image Compressor", path: "/tools/image-compressor", icon: ImageIcon, category: "Image Tools", description: "Compress images efficiently" },
  { name: "Resize Image", path: "/tools/resize-image", icon: ImageIcon, category: "Image Tools", description: "Resize images to custom dimensions" },
  { name: "Convert Format", path: "/tools/convert-format", icon: FileImage, category: "Image Tools", description: "Convert image formats" },
  { name: "AI Image Enhancer", path: "/tools/ai-image-enhancer", icon: Wand2, category: "Image Tools", description: "Enhance images with AI" },
  { name: "QR Generator", path: "/tools/qr-generator", icon: QrCode, category: "Image Tools", description: "Generate QR codes" },
  { name: "Meme Generator", path: "/tools/meme-generator", icon: Smile, category: "Image Tools", description: "Create memes instantly" },
  
  // AI Tools
  { name: "AI Resume Builder", path: "/tools/ai-resume-builder", icon: FileText, category: "AI Tools", description: "Build professional resumes" },
  { name: "AI Email Writer", path: "/tools/ai-email-writer", icon: Mail, category: "AI Tools", description: "Write emails with AI" },
  { name: "AI Notes Summarizer", path: "/tools/ai-notes-summarizer", icon: FileText, category: "AI Tools", description: "Summarize your notes" },
  { name: "AI Caption Generator", path: "/tools/ai-caption-generator", icon: Wand2, category: "AI Tools", description: "Generate social media captions" },
  { name: "AI Study Assistant", path: "/tools/ai-study-assistant", icon: BookOpen, category: "AI Tools", description: "Get help with studies" },
  { name: "AI Code Helper", path: "/tools/ai-code-helper", icon: Code, category: "AI Tools", description: "Generate code with AI" },
  { name: "AI Blog Generator", path: "/tools/ai-blog-generator", icon: FileText, category: "AI Tools", description: "Generate blog posts" },
  { name: "AI Text Rewriter", path: "/tools/ai-text-rewriter", icon: RefreshCw, category: "AI Tools", description: "Rewrite text with AI" },
  
  // Student Tools
  { name: "CGPA Calculator", path: "/tools/cgpa-calculator", icon: Calculator, category: "Student Tools", description: "Calculate your CGPA" },
  { name: "Attendance Calculator", path: "/tools/attendance-calculator", icon: Users, category: "Student Tools", description: "Track attendance percentage" },
  { name: "Study Planner", path: "/tools/study-planner", icon: Calendar, category: "Student Tools", description: "Plan your study sessions" },
  { name: "Pomodoro Timer", path: "/tools/pomodoro-timer", icon: Clock, category: "Student Tools", description: "Focus with Pomodoro technique" },
  { name: "Unit Converter", path: "/tools/unit-converter", icon: Calculator, category: "Student Tools", description: "Convert units easily" },
  { name: "Notes Organizer", path: "/tools/notes-organizer", icon: FileText, category: "Student Tools", description: "Organize your notes" },
  { name: "Timetable Generator", path: "/tools/timetable-generator", icon: Calendar, category: "Student Tools", description: "Create weekly schedules" },
  { name: "Flashcard Generator", path: "/tools/flashcard-generator", icon: BookOpen, category: "Student Tools", description: "Create and study flashcards" },
  { name: "Digital Notes", path: "/tools/digital-notes", icon: FileText, category: "Student Tools", description: "Take digital notes" },
  
  // Productivity Tools
  { name: "To-Do List", path: "/tools/todo-list", icon: FileText, category: "Productivity Tools", description: "Manage your tasks" },
  { name: "Expense Tracker", path: "/tools/expense-tracker", icon: Calculator, category: "Productivity Tools", description: "Track your expenses" },
  { name: "Password Generator", path: "/tools/password-generator", icon: Lock, category: "Productivity Tools", description: "Generate secure passwords" },
  { name: "Calendar Planner", path: "/tools/calendar-planner", icon: Calendar, category: "Productivity Tools", description: "Plan your schedule" },
  { name: "Habit Tracker", path: "/tools/habit-tracker", icon: Calendar, category: "Productivity Tools", description: "Track your habits" },
  { name: "Daily Goals", path: "/tools/daily-goals", icon: Calendar, category: "Productivity Tools", description: "Set daily goals" },
  
  // Utility Tools
  { name: "Text to Speech", path: "/tools/text-to-speech", icon: Mic, category: "Utility Tools", description: "Convert text to speech" },
  { name: "Speech to Text", path: "/tools/speech-to-text", icon: Mic, category: "Utility Tools", description: "Convert speech to text" },
  { name: "Currency Converter", path: "/tools/currency-converter", icon: Calculator, category: "Utility Tools", description: "Convert currencies" },
  { name: "Age Calculator", path: "/tools/age-calculator", icon: Calculator, category: "Utility Tools", description: "Calculate your age" },
  { name: "BMI Calculator", path: "/tools/bmi-calculator", icon: Calculator, category: "Utility Tools", description: "Calculate your BMI" },
  { name: "Internet Speed Test", path: "/tools/internet-speed-test", icon: Activity, category: "Utility Tools", description: "Test internet speed" },
  { name: "File Sharing", path: "/tools/file-sharing", icon: Share2, category: "Utility Tools", description: "Share files easily" },
  { name: "Word Counter", path: "/tools/word-counter", icon: Hash, category: "Utility Tools", description: "Count words and characters" },
  { name: "JSON Formatter", path: "/tools/json-formatter", icon: Code, category: "Utility Tools", description: "Format and validate JSON" },
  { name: "Color Picker", path: "/tools/color-picker", icon: Palette, category: "Utility Tools", description: "Pick and convert colors" },
  { name: "Case Converter", path: "/tools/case-converter", icon: Type, category: "Utility Tools", description: "Convert text cases" },
  { name: "Lorem Ipsum Generator", path: "/tools/lorem-ipsum", icon: FileText, category: "Utility Tools", description: "Generate placeholder text" },
  { name: "Base64 Encoder", path: "/tools/base64-encoder", icon: Code, category: "Utility Tools", description: "Encode and decode Base64" },
  { name: "URL Encoder", path: "/tools/url-encoder", icon: Code, category: "Utility Tools", description: "Encode and decode URLs" },
  { name: "Time Zone Converter", path: "/tools/timezone-converter", icon: Clock, category: "Utility Tools", description: "Convert time zones" },
  { name: "Date Calculator", path: "/tools/date-calculator", icon: Calendar, category: "Utility Tools", description: "Calculate dates" },
  { name: "Tip Calculator", path: "/tools/tip-calculator", icon: DollarSign, category: "Utility Tools", description: "Calculate tips and split bills" },
  { name: "Regex Tester", path: "/tools/regex-tester", icon: Code, category: "Utility Tools", description: "Test regular expressions" },
  { name: "UUID Generator", path: "/tools/uuid-generator", icon: Key, category: "Utility Tools", description: "Generate unique IDs" },
  { name: "Unix Timestamp", path: "/tools/unix-timestamp", icon: Clock, category: "Utility Tools", description: "Convert Unix timestamps" },
  { name: "HTML Entity Encoder", path: "/tools/html-entity-encoder", icon: Code, category: "Utility Tools", description: "Encode and decode HTML entities" },
  { name: "Markdown to HTML", path: "/tools/markdown-to-html", icon: FileText, category: "Utility Tools", description: "Convert Markdown to HTML" },
  { name: "JSON to CSV", path: "/tools/json-to-csv", icon: FileSpreadsheet, category: "Utility Tools", description: "Convert JSON to CSV" },
  { name: "Password Strength", path: "/tools/password-strength", icon: Shield, category: "Utility Tools", description: "Check password strength" },
  { name: "Countdown Timer", path: "/tools/countdown-timer", icon: Timer, category: "Utility Tools", description: "Set countdown timers" },
  { name: "Stopwatch", path: "/tools/stopwatch", icon: Timer, category: "Utility Tools", description: "Track time precisely" },
  { name: "World Clock", path: "/tools/world-clock", icon: Globe, category: "Utility Tools", description: "Track time across cities" },
  { name: "Calorie Calculator", path: "/tools/calorie-calculator", icon: Flame, category: "Utility Tools", description: "Calculate daily calorie needs" },
]

const categories = [
  { name: "PDF Tools", description: "Manage and manipulate PDF files", color: "from-[#00E5FF] to-[#7C4DFF]" },
  { name: "Image Tools", description: "Edit and convert images", color: "from-[#7C4DFF] to-[#FF4DB6]" },
  { name: "AI Tools", description: "AI-powered productivity tools", color: "from-[#FF4DB6] to-[#00E5FF]" },
  { name: "Student Tools", description: "Tools for students and education", color: "from-[#00E5FF] to-[#7C4DFF]" },
  { name: "Productivity Tools", description: "Boost your productivity", color: "from-[#7C4DFF] to-[#FF4DB6]" },
  { name: "Utility Tools", description: "Everyday utility tools", color: "from-[#FF4DB6] to-[#00E5FF]" },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
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
            <span className="text-sm text-gray-300">AI-Powered Tools Platform</span>
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
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for tools..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#111827] border border-white/8 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              />
            </div>
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
                          className="group bg-[#111827] rounded-2xl p-6 border border-white/8 hover:border-[#00E5FF]/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00E5FF]/10 transition-all duration-300 block"
                        >
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

      {/* Footer */}
      <footer className="py-14 px-4 border-t border-white/8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-white font-semibold text-xl">ToolHub AI</span>
              </div>
              <p className="text-sm text-gray-400">
                Professional online tools for everyone. Clean, fast, and free.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Tools</h4>
              <ul className="space-y-2">
                <li><Link href="#pdf-tools" className="text-sm text-gray-400 hover:text-white transition-colors">PDF Tools</Link></li>
                <li><Link href="#image-tools" className="text-sm text-gray-400 hover:text-white transition-colors">Image Tools</Link></li>
                <li><Link href="#ai-tools" className="text-sm text-gray-400 hover:text-white transition-colors">AI Tools</Link></li>
                <li><Link href="#student-tools" className="text-sm text-gray-400 hover:text-white transition-colors">Student Tools</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <p className="text-sm text-gray-400 mb-4">Follow us for updates and new tools</p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <span className="text-white text-sm">𝕏</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <span className="text-white text-sm">in</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <span className="text-white text-sm">gh</span>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/8">
            {/* Footer Ad */}
            <div className="flex justify-center mb-4">
              <AdSlot adSlot="4000000005" className="w-full max-w-2xl" />
            </div>
            <p className="text-sm text-gray-400">© 2024 ToolHub AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
