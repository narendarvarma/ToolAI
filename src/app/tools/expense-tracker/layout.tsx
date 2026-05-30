import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("expense-tracker").title,
  description: getToolMetadata("expense-tracker").description,
  keywords: getToolMetadata("expense-tracker").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/expense-tracker",
  },
  openGraph: {
    title: getToolMetadata("expense-tracker").title,
    description: getToolMetadata("expense-tracker").description,
    type: "website",
    url: "https://gettoolai.in/tools/expense-tracker",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


