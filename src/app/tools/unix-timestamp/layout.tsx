import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("unix-timestamp").title,
  description: getToolMetadata("unix-timestamp").description,
  keywords: getToolMetadata("unix-timestamp").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/unix-timestamp",
  },
  openGraph: {
    title: getToolMetadata("unix-timestamp").title,
    description: getToolMetadata("unix-timestamp").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/unix-timestamp",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


