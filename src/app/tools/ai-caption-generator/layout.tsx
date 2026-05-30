import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("ai-caption-generator").title,
  description: getToolMetadata("ai-caption-generator").description,
  keywords: getToolMetadata("ai-caption-generator").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/ai-caption-generator",
  },
  openGraph: {
    title: getToolMetadata("ai-caption-generator").title,
    description: getToolMetadata("ai-caption-generator").description,
    type: "website",
    url: "https://gettoolai.in/tools/ai-caption-generator",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


