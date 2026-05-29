import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("study-planner").title,
  description: getToolMetadata("study-planner").description,
  keywords: getToolMetadata("study-planner").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/study-planner",
  },
  openGraph: {
    title: getToolMetadata("study-planner").title,
    description: getToolMetadata("study-planner").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/study-planner",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


