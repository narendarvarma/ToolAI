import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("case-converter").title,
  description: getToolMetadata("case-converter").description,
  keywords: getToolMetadata("case-converter").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/case-converter",
  },
  openGraph: {
    title: getToolMetadata("case-converter").title,
    description: getToolMetadata("case-converter").description,
    type: "website",
    url: "https://gettoolai.in/tools/case-converter",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


