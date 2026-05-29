import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("timezone-converter").title,
  description: getToolMetadata("timezone-converter").description,
  keywords: getToolMetadata("timezone-converter").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://gettoolai.in/tools/timezone-converter",
  },
  openGraph: {
    title: getToolMetadata("timezone-converter").title,
    description: getToolMetadata("timezone-converter").description,
    type: "website",
    url: "https://gettoolai.in/tools/timezone-converter",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


