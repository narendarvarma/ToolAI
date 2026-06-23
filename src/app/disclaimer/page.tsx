import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Disclaimer - GetTool AI | Tool Accuracy, Data Processing & Legal Disclaimer",
  description: "GetTool AI Disclaimer - Tools provided as is without warranty. Learn about calculator accuracy, data processing, professional advice disclaimer, and AdSense advertising disclaimer.",
  keywords: "disclaimer, legal disclaimer, calculator accuracy, data processing disclaimer, professional advice disclaimer, AdSense disclaimer, GetTool AI disclaimer",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/disclaimer`,
  },
  openGraph: {
    title: "Disclaimer — GetTool AI | Legal & Accuracy Disclaimer",
    description: "GetTool AI Disclaimer. Tools provided as is without warranty. Calculator accuracy and data processing disclaimers.",
    type: "website",
    url: `${BASE_URL}/disclaimer`,
    siteName: "GetTool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Disclaimer — GetTool AI | Legal Disclaimer",
    description: "GetTool AI Disclaimer. Tools provided as is without warranty. Calculator accuracy and AdSense disclaimers.",
  },
}

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Disclaimer</h1>
        
        <div className="bg-[#111827] rounded-2xl p-8 border border-white/8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">General Disclaimer</h2>
            <p className="text-gray-300 leading-relaxed">
              All tools provided on GetTool AI are offered "as is" without any warranties, express or implied. We make no representations or warranties of any kind regarding the accuracy, reliability, or completeness of any tool or information provided on this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Calculator Accuracy</h2>
            <p className="text-gray-300 leading-relaxed">
              While we strive to ensure the accuracy of our calculators (including CGPA, EMI, GST, percentage, and other calculation tools), we provide no warranty regarding the correctness of results. These calculators are intended for informational and educational purposes only. Users should verify all calculations independently before making any financial, academic, or other important decisions based on the results.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Processing</h2>
            <p className="text-gray-300 leading-relaxed">
              All file processing for PDF and image tools is performed entirely in your browser. Your files are never uploaded to our servers. However, we are not responsible for any data loss, corruption, or other issues that may occur during file processing. Users should always keep backups of important files before using any file manipulation tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">External Links</h2>
            <p className="text-gray-300 leading-relaxed">
              Our website may contain links to external websites that are not operated by us. We have no control over the content, nature, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Professional Advice Disclaimer</h2>
            <p className="text-gray-300 leading-relaxed">
              The calculators and tools provided on GetTool AI are not substitutes for professional financial, medical, legal, or other professional advice. Our calculators (including EMI, loan eligibility, BMI, calorie, and similar tools) are for informational purposes only and should not be used as the sole basis for making important decisions. Always consult with qualified professionals for financial, medical, legal, or other professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">AI Tools</h2>
            <p className="text-gray-300 leading-relaxed">
              Our AI-powered tools (including AI Resume Builder, AI Email Writer, AI Assignment Helper, AI Grammar Fixer, and others) use artificial intelligence to generate content. AI-generated content may contain errors, inaccuracies, or inappropriate content. Users should review and verify all AI-generated content before use. We are not responsible for any consequences arising from the use of AI-generated content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Advertising Disclaimer</h2>
            <p className="text-gray-300 leading-relaxed">
              GetTool AI uses Google AdSense to display advertisements on our website. We do not endorse the products, services, or websites advertised through Google AdSense. The content of advertisements is not under our control, and we are not responsible for any claims made in third-party advertisements. Users interact with advertisements at their own risk.
            </p>
            <p className="text-gray-300 leading-relaxed mt-2">
              Google AdSense uses cookies to serve ads based on your prior visits to this website or other websites. You may opt out of personalized advertising by visiting Google's Ads Settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              In no event shall GetTool AI or its owners, employees, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our tools or website. This includes, but is not limited to, damages for loss of profits, data, goodwill, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Disclaimer</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify this disclaimer at any time. Changes will be posted on this page with an updated revision date. Your continued use of our tools after any changes constitutes acceptance of the updated disclaimer.
            </p>
          </section>

          <section className="pt-6 border-t border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
            <div className="space-y-2 text-gray-300">
              <p><strong className="text-white">Email:</strong> servicestoolai@gmail.com</p>
              <p><strong className="text-white">Website:</strong> https://gettoolai.in</p>
              <p><strong className="text-white">Twitter:</strong> @Gettoolai</p>
              <p><strong className="text-white">LinkedIn:</strong> https://linkedin.com/company/gettoolai</p>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Last Updated: June 23, 2026
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="text-[#00E5FF] hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
