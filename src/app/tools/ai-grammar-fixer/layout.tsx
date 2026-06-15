import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "AI Grammar Fixer - Fix Grammar and Spelling Online",
  description: "Free AI grammar fixer tool. Paste English text and AI corrects grammar, spelling, and sentence structure. See original vs corrected text instantly.",
  keywords: "grammar fixer, spelling checker, grammar corrector, AI grammar, English grammar fix",
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: `${BASE_URL}/tools/ai-grammar-fixer`,
  },
  openGraph: {
    title: "AI Grammar Fixer - Fix Grammar and Spelling Online Free",
    description: "Free AI grammar fixer tool. Paste English text and AI corrects grammar, spelling, and structure. Shows original vs corrected text instantly.",
    type: "website",
    url: `${BASE_URL}/tools/ai-grammar-fixer`,
    siteName: "ToolHub AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AI Grammar Fixer - ToolHub AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Grammar Fixer - Fix Grammar and Spelling Online",
    description: "Free AI grammar fixer tool. Paste English text and AI corrects grammar, spelling, and structure. Shows original vs corrected text instantly.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
