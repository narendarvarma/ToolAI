import { Metadata } from "next"
import Script from "next/script"
import StructuredData, { generateSoftwareApplicationSchema, generateBreadcrumbSchema, generateOrganizationSchema } from "@/components/structured-data"
import { getToolMetadata } from "@/lib/tool-metadata"

const toolMeta = getToolMetadata("cgpa-calculator")

export const metadata: Metadata = {
  title: toolMeta.title,
  description: toolMeta.description,
  keywords: toolMeta.keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: toolMeta.canonical,
  },
  openGraph: {
    title: toolMeta.title,
    description: toolMeta.description,
    type: "website",
    url: toolMeta.ogUrl,
    siteName: "ToolHub AI",
    images: [
      {
        url: "https://gettoolai.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolHub AI - CGPA Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: toolMeta.title,
    description: toolMeta.description,
    images: ["https://gettoolai.in/og-image.png"],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const toolSlug = "cgpa-calculator"
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
          metadata.category || "Student Tools",
          "Web"
        )}
      />
      
      {/* Breadcrumb Schema */}
      <StructuredData
        type="BreadcrumbList"
        data={generateBreadcrumbSchema([
          { name: "Home", url: "https://gettoolai.in" },
          { name: "Tools", url: "https://gettoolai.in/tools" },
          { name: "CGPA Calculator", url: metadata.canonical }
        ])}
      />
      
      {children}
    </>
  )
}


