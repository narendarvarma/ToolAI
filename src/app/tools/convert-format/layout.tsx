import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("convert-format").title,
  description: getToolMetadata("convert-format").description,
  keywords: getToolMetadata("convert-format").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/convert-format",
  },
  openGraph: {
    title: getToolMetadata("convert-format").title,
    description: getToolMetadata("convert-format").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/convert-format",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


