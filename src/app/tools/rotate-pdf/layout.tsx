import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("rotate-pdf").title,
  description: getToolMetadata("rotate-pdf").description,
  keywords: getToolMetadata("rotate-pdf").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/rotate-pdf",
  },
  openGraph: {
    title: getToolMetadata("rotate-pdf").title,
    description: getToolMetadata("rotate-pdf").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/rotate-pdf",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


