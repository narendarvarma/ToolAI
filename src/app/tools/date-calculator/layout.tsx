import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("date-calculator").title,
  description: getToolMetadata("date-calculator").description,
  keywords: getToolMetadata("date-calculator").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://gettoolai.in/tools/date-calculator",
  },
  openGraph: {
    title: getToolMetadata("date-calculator").title,
    description: getToolMetadata("date-calculator").description,
    type: "website",
    url: "https://gettoolai.in/tools/date-calculator",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


