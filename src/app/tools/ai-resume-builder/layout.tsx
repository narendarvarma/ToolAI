import { Metadata } from "next"
import Script from "next/script"
import StructuredData, { generateSoftwareApplicationSchema, generateBreadcrumbSchema, generateOrganizationSchema } from "@/components/structured-data"
import { getToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = {
  title: getToolMetadata("ai-resume-builder").title,
  description: getToolMetadata("ai-resume-builder").description,
  keywords: getToolMetadata("ai-resume-builder").keywords,
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://gettoolai.in/tools/ai-resume-builder",
  },
  openGraph: {
    title: getToolMetadata("ai-resume-builder").title,
    description: getToolMetadata("ai-resume-builder").description,
    type: "website",
    url: "https://gettoolai.in/tools/ai-resume-builder",
    siteName: "ToolHub AI",
    images: [
      {
        url: "https://gettoolai.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolHub AI - AI Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: getToolMetadata("ai-resume-builder").title,
    description: getToolMetadata("ai-resume-builder").description,
    images: ["https://gettoolai.in/og-image.png"],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const toolSlug = "ai-resume-builder"
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
          metadata.category || "AI Tools",
          "Web"
        )}
      />
      
      {/* Breadcrumb Schema */}
      <StructuredData
        type="BreadcrumbList"
        data={generateBreadcrumbSchema([
          { name: "Home", url: "https://gettoolai.in" },
          { name: "Tools", url: "https://gettoolai.in/tools" },
          { name: "AI Resume Builder", url: metadata.canonical }
        ])}
      />
      
      {children}
    </>
  )
}


