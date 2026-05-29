import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("todo-list").title,
  description: getToolMetadata("todo-list").description,
  keywords: getToolMetadata("todo-list").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://magnificent-nougat-9be2d0.netlify.app/tools/todo-list",
  },
  openGraph: {
    title: getToolMetadata("todo-list").title,
    description: getToolMetadata("todo-list").description,
    type: "website",
    url: "https://magnificent-nougat-9be2d0.netlify.app/tools/todo-list",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


