import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Image to Base64 Converter - Convert Images to Base64",
  description: "Free image to Base64 converter. Upload an image, convert it instantly, preview the result, and copy the base64 string for development or sharing.",
  keywords: "image to base64, base64 converter, image encoder, base64 string, image to data URL",
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: `${BASE_URL}/tools/image-to-base64`,
  },
  openGraph: {
    title: "Image to Base64 Converter - Convert Images to Base64 String",
    description: "Free image to base64 converter tool. Upload any image, instantly convert to base64 string. Copy base64, see image preview, check file size. Perfect for developers and students.",
    type: "website",
    url: `${BASE_URL}/tools/image-to-base64`,
    siteName: "ToolHub AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Image to Base64 Converter - ToolHub AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to Base64 Converter - Convert Images to Base64 String",
    description: "Free image to base64 converter tool. Upload any image, instantly convert to base64 string. Copy base64, see image preview, check file size. Perfect for developers and students.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
