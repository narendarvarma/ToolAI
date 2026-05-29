import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Assignment Deadline Tracker - Track Deadlines with Priority",
  description: "Free assignment deadline tracker for students. Add assignments with deadlines, priority levels, color-coded alerts. Save to localStorage. Sort by nearest deadline.",
  keywords: "assignment tracker, deadline tracker, student planner, assignment organizer, study planner",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/tools/deadline-tracker`,
  },
  openGraph: {
    title: "Assignment Deadline Tracker - Track Deadlines with Priority",
    description: "Free assignment deadline tracker for students. Add assignments with deadlines, priority levels, color-coded alerts. Save to localStorage. Sort by nearest deadline.",
    type: "website",
    url: `${BASE_URL}/tools/deadline-tracker`,
    siteName: "ToolHub AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Assignment Deadline Tracker - ToolHub AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Assignment Deadline Tracker - Track Deadlines with Priority",
    description: "Free assignment deadline tracker for students. Add assignments with deadlines, priority levels, color-coded alerts. Save to localStorage. Sort by nearest deadline.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
