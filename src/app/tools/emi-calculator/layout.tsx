import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "EMI Calculator - Calculate Loan EMI Online",
  description: "Free EMI calculator for Indian users. Calculate monthly EMI, total interest, and total payment for home, car, and personal loans with a clear breakdown.",
  keywords: "EMI calculator, loan calculator, home loan EMI, car loan EMI, personal loan EMI, loan interest calculator",
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: `${BASE_URL}/tools/emi-calculator`,
  },
  openGraph: {
    title: "EMI Calculator - Calculate Loan EMI Online Free",
    description: "Free EMI calculator for Indian users. Calculate monthly EMI, total interest, and total payment for home loan, car loan, personal loan. Show amortization breakdown.",
    type: "website",
    url: `${BASE_URL}/tools/emi-calculator`,
    siteName: "ToolHub AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "EMI Calculator - ToolHub AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EMI Calculator - Calculate Loan EMI Online Free",
    description: "Free EMI calculator for Indian users. Calculate monthly EMI, total interest, and total payment for home loan, car loan, personal loan. Show amortization breakdown.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
