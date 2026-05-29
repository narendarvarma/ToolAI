import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("regex-tester").title,
  description: getToolMetadata("regex-tester").description,
  keywords: getToolMetadata("regex-tester").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/regex-tester",
  },
  openGraph: {
    title: getToolMetadata("regex-tester").title,
    description: getToolMetadata("regex-tester").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/regex-tester",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


