import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

const toolMeta = getToolMetadata("cgpa-calculator")

export const metadata: Metadata = {
  title: toolMeta.title,
  description: toolMeta.description,
  keywords: toolMeta.keywords,
  robots: "index, follow",
  alternates: {
    canonical: toolMeta.canonical,
  },
  openGraph: {
    title: toolMeta.title,
    description: toolMeta.description,
    type: "website",
    url: toolMeta.ogUrl,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


