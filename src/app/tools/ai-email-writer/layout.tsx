import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("ai-email-writer").title,
  description: getToolMetadata("ai-email-writer").description,
  keywords: getToolMetadata("ai-email-writer").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/ai-email-writer",
  },
  openGraph: {
    title: getToolMetadata("ai-email-writer").title,
    description: getToolMetadata("ai-email-writer").description,
    type: "website",
    url: "https://gettoolai.in/tools/ai-email-writer",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


