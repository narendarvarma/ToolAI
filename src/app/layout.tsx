import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import dynamic from "next/dynamic"
import { BASE_URL } from "@/lib/config"
import Script from "next/script"
import StructuredData, { generateOrganizationSchema, generateWebSiteSchema } from "@/components/structured-data"

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })
const Footer = dynamic(() => import("@/components/footer"), { ssr: false })
const CookieBanner = dynamic(() => import("@/components/cookie-banner"), { ssr: false })
const DailyLimitPopup = dynamic(() => import("@/components/daily-limit-popup"), { ssr: false })

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "GetTool AI - 75+ Free Online Tools | PDF, Image, AI, Student & Productivity Tools",
  description: "Access 75+ free online tools at GetTool AI. Convert PDF to image, merge PDF, compress files, AI resume builder, CGPA calculator, image editor, and more. No signup required. Fast, secure, and works on all devices.",
  keywords: "free online tools, PDF converter, merge PDF, compress PDF, image editor, AI resume builder, CGPA calculator, student tools, productivity tools, no signup, online utilities",
  robots: "index, follow",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "GetTool AI - 75+ Free Online Tools for Everyone",
    description: "Free online tools for PDF editing, image processing, AI assistance, student calculators, and productivity. No signup required. Fast, secure, and works on all devices.",
    type: "website",
    url: BASE_URL,
    siteName: "GetTool AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "GetTool AI - Free Online Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GetTool AI - 75+ Free Online Tools",
    description: "Free online tools for PDF, images, AI, students, and productivity. No signup required. Fast and secure.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

// Use metadataBase so Next.js can generate page-specific canonicals when
// child pages provide their own metadata or when `generateMetadata` builds URLs.
export const metadataBase = new URL(BASE_URL)

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
        <meta name="google-adsense-account" content="ca-pub-8360124149016637" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8360124149016637" crossOrigin="anonymous"></script>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
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
          }}
        />
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
        <DailyLimitPopup />
        <StructuredData type="Organization" data={generateOrganizationSchema()} />
        <StructuredData type="WebSite" data={generateWebSiteSchema(BASE_URL)} />
      </body>
    </html>
  )
}
