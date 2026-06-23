import { BASE_URL } from "@/lib/config"
import Script from "next/script"

export const metadata = {
  title: "About GetTool AI - Free Online Tools Platform | Our Mission & Story",
  description: "Learn about GetTool AI - a free online tools platform offering 75+ tools for PDF, images, AI, students, and productivity. Discover our mission to make professional tools accessible to everyone without signup or fees.",
  keywords: "GetTool AI about, free online tools platform, mission statement, founder story, privacy-first tools, no signup tools, student tools, productivity tools",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: "About GetTool AI - Our Mission to Provide Free Online Tools",
    description: "GetTool AI offers 75+ free online tools with no signup. Learn about our mission, founder story, and commitment to privacy and accessibility.",
    url: `${BASE_URL}/about`,
    siteName: "GetTool AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "GetTool AI - About Us"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "About GetTool AI - Free Online Tools Platform",
    description: "75+ free tools, no signup required. Learn about our mission to make productivity tools accessible to everyone.",
    images: [`${BASE_URL}/og-image.png`]
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About GetTool AI",
  "description": "Learn about GetTool AI's mission to provide free, professional online tools. Discover our founder's story, values, and commitment to privacy and accessibility.",
  "url": `${BASE_URL}/about`,
  "publisher": {
    "@type": "Organization",
    "name": "GetTool AI",
    "url": BASE_URL,
    "logo": `${BASE_URL}/logo.png`
  }
}

export default function About() {
  return (
    <>
      <Script
        id="json-ld-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[#0B0F1A] py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-white">About GetTool AI</h1>

          <div className="prose prose-invert max-w-none">
            {/* Who We Are */}
            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">Who We Are</h2>
              <p className="text-gray-300 mb-4">
                GetTool AI is a free online tools platform dedicated to making professional-grade productivity tools accessible to everyone. Founded in 2024, we provide 75+ tools across 6 categories including PDF manipulation, image editing, AI-powered features, student utilities, productivity boosters, and everyday utilities.
              </p>
              <p className="text-gray-300">
                Our platform is built on three core principles: privacy, simplicity, and accessibility. We believe that powerful tools shouldn't require registration, payment, or technical expertise. Whether you're a student, professional, or casual user, GetTool AI has the tools you need to get things done efficiently.
              </p>
            </div>

            {/* Founder Story */}
            <div className="bg-gradient-to-r from-[#00E5FF]/20 to-[#7C4DFF]/20 rounded-2xl p-8 border border-[#00E5FF]/30 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">👨‍💻 The Founder's Story</h2>
              <p className="text-gray-300 mb-4">
                GetTool AI was born from a simple frustration: finding reliable, free online tools shouldn't be difficult. As a student and developer, I constantly needed tools for PDF editing, image conversion, calculations, and more — but was tired of navigating through countless websites with ads, sign-ups, and hidden fees.
              </p>
              <p className="text-gray-300 mb-4">
                In 2024, I decided to build something different — a single platform that brings together all the essential tools anyone might need, completely free and accessible. What started as a personal project quickly grew into a platform used by thousands of students, professionals, and everyday users.
              </p>
              <p className="text-gray-300">
                Today, GetTool AI hosts 75+ tools across 6 categories, and we're constantly adding new features based on your feedback. Our mission remains the same: to make productivity tools accessible to everyone, everywhere. As of 2026, we continue to expand our tool library and improve user experience based on community feedback.
              </p>
            </div>

            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                GetTool AI is dedicated to providing professional, free online tools for everyone. We believe that productivity tools should be accessible, fast, and easy to use.
              </p>
              <p className="text-gray-300">
                Our platform brings together 75+ tools across multiple categories including PDF manipulation, image editing, AI-powered features, student utilities, productivity boosters, and everyday utilities. We're committed to maintaining a privacy-first approach where your data stays on your device.
              </p>
            </div>

            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">Why GetTool AI</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#00E5FF]">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">100% Free Forever</h3>
                    <p className="text-gray-400 text-sm">All tools are completely free with no hidden charges, no signup, and no usage limits.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#00E5FF]">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Privacy First</h3>
                    <p className="text-gray-400 text-sm">All file processing happens in your browser. We never upload or store your data.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#00E5FF]">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">No Registration Required</h3>
                    <p className="text-gray-400 text-sm">Use any tool instantly without creating an account or providing personal information.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#00E5FF]">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Client-Side Processing</h3>
                    <p className="text-gray-400 text-sm">PDF and image tools process files locally in your browser for maximum privacy and speed.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#00E5FF]">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Fast & Reliable</h3>
                    <p className="text-gray-400 text-sm">Tools are optimized for speed and work reliably on all devices.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">What We Offer</h2>
              <ul className="space-y-3 text-gray-300">
                <li>• <strong className="text-white">PDF Tools:</strong> Merge, split, compress, and manipulate PDF files</li>
                <li>• <strong className="text-white">Image Tools:</strong> Edit, convert, and enhance images with AI</li>
                <li>• <strong className="text-white">AI Tools:</strong> Generate content, write emails, and get study assistance</li>
                <li>• <strong className="text-white">Student Tools:</strong> Calculators, planners, and study aids</li>
                <li>• <strong className="text-white">Productivity Tools:</strong> Manage tasks, track habits, and stay organized</li>
                <li>• <strong className="text-white">Utility Tools:</strong> Everyday helpers for conversions and calculations</li>
              </ul>
            </div>

            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-white mb-2">Clean & Fast</h3>
                  <p className="text-gray-400 text-sm">No clutter, no ads overload. Just tools that work.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Free Forever</h3>
                  <p className="text-gray-400 text-sm">All tools are free to use with no hidden costs.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Privacy First</h3>
                  <p className="text-gray-400 text-sm">Your data stays on your device. We don't store it.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">Our Vision</h2>
              <p className="text-gray-300 mb-4">
                We're just getting started. Our vision is to become the go-to platform for anyone looking for free, professional online tools. We plan to:
              </p>
              <ul className="space-y-3 text-gray-300">
                <li>• Expand our tool library to 200+ tools across more categories</li>
                <li>• Add more AI-powered features for enhanced productivity</li>
                <li>• Improve mobile experience with dedicated mobile apps</li>
                <li>• Introduce collaborative features for teams and students</li>
                <li>• Build a community around learning and productivity</li>
              </ul>
            </div>

            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">Contact Information</h2>
              <div className="space-y-3 text-gray-300">
                <p><strong className="text-white">Email:</strong> servicestoolai@gmail.com</p>
                <p><strong className="text-white">Website:</strong> https://gettoolai.in</p>
                <p><strong className="text-white">Twitter:</strong> @Gettoolai</p>
                <p><strong className="text-white">LinkedIn:</strong> https://linkedin.com/company/gettoolai</p>
                <p><strong className="text-white">Location:</strong> India</p>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
              <h2 className="text-2xl font-semibold mb-4 text-white">Contact Us</h2>
              <p className="text-gray-300 mb-4">
                Have questions or feedback? We'd love to hear from you.
              </p>
              <a href="/contact" className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
