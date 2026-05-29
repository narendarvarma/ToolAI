import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("ai-image-enhancer").title,
  description: getToolMetadata("ai-image-enhancer").description,
  keywords: getToolMetadata("ai-image-enhancer").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/ai-image-enhancer",
  },
  openGraph: {
    title: getToolMetadata("ai-image-enhancer").title,
    description: getToolMetadata("ai-image-enhancer").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/ai-image-enhancer",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


