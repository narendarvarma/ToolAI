import type { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "PDF Guides — ToolHub AI",
  description: "Master PDF manipulation with our comprehensive guides. Learn to merge, split, compress, and edit PDF files using free online tools.",
  keywords: "PDF guides, PDF tools, merge PDF, split PDF, compress PDF, edit PDF, toolhub ai",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/blog/category/pdf-guides`,
  },
  openGraph: {
    title: "PDF Guides — ToolHub AI",
    description: "Master PDF manipulation with our comprehensive guides.",
    type: "website",
    url: `${BASE_URL}/blog/category/pdf-guides`,
    siteName: "ToolHub AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Guides — ToolHub AI",
    description: "Master PDF manipulation with our comprehensive guides.",
  }
}

export default function PDFGuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
