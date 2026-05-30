import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("calorie-calculator").title,
  description: getToolMetadata("calorie-calculator").description,
  keywords: getToolMetadata("calorie-calculator").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/calorie-calculator",
  },
  openGraph: {
    title: getToolMetadata("calorie-calculator").title,
    description: getToolMetadata("calorie-calculator").description,
    type: "website",
    url: "https://gettoolai.in/tools/calorie-calculator",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


