import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("ai-study-assistant").title,
  description: getToolMetadata("ai-study-assistant").description,
  keywords: getToolMetadata("ai-study-assistant").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/ai-study-assistant",
  },
  openGraph: {
    title: getToolMetadata("ai-study-assistant").title,
    description: getToolMetadata("ai-study-assistant").description,
    type: "website",
    url: "https://gettoolai.in/tools/ai-study-assistant",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


