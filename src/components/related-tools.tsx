"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Tool {
  name: string
  path: string
  icon: any
  description: string
  category: string
}

interface RelatedToolsProps {
  currentToolPath?: string
  currentCategory?: string
  toolName?: string
  faqs?: { question: string; answer: string }[]
}

export default function RelatedTools({ currentToolPath, currentCategory, toolName, faqs }: RelatedToolsProps) {
  // FAQ display mode
  if (faqs && faqs.length > 0) {
    return (
      <div className="mt-8 p-6 bg-[#111827] rounded-2xl border border-white/8">
        <h3 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/8 pb-4 last:border-0 last:pb-0">
              <h4 className="font-medium text-white mb-2">{faq.question}</h4>
              <p className="text-gray-400 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Related tools display mode
  const tools: Tool[] = [
    // PDF Tools
    { name: "PDF to Image", path: "/tools/pdf-to-image", icon: null, description: "Convert PDF pages to images", category: "PDF Tools" },
    { name: "Merge PDF", path: "/tools/merge-pdf", icon: null, description: "Combine multiple PDFs into one", category: "PDF Tools" },
    { name: "Split PDF", path: "/tools/split-pdf", icon: null, description: "Split PDF into separate files", category: "PDF Tools" },
    { name: "Compress PDF", path: "/tools/compress-pdf", icon: null, description: "Reduce PDF file size", category: "PDF Tools" },
    { name: "Add Watermark", path: "/tools/add-watermark", icon: null, description: "Add watermark to PDF files", category: "PDF Tools" },
    { name: "Remove Pages", path: "/tools/remove-pages", icon: null, description: "Remove specific pages from PDF", category: "PDF Tools" },
    { name: "Rotate PDF", path: "/tools/rotate-pdf", icon: null, description: "Rotate PDF pages", category: "PDF Tools" },
    { name: "Screenshot to PDF", path: "/tools/screenshot-to-pdf", icon: null, description: "Convert screenshots to PDF", category: "PDF Tools" },

    // Image Tools
    { name: "Image Compressor", path: "/tools/image-compressor", icon: null, description: "Compress images efficiently", category: "Image Tools" },
    { name: "Resize Image", path: "/tools/resize-image", icon: null, description: "Resize images to custom dimensions", category: "Image Tools" },
    { name: "Convert Format", path: "/tools/convert-format", icon: null, description: "Convert image formats", category: "Image Tools" },
    { name: "Image to Base64", path: "/tools/image-to-base64", icon: null, description: "Convert images to Base64", category: "Image Tools" },
    { name: "QR Generator", path: "/tools/qr-generator", icon: null, description: "Generate QR codes", category: "Image Tools" },
    
    // AI Tools
    { name: "AI Resume Builder", path: "/tools/ai-resume-builder", icon: null, description: "Build professional resumes", category: "AI Tools" },
    { name: "AI Email Writer", path: "/tools/ai-email-writer", icon: null, description: "Write emails with AI", category: "AI Tools" },
    { name: "AI Notes Summarizer", path: "/tools/ai-notes-summarizer", icon: null, description: "Summarize your notes", category: "AI Tools" },
    { name: "AI Caption Generator", path: "/tools/ai-caption-generator", icon: null, description: "Generate social media captions", category: "AI Tools" },
    { name: "AI Study Assistant", path: "/tools/ai-study-assistant", icon: null, description: "Get help with studies", category: "AI Tools" },
    { name: "AI Code Helper", path: "/tools/ai-code-helper", icon: null, description: "Generate code with AI", category: "AI Tools" },
    { name: "AI Blog Generator", path: "/tools/ai-blog-generator", icon: null, description: "Generate blog posts", category: "AI Tools" },
    { name: "AI Text Rewriter", path: "/tools/ai-text-rewriter", icon: null, description: "Rewrite text with AI", category: "AI Tools" },
    { name: "Internship Finder", path: "/tools/internship-finder", icon: null, description: "Find internships with AI", category: "AI Tools" },
    
    // Student Tools
    { name: "CGPA Calculator", path: "/tools/cgpa-calculator", icon: null, description: "Calculate your CGPA", category: "Student Tools" },
    { name: "Attendance Calculator", path: "/tools/attendance-calculator", icon: null, description: "Track attendance percentage", category: "Student Tools" },
    { name: "Study Planner", path: "/tools/study-planner", icon: null, description: "Plan your study sessions", category: "Student Tools" },
    { name: "Pomodoro Timer", path: "/tools/pomodoro-timer", icon: null, description: "Focus with Pomodoro technique", category: "Student Tools" },
    { name: "Unit Converter", path: "/tools/unit-converter", icon: null, description: "Convert units easily", category: "Student Tools" },
    { name: "Notes Organizer", path: "/tools/notes-organizer", icon: null, description: "Organize your notes", category: "Student Tools" },
    { name: "Timetable Generator", path: "/tools/timetable-generator", icon: null, description: "Create weekly schedules", category: "Student Tools" },
    { name: "Flashcard Generator", path: "/tools/flashcard-generator", icon: null, description: "Create and study flashcards", category: "Student Tools" },
    { name: "Digital Notes", path: "/tools/digital-notes", icon: null, description: "Take digital notes", category: "Student Tools" },
    
    // Productivity Tools
    { name: "To-Do List", path: "/tools/todo-list", icon: null, description: "Manage your tasks", category: "Productivity Tools" },
    { name: "Expense Tracker", path: "/tools/expense-tracker", icon: null, description: "Track your expenses", category: "Productivity Tools" },
    { name: "Password Generator", path: "/tools/password-generator", icon: null, description: "Generate secure passwords", category: "Productivity Tools" },
    { name: "Calendar Planner", path: "/tools/calendar-planner", icon: null, description: "Plan your schedule", category: "Productivity Tools" },
    { name: "Habit Tracker", path: "/tools/habit-tracker", icon: null, description: "Track your habits", category: "Productivity Tools" },
    { name: "Daily Goals", path: "/tools/daily-goals", icon: null, description: "Set daily goals", category: "Productivity Tools" },
    
    // Utility Tools
    { name: "Text to Speech", path: "/tools/text-to-speech", icon: null, description: "Convert text to speech", category: "Utility Tools" },
    { name: "Speech to Text", path: "/tools/speech-to-text", icon: null, description: "Convert speech to text", category: "Utility Tools" },
    { name: "Currency Converter", path: "/tools/currency-converter", icon: null, description: "Convert currencies", category: "Utility Tools" },
    { name: "Age Calculator", path: "/tools/age-calculator", icon: null, description: "Calculate your age", category: "Utility Tools" },
    { name: "BMI Calculator", path: "/tools/bmi-calculator", icon: null, description: "Calculate your BMI", category: "Utility Tools" },
    { name: "Word Counter", path: "/tools/word-counter", icon: null, description: "Count words and characters", category: "Utility Tools" },
    { name: "JSON Formatter", path: "/tools/json-formatter", icon: null, description: "Format and validate JSON", category: "Utility Tools" },
    { name: "Color Picker", path: "/tools/color-picker", icon: null, description: "Pick and convert colors", category: "Utility Tools" },
    { name: "Case Converter", path: "/tools/case-converter", icon: null, description: "Convert text cases", category: "Utility Tools" },
    { name: "Base64 Encoder", path: "/tools/base64-encoder", icon: null, description: "Encode and decode Base64", category: "Utility Tools" },
    { name: "URL Encoder", path: "/tools/url-encoder", icon: null, description: "Encode and decode URLs", category: "Utility Tools" },
    { name: "Time Zone Converter", path: "/tools/timezone-converter", icon: null, description: "Convert time zones", category: "Utility Tools" },
    { name: "Date Calculator", path: "/tools/date-calculator", icon: null, description: "Calculate dates", category: "Utility Tools" },
    { name: "Tip Calculator", path: "/tools/tip-calculator", icon: null, description: "Calculate tips and split bills", category: "Utility Tools" },
    { name: "UUID Generator", path: "/tools/uuid-generator", icon: null, description: "Generate unique IDs", category: "Utility Tools" },
    { name: "Markdown to HTML", path: "/tools/markdown-to-html", icon: null, description: "Convert Markdown to HTML", category: "Utility Tools" },
    { name: "JSON to CSV", path: "/tools/json-to-csv", icon: null, description: "Convert JSON to CSV", category: "Utility Tools" },
    { name: "Password Strength", path: "/tools/password-strength", icon: null, description: "Check password strength", category: "Utility Tools" },
    { name: "Countdown Timer", path: "/tools/countdown-timer", icon: null, description: "Set countdown timers", category: "Utility Tools" },
    { name: "Stopwatch", path: "/tools/stopwatch", icon: null, description: "Track time precisely", category: "Utility Tools" },
    { name: "World Clock", path: "/tools/world-clock", icon: null, description: "Track time across cities", category: "Utility Tools" },
    { name: "Calorie Calculator", path: "/tools/calorie-calculator", icon: null, description: "Calculate daily calorie needs", category: "Utility Tools" },
  ]

  const relatedTools = tools
    .filter(tool => tool.category === currentCategory && tool.path !== currentToolPath)
    .slice(0, 3)

  if (relatedTools.length === 0) return null

  return (
    <section className="mt-8 p-6 bg-[#111827] rounded-2xl border border-white/8" aria-labelledby="related-tools-heading">
      <h2 id="related-tools-heading" className="text-2xl font-semibold text-white mb-4">Related Tools</h2>
      <div className="space-y-3">
        {relatedTools.map(tool => (
          <Link
            key={tool.path}
            href={tool.path}
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/8 hover:border-[#00E5FF]/50 hover:bg-white/10 transition-all group"
          >
            <div>
              <h4 className="font-medium text-white group-hover:text-[#00E5FF] transition-colors">{tool.name}</h4>
              <p className="text-sm text-gray-400">{tool.description}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#00E5FF] transition-colors" />
          </Link>
        ))}
      </div>
    </section>
  )
}
