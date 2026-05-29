import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("merge-pdf").title,
  description: getToolMetadata("merge-pdf").description,
  keywords: getToolMetadata("merge-pdf").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/merge-pdf",
  },
  openGraph: {
    title: getToolMetadata("merge-pdf").title,
    description: getToolMetadata("merge-pdf").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/merge-pdf",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


