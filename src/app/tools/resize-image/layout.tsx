import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("resize-image").title,
  description: getToolMetadata("resize-image").description,
  keywords: getToolMetadata("resize-image").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/resize-image",
  },
  openGraph: {
    title: getToolMetadata("resize-image").title,
    description: getToolMetadata("resize-image").description,
    type: "website",
    url: "https://gettoolai.in/tools/resize-image",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


