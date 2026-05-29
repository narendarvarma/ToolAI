import { Metadata } from "next"
import Script from "next/script"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("pomodoro-timer").title,
  description: getToolMetadata("pomodoro-timer").description,
  keywords: getToolMetadata("pomodoro-timer").keywords,
  robots: "index, follow",
  alternates: {
    canonical: "https://gettoolai.in/tools/pomodoro-timer",
  },
  openGraph: {
    title: getToolMetadata("pomodoro-timer").title,
    description: getToolMetadata("pomodoro-timer").description,
    type: "website",
    url: "https://gettoolai.in/tools/pomodoro-timer",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


