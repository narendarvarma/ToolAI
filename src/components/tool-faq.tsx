"use client"

interface FAQItem {
  question: string
  answer: string
}

interface ToolFAQProps {
  faqs: FAQItem[]
  toolName: string
}

export default function ToolFAQ({ faqs, toolName }: ToolFAQProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mt-8 p-6 bg-[#111827] rounded-2xl border border-white/8">
        <h3 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details key={index} className="group">
              <summary className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/8 cursor-pointer hover:border-[#00E5FF]/50 transition-colors list-none">
                <span className="font-medium text-white">{faq.question}</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="p-4 mt-2 text-gray-400 rounded-xl bg-white/5">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </>
  )
}
