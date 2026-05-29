import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("ai-blog-generator").title,
  description: getToolMetadata("ai-blog-generator").description,
  keywords: getToolMetadata("ai-blog-generator").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/ai-blog-generator",
  },
  openGraph: {
    title: getToolMetadata("ai-blog-generator").title,
    description: getToolMetadata("ai-blog-generator").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/ai-blog-generator",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


