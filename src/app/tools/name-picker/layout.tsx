import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Random Name Picker - Pick a Winner Online",
  description: "Free random name picker tool. Enter names, click to pick a winner, remove selected entries, and use it for giveaways, classrooms, or group decisions.",
  keywords: "random name picker, random winner picker, name generator, random selector, group picker",
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: `${BASE_URL}/tools/name-picker`,
  },
  openGraph: {
    title: "Random Name Picker - Pick Random Winner Online Free",
    description: "Free random name picker tool. Enter names separated by commas or newlines, click to pick random winner. Animation effect. Remove winner option for multiple picks. Great for teachers and group projects.",
    type: "website",
    url: `${BASE_URL}/tools/name-picker`,
    siteName: "GetTool AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Random Name Picker - GetTool AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Name Picker - Pick Random Winner Online Free",
    description: "Free random name picker tool. Enter names separated by commas or newlines, click to pick random winner. Animation effect. Remove winner option for multiple picks. Great for teachers and group projects.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
