import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("image-compressor").title,
  description: getToolMetadata("image-compressor").description,
  keywords: getToolMetadata("image-compressor").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/image-compressor",
  },
  openGraph: {
    title: getToolMetadata("image-compressor").title,
    description: getToolMetadata("image-compressor").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/image-compressor",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


