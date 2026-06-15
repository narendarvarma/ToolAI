import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Typing Speed Test - Measure Your Typing Speed",
  description: "Free typing speed test. Type the paragraph to measure WPM, accuracy, and errors. Improve your typing skills with instant feedback.",
  keywords: "typing speed test, WPM test, typing practice, typing speed calculator, accuracy test",
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: `${BASE_URL}/tools/typing-speed`,
  },
  openGraph: {
    title: "Typing Speed Test - Measure Your Typing Speed Online Free",
    description: "Free typing speed test tool. Type the given paragraph and measure your WPM (words per minute), accuracy percentage, and errors. Perfect for improving typing skills.",
    type: "website",
    url: `${BASE_URL}/tools/typing-speed`,
    siteName: "ToolHub AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Typing Speed Test - ToolHub AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Typing Speed Test - Measure Your Typing Speed Online Free",
    description: "Free typing speed test tool. Type the given paragraph and measure your WPM (words per minute), accuracy percentage, and errors. Perfect for improving typing skills.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
