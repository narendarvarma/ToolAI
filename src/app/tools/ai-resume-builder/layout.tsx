import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("ai-resume-builder").title,
  description: getToolMetadata("ai-resume-builder").description,
  keywords: getToolMetadata("ai-resume-builder").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/ai-resume-builder",
  },
  openGraph: {
    title: getToolMetadata("ai-resume-builder").title,
    description: getToolMetadata("ai-resume-builder").description,
    type: "website",
    url: "https://gettoolai.in/tools/ai-resume-builder",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


