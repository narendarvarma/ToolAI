import type { Metadata } from "next"
import { BASE_URL } from "@/lib/config"
import ContactForm from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact GetTool AI - Support, Feedback & Tool Requests | Get Help",
  description: "Contact GetTool AI for support, feedback, bug reports, or new tool requests. Get help with PDF tools, AI tools, calculators, and more. Response within 24 hours.",
  keywords: "contact GetTool AI, support, feedback, tool requests, bug report, help, customer service, online tools support",
  robots: "index, follow",
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: "Contact GetTool AI - Get Support & Share Feedback",
    description: "Need help? Contact GetTool AI for support, feedback, or tool suggestions. We respond within 24 hours.",
    type: "website",
    url: `${BASE_URL}/contact`,
    siteName: "GetTool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact GetTool AI - Support & Feedback",
    description: "Get help with our free online tools. Contact us for support, feedback, or tool requests.",
  },
}

export default function Contact() {
  return <ContactForm />
}
