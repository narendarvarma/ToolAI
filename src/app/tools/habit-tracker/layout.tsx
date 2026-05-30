import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("habit-tracker").title,
  description: getToolMetadata("habit-tracker").description,
  keywords: getToolMetadata("habit-tracker").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/habit-tracker",
  },
  openGraph: {
    title: getToolMetadata("habit-tracker").title,
    description: getToolMetadata("habit-tracker").description,
    type: "website",
    url: "https://gettoolai.in/tools/habit-tracker",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


