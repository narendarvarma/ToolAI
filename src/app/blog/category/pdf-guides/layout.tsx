import type { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "PDF Guides - GetTool AI | Master PDF Manipulation Tools",
  description: "GetTool AI PDF Guides - Master PDF manipulation with our comprehensive guides. Learn to merge, split, compress, edit, and convert PDF files using free online tools.",
  keywords: "PDF guides, PDF tools tutorial, merge PDF guide, split PDF tutorial, compress PDF guide, edit PDF tips, PDF conversion guide, GetTool AI PDF guides",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/blog/category/pdf-guides`,
  },
  openGraph: {
    title: "PDF Guides — GetTool AI | PDF Tools Tutorials",
    description: "Master PDF manipulation with our comprehensive guides. Learn to merge, split, compress, and edit PDF files.",
    type: "website",
    url: `${BASE_URL}/blog/category/pdf-guides`,
    siteName: "GetTool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Guides — GetTool AI | PDF Tools Tutorials",
    description: "Master PDF manipulation with our comprehensive guides and tutorials.",
  }
}

export default function PDFGuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
