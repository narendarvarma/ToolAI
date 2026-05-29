import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("age-calculator").title,
  description: getToolMetadata("age-calculator").description,
  keywords: getToolMetadata("age-calculator").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/age-calculator",
  },
  openGraph: {
    title: getToolMetadata("age-calculator").title,
    description: getToolMetadata("age-calculator").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/age-calculator",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


