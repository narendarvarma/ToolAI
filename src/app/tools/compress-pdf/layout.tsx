import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("compress-pdf").title,
  description: getToolMetadata("compress-pdf").description,
  keywords: getToolMetadata("compress-pdf").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://gettoolai.in/tools/compress-pdf",
  },
  openGraph: {
    title: getToolMetadata("compress-pdf").title,
    description: getToolMetadata("compress-pdf").description,
    type: "website",
    url: "https://gettoolai.in/tools/compress-pdf",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


