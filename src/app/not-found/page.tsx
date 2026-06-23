import Link from "next/link"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] bg-clip-text text-transparent">
            404
          </h1>
        </div>
        
        <h2 className="text-3xl font-semibold text-white mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Let's help you find what you're looking for.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors"
          >
            <Search className="h-5 w-5" />
            Browse Tools
          </Link>
        </div>

        <div className="bg-[#111827] rounded-2xl p-6 border border-white/8">
          <h3 className="text-lg font-semibold text-white mb-4">
            Popular Tools
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/tools/cgpa-calculator" className="text-gray-400 hover:text-[#00E5FF] transition-colors text-sm">
              CGPA Calculator
            </Link>
            <Link href="/tools/ai-resume-builder" className="text-gray-400 hover:text-[#00E5FF] transition-colors text-sm">
              AI Resume Builder
            </Link>
            <Link href="/tools/doc-to-pdf" className="text-gray-400 hover:text-[#00E5FF] transition-colors text-sm">
              Doc to PDF
            </Link>
            <Link href="/tools/merge-pdf" className="text-gray-400 hover:text-[#00E5FF] transition-colors text-sm">
              Merge PDF
            </Link>
            <Link href="/tools/resize-image" className="text-gray-400 hover:text-[#00E5FF] transition-colors text-sm">
              Resize Image
            </Link>
            <Link href="/tools/password-generator" className="text-gray-400 hover:text-[#00E5FF] transition-colors text-sm">
              Password Generator
            </Link>
          </div>
        </div>

        <div className="mt-8 text-gray-500 text-sm">
          <p>If you believe this is an error, please <Link href="/contact" className="text-[#00E5FF] hover:underline">contact us</Link>.</p>
        </div>
      </div>
    </div>
  )
}
