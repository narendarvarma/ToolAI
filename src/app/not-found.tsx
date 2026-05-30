"use client"

import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#00E5FF] mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-400 text-lg mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
          <Link
            href="/#tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111827] border border-white/8 text-white font-semibold hover:border-[#00E5FF]/50 transition-all"
          >
            <Search className="h-5 w-5" />
            Browse Tools
          </Link>
        </div>

        <div className="mt-12 p-6 bg-[#111827] rounded-2xl border border-white/8">
          <h3 className="text-lg font-semibold text-white mb-3">Looking for something specific?</h3>
          <p className="text-gray-400 text-sm mb-4">
            Try these popular tools:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/tools/pdf-to-image" className="px-3 py-1 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] text-sm hover:bg-[#00E5FF]/30 transition-colors">
              PDF to Image
            </Link>
            <Link href="/tools/image-to-pdf" className="px-3 py-1 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] text-sm hover:bg-[#00E5FF]/30 transition-colors">
              Image to PDF
            </Link>
            <Link href="/tools/cgpa-calculator" className="px-3 py-1 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] text-sm hover:bg-[#00E5FF]/30 transition-colors">
              CGPA Calculator
            </Link>
            <Link href="/tools/ai-resume-builder" className="px-3 py-1 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] text-sm hover:bg-[#00E5FF]/30 transition-colors">
              AI Resume Builder
            </Link>
          </div>
        </div>

        <button
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Go back to previous page
        </button>
      </div>
    </div>
  )
}
