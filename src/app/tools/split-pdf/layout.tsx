import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("split-pdf").title,
  description: getToolMetadata("split-pdf").description,
  keywords: getToolMetadata("split-pdf").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/split-pdf",
  },
  openGraph: {
    title: getToolMetadata("split-pdf").title,
    description: getToolMetadata("split-pdf").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/split-pdf",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


