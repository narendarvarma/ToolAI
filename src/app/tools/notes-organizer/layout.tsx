import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("notes-organizer").title,
  description: getToolMetadata("notes-organizer").description,
  keywords: getToolMetadata("notes-organizer").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/notes-organizer",
  },
  openGraph: {
    title: getToolMetadata("notes-organizer").title,
    description: getToolMetadata("notes-organizer").description,
    type: "website",
    url: "https://gettoolai.in/tools/notes-organizer",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


