"use client"

import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"

const articles = [
  {
    id: "top-10-free-pdf-tools-2025",
    title: "Top 10 Free PDF Tools You Need in 2025",
    description: "Discover the best free PDF tools for editing, converting, and managing your documents efficiently.",
    date: "January 15, 2025",
    readTime: "8 min read",
    slug: "top-10-free-pdf-tools-2025"
  },
  {
    id: "how-to-compress-pdf-without-losing-quality",
    title: "How to Compress PDF Without Losing Quality",
    description: "Learn the techniques to compress PDF files while maintaining their quality.",
    date: "January 3, 2025",
    readTime: "5 min read",
    slug: "how-to-compress-pdf-without-losing-quality"
  },
  {
    id: "how-to-merge-pdf-files-easily",
    title: "How to Merge PDF Files Easily",
    description: "Step-by-step guide to combining multiple PDF files into one document.",
    date: "December 20, 2024",
    readTime: "4 min read",
    slug: "how-to-merge-pdf-files-easily"
  }
]

export default function PDFGuides() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] py-14 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <Link href="/blog" className="text-[#00E5FF] hover:underline mb-4 inline-block">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl font-bold mb-4 text-white">PDF Guides</h1>
          <p className="text-gray-400">Master PDF manipulation with our comprehensive guides</p>
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
                  PDF Guides
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
