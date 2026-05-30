import { Metadata } from "next"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("image-to-pdf").title,
  description: getToolMetadata("image-to-pdf").description,
  keywords: getToolMetadata("image-to-pdf").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/image-to-pdf",
  },
  openGraph: {
    title: getToolMetadata("image-to-pdf").title,
    description: getToolMetadata("image-to-pdf").description,
    type: "website",
    url: "https://gettoolai.in/tools/image-to-pdf",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


