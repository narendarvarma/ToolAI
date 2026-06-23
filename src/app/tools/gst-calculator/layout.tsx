import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "GST Calculator - Calculate GST Amount Online Free",
  description: "Free GST calculator for Indian users. Calculate GST amount, final price with GST, and reverse GST calculation. Support for 5%, 12%, 18%, 28% GST rates.",
  keywords: "GST calculator, GST calculation, Indian GST, GST amount, reverse GST, GST rates",
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: `${BASE_URL}/tools/gst-calculator`,
  },
  openGraph: {
    title: "GST Calculator - Calculate GST Amount Online Free",
    description: "Free GST calculator for Indian users. Calculate GST amount, final price with GST, and reverse GST calculation. Support for 5%, 12%, 18%, 28% GST rates.",
    type: "website",
    url: `${BASE_URL}/tools/gst-calculator`,
    siteName: "GetTool AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "GST Calculator - GetTool AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GST Calculator - Calculate GST Amount Online Free",
    description: "Free GST calculator for Indian users. Calculate GST amount, final price with GST, and reverse GST calculation. Support for 5%, 12%, 18%, 28% GST rates.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
