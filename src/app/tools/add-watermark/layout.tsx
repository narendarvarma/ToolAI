import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("add-watermark").title,
  description: getToolMetadata("add-watermark").description,
  keywords: getToolMetadata("add-watermark").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/add-watermark",
  },
  openGraph: {
    title: getToolMetadata("add-watermark").title,
    description: getToolMetadata("add-watermark").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/add-watermark",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


