import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "AI LinkedIn Bio Generator - Professional LinkedIn Bio",
  description: "Free AI LinkedIn bio generator. Enter your name, role, skills, and experience. AI writes professional LinkedIn bios for freshers and job seekers.",
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
    description: "Free AI LinkedIn bio generator. Enter your name, role, skills, and experience. AI generates a professional LinkedIn About section.",
    type: "website",
    url: `${BASE_URL}/tools/ai-linkedin-bio`,
    siteName: "GetTool AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AI LinkedIn Bio Generator - GetTool AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI LinkedIn Bio Generator - Generate Professional LinkedIn Bio",
    description: "Free AI LinkedIn bio generator. Enter your name, role, skills, and experience. AI generates a professional LinkedIn About section.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
