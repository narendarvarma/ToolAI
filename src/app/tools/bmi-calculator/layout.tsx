import { Metadata } from "next"
import Script from "next/script"
import StructuredData, { generateSoftwareApplicationSchema, generateBreadcrumbSchema, generateOrganizationSchema } from "@/components/structured-data"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("bmi-calculator").title,
  description: getToolMetadata("bmi-calculator").description,
  keywords: getToolMetadata("bmi-calculator").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/bmi-calculator",
  },
  openGraph: {
    title: getToolMetadata("bmi-calculator").title,
    description: getToolMetadata("bmi-calculator").description,
    type: "website",
    url: "https://gettoolai.in/tools/bmi-calculator",
    siteName: "ToolHub AI",
    images: [
      {
        url: "https://gettoolai.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolHub AI - BMI Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: getToolMetadata("bmi-calculator").title,
    description: getToolMetadata("bmi-calculator").description,
    images: ["https://gettoolai.in/og-image.png"],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const toolSlug = "bmi-calculator"
  const metadata = getToolMetadata(toolSlug)
  
  return (
    <>
      {/* Organization Schema */}
      <StructuredData
        type="Organization"
        data={generateOrganizationSchema()}
      />
      
      {/* SoftwareApplication Schema */}
      <StructuredData
        type="SoftwareApplication"
        data={generateSoftwareApplicationSchema(
          metadata.title,
          metadata.description,
          metadata.canonical,
          metadata.category || "Utility Tools",
          "Web"
        )}
      />
      
      {/* Breadcrumb Schema */}
      <StructuredData
        type="BreadcrumbList"
        data={generateBreadcrumbSchema([
          { name: "Home", url: "https://gettoolai.in" },
          { name: "Tools", url: "https://gettoolai.in/tools" },
          { name: "BMI Calculator", url: metadata.canonical }
        ])}
      />
      
      {children}
    </>
  )
}


