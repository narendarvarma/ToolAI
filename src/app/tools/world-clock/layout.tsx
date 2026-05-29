import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("world-clock").title,
  description: getToolMetadata("world-clock").description,
  keywords: getToolMetadata("world-clock").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://gettoolai.in/tools/world-clock",
  },
  openGraph: {
    title: getToolMetadata("world-clock").title,
    description: getToolMetadata("world-clock").description,
    type: "website",
    url: "https://gettoolai.in/tools/world-clock",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


