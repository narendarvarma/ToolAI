import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("pdf-to-image").title,
  description: getToolMetadata("pdf-to-image").description,
  keywords: getToolMetadata("pdf-to-image").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/pdf-to-image",
  },
  openGraph: {
    title: getToolMetadata("pdf-to-image").title,
    description: getToolMetadata("pdf-to-image").description,
    type: "website",
    url: "https://gettoolai.in/tools/pdf-to-image",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


