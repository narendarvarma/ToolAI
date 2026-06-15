"use client"

import { useEffect } from "react"
import { RefreshCw, Home, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <AlertTriangle className="h-24 w-24 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Something went wrong</h1>
          <p className="text-gray-400 text-lg mb-8">
            We encountered an unexpected error. Please try again or contact support if the problem persists.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111827] border border-white/8 text-white font-semibold hover:border-[#00E5FF]/50 transition-all"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </div>

        <div className="p-6 bg-[#111827] rounded-2xl border border-white/8">
          <h2 className="text-lg font-semibold text-white mb-3">Need help?</h2>
          <p className="text-gray-400 text-sm mb-4">
            If this error continues to occur, please reach out to our support team.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[#00E5FF] hover:underline"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
