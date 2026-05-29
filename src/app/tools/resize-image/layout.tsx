import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("resize-image").title,
  description: getToolMetadata("resize-image").description,
  keywords: getToolMetadata("resize-image").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/resize-image",
  },
  openGraph: {
    title: getToolMetadata("resize-image").title,
    description: getToolMetadata("resize-image").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/resize-image",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


