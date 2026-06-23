import type { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "AI Guides - GetTool AI | Learn to Use AI Tools Effectively",
  description: "GetTool AI AI Guides - Learn how to leverage AI tools for productivity and learning. Discover AI-powered tips, guides, and tutorials for resume building, email writing, and more.",
  keywords: "AI guides, AI tools tutorial, AI productivity tips, AI resume builder guide, AI email writer tutorial, AI learning resources, GetTool AI AI guides",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/blog/category/ai-guides`,
  },
  openGraph: {
    title: "AI Guides — GetTool AI | AI Tools Tutorials & Tips",
    description: "Learn how to leverage AI tools for productivity and learning with our comprehensive AI guides and tutorials.",
    type: "website",
    url: `${BASE_URL}/blog/category/ai-guides`,
    siteName: "GetTool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Guides — GetTool AI | AI Tools Tutorials",
    description: "Learn how to use AI tools effectively with our guides and tutorials.",
  }
}

export default function AIGuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
