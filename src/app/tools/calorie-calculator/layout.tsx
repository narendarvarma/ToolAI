import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("calorie-calculator").title,
  description: getToolMetadata("calorie-calculator").description,
  keywords: getToolMetadata("calorie-calculator").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/calorie-calculator",
  },
  openGraph: {
    title: getToolMetadata("calorie-calculator").title,
    description: getToolMetadata("calorie-calculator").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/calorie-calculator",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


