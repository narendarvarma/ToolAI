import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Resume Score Checker - Analyze Your Resume",
  description: "Free resume score checker for students and freshers. Analyze your resume, get a score out of 100, and receive actionable tips to improve sections.",
  keywords: "resume score checker, resume analyzer, resume checker, resume tips, student resume, fresher resume",
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: `${BASE_URL}/tools/resume-score`,
  },
  openGraph: {
    title: "Resume Score Checker - Analyze Your Resume Instantly",
    description: "Free resume score checker for students and freshers. Analyze your resume for key sections, get score out of 100, see what's missing, and get improvement tips.",
    type: "website",
    url: `${BASE_URL}/tools/resume-score`,
    siteName: "ToolHub AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Resume Score Checker - ToolHub AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Score Checker - Analyze Your Resume Instantly",
    description: "Free resume score checker for students and freshers. Analyze your resume for key sections, get score out of 100, see what's missing, and get improvement tips.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
