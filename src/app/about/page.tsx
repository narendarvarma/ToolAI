export default function About() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white">About ToolHub AI</h1>

        <div className="prose prose-invert max-w-none">
          {/* Founder Story */}
          <div className="bg-gradient-to-r from-[#00E5FF]/20 to-[#7C4DFF]/20 rounded-2xl p-8 border border-[#00E5FF]/30 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">👨‍💻 The Founder's Story</h2>
            <p className="text-gray-300 mb-4">
              ToolHub AI was born from a simple frustration: finding reliable, free online tools shouldn't be difficult. As a student and developer, I constantly needed tools for PDF editing, image conversion, calculations, and more — but was tired of navigating through countless websites with ads, sign-ups, and hidden fees.
            </p>
            <p className="text-gray-300 mb-4">
              In 2024, I decided to build something different — a single platform that brings together all the essential tools anyone might need, completely free and accessible. What started as a personal project quickly grew into a platform used by thousands of students, professionals, and everyday users.
            </p>
            <p className="text-gray-300">
              Today, ToolHub AI hosts 66+ tools across 6 categories, and we're constantly adding new features based on your feedback. Our mission remains the same: to make productivity tools accessible to everyone, everywhere.
            </p>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              ToolHub AI is dedicated to providing professional, free online tools for everyone. We believe that productivity tools should be accessible, fast, and easy to use.
            </p>
            <p className="text-gray-300">
              Our platform brings together 66+ tools across multiple categories including PDF manipulation, image editing, AI-powered features, student utilities, productivity boosters, and everyday utilities.
            </p>
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
  )
}
