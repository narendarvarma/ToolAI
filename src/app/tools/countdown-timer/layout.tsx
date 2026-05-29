import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("countdown-timer").title,
  description: getToolMetadata("countdown-timer").description,
  keywords: getToolMetadata("countdown-timer").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/countdown-timer",
  },
  openGraph: {
    title: getToolMetadata("countdown-timer").title,
    description: getToolMetadata("countdown-timer").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/countdown-timer",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


