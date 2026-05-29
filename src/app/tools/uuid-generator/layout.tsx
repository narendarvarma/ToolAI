import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("uuid-generator").title,
  description: getToolMetadata("uuid-generator").description,
  keywords: getToolMetadata("uuid-generator").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/uuid-generator",
  },
  openGraph: {
    title: getToolMetadata("uuid-generator").title,
    description: getToolMetadata("uuid-generator").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/uuid-generator",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


