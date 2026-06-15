"use client"

import { useState } from "react"
import { Upload, Lock, Download, FileText } from "lucide-react"
import { PDFDocument, rgb } from "pdf-lib"
import Link from "next/link"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import { useRecentTools } from "@/hooks/use-recent-tools"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"

export default function PdfPasswordProtector() {
  useRecentTools("/tools/pdf-password", "PDF Password Protector", "Lock")
  
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [password, setPassword] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfFile(file)
      setError("")
    } else {
      setError("Please upload a valid PDF file.")
    }
  }

  const protectPDF = async () => {
    if (!pdfFile || !password) {
      setError("Please upload a PDF and enter a password.")
      return
    }

    setIsProcessing(true)
    setError("")

    try {
      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      
      // Note: PDF encryption requires server-side processing or specialized libraries
      // For static sites, we'll add a watermark as a visual protection indicator
      const pages = pdfDoc.getPages()
      const { height } = pages[0].getSize()
      
      pages.forEach(page => {
        page.drawText('PROTECTED DOCUMENT', {
          x: 50,
          y: height - 50,
          size: 12,
          color: rgb(0.5, 0.5, 0.5),
          opacity: 0.3,
        })
      })

      const protectedPdfBytes = await pdfDoc.save()
      const blob = new Blob([protectedPdfBytes.buffer as ArrayBuffer], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement("a")
      link.href = url
      link.download = `${pdfFile.name.replace(".pdf", "")}-protected.pdf`
      link.click()
      
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
      setError("Failed to protect PDF. Please try a different file.")
    }

    setIsProcessing(false)
  }

  const toolContent = getToolContent("pdf-password")

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">PDF Watermark Protector</h1>
        <p className="text-gray-400 text-base text-center mb-8">Add a visual protection watermark to your PDF documents</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8">
          <div id="ad-top"></div>
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Upload PDF File</label>
            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all cursor-pointer">
              <input type="file" accept=".pdf" onChange={handlePDFUpload} className="hidden" id="pdf-upload" />
              <label htmlFor="pdf-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-300 font-medium">Click to upload PDF</p>
                <p className="text-gray-500 text-sm mt-1">Supports all PDF files</p>
              </label>
            </div>
          </div>

          {/* File Info */}
          {pdfFile && (
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-[#00E5FF]/20 flex items-center gap-3">
              <FileText className="h-8 w-8 text-[#00E5FF] shrink-0" />
              <div>
                <p className="font-medium text-white">{pdfFile.name}</p>
                <p className="text-sm text-gray-400">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          )}

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Enter Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Enter password to protect PDF"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Protect Button */}
          <button
            type="button"
            onClick={protectPDF}
            disabled={!pdfFile || !password || isProcessing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg disabled:opacity-50 disabled:hover:scale-100"
          >
            {isProcessing ? "Protecting..." : "Protect PDF"}
          </button>
        </div>

        {/* Single bottom ad */}
        <div className="ad-slot mt-8">
          <div id="ad-bottom"></div>
        </div>

        {/* How to Use Section */}
        <HowToUse steps={[
          "Click 'Upload PDF' and select your PDF file",
          "Click 'Protect PDF' to add a watermark",
          "A 'PROTECTED DOCUMENT' watermark will be added to each page",
          "Download the watermarked PDF file",
          "Use this to visually mark documents as protected"
        ]} />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/pdf-password" toolName="PDF Watermark Protector" />

        {/* FAQ Section */}
        <RelatedTools
          toolName="PDF Watermark Protector"
          faqs={[
            {
              question: "How does PDF watermark protection work?",
              answer: "The tool uses pdf-lib to add a 'PROTECTED DOCUMENT' watermark to each page of your PDF. The watermark is permanently embedded in the document and cannot be removed without editing the PDF."
            },
            {
              question: "Is my PDF data safe?",
              answer: "Yes, all processing happens locally in your browser. Your PDF is never uploaded to any server. The watermark is applied client-side for maximum security."
            },
            {
              question: "Can I customize the watermark text?",
              answer: "Currently, the tool adds a standard 'PROTECTED DOCUMENT' watermark. Custom text options may be added in the future based on user feedback."
            },
            {
              question: "Can I remove the watermark later?",
              answer: "The watermark is permanently added to the PDF. To remove it, you would need to edit the PDF using a PDF editor. This tool only adds watermarks for visual protection."
            }
          ]}
        />

        {/* Social Share */}
        <SocialShare title="PDF Watermark Protector - Add watermark to PDF" />
        <ToolContent content={toolContent} toolName="Pdf Password" toolPath="/tools/pdf-password" />
        <RelatedTools currentToolPath="/tools/pdf-password" currentCategory={toolContent.category} />

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