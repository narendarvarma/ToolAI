import type { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Terms & Conditions — ToolHub AI",
  description: "ToolHub AI Terms & Conditions. Learn the rules for using our free online tools, including AdSense, privacy, and acceptable use policies.",
  keywords: "terms and conditions, service agreement, toolhub ai, adsense policy, privacy",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/terms`,
  },
  openGraph: {
    title: "Terms & Conditions — ToolHub AI",
    description: "ToolHub AI Terms & Conditions. Learn the rules for using our free online tools, including AdSense, privacy, and acceptable use policies.",
    type: "website",
    url: `${BASE_URL}/terms`,
    siteName: "ToolHub AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions — ToolHub AI",
    description: "ToolHub AI Terms & Conditions. Learn the rules for using our free online tools, including AdSense, privacy, and acceptable use policies.",
  }
}

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white">Terms & Conditions</h1>
        <p className="text-gray-400 mb-8">Last updated: June 2026</p>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Agreement to Terms</h2>
            <p className="text-gray-300">
              By accessing and using ToolHub AI, you agree to be bound by these Terms & Conditions. If you disagree with any part of these terms, you may not access our services.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Use License</h2>
            <p className="text-gray-300 mb-4">
              Permission is granted to use ToolHub AI for personal, non-commercial purposes. You may not:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>• Modify or copy the materials</li>
              <li>• Use the materials for any commercial purpose</li>
              <li>• Reverse engineer any software</li>
              <li>• Remove any copyright notices</li>
            </ul>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">User Responsibilities</h2>
            <p className="text-gray-300 mb-4">
              You agree to use our services responsibly and in accordance with all applicable laws and regulations.
            </p>
            <p className="text-gray-300">
              You must not use our services for any illegal purpose, including but not limited to copyright infringement, fraud, or harassment.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Privacy and Data Processing</h2>
            <p className="text-gray-300 mb-4">
              Most of our tools process data entirely in your browser. Your files, documents, and personal information never leave your device unless explicitly stated.
            </p>
            <p className="text-gray-300">
              For more information about how we handle your data, please refer to our <a href="/privacy" className="text-[#00E5FF] hover:underline">Privacy Policy</a>.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Third-Party Services and AdSense</h2>
            <p className="text-gray-300 mb-4">
              ToolHub AI uses third-party services including Google AdSense for advertising and Google Analytics for website analytics. These services may collect information according to their own privacy policies.
            </p>
            <p className="text-gray-300 mb-4">
              By using our website, you consent to the collection and use of information by these third-party services as described in their respective privacy policies.
            </p>
            <p className="text-gray-300">
              We are not responsible for the privacy practices or content of these third-party sites.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Disclaimer</h2>
            <p className="text-gray-300">
              The materials on ToolHub AI are provided "as is". We make no warranties, expressed or implied, and hereby disclaim all warranties including, without limitation, implied warranties of merchantability and fitness for a particular purpose.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Limitations</h2>
            <p className="text-gray-300">
              In no event shall ToolHub AI be liable for any damages arising out of the use or inability to use the materials on our website.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Accuracy of Materials</h2>
            <p className="text-gray-300">
              The materials on ToolHub AI could include technical, typographical, or photographic errors. We do not warrant that any materials are accurate, complete, or current.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Modifications</h2>
            <p className="text-gray-300">
              ToolHub AI may revise these terms at any time. By using this website, you agree to be bound by the current version of these Terms & Conditions.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Governing Law</h2>
            <p className="text-gray-300">
              These terms are governed by and construed in accordance with the laws of the jurisdiction in which ToolHub AI operates.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have questions about these Terms & Conditions, please contact us at:
            </p>
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Email:</strong> servicestoolai@gmail.com
            </p>
            <a href="/contact" className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
