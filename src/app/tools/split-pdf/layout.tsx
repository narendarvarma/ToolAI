import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("split-pdf").title,
  description: getToolMetadata("split-pdf").description,
  keywords: getToolMetadata("split-pdf").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/split-pdf",
  },
  openGraph: {
    title: getToolMetadata("split-pdf").title,
    description: getToolMetadata("split-pdf").description,
    type: "website",
    url: "https://gettoolai.in/tools/split-pdf",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


