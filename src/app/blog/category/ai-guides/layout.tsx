import type { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "AI Guides — ToolHub AI",
  description: "Learn how to leverage AI tools for productivity and learning. Discover AI-powered tips, guides, and tutorials from ToolHub AI.",
  keywords: "AI guides, AI tools, productivity, learning, artificial intelligence, toolhub ai",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/blog/category/ai-guides`,
  },
  openGraph: {
    title: "AI Guides — ToolHub AI",
    description: "Learn how to leverage AI tools for productivity and learning.",
    type: "website",
    url: `${BASE_URL}/blog/category/ai-guides`,
    siteName: "ToolHub AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Guides — ToolHub AI",
    description: "Learn how to leverage AI tools for productivity and learning.",
  }
}

export default function AIGuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
