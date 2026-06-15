import type { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Productivity Tips — ToolHub AI",
  description: "Boost your efficiency with our productivity guides and tips. Discover time management techniques and workflow optimization strategies.",
  keywords: "productivity tips, time management, workflow optimization, productivity tools, toolhub ai",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/blog/category/productivity-tips`,
  },
  openGraph: {
    title: "Productivity Tips — ToolHub AI",
    description: "Boost your efficiency with our productivity guides and tips.",
    type: "website",
    url: `${BASE_URL}/blog/category/productivity-tips`,
    siteName: "ToolHub AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Productivity Tips — ToolHub AI",
    description: "Boost your efficiency with our productivity guides and tips.",
  }
}

export default function ProductivityTipsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
