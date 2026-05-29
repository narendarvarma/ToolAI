import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("text-to-speech").title,
  description: getToolMetadata("text-to-speech").description,
  keywords: getToolMetadata("text-to-speech").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/text-to-speech",
  },
  openGraph: {
    title: getToolMetadata("text-to-speech").title,
    description: getToolMetadata("text-to-speech").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/text-to-speech",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


