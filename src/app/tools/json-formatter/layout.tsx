import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("json-formatter").title,
  description: getToolMetadata("json-formatter").description,
  keywords: getToolMetadata("json-formatter").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/json-formatter",
  },
  openGraph: {
    title: getToolMetadata("json-formatter").title,
    description: getToolMetadata("json-formatter").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/json-formatter",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


