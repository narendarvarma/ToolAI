import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("bmi-calculator").title,
  description: getToolMetadata("bmi-calculator").description,
  keywords: getToolMetadata("bmi-calculator").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/bmi-calculator",
  },
  openGraph: {
    title: getToolMetadata("bmi-calculator").title,
    description: getToolMetadata("bmi-calculator").description,
    type: "website",
    url: "https://gettoolai.in/tools/bmi-calculator",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


