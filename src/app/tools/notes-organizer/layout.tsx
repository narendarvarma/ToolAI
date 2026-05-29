import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("notes-organizer").title,
  description: getToolMetadata("notes-organizer").description,
  keywords: getToolMetadata("notes-organizer").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/notes-organizer",
  },
  openGraph: {
    title: getToolMetadata("notes-organizer").title,
    description: getToolMetadata("notes-organizer").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/notes-organizer",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


