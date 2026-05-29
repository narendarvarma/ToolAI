import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("lorem-ipsum").title,
  description: getToolMetadata("lorem-ipsum").description,
  keywords: getToolMetadata("lorem-ipsum").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/lorem-ipsum",
  },
  openGraph: {
    title: getToolMetadata("lorem-ipsum").title,
    description: getToolMetadata("lorem-ipsum").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/lorem-ipsum",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


