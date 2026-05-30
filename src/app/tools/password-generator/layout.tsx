import { Metadata } from "next"
import { getToolMetadata } from "@/lib/tool-metadata"
import Script from "next/script"

export const metadata: Metadata = {
  title: getToolMetadata("password-generator").title,
  description: getToolMetadata("password-generator").description,
  keywords: getToolMetadata("password-generator").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/password-generator",
  },
  openGraph: {
    title: getToolMetadata("password-generator").title,
    description: getToolMetadata("password-generator").description,
    type: "website",
    url: "https://gettoolai.in/tools/password-generator",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Password Generator",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  }

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}

