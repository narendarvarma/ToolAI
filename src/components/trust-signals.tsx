import Link from "next/link"
import { Shield, Lock, CheckCircle, Award, Clock, Mail } from "lucide-react"

export default function TrustSignals() {
  return (
    <div className="mt-8 space-y-6">
      {/* Trust Badges */}
      <div className="bg-[#111827] rounded-2xl p-6 border border-white/8">
        <h3 className="text-xl font-semibold mb-4 text-white text-center">Why Trust GetToolAI?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/5 rounded-xl">
            <Shield className="h-8 w-8 mx-auto mb-2 text-[#00E5FF]" />
            <p className="text-sm font-medium text-white">Secure & Private</p>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl">
            <Lock className="h-8 w-8 mx-auto mb-2 text-[#00E5FF]" />
            <p className="text-sm font-medium text-white">No Data Storage</p>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-[#00E5FF]" />
            <p className="text-sm font-medium text-white">100% Free</p>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl">
            <Award className="h-8 w-8 mx-auto mb-2 text-[#00E5FF]" />
            <p className="text-sm font-medium text-white">Trusted by 1M+ Users</p>
          </div>
        </div>
      </div>

      {/* Security Guarantees */}
      <div className="bg-[#111827] rounded-2xl p-6 border border-white/8">
        <h3 className="text-xl font-semibold mb-4 text-white">Security Guarantees</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-gray-300">
            <Lock className="h-5 w-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
            <span><strong>End-to-End Encryption:</strong> All data transfers use secure HTTPS encryption</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <Shield className="h-5 w-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
            <span><strong>Local Processing:</strong> Files are processed in your browser, never on our servers</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <Clock className="h-5 w-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
            <span><strong>Instant Deletion:</strong> Temporary data is deleted immediately after processing</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <CheckCircle className="h-5 w-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
            <span><strong>No Tracking:</strong> We don't track your usage or store personal information</span>
          </li>
        </ul>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-[#00E5FF]/10 to-[#7C4DFF]/10 rounded-2xl p-6 border border-[#00E5FF]/30 text-center">
        <h3 className="text-xl font-semibold mb-2 text-white">Need Help?</h3>
        <p className="text-gray-300 mb-4">
          Our support team is available 24/7 to assist you with any questions or issues.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform"
        >
          <Mail className="h-5 w-5" />
          Contact Support
        </Link>
      </div>
    </div>
  )
}
