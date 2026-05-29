import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("ai-notes-summarizer").title,
  description: getToolMetadata("ai-notes-summarizer").description,
  keywords: getToolMetadata("ai-notes-summarizer").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/ai-notes-summarizer",
  },
  openGraph: {
    title: getToolMetadata("ai-notes-summarizer").title,
    description: getToolMetadata("ai-notes-summarizer").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/ai-notes-summarizer",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


