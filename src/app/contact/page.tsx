import type { Metadata } from "next"
import { BASE_URL } from "@/lib/config"
import ContactForm from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact ToolHub AI - Support, Feedback & Tool Suggestions",
  description: "Get in touch with ToolHub AI for feedback, support, or tool suggestions. We're here to help.",
  keywords: "contact, support, feedback, tool suggestions, ToolHub AI",
  robots: "index, follow",
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: "Contact — ToolHub AI",
    description: "Get in touch with ToolHub AI for feedback, support, or tool suggestions. We're here to help.",
    type: "website",
    url: `${BASE_URL}/contact`,
    siteName: "ToolHub AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — ToolHub AI",
    description: "Get in touch with ToolHub AI for feedback, support, or tool suggestions. We're here to help.",
  },
}

export default function Contact() {
  return <ContactForm />
}
