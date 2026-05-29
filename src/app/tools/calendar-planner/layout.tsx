import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("calendar-planner").title,
  description: getToolMetadata("calendar-planner").description,
  keywords: getToolMetadata("calendar-planner").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://gettoolai.in/tools/calendar-planner",
  },
  openGraph: {
    title: getToolMetadata("calendar-planner").title,
    description: getToolMetadata("calendar-planner").description,
    type: "website",
    url: "https://gettoolai.in/tools/calendar-planner",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


