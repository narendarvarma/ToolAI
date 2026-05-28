export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: January 2024</p>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Introduction</h2>
            <p className="text-gray-300">
              ToolHub AI ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-2 text-white">Client-Side Processing</h3>
            <p className="text-gray-300 mb-4">
              Most of our tools process data entirely in your browser. Your files, documents, and personal information never leave your device unless explicitly stated.
            </p>
            <h3 className="text-xl font-semibold mb-2 text-white">Usage Data</h3>
            <p className="text-gray-300">
              We may collect anonymous usage data to improve our services, including page views, tool usage statistics, and browser information.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">How We Use Your Information</h2>
            <ul className="space-y-2 text-gray-300">
              <li>• To provide and maintain our services</li>
              <li>• To improve user experience</li>
              <li>• To analyze usage patterns</li>
              <li>• To detect and prevent technical issues</li>
            </ul>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Data Security</h2>
            <p className="text-gray-300">
              We implement appropriate security measures to protect your information. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Cookies</h2>
            <p className="text-gray-300">
              We use cookies to enhance your browsing experience and analyze site traffic. You can control cookie settings through your browser preferences.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Third-Party Services</h2>
            <p className="text-gray-300">
              We may use third-party services for analytics and advertising. These services may collect information according to their own privacy policies.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Your Rights</h2>
            <p className="text-gray-300">
              You have the right to access, correct, or delete your personal data. Contact us if you wish to exercise these rights.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have questions about this Privacy Policy, please contact us.
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
