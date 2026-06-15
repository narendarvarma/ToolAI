"use client"

import Link from "next/link"
import { Shield, CheckCircle, Zap, Users, HeadphonesIcon } from "lucide-react"
import ToolFAQ from "./tool-faq"
import HowToUse from "./how-to-use"
import StructuredData from "./structured-data"
import { ToolContent as ToolContentType } from "@/lib/tool-content"
import { BASE_URL } from "@/lib/config"
import { toolMetadata } from "@/lib/tool-metadata"

interface ToolContentProps {
  content: ToolContentType
  toolName: string
  toolPath: string
}

function formatToolName(title: string) {
  return title.split(" | ")[0]
}

function getRelatedToolTitles(relatedTools: string[]) {
  return relatedTools
    .map((slug) => formatToolName(toolMetadata[slug]?.title || slug))
    .filter(Boolean)
}

export default function ToolContent({ content, toolName, toolPath }: ToolContentProps) {
  return (
    <div className="mt-8 space-y-8">
      {/* What is this tool section */}
      <section className="bg-[#111827] rounded-2xl p-6 border border-white/8">
        <h2 className="text-2xl font-semibold mb-4 text-white">What is {toolName}?</h2>
        <p className="text-gray-300 leading-relaxed">{content.whatIs}</p>
      </section>

      {/* How to Use section */}
      <HowToUse steps={content.howToUse} toolName={toolName} />

      {/* Benefits section */}
      <section className="bg-[#111827] rounded-2xl p-6 border border-white/8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Benefits of Using {toolName}</h2>
        <ul className="space-y-3">
          {content.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-300">
              <CheckCircle className="h-5 w-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Tool fit and workflow section */}
      <section className="bg-[#111827] rounded-2xl p-6 border border-white/8">
        <h2 className="text-2xl font-semibold mb-4 text-white">How {toolName} Fits Into Your Workflow</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          {toolName} is designed to streamline the tasks that matter most for people using {content.category.toLowerCase()} tools. Whether you are finishing a project, managing daily work, or preparing materials for study or business, this tool makes the process faster, cleaner, and more reliable.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Use {toolName} when you need a dependable, browser-based solution that removes manual steps and gives you results in seconds. This tool is optimized for speed, privacy, and ease of use so you can focus on your work instead of complex setup.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Many users combine {toolName} with tools like {getRelatedToolTitles(content.relatedTools).slice(0, 3).join(", ")} to create a complete productivity workflow that saves time, reduces errors, and improves output quality.
        </p>
      </section>

      {/* Why Choose GetToolAI section */}
      <section className="bg-[#111827] rounded-2xl p-6 border border-white/8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Why Choose GetToolAI for {toolName}?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <Zap className="h-6 w-6 text-[#00E5FF] flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-white mb-1">Lightning Fast</h3>
              <p className="text-gray-400 text-sm">All tools process instantly in your browser with no waiting time.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-[#00E5FF] flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-white mb-1">100% Secure & Private</h3>
              <p className="text-gray-400 text-sm">Your data never leaves your device. All processing happens locally.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="h-6 w-6 text-[#00E5FF] flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-white mb-1">Trusted by Millions</h3>
              <p className="text-gray-400 text-sm">Over 1 million users trust our tools for their daily tasks.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <HeadphonesIcon className="h-6 w-6 text-[#00E5FF] flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-white mb-1">24/7 Support</h3>
              <p className="text-gray-400 text-sm">Our support team is always ready to help you with any questions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <ToolFAQ faqs={content.faqs} toolName={toolName} />

      {/* Privacy & Security section */}
      <section className="bg-[#111827] rounded-2xl p-6 border border-white/8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Privacy & Security for {toolName}</h2>
        <div className="space-y-3 text-gray-300">
          <p>Your privacy is our top priority. This tool operates entirely in your browser, meaning:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-[#00E5FF] flex-shrink-0 mt-1" />
              <span><strong>No data uploads:</strong> Your files and information never leave your device</span>
            </li>
            <li className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-[#00E5FF] flex-shrink-0 mt-1" />
              <span><strong>No tracking:</strong> We don't track your usage or store personal information</span>
            </li>
            <li className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-[#00E5FF] flex-shrink-0 mt-1" />
              <span><strong>Instant deletion:</strong> Any temporary data is deleted immediately after processing</span>
            </li>
            <li className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-[#00E5FF] flex-shrink-0 mt-1" />
              <span><strong>Secure connection:</strong> All data transfers use encrypted HTTPS connections</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Free to Use statement */}
      <section className="bg-gradient-to-r from-[#00E5FF]/10 to-[#7C4DFF]/10 rounded-2xl p-6 border border-[#00E5FF]/30">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2 text-white">{toolName} is 100% Free to Use</h2>
          <p className="text-gray-300">
            This tool is completely free with no hidden charges, no subscriptions, and no limits. 
            Use it as much as you need for personal or commercial purposes.
          </p>
        </div>
      </section>

      {/* Contact Support */}
      <section className="bg-[#111827] rounded-2xl p-6 border border-white/8 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-white">Need Help with {toolName}?</h2>
        <p className="text-gray-300 mb-4">
          If you have any questions or need assistance with this tool, our support team is here to help.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform"
        >
          <HeadphonesIcon className="h-5 w-5" />
          Contact Support
        </Link>
      </section>
      <StructuredData
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
            { "@type": "ListItem", position: 3, name: toolName, item: `${BASE_URL}${toolPath}` }
          ]
        }}
      />
    </div>
  )
}
