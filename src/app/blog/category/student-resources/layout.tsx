import type { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Student Resources - GetTool AI | Study Tools & Academic Success",
  description: "GetTool AI Student Resources - Tools and guides to help students succeed academically. Discover study aids, calculators, planners, educational resources, and academic success tips.",
  keywords: "student resources, study tools, calculators, academic success, student tips, study guides, educational resources, GetTool AI student tools",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/blog/category/student-resources`,
  },
  openGraph: {
    title: "Student Resources — GetTool AI | Study Tools & Guides",
    description: "Tools and guides to help students succeed academically. Discover study aids, calculators, and planners.",
    type: "website",
    url: `${BASE_URL}/blog/category/student-resources`,
    siteName: "GetTool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Resources — GetTool AI | Study Tools",
    description: "Tools and guides to help students succeed academically.",
  }
}

export default function StudentResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
