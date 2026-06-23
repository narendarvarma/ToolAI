import type { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Contact Us — GetTool AI",
  description: "Contact GetTool AI for feedback, support, or new tool requests. Get in touch with our team for help with online PDF, AI, and productivity tools.",
  keywords: "contact, support, toolhub ai, feedback, tool requests",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: "Contact Us — GetTool AI",
    description: "Contact GetTool AI for feedback, support, or new tool requests.",
    type: "website",
    url: `${BASE_URL}/contact`,
    siteName: "GetTool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us — GetTool AI",
    description: "Contact GetTool AI for feedback, support, or new tool requests.",
  }
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
