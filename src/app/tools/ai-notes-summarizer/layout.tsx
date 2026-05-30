import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("ai-notes-summarizer").title,
  description: getToolMetadata("ai-notes-summarizer").description,
  keywords: getToolMetadata("ai-notes-summarizer").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/ai-notes-summarizer",
  },
  openGraph: {
    title: getToolMetadata("ai-notes-summarizer").title,
    description: getToolMetadata("ai-notes-summarizer").description,
    type: "website",
    url: "https://gettoolai.in/tools/ai-notes-summarizer",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


