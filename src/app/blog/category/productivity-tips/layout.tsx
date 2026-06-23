import type { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Productivity Tips - GetTool AI | Boost Your Efficiency",
  description: "GetTool AI Productivity Tips - Boost your efficiency with our productivity guides and tips. Discover time management techniques, workflow optimization strategies, and productivity tool tutorials.",
  keywords: "productivity tips, time management, workflow optimization, productivity tools guide, efficiency tips, work smarter, GetTool AI productivity",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/blog/category/productivity-tips`,
  },
  openGraph: {
    title: "Productivity Tips — GetTool AI | Boost Efficiency",
    description: "Boost your efficiency with our productivity guides and tips. Discover time management and workflow optimization strategies.",
    type: "website",
    url: `${BASE_URL}/blog/category/productivity-tips`,
    siteName: "GetTool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Productivity Tips — GetTool AI | Boost Efficiency",
    description: "Boost your efficiency with our productivity guides and tips.",
  }
}

export default function ProductivityTipsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
