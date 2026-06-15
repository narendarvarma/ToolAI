import type { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Student Resources — ToolHub AI",
  description: "Tools and guides to help students succeed academically. Discover study aids, calculators, planners, and educational resources.",
  keywords: "student resources, study tools, calculators, academic success, student tips, toolhub ai",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/blog/category/student-resources`,
  },
  openGraph: {
    title: "Student Resources — ToolHub AI",
    description: "Tools and guides to help students succeed academically.",
    type: "website",
    url: `${BASE_URL}/blog/category/student-resources`,
    siteName: "ToolHub AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Resources — ToolHub AI",
    description: "Tools and guides to help students succeed academically.",
  }
}

export default function StudentResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
