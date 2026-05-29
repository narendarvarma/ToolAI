import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("base64-encoder").title,
  description: getToolMetadata("base64-encoder").description,
  keywords: getToolMetadata("base64-encoder").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/base64-encoder",
  },
  openGraph: {
    title: getToolMetadata("base64-encoder").title,
    description: getToolMetadata("base64-encoder").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/base64-encoder",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


