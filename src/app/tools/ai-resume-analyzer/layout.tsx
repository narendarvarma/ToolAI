import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Resume Analyzer - Free Online Resume Analysis Tool",
  description:
    "Get instant detailed analysis of your resume with AI-powered scoring, ATS compatibility check, and personalized improvement suggestions.",
  keywords:
    "resume analyzer, resume checker, ATS resume scanner, resume score, resume improvement",

  alternates: {
    canonical: "https://gettoolai.in/tools/ai-resume-analyzer",
  },

  openGraph: {
    title: "AI Resume Analyzer - Free Online Resume Analysis Tool",
    description:
      "Get instant detailed analysis of your resume with AI-powered scoring, ATS compatibility check, and personalized improvement suggestions.",
    url: "https://gettoolai.in/tools/ai-resume-analyzer",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Resume Analyzer - Free Online Resume Analysis Tool",
    description:
      "Get instant detailed analysis of your resume with AI-powered scoring, ATS compatibility check, and personalized improvement suggestions.",
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}