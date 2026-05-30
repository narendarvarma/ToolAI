"use client"

import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"

const articles = [
  {
    id: "how-to-calculate-cgpa-complete-guide",
    title: "How to Calculate CGPA: Complete Guide",
    description: "A comprehensive guide to understanding and calculating your CGPA accurately.",
    date: "January 8, 2025",
    readTime: "5 min read",
    slug: "how-to-calculate-cgpa-complete-guide"
  },
  {
    id: "how-to-use-pomodoro-timer-study-better",
    title: "How to Use Pomodoro Timer to Study Better",
    description: "Master the Pomodoro technique and transform your study sessions for maximum focus.",
    date: "December 28, 2024",
    readTime: "6 min read",
    slug: "how-to-use-pomodoro-timer-study-better"
  },
  {
    id: "best-study-tools-for-exams",
    title: "Best Study Tools for Exam Preparation",
    description: "Discover the top tools and resources to help you prepare for exams effectively.",
    date: "December 15, 2024",
    readTime: "7 min read",
    slug: "best-study-tools-for-exams"
  }
]

export default function StudentResources() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] py-14 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <Link href="/blog" className="text-[#00E5FF] hover:underline mb-4 inline-block">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl font-bold mb-4 text-white">Student Resources</h1>
          <p className="text-gray-400">Tools and guides to help students succeed academically</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group bg-[#111827] rounded-2xl p-6 border border-white/8 hover:border-[#00E5FF]/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00E5FF]/10 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] text-xs font-medium">
                  Student Resources
                </span>
              </div>
              
              <h2 className="text-xl font-semibold mb-3 text-white group-hover:text-[#00E5FF] transition-colors">
                {article.title}
              </h2>
              
              <p className="text-gray-400 mb-4 text-sm line-clamp-2">
                {article.description}
              </p>
              
              <div className="flex items-center gap-4 text-gray-500 text-xs">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{article.readTime}</span>
                </div>
              </div>
              
              <div className="mt-4 flex items-center text-[#00E5FF] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Read Article</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
