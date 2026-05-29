import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("stopwatch").title,
  description: getToolMetadata("stopwatch").description,
  keywords: getToolMetadata("stopwatch").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/stopwatch",
  },
  openGraph: {
    title: getToolMetadata("stopwatch").title,
    description: getToolMetadata("stopwatch").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/stopwatch",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


