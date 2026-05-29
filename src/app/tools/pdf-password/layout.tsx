import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "PDF Watermark Protector - Add Watermark to PDF",
  description: "Free PDF watermark protector tool. Upload PDF, add a visual 'PROTECTED DOCUMENT' watermark using pdf-lib. Download watermarked PDF instantly.",
  keywords: "PDF watermark protector, PDF watermark, secure PDF, protect PDF, PDF security",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/tools/pdf-password`,
  },
  openGraph: {
    title: "PDF Watermark Protector - Add Watermark to PDF",
    description: "Free PDF watermark protector tool. Upload PDF, add a visual 'PROTECTED DOCUMENT' watermark using pdf-lib. Download watermarked PDF instantly.",
    type: "website",
    url: `${BASE_URL}/tools/pdf-password`,
    siteName: "ToolHub AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "PDF Watermark Protector - ToolHub AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Watermark Protector - Add Watermark to PDF",
    description: "Free PDF watermark protector tool. Upload PDF, add a visual 'PROTECTED DOCUMENT' watermark using pdf-lib. Download watermarked PDF instantly.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
