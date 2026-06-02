import { Metadata } from "next"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("internship-finder").title,
  description: getToolMetadata("internship-finder").description,
  keywords: getToolMetadata("internship-finder").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/internship-finder",
  },
  openGraph: {
    title: getToolMetadata("internship-finder").title,
    description: getToolMetadata("internship-finder").description,
    type: "website",
    url: "https://gettoolai.in/tools/internship-finder",
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
