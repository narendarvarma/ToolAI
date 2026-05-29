import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("json-to-csv").title,
  description: getToolMetadata("json-to-csv").description,
  keywords: getToolMetadata("json-to-csv").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/json-to-csv",
  },
  openGraph: {
    title: getToolMetadata("json-to-csv").title,
    description: getToolMetadata("json-to-csv").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/json-to-csv",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


