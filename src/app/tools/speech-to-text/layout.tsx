import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("speech-to-text").title,
  description: getToolMetadata("speech-to-text").description,
  keywords: getToolMetadata("speech-to-text").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://gettoolai.in/tools/speech-to-text",
  },
  openGraph: {
    title: getToolMetadata("speech-to-text").title,
    description: getToolMetadata("speech-to-text").description,
    type: "website",
    url: "https://gettoolai.in/tools/speech-to-text",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


