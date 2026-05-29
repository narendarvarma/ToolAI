import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("word-counter").title,
  description: getToolMetadata("word-counter").description,
  keywords: getToolMetadata("word-counter").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/word-counter",
  },
  openGraph: {
    title: getToolMetadata("word-counter").title,
    description: getToolMetadata("word-counter").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/word-counter",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


