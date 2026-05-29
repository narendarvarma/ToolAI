import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("background-remover").title,
  description: getToolMetadata("background-remover").description,
  keywords: getToolMetadata("background-remover").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/background-remover",
  },
  openGraph: {
    title: getToolMetadata("background-remover").title,
    description: getToolMetadata("background-remover").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/background-remover",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


