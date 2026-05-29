import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("tip-calculator").title,
  description: getToolMetadata("tip-calculator").description,
  keywords: getToolMetadata("tip-calculator").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://gettoolai.in/tools/tip-calculator",
  },
  openGraph: {
    title: getToolMetadata("tip-calculator").title,
    description: getToolMetadata("tip-calculator").description,
    type: "website",
    url: "https://gettoolai.in/tools/tip-calculator",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


