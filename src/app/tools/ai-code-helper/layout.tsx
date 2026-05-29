import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("ai-code-helper").title,
  description: getToolMetadata("ai-code-helper").description,
  keywords: getToolMetadata("ai-code-helper").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/ai-code-helper",
  },
  openGraph: {
    title: getToolMetadata("ai-code-helper").title,
    description: getToolMetadata("ai-code-helper").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/ai-code-helper",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


