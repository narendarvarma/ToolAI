import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "AI Assignment Helper - Get Help with Assignments Online Free",
  description: "Free AI assignment helper for students. Enter subject and question, get structured answer with introduction, main points, and conclusion. Word count selector. Most needed tool for Indian students.",
  keywords: "AI assignment helper, assignment help, homework helper, student AI, study assistant",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/tools/ai-assignment-helper`,
  },
  openGraph: {
    title: "AI Assignment Helper - Get Help with Assignments Online Free",
    description: "Free AI assignment helper for students. Enter subject and question, get structured answer with introduction, main points, and conclusion. Word count selector. Most needed tool for Indian students.",
    type: "website",
    url: `${BASE_URL}/tools/ai-assignment-helper`,
    siteName: "ToolHub AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AI Assignment Helper - ToolHub AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Assignment Helper - Get Help with Assignments Online Free",
    description: "Free AI assignment helper for students. Enter subject and question, get structured answer with introduction, main points, and conclusion. Word count selector. Most needed tool for Indian students.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
