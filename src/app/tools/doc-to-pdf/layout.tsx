import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("doc-to-pdf").title,
  description: getToolMetadata("doc-to-pdf").description,
  keywords: getToolMetadata("doc-to-pdf").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: `${BASE_URL}/tools/doc-to-pdf`,
  },
  openGraph: {
    title: getToolMetadata("doc-to-pdf").title,
    description: getToolMetadata("doc-to-pdf").description,
    type: "website",
    url: `${BASE_URL}/tools/doc-to-pdf`,
    siteName: "GetTool AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Doc to PDF - GetTool AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: getToolMetadata("doc-to-pdf").title,
    description: getToolMetadata("doc-to-pdf").description,
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
