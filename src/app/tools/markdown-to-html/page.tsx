"use client"

import { useState } from "react"
import { FileText, Copy, Download } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function MarkdownToHTML() {
  const toolContent = getToolContent("markdown-to-html")
  const [markdown, setMarkdown] = useState("")
  const [html, setHtml] = useState("")

  const convertToHTML = () => {
    if (!markdown) return

    let html = markdown
      // Headers
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
      .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
      .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/__(.*?)__/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/_(.*?)_/gim, '<em>$1</em>')
      // Strikethrough
      .replace(/~~(.*?)~~/gim, '<del>$1</del>')
      // Code
      .replace(/```(.*?)```/gim, '<pre><code>$1</code></pre>')
      .replace(/`(.*?)`/gim, '<code>$1</code>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
      // Images
      .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" />')
      // Unordered lists
      .replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>')
      .replace(/^- (.*$)/gim, '<ul><li>$1</li></ul>')
      // Ordered lists
      .replace(/^\d+\. (.*$)/gim, '<ol><li>$1</li></ol>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      // Line breaks
      .replace(/\n/gim, '<br />')
      // Fix nested lists
      .replace(/<\/ul><ul>/gim, '')
      .replace(/<\/ol><ol>/gim, '')

    setHtml(html)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(html)
    alert("HTML copied to clipboard!")
  }

  const downloadHTML = () => {
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "converted.html"
    link.click()
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setMarkdown("")
    setHtml("")
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Markdown to HTML</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert Markdown to HTML</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Markdown Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Markdown Input</label>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-48 resize-none font-mono text-sm"
              placeholder="# Heading 1&#10;## Heading 2&#10;**Bold text**&#10;*Italic text*&#10;`Code`&#10;[Link](url)&#10;- List item"
            />
          </div>

          {/* Convert Button */}
          <button
            onClick={convertToHTML}
            disabled={!markdown}
            className="w-full mb-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            <div className="flex items-center justify-center gap-2">
              <FileText className="h-5 w-5" />
              Convert to HTML
            </div>
          </button>

          {/* HTML Output */}
          {html && (
            <div>
              <label className="block text-sm font-medium mb-2 text-white">HTML Output</label>
              <div className="p-4 bg-white/5 rounded-xl border border-white/8 mb-4">
                <pre className="text-green-400 whitespace-pre-wrap font-mono text-sm">{html}</pre>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Copy className="h-5 w-5" />
                    Copy
                  </div>
                </button>
                <button
                  onClick={downloadHTML}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Download className="h-5 w-5" />
                    Download
                  </div>
                </button>
                <button
                  onClick={clearAll}
                  className="py-3 px-6 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#FF4DB6] transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        </div>

        {/* Tool Content Section */}
        <ToolContent content={toolContent} toolName="Markdown to HTML" toolPath="/tools/markdown-to-html" />

        {/* Related Tools */}
        <RelatedTools currentToolPath="/tools/markdown-to-html" currentCategory={toolContent.category} />

        <Link
          href="/"
          className="mt-6 text-[#00E5FF] hover:underline inline-block"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}




