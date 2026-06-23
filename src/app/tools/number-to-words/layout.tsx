import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Number to Words Converter - Indian & International Format",
  description: "Free number to words converter. Convert numbers to words in Indian and international formats. Supports cheque writing.",
  keywords: "number to words, convert number to words, Indian number format, cheque writing, lakhs crores",
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: `${BASE_URL}/tools/number-to-words`,
  },
  openGraph: {
    title: "Number to Words Converter - Convert Numbers to Words in Indian Format",
    description: "Free number to words converter. Convert numbers to words in Indian and international formats. Supports cheque writing.",
    type: "website",
    url: `${BASE_URL}/tools/number-to-words`,
    siteName: "GetTool AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Number to Words Converter - GetTool AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Number to Words Converter - Convert Numbers to Words in Indian Format",
    description: "Free number to words converter. Convert numbers to words in Indian and international formats. Supports cheque writing.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
