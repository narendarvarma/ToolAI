import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("color-picker").title,
  description: getToolMetadata("color-picker").description,
  keywords: getToolMetadata("color-picker").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://gettoolai.in/tools/color-picker",
  },
  openGraph: {
    title: getToolMetadata("color-picker").title,
    description: getToolMetadata("color-picker").description,
    type: "website",
    url: "https://gettoolai.in/tools/color-picker",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


