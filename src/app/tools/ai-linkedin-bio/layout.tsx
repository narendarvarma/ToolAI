import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "AI LinkedIn Bio Generator - Generate Professional LinkedIn Bio",
  description: "Free AI LinkedIn bio generator. Enter your name, role, skills, and experience. AI generates a professional LinkedIn About section. Perfect for freshers and job seekers in India.",
  keywords: "LinkedIn bio generator, LinkedIn about section, professional bio, job seeker bio, resume bio",
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: `${BASE_URL}/tools/ai-linkedin-bio`,
  },
  openGraph: {
    title: "AI LinkedIn Bio Generator - Generate Professional LinkedIn Bio",
    description: "Free AI LinkedIn bio generator. Enter your name, role, skills, and experience. AI generates a professional LinkedIn About section. Perfect for freshers and job seekers in India.",
    type: "website",
    url: `${BASE_URL}/tools/ai-linkedin-bio`,
    siteName: "ToolHub AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AI LinkedIn Bio Generator - ToolHub AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI LinkedIn Bio Generator - Generate Professional LinkedIn Bio",
    description: "Free AI LinkedIn bio generator. Enter your name, role, skills, and experience. AI generates a professional LinkedIn About section. Perfect for freshers and job seekers in India.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
