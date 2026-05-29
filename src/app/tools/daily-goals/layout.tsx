import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("daily-goals").title,
  description: getToolMetadata("daily-goals").description,
  keywords: getToolMetadata("daily-goals").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/daily-goals",
  },
  openGraph: {
    title: getToolMetadata("daily-goals").title,
    description: getToolMetadata("daily-goals").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/daily-goals",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


