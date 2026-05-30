import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("text-to-speech").title,
  description: getToolMetadata("text-to-speech").description,
  keywords: getToolMetadata("text-to-speech").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/text-to-speech",
  },
  openGraph: {
    title: getToolMetadata("text-to-speech").title,
    description: getToolMetadata("text-to-speech").description,
    type: "website",
    url: "https://gettoolai.in/tools/text-to-speech",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


