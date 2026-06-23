import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cookie Policy - GetTool AI | How We Use Cookies & Your Privacy",
  description: "GetTool AI Cookie Policy - Learn about essential, analytics, and advertising cookies. Understand how we use Google Analytics and AdSense cookies. Opt-out options available.",
  keywords: "cookie policy, cookies usage, Google Analytics cookies, AdSense cookies, cookie consent, privacy cookies, GetTool AI cookie policy",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/cookie-policy`,
  },
  openGraph: {
    title: "Cookie Policy — GetTool AI | Cookie Usage & Privacy",
    description: "GetTool AI Cookie Policy. Learn about essential, analytics, and advertising cookies. Opt-out options available.",
    type: "website",
    url: `${BASE_URL}/cookie-policy`,
    siteName: "GetTool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy — GetTool AI | Cookie Usage",
    description: "GetTool AI Cookie Policy. Learn about cookies we use and how to control your preferences.",
  },
}

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Cookie Policy</h1>
        
        <div className="bg-[#111827] rounded-2xl p-8 border border-white/8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">What Are Cookies?</h2>
            <p className="text-gray-300 leading-relaxed">
              Cookies are small text files that are stored on your device when you visit a website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Types of Cookies We Use</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[#00E5FF] mb-2">Essential Cookies</h3>
                <p className="text-gray-300 leading-relaxed">
                  These cookies are necessary for the website to function properly. They enable basic functionality such as page navigation, access to secure areas, and remembering your cookie consent preferences. Without these cookies, the website cannot work correctly.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#00E5FF] mb-2">Analytics Cookies</h3>
                <p className="text-gray-300 leading-relaxed">
                  We use Google Analytics to understand how visitors interact with our website. These cookies help us analyze user behavior, track the number of visitors, and measure the effectiveness of our tools. The data collected is anonymous and aggregated.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#00E5FF] mb-2">Advertising Cookies</h3>
                <p className="text-gray-300 leading-relaxed">
                  When enabled, we use Google AdSense to display relevant advertisements. These cookies track your browsing habits across websites to show you ads that are more relevant to your interests. You can opt out of these cookies through your browser settings or our cookie consent banner.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Why We Use Cookies</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
              <li>To remember your cookie consent preferences</li>
              <li>To analyze website traffic and improve our tools</li>
              <li>To understand which tools are most popular</li>
              <li>To serve relevant advertisements (when enabled)</li>
              <li>To provide a better user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Cookies</h2>
            <p className="text-gray-300 leading-relaxed">
              We use the following third-party services that may set cookies on your device:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed mt-4">
              <li><strong>Google Analytics:</strong> For website analytics and user behavior tracking</li>
              <li><strong>Google AdSense:</strong> For displaying relevant advertisements (when enabled)</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              These third-party services have their own privacy policies and cookie policies. We encourage you to review their policies for more information about how they use cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">How to Control Cookies</h2>
            <p className="text-gray-300 leading-relaxed">
              You can control and manage cookies in various ways:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed mt-4">
              <li><strong>Browser Settings:</strong> Most web browsers allow you to control cookies through their settings. You can block all cookies, accept only first-party cookies, or delete existing cookies.</li>
              <li><strong>Cookie Consent Banner:</strong> Our cookie consent banner allows you to accept or reject non-essential cookies. Your preference is saved and respected on future visits.</li>
              <li><strong>Mobile Devices:</strong> You can also control cookies on mobile devices through your browser settings.</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              Please note that blocking or deleting cookies may affect your user experience and some features of our website may not function properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Your Consent</h2>
            <p className="text-gray-300 leading-relaxed">
              By continuing to use our website, you consent to our use of cookies as described in this policy. You can withdraw or change your consent at any time by adjusting your browser settings or using our cookie consent banner.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Updates to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this cookie policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the updated policy on this page with a revised "Last Updated" date.
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
