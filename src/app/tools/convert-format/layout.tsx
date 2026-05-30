import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("convert-format").title,
  description: getToolMetadata("convert-format").description,
  keywords: getToolMetadata("convert-format").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/convert-format",
  },
  openGraph: {
    title: getToolMetadata("convert-format").title,
    description: getToolMetadata("convert-format").description,
    type: "website",
    url: "https://gettoolai.in/tools/convert-format",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


