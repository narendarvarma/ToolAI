import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("meme-generator").title,
  description: getToolMetadata("meme-generator").description,
  keywords: getToolMetadata("meme-generator").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/meme-generator",
  },
  openGraph: {
    title: getToolMetadata("meme-generator").title,
    description: getToolMetadata("meme-generator").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/meme-generator",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


