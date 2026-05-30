import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("add-watermark").title,
  description: getToolMetadata("add-watermark").description,
  keywords: getToolMetadata("add-watermark").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/add-watermark",
  },
  openGraph: {
    title: getToolMetadata("add-watermark").title,
    description: getToolMetadata("add-watermark").description,
    type: "website",
    url: "https://gettoolai.in/tools/add-watermark",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


