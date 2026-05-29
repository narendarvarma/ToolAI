import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("bmi-calculator").title,
  description: getToolMetadata("bmi-calculator").description,
  keywords: getToolMetadata("bmi-calculator").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/bmi-calculator",
  },
  openGraph: {
    title: getToolMetadata("bmi-calculator").title,
    description: getToolMetadata("bmi-calculator").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/bmi-calculator",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


