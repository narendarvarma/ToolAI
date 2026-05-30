import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("uuid-generator").title,
  description: getToolMetadata("uuid-generator").description,
  keywords: getToolMetadata("uuid-generator").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/uuid-generator",
  },
  openGraph: {
    title: getToolMetadata("uuid-generator").title,
    description: getToolMetadata("uuid-generator").description,
    type: "website",
    url: "https://gettoolai.in/tools/uuid-generator",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


