import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("html-entity-encoder").title,
  description: getToolMetadata("html-entity-encoder").description,
  keywords: getToolMetadata("html-entity-encoder").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/html-entity-encoder",
  },
  openGraph: {
    title: getToolMetadata("html-entity-encoder").title,
    description: getToolMetadata("html-entity-encoder").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/html-entity-encoder",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


