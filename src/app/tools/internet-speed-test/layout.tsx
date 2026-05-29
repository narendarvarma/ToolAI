import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("internet-speed-test").title,
  description: getToolMetadata("internet-speed-test").description,
  keywords: getToolMetadata("internet-speed-test").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/internet-speed-test",
  },
  openGraph: {
    title: getToolMetadata("internet-speed-test").title,
    description: getToolMetadata("internet-speed-test").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/internet-speed-test",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


