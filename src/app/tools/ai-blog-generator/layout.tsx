import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("ai-blog-generator").title,
  description: getToolMetadata("ai-blog-generator").description,
  keywords: getToolMetadata("ai-blog-generator").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/ai-blog-generator",
  },
  openGraph: {
    title: getToolMetadata("ai-blog-generator").title,
    description: getToolMetadata("ai-blog-generator").description,
    type: "website",
    url: "https://gettoolai.in/tools/ai-blog-generator",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


