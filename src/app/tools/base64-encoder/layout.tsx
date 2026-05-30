import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("base64-encoder").title,
  description: getToolMetadata("base64-encoder").description,
  keywords: getToolMetadata("base64-encoder").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/base64-encoder",
  },
  openGraph: {
    title: getToolMetadata("base64-encoder").title,
    description: getToolMetadata("base64-encoder").description,
    type: "website",
    url: "https://gettoolai.in/tools/base64-encoder",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


