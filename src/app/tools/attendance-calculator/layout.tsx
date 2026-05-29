import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("attendance-calculator").title,
  description: getToolMetadata("attendance-calculator").description,
  keywords: getToolMetadata("attendance-calculator").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://gettoolai.in/tools/attendance-calculator",
  },
  openGraph: {
    title: getToolMetadata("attendance-calculator").title,
    description: getToolMetadata("attendance-calculator").description,
    type: "website",
    url: "https://gettoolai.in/tools/attendance-calculator",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


