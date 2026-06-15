import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "All Tools - GetToolAI Free Online Tools",
  description:
    "Browse all free online tools including PDF tools, AI tools, image tools, student tools, calculators, productivity tools, and more.",
  alternates: {
    canonical: "https://gettoolai.in/tools",
  },
}

export default function ToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4 text-white">
        All Tools
      </h1>

      <p className="text-gray-400 mb-8">
        Browse all free online tools available on GetToolAI including PDF tools,
        AI tools, image tools, student tools, productivity utilities,
        calculators, resume tools, and more.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-white">
        Popular Tools
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link href="/tools/merge-pdf" className="text-cyan-400 hover:underline">
          Merge PDF
        </Link>

        <Link href="/tools/compress-pdf" className="text-cyan-400 hover:underline">
          Compress PDF
        </Link>

        <Link href="/tools/word-counter" className="text-cyan-400 hover:underline">
          Word Counter
        </Link>

        <Link href="/tools/world-clock" className="text-cyan-400 hover:underline">
          World Clock
        </Link>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-white">
        Useful Pages
      </h2>

      <div className="flex flex-wrap gap-4">
        <Link href="/" className="text-cyan-400 hover:underline">
          Home
        </Link>

        <Link href="/about" className="text-cyan-400 hover:underline">
          About Us
        </Link>

        <Link href="/contact" className="text-cyan-400 hover:underline">
          Contact
        </Link>

        <Link href="/privacy" className="text-cyan-400 hover:underline">
          Privacy Policy
        </Link>
      </div>
    </div>
  )
}