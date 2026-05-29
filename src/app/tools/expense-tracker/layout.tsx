import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("expense-tracker").title,
  description: getToolMetadata("expense-tracker").description,
  keywords: getToolMetadata("expense-tracker").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/expense-tracker",
  },
  openGraph: {
    title: getToolMetadata("expense-tracker").title,
    description: getToolMetadata("expense-tracker").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/expense-tracker",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


