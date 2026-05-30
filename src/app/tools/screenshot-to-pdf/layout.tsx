import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Screenshot to PDF - Convert Images to PDF Online Free",
  description: "Free screenshot to PDF converter tool. Upload multiple images (PNG/JPG), arrange order, convert to PDF with each image as a page. Download final PDF. Perfect for students submitting assignments.",
  keywords: "screenshot to PDF, images to PDF, JPG to PDF, PNG to PDF, photo to PDF",
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: `${BASE_URL}/tools/screenshot-to-pdf`,
  },
  openGraph: {
    title: "Screenshot to PDF - Convert Images to PDF Online Free",
    description: "Free screenshot to PDF converter tool. Upload multiple images (PNG/JPG), arrange order, convert to PDF with each image as a page. Download final PDF. Perfect for students submitting assignments.",
    type: "website",
    url: `${BASE_URL}/tools/screenshot-to-pdf`,
    siteName: "ToolHub AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Screenshot to PDF - ToolHub AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Screenshot to PDF - Convert Images to PDF Online Free",
    description: "Free screenshot to PDF converter tool. Upload multiple images (PNG/JPG), arrange order, convert to PDF with each image as a page. Download final PDF. Perfect for students submitting assignments.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
