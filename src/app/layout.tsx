import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import dynamic from "next/dynamic"
import { BASE_URL } from "@/lib/config"
import Script from "next/script"

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })
const Footer = dynamic(() => import("@/components/footer"), { ssr: false })
const CookieBanner = dynamic(() => import("@/components/cookie-banner"), { ssr: false })

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "ToolHub AI - Free Online Tools for PDF, Images, AI & More",
  description: "75+ free online tools for PDF editing, image processing, AI assistance, student tools, productivity, and utilities. Fast, secure, and no signup required.",
  keywords: "online tools, PDF tools, image tools, AI tools, student tools, productivity tools, free tools",
  robots: "index, follow",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "ToolHub AI - Free Online Tools",
    description: "75+ free online tools for PDF, images, AI, students, productivity, and utilities.",
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
    description: "75+ free online tools for PDF, images, AI, students, productivity, and utilities.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B0F1A",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const theme = localStorage.getItem('toolhub_theme');
              if (theme === 'light') {
                document.documentElement.classList.remove('dark');
              } else {
                document.documentElement.classList.add('dark');
              }
            })();
          `
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --bg-primary: #0B0F1A;
              --bg-secondary: #1a2035;
              --bg-card: #1e293b;
              --text-primary: #f1f5f9;
              --text-secondary: #94a3b8;
              --border: #334155;
            }
            html.dark {
              --bg-primary: #0B0F1A;
              --bg-secondary: #1a2035;
              --bg-card: #1e293b;
              --text-primary: #f1f5f9;
              --text-secondary: #94a3b8;
              --border: #334155;
            }
            html:not(.dark) {
              --bg-primary: #ffffff;
              --bg-secondary: #f8fafc;
              --bg-card: #ffffff;
              --text-primary: #0f172a;
              --text-secondary: #64748b;
              --border: #e2e8f0;
            }
          `
        }} />
      </head>
      <body className={inter.className}>
        {/* Google Analytics Placeholder */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YN68514BXY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YN68514BXY');
          `}
        </Script>
        <Navbar />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
