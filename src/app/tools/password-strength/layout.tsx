import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("password-strength").title,
  description: getToolMetadata("password-strength").description,
  keywords: getToolMetadata("password-strength").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/password-strength",
  },
  openGraph: {
    title: getToolMetadata("password-strength").title,
    description: getToolMetadata("password-strength").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/password-strength",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


