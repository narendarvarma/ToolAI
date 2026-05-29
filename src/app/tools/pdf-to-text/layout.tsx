import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "PDF to Text - Extract Text from PDF Online Free",
  description: "Free PDF to text extractor tool. Upload PDF, extract all text content instantly. Copy text or download as TXT file. Perfect for students copying notes from PDF.",
  keywords: "PDF to text, extract text from PDF, PDF text extractor, copy PDF text, PDF to TXT",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/tools/pdf-to-text`,
  },
  openGraph: {
    title: "PDF to Text - Extract Text from PDF Online Free",
    description: "Free PDF to text extractor tool. Upload PDF, extract all text content instantly. Copy text or download as TXT file. Perfect for students copying notes from PDF.",
    type: "website",
    url: `${BASE_URL}/tools/pdf-to-text`,
    siteName: "ToolHub AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "PDF to Text - ToolHub AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Text - Extract Text from PDF Online Free",
    description: "Free PDF to text extractor tool. Upload PDF, extract all text content instantly. Copy text or download as TXT file. Perfect for students copying notes from PDF.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
