import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("ai-text-rewriter").title,
  description: getToolMetadata("ai-text-rewriter").description,
  keywords: getToolMetadata("ai-text-rewriter").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/ai-text-rewriter",
  },
  openGraph: {
    title: getToolMetadata("ai-text-rewriter").title,
    description: getToolMetadata("ai-text-rewriter").description,
    type: "website",
    url: "https://gettoolai.in/tools/ai-text-rewriter",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


