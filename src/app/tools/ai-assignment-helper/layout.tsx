import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "AI Assignment Helper - Get Help with Assignments Online",
  description: "Free AI assignment helper for students. Enter subject and question, get a structured answer with introduction, main points, and conclusion.",
  keywords: "AI assignment helper, assignment help, homework helper, student AI, study assistant",
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: `${BASE_URL}/tools/ai-assignment-helper`,
  },
  openGraph: {
    title: "AI Assignment Helper - Get Help with Assignments Online Free",
    description: "Free AI assignment helper for students. Enter subject and question, get structured answer with introduction, main points, and conclusion. Word count selector. Most needed tool for Indian students.",
    type: "website",
    url: `${BASE_URL}/tools/ai-assignment-helper`,
    siteName: "GetTool AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AI Assignment Helper - GetTool AI",
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
