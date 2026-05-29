import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("unit-converter").title,
  description: getToolMetadata("unit-converter").description,
  keywords: getToolMetadata("unit-converter").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/unit-converter",
  },
  openGraph: {
    title: getToolMetadata("unit-converter").title,
    description: getToolMetadata("unit-converter").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/unit-converter",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


