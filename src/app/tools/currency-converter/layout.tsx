import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("currency-converter").title,
  description: getToolMetadata("currency-converter").description,
  keywords: getToolMetadata("currency-converter").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/currency-converter",
  },
  openGraph: {
    title: getToolMetadata("currency-converter").title,
    description: getToolMetadata("currency-converter").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/currency-converter",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


