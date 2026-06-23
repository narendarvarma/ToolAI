import { Metadata } from "next"
import Script from "next/script"
import StructuredData, { generateSoftwareApplicationSchema, generateBreadcrumbSchema, generateOrganizationSchema } from "@/components/structured-data"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("attendance-calculator").title,
  description: getToolMetadata("attendance-calculator").description,
  keywords: getToolMetadata("attendance-calculator").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/attendance-calculator",
  },
  openGraph: {
    title: getToolMetadata("attendance-calculator").title,
    description: getToolMetadata("attendance-calculator").description,
    type: "website",
    url: "https://gettoolai.in/tools/attendance-calculator",
    siteName: "GetTool AI",
    images: [
      {
        url: "https://gettoolai.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "GetTool AI - Attendance Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: getToolMetadata("attendance-calculator").title,
    description: getToolMetadata("attendance-calculator").description,
    images: ["https://gettoolai.in/og-image.png"],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const toolSlug = "attendance-calculator"
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
          { name: "Attendance Calculator", url: metadata.canonical }
        ])}
      />
      
      {children}
    </>
  )
}


