import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("flashcard-generator").title,
  description: getToolMetadata("flashcard-generator").description,
  keywords: getToolMetadata("flashcard-generator").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://gettoolai.in/tools/flashcard-generator",
  },
  openGraph: {
    title: getToolMetadata("flashcard-generator").title,
    description: getToolMetadata("flashcard-generator").description,
    type: "website",
    url: "https://gettoolai.in/tools/flashcard-generator",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


