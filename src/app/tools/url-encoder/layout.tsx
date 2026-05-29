import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("url-encoder").title,
  description: getToolMetadata("url-encoder").description,
  keywords: getToolMetadata("url-encoder").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/url-encoder",
  },
  openGraph: {
    title: getToolMetadata("url-encoder").title,
    description: getToolMetadata("url-encoder").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/url-encoder",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


