import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Loan Eligibility Calculator - Check Your Loan Eligibility Online",
  description: "Free loan eligibility calculator for Indian users. Calculate maximum loan amount eligible based on monthly salary, existing EMIs, interest rate, and tenure. For home loan, personal loan, education loan.",
  keywords: "loan eligibility calculator, home loan eligibility, personal loan eligibility, loan amount calculator, EMI calculator",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/tools/loan-eligibility`,
  },
  openGraph: {
    title: "Loan Eligibility Calculator - Check Your Loan Eligibility Online",
    description: "Free loan eligibility calculator for Indian users. Calculate maximum loan amount eligible based on monthly salary, existing EMIs, interest rate, and tenure. For home loan, personal loan, education loan.",
    type: "website",
    url: `${BASE_URL}/tools/loan-eligibility`,
    siteName: "ToolHub AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Loan Eligibility Calculator - ToolHub AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loan Eligibility Calculator - Check Your Loan Eligibility Online",
    description: "Free loan eligibility calculator for Indian users. Calculate maximum loan amount eligible based on monthly salary, existing EMIs, interest rate, and tenure. For home loan, personal loan, education loan.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
