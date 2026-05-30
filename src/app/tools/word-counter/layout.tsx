import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("word-counter").title,
  description: getToolMetadata("word-counter").description,
  keywords: getToolMetadata("word-counter").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/word-counter",
  },
  openGraph: {
    title: getToolMetadata("word-counter").title,
    description: getToolMetadata("word-counter").description,
    type: "website",
    url: "https://gettoolai.in/tools/word-counter",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


