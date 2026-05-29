import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("timetable-generator").title,
  description: getToolMetadata("timetable-generator").description,
  keywords: getToolMetadata("timetable-generator").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/timetable-generator",
  },
  openGraph: {
    title: getToolMetadata("timetable-generator").title,
    description: getToolMetadata("timetable-generator").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/timetable-generator",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


