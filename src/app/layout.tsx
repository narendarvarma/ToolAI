import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CookieConsent from "@/components/cookie-consent"
import { BASE_URL } from "@/lib/config"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "ToolHub AI - Free Online Tools for PDF, Images, AI & More",
  description: "66+ free online tools for PDF editing, image processing, AI assistance, student tools, productivity, and utilities. Fast, secure, and no signup required.",
  keywords: "online tools, PDF tools, image tools, AI tools, student tools, productivity tools, free tools",
  robots: "index, follow",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "ToolHub AI - Free Online Tools",
    description: "66+ free online tools for PDF, images, AI, students, productivity, and utilities.",
    type: "website",
    url: BASE_URL,
    siteName: "ToolHub AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ToolHub AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolHub AI - Free Online Tools",
    description: "66+ free online tools for PDF, images, AI, students, productivity, and utilities.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
