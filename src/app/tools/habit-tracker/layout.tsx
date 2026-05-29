import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("habit-tracker").title,
  description: getToolMetadata("habit-tracker").description,
  keywords: getToolMetadata("habit-tracker").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/habit-tracker",
  },
  openGraph: {
    title: getToolMetadata("habit-tracker").title,
    description: getToolMetadata("habit-tracker").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/habit-tracker",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


