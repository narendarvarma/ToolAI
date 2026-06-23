import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Discount Calculator - Calculate Discount & Final Price",
  description: "Free discount calculator. Calculate discount amount, final price after discount, and reverse discount calculation. Perfect for shopping, sales, and offers.",
  keywords: "discount calculator, discount amount, sale calculator, price after discount, reverse discount",
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: `${BASE_URL}/tools/discount-calculator`,
  },
  openGraph: {
    title: "Discount Calculator - Calculate Discount Amount and Final Price",
    description: "Free discount calculator. Calculate discount amount, final price after discount, and reverse discount calculation. Perfect for shopping, sales, and offers.",
    type: "website",
    url: `${BASE_URL}/tools/discount-calculator`,
    siteName: "GetTool AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Discount Calculator - GetTool AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Discount Calculator - Calculate Discount Amount and Final Price",
    description: "Free discount calculator. Calculate discount amount, final price after discount, and reverse discount calculation. Perfect for shopping, sales, and offers.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
