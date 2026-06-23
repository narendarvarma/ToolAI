import { BASE_URL } from "@/lib/config"
import Script from "next/script"
import Link from "next/link"

export const metadata = {
  title: "FAQ - GetTool AI | Answers to Common Questions About Free Online Tools",
  description: "Find answers to frequently asked questions about GetTool AI's 75+ free online tools. Learn about PDF tools, AI tools, calculators, privacy, security, and usage policies. No signup required.",
  keywords: "FAQ GetTool AI, frequently asked questions, online tools FAQ, PDF tools help, AI tools FAQ, calculator help, privacy questions, tool usage guide",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/faq`,
  },
  openGraph: {
    title: "FAQ - GetTool AI | Common Questions About Free Online Tools",
    description: "Get answers to common questions about GetTool AI's free online tools, privacy, security, and usage.",
    type: "website",
    url: `${BASE_URL}/faq`,
    siteName: "GetTool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - GetTool AI | Common Questions Answered",
    description: "Find answers to common questions about our free online tools, privacy, and security.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are all tools on GetTool AI really free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, absolutely! All 75+ tools on GetTool AI are 100% free with no hidden charges, no signup required, and no usage limits."
      }
    },
    {
      "@type": "Question",
      "name": "Is my data safe when using PDF and image tools?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, your data is completely safe. All file processing happens directly in your browser using client-side JavaScript. Your files are never uploaded to our servers."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to create an account to use the tools?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No account is required. All tools work instantly - just open and use. No registration, no personal information needed."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use GetTool AI on my mobile phone?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all tools are fully mobile-responsive and work perfectly on smartphones, tablets, and desktop computers."
      }
    },
    {
      "@type": "Question",
      "name": "How often are new tools added?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We add new tools every week based on user feedback and needs. Check back regularly or follow us on social media for updates."
      }
    },
    {
      "@type": "Question",
      "name": "Are the AI tools free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our AI tools are free with a daily limit. You can use AI Resume Builder, Email Writer, and other AI tools without any cost."
      }
    },
    {
      "@type": "Question",
      "name": "What browsers does GetTool AI support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GetTool AI works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version for best performance."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use the tools for commercial purposes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can use our tools for personal and commercial purposes. However, you cannot redistribute or resell our tools or services."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate are the calculators?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our calculators (CGPA, EMI, GST, BMI, etc.) are designed for accuracy but are intended for informational purposes only. Always verify important calculations independently."
      }
    },
    {
      "@type": "Question",
      "name": "How do I report a bug or request a new tool?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can report bugs or request new tools through our contact page or feedback form. We value user feedback and prioritize popular requests."
      }
    }
  ]
}

export default function FAQ() {
  return (
    <>
      <Script
        id="json-ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[#0B0F1A] py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-white">Frequently Asked Questions</h1>
          <p className="text-gray-400 mb-8">
            Find answers to common questions about GetTool AI's free online tools.
          </p>

          <div className="space-y-4">
            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
              <h2 className="text-xl font-semibold mb-3 text-white">Are all tools on GetTool AI really free?</h2>
              <p className="text-gray-300">
                Yes, absolutely! All 75+ tools on GetTool AI are 100% free with no hidden charges, no signup required, and no usage limits.
              </p>
            </div>

            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
              <h2 className="text-xl font-semibold mb-3 text-white">Is my data safe when using PDF and image tools?</h2>
              <p className="text-gray-300">
                Yes, your data is completely safe. All file processing happens directly in your browser using client-side JavaScript. Your files are never uploaded to our servers.
              </p>
            </div>

            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
              <h2 className="text-xl font-semibold mb-3 text-white">Do I need to create an account to use the tools?</h2>
              <p className="text-gray-300">
                No account is required. All tools work instantly - just open and use. No registration, no personal information needed.
              </p>
            </div>

            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
              <h2 className="text-xl font-semibold mb-3 text-white">Can I use GetTool AI on my mobile phone?</h2>
              <p className="text-gray-300">
                Yes, all tools are fully mobile-responsive and work perfectly on smartphones, tablets, and desktop computers.
              </p>
            </div>

            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
              <h2 className="text-xl font-semibold mb-3 text-white">How often are new tools added?</h2>
              <p className="text-gray-300">
                We add new tools every week based on user feedback and needs. Check back regularly or follow us on social media for updates.
              </p>
            </div>

            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
              <h2 className="text-xl font-semibold mb-3 text-white">Are the AI tools free to use?</h2>
              <p className="text-gray-300">
                Yes, our AI tools are free with a daily limit. You can use AI Resume Builder, Email Writer, and other AI tools without any cost.
              </p>
            </div>

            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
              <h2 className="text-xl font-semibold mb-3 text-white">What browsers does GetTool AI support?</h2>
              <p className="text-gray-300">
                GetTool AI works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version for best performance.
              </p>
            </div>

            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
              <h2 className="text-xl font-semibold mb-3 text-white">Can I use the tools for commercial purposes?</h2>
              <p className="text-gray-300">
                Yes, you can use our tools for personal and commercial purposes. However, you cannot redistribute or resell our tools or services.
              </p>
            </div>

            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
              <h2 className="text-xl font-semibold mb-3 text-white">How accurate are the calculators?</h2>
              <p className="text-gray-300">
                Our calculators (CGPA, EMI, GST, BMI, etc.) are designed for accuracy but are intended for informational purposes only. Always verify important calculations independently.
              </p>
            </div>

            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
              <h2 className="text-xl font-semibold mb-3 text-white">How do I report a bug or request a new tool?</h2>
              <p className="text-gray-300">
                You can report bugs or request new tools through our <Link href="/contact" className="text-[#00E5FF] hover:underline">contact page</Link> or <Link href="/feedback" className="text-[#00E5FF] hover:underline">feedback form</Link>. We value user feedback and prioritize popular requests.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-[#00E5FF]/10 to-[#7C4DFF]/10 rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Still have questions?</h2>
            <p className="text-gray-300 mb-6">
              Can't find the answer you're looking for? Please reach out to us directly.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
