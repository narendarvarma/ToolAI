import type { Metadata } from "next"
import { BASE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Privacy Policy - GetTool AI | Data Protection, Cookies & User Privacy",
  description: "GetTool AI Privacy Policy - Learn how we protect your data, use cookies, handle Google Analytics, AdSense, and ensure user privacy. All file processing happens in your browser. No data uploads.",
  keywords: "privacy policy, data protection, cookie policy, Google Analytics, AdSense privacy, user privacy, browser-side processing, no data upload, GetTool AI privacy",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy - GetTool AI | Data Protection & User Privacy",
    description: "Learn how GetTool AI protects your data. All file processing happens in your browser. No data uploads to servers.",
    type: "website",
    url: `${BASE_URL}/privacy`,
    siteName: "GetTool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — GetTool AI | Your Data Stays Private",
    description: "GetTool AI Privacy Policy. All file processing happens in your browser. We never upload your data.",
  }
}

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: June 23, 2026</p>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Introduction</h2>
            <p className="text-gray-300 mb-4">
              GetTool AI ("we", "our", or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, process, and safeguard your information when you use our website at https://gettoolai.in and our free online tools.
            </p>
            <p className="text-gray-300 mb-4">
              GetTool AI provides 75+ free online tools including PDF tools, image tools, AI tools, student tools, productivity tools, and utility tools. Our mission is to make professional-grade tools accessible to everyone without requiring registration or payment.
            </p>
            <p className="text-gray-300">
              By using our website and services, you agree to the collection and use of information in accordance with this Privacy Policy. If you disagree with any part of this policy, please do not use our services.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-2 text-white">Client-Side Processing (No Server Uploads)</h3>
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Important:</strong> Most of our tools process data entirely in your browser using client-side JavaScript. This means:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li>• Your files, documents, images, and personal information <strong className="text-white">never leave your device</strong></li>
              <li>• No data is uploaded to our servers unless explicitly stated for a specific tool</li>
              <li>• Your files are not stored, shared, or accessed by anyone</li>
              <li>• Processing happens locally on your computer or mobile device</li>
            </ul>
            <p className="text-gray-300 mb-4">
              This applies to our PDF tools (merge, split, compress), image tools (resize, convert, compress), and most utility tools. Your data remains completely private and secure on your device.
            </p>
            
            <h3 className="text-xl font-semibold mb-2 mt-6 text-white">Usage Data and Analytics</h3>
            <p className="text-gray-300 mb-4">
              We collect anonymous usage data to improve our services and user experience. This may include:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li>• Page views and tool usage statistics</li>
              <li>• Browser type and version</li>
              <li>• Operating system</li>
              <li>• Referring website</li>
              <li>• Time spent on pages</li>
              <li>• Device information (mobile, desktop, tablet)</li>
            </ul>
            <p className="text-gray-300">
              This data is collected through Google Analytics and is anonymous. We do not collect personally identifiable information through analytics unless you voluntarily provide it.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-6 text-white">Contact Information</h3>
            <p className="text-gray-300 mb-4">
              If you voluntarily contact us through our contact form or email, we may collect:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>• Your name (if provided)</li>
              <li>• Your email address</li>
              <li>• Your message or feedback</li>
            </ul>
            <p className="text-gray-300 mt-4">
              We use this information solely to respond to your inquiries and improve our services. We do not sell or share your contact information with third parties.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li>• <strong className="text-white">To provide and maintain our services</strong> - Ensuring our tools work correctly and efficiently</li>
              <li>• <strong className="text-white">To improve user experience</strong> - Analyzing usage patterns to enhance tool functionality</li>
              <li>• <strong className="text-white">To analyze usage patterns</strong> - Understanding which tools are most popular and how they're used</li>
              <li>• <strong className="text-white">To detect and prevent technical issues</strong> - Identifying bugs, errors, and performance issues</li>
              <li>• <strong className="text-white">To serve personalized advertisements</strong> - Displaying relevant ads through Google AdSense</li>
              <li>• <strong className="text-white">To respond to user inquiries</strong> - Providing support and answering questions</li>
              <li>• <strong className="text-white">To comply with legal obligations</strong> - Meeting regulatory requirements when applicable</li>
            </ul>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Cookies and Tracking Technologies</h2>
            <p className="text-gray-300 mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and serve personalized advertisements. By using our website, you consent to our use of cookies.
            </p>
            
            <h3 className="text-xl font-semibold mb-2 text-white">Types of Cookies We Use</h3>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li>• <strong className="text-white">Essential Cookies:</strong> Required for the website to function properly. These cannot be disabled.</li>
              <li>• <strong className="text-white">Analytics Cookies:</strong> Help us understand how visitors use our website through Google Analytics. These collect anonymous data about user behavior.</li>
              <li>• <strong className="text-white">Advertising Cookies:</strong> Used by Google AdSense to serve personalized advertisements based on your browsing history and interests.</li>
              <li>• <strong className="text-white">Preference Cookies:</strong> Enable us to remember your settings and preferences for a better user experience.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-6 text-white">Cookie Consent</h3>
            <p className="text-gray-300 mb-4">
              We use a cookie consent banner that allows you to:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li>• Accept all cookies</li>
              <li>• Reject non-essential cookies</li>
              <li>• Customize your cookie preferences</li>
            </ul>
            <p className="text-gray-300">
              You can also control cookie settings through your browser preferences. Please note that disabling essential cookies may affect the functionality of our website.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Google AdSense Advertising</h2>
            <p className="text-gray-300 mb-4">
              We use Google AdSense to display advertisements on our website. Google AdSense uses cookies and web beacons to serve ads based on your prior visits to this website or other websites.
            </p>
            
            <h3 className="text-xl font-semibold mb-2 text-white">Google's Use of Cookies</h3>
            <p className="text-gray-300 mb-4">
              Google uses the DoubleClick DART cookie to serve ads based on your visit to our site and other sites on the Internet. This cookie may track your browsing behavior across different websites to show you relevant advertisements.
            </p>

            <h3 className="text-xl font-semibold mb-2 text-white">Personalized Advertising</h3>
            <p className="text-gray-300 mb-4">
              Google AdSense may use cookies to serve personalized ads based on your interests and browsing history. This helps show you advertisements that are more relevant to you.
            </p>

            <h3 className="text-xl font-semibold mb-2 text-white">Opt-Out of Personalized Advertising</h3>
            <p className="text-gray-300 mb-4">
              You have the right to opt out of personalized advertising. To do so:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li>• Visit <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#00E5FF] hover:underline">Google Ads Settings</a> to manage your ad personalization preferences</li>
              <li>• Visit the <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-[#00E5FF] hover:underline">Network Advertising Initiative</a> opt-out page</li>
              <li>• Adjust your browser settings to block third-party cookies</li>
            </ul>
            <p className="text-gray-300">
              Please note that opting out of personalized advertising does not mean you will no longer see advertisements. You will still see ads, but they may not be personalized to your interests.
            </p>

            <h3 className="text-xl font-semibold mb-4 mt-6 text-white">Google's Privacy Policy</h3>
            <p className="text-gray-300 mb-4">
              For more information on how Google uses information from sites that use its services, please visit:
            </p>
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-[#00E5FF] hover:underline">
              https://policies.google.com/technologies/partner-sites
            </a>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Google Analytics</h2>
            <p className="text-gray-300 mb-4">
              We use Google Analytics to analyze how visitors use our website. Google Analytics uses cookies to collect anonymous data such as:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li>• How often users visit our site</li>
              <li>• What pages they visit and in what order</li>
              <li>• How long they spend on each page</li>
              <li>• What tools they use most frequently</li>
              <li>• Geographic location (country/region level only)</li>
            </ul>
            <p className="text-gray-300 mb-4">
              This data helps us understand user behavior and improve our services. Google Analytics does not collect personally identifiable information.
            </p>
            <p className="text-gray-300">
              You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#00E5FF] hover:underline">Google Analytics Opt-out Browser Add-on</a>.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">AI Tools and Third-Party APIs</h2>
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Important Security Notice:</strong> Some of our AI-powered tools (such as AI Resume Builder, AI Email Writer, AI Grammar Fixer, AI LinkedIn Bio) use third-party AI APIs to process your input.
            </p>
            <p className="text-gray-300 mb-4">
              For these specific AI tools:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li>• Your text input is sent to third-party AI service providers for processing</li>
              <li>• These providers may have their own privacy policies and data handling practices</li>
              <li>• We do not control how these third parties use or store your data</li>
              <li>• <strong className="text-white">Do not upload confidential, sensitive, or personal information</strong> to AI tools</li>
            </ul>
            <p className="text-gray-300 mb-4">
              We recommend:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>• Avoid including personal names, addresses, phone numbers, or financial information in AI tool inputs</li>
              <li>• Do not upload confidential business documents or proprietary information</li>
              <li>• Review the output before using it for important purposes</li>
              <li>• Use AI tools for general assistance and inspiration, not for critical decisions</li>
            </ul>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Data Retention</h2>
            <p className="text-gray-300 mb-4">
              Our data retention practices are as follows:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li>• <strong className="text-white">Client-side processed data:</strong> No data is retained on our servers. All processing happens in your browser.</li>
              <li>• <strong className="text-white">Analytics data:</strong> Google Analytics retains data according to Google's data retention policy (typically 26 months by default).</li>
              <li>• <strong className="text-white">Contact information:</strong> We retain contact form submissions only as long as necessary to respond to your inquiry (typically up to 1 year).</li>
              <li>• <strong className="text-white">AI tool inputs:</strong> We do not store AI tool inputs on our servers. However, third-party AI providers may retain data according to their own policies.</li>
            </ul>
            <p className="text-gray-300">
              We do not sell, rent, or trade your personal information to third parties for marketing purposes.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Data Security</h2>
            <p className="text-gray-300 mb-4">
              We implement appropriate security measures to protect your information:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li>• <strong className="text-white">Client-side processing:</strong> Most tools process data locally in your browser, eliminating server-side security risks.</li>
              <li>• <strong className="text-white">SSL/TLS encryption:</strong> All data transmitted between our website and your browser is encrypted.</li>
              <li>• <strong className="text-white">Secure third-party services:</strong> We only use reputable third-party services (Google, established AI providers) with strong security practices.</li>
              <li>• <strong className="text-white">Access controls:</strong> Access to any stored data is strictly limited to authorized personnel.</li>
            </ul>
            <p className="text-gray-300 mb-4">
              However, please note that:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>• No method of transmission over the internet is 100% secure</li>
              <li>• We cannot guarantee absolute security of information transmitted to third-party services</li>
              <li>• You are responsible for maintaining the security of your own device and browser</li>
            </ul>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Your Rights (GDPR/CCPA Compliance)</h2>
            <p className="text-gray-300 mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li>• <strong className="text-white">Right to Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li>• <strong className="text-white">Right to Correction:</strong> Request correction of inaccurate or incomplete information.</li>
              <li>• <strong className="text-white">Right to Deletion:</strong> Request deletion of your personal information (where legally applicable).</li>
              <li>• <strong className="text-white">Right to Portability:</strong> Request transfer of your data to another service.</li>
              <li>• <strong className="text-white">Right to Object:</strong> Object to processing of your personal information.</li>
              <li>• <strong className="text-white">Right to Restrict Processing:</strong> Request restriction of how your information is used.</li>
              <li>• <strong className="text-white">Right to Withdraw Consent:</strong> Withdraw consent for cookies and data processing at any time.</li>
            </ul>
            <p className="text-gray-300 mb-4">
              To exercise these rights, please contact us using the information provided in the "Contact Us" section below. We will respond to your request within 30 days.
            </p>
            <p className="text-gray-300">
              Please note that certain rights may not apply if processing is necessary for legal compliance or legitimate business interests.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Children's Privacy</h2>
            <p className="text-gray-300 mb-4">
              Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13.
            </p>
            <p className="text-gray-300 mb-4">
              If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. We will take steps to delete such information from our records.
            </p>
            <p className="text-gray-300">
              Parents and guardians should supervise their children's online activities and ensure they do not provide personal information without parental consent.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Third-Party Services</h2>
            <p className="text-gray-300 mb-4">
              We use the following third-party services to operate our website and provide our services. These services may collect information according to their own privacy policies:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li>• <strong className="text-white">Google AdSense:</strong> For advertising. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#00E5FF] hover:underline">Privacy Policy</a></li>
              <li>• <strong className="text-white">Google Analytics:</strong> For website analytics. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#00E5FF] hover:underline">Privacy Policy</a></li>
              <li>• <strong className="text-white">AI Service Providers:</strong> For AI-powered tools. Each provider has its own privacy policy.</li>
            </ul>
            <p className="text-gray-300">
              We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review their privacy policies before using their services.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">External Links Disclaimer</h2>
            <p className="text-gray-300 mb-4">
              Our website may contain links to third-party websites, tools, or resources. These links are provided for your convenience and do not signify our endorsement of those websites.
            </p>
            <p className="text-gray-300 mb-4">
              We are not responsible for the privacy practices, content, or policies of third-party websites. When you click on external links, you leave our website and are subject to the privacy policies of those external sites.
            </p>
            <p className="text-gray-300">
              We recommend reviewing the privacy policies of any third-party websites you visit.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">International Data Transfers</h2>
            <p className="text-gray-300 mb-4">
              GetTool AI is operated from India. Information collected through our website may be transferred to and processed in countries other than your country of residence.
            </p>
            <p className="text-gray-300 mb-4">
              This includes:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li>• Data sent to Google servers (located in various countries worldwide)</li>
              <li>• Data sent to AI service providers (may have servers in different jurisdictions)</li>
            </ul>
            <p className="text-gray-300">
              By using our services, you consent to such international data transfers. We ensure that appropriate safeguards are in place when transferring data internationally.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Changes to This Privacy Policy</h2>
            <p className="text-gray-300 mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.
            </p>
            <p className="text-gray-300 mb-4">
              When we make changes, we will:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li>• Update the "Last Updated" date at the top of this policy</li>
              <li>• Notify users of significant changes through our website</li>
              <li>• Post the updated policy on this page</li>
            </ul>
            <p className="text-gray-300">
              Your continued use of our services after any changes constitutes acceptance of the updated Privacy Policy. We encourage you to review this policy periodically.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Legal Disclaimer</h2>
            <p className="text-gray-300 mb-4">
              This Privacy Policy is provided for informational purposes only and does not constitute legal advice. The information contained herein may not reflect the most current legal developments.
            </p>
            <p className="text-gray-300">
              If you have specific legal questions about data privacy, please consult a qualified attorney in your jurisdiction.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-gray-300 mb-4">
              <p><strong className="text-white">Email:</strong> servicestoolai@gmail.com</p>
              <p><strong className="text-white">Website:</strong> https://gettoolai.in</p>
              <p><strong className="text-white">Twitter:</strong> @Gettoolai</p>
              <p><strong className="text-white">LinkedIn:</strong> https://linkedin.com/company/gettoolai</p>
            </div>
            <p className="text-gray-300 mb-4">
              We will respond to your inquiry within 30 days of receipt. For privacy-related requests, please include "Privacy Policy Request" in your email subject line.
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
