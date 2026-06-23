import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "GPA to Percentage Converter - VTU & Mumbai Formula",
  description: "Convert CGPA to percentage using Anna University, VTU, Mumbai University formulas. Instant CGPA conversion for Indian engineering students.",
  keywords: "CGPA to percentage, GPA converter, Anna University CGPA, VTU CGPA, Mumbai University CGPA, engineering students",
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: `${BASE_URL}/tools/gpa-to-percentage`,
  },
  openGraph: {
    title: "GPA to Percentage Converter - Anna University, VTU, Mumbai Formula",
    description: "Convert CGPA to percentage using Anna University, VTU, Mumbai University formulas. Instant CGPA to percentage conversion for Indian engineering students.",
    type: "website",
    url: `${BASE_URL}/tools/gpa-to-percentage`,
    siteName: "GetTool AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "GPA to Percentage Converter - GetTool AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GPA to Percentage Converter - Anna University, VTU, Mumbai Formula",
    description: "Convert CGPA to percentage using Anna University, VTU, Mumbai University formulas. Instant CGPA to percentage conversion for Indian engineering students.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
