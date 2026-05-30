import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("markdown-to-html").title,
  description: getToolMetadata("markdown-to-html").description,
  keywords: getToolMetadata("markdown-to-html").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/markdown-to-html",
  },
  openGraph: {
    title: getToolMetadata("markdown-to-html").title,
    description: getToolMetadata("markdown-to-html").description,
    type: "website",
    url: "https://gettoolai.in/tools/markdown-to-html",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


