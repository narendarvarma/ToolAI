import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("digital-notes").title,
  description: getToolMetadata("digital-notes").description,
  keywords: getToolMetadata("digital-notes").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://gettoolai.in/tools/digital-notes",
  },
  openGraph: {
    title: getToolMetadata("digital-notes").title,
    description: getToolMetadata("digital-notes").description,
    type: "website",
    url: "https://gettoolai.in/tools/digital-notes",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


