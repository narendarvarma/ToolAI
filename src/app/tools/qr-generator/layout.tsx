import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("qr-generator").title,
  description: getToolMetadata("qr-generator").description,
  keywords: getToolMetadata("qr-generator").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/qr-generator",
  },
  openGraph: {
    title: getToolMetadata("qr-generator").title,
    description: getToolMetadata("qr-generator").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/qr-generator",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


