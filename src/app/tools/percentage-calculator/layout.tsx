import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Percentage Calculator - Calculate Percentages Instantly",
  description: "Free online percentage calculator for students. Calculate exam marks percentage, reverse percentage, and percentage increase or decrease instantly.",
  keywords: "percentage calculator, marks calculator, exam percentage, percentage increase, percentage decrease, student tools",
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: `${BASE_URL}/tools/percentage-calculator`,
  },
  openGraph: {
    title: "Percentage Calculator - Calculate Marks, Increase, Decrease Instantly",
    description: "Free online percentage calculator for students. Calculate exam marks percentage, reverse percentage, percentage increase/decrease. Instant results for Indian students.",
    type: "website",
    url: `${BASE_URL}/tools/percentage-calculator`,
    siteName: "GetTool AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Percentage Calculator - GetTool AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Percentage Calculator - Calculate Marks, Increase, Decrease Instantly",
    description: "Free online percentage calculator for students. Calculate exam marks percentage, reverse percentage, percentage increase/decrease. Instant results for Indian students.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
