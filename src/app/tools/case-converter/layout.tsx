import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("case-converter").title,
  description: getToolMetadata("case-converter").description,
  keywords: getToolMetadata("case-converter").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/case-converter",
  },
  openGraph: {
    title: getToolMetadata("case-converter").title,
    description: getToolMetadata("case-converter").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/case-converter",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


