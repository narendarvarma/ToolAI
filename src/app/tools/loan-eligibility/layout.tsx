import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Loan Eligibility Calculator - Check Loan Eligibility",
  description: "Free loan eligibility calculator. Calculate maximum loan amount using salary, EMIs, interest rate, and tenure for home, personal, or education loans.",
  keywords: "loan eligibility calculator, home loan eligibility, personal loan eligibility, loan amount calculator, EMI calculator",
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: `${BASE_URL}/tools/loan-eligibility`,
  },
  openGraph: {
    title: "Loan Eligibility Calculator - Check Your Loan Eligibility Online",
    description: "Free loan eligibility calculator. Calculate maximum loan amount using salary, EMIs, interest rate, and tenure for home, personal, or education loans.",
    type: "website",
    url: `${BASE_URL}/tools/loan-eligibility`,
    siteName: "GetTool AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Loan Eligibility Calculator - GetTool AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loan Eligibility Calculator - Check Your Loan Eligibility",
    description: "Free loan eligibility calculator. Calculate maximum loan amount using salary, EMIs, interest rate, and tenure for home, personal, or education loans.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
