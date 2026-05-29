import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("file-sharing").title,
  description: getToolMetadata("file-sharing").description,
  keywords: getToolMetadata("file-sharing").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/file-sharing",
  },
  openGraph: {
    title: getToolMetadata("file-sharing").title,
    description: getToolMetadata("file-sharing").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/file-sharing",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


