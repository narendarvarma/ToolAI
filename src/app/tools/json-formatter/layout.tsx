import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("json-formatter").title,
  description: getToolMetadata("json-formatter").description,
  keywords: getToolMetadata("json-formatter").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/json-formatter",
  },
  openGraph: {
    title: getToolMetadata("json-formatter").title,
    description: getToolMetadata("json-formatter").description,
    type: "website",
    url: "https://gettoolai.in/tools/json-formatter",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


