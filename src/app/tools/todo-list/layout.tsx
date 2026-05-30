import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("todo-list").title,
  description: getToolMetadata("todo-list").description,
  keywords: getToolMetadata("todo-list").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/todo-list",
  },
  openGraph: {
    title: getToolMetadata("todo-list").title,
    description: getToolMetadata("todo-list").description,
    type: "website",
    url: "https://gettoolai.in/tools/todo-list",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


