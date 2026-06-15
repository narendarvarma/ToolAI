"use client"

import { useState } from "react"
import { Upload, FileText, Download, Copy, Check } from "lucide-react"
import Link from "next/link"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import ToolFAQ from "@/components/tool-faq"
import { useRecentTools } from "@/hooks/use-recent-tools"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"

export default function PdfToText() {
  useRecentTools("/tools/pdf-to-text", "PDF to Text", "FileText")
  
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [extractedText, setExtractedText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfFile(file)
      setError("")
      setExtractedText("")
    } else {
      setError("Please upload a valid PDF file.")
    }
  }

  const extractText = async () => {
    if (!pdfFile) return

    setIsProcessing(true)
    setError("")

    try {
      // Dynamically import PDF.js
      const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf")
      pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"

      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      const totalPages = pdf.numPages
      let fullText = ""

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items.map((item: any) => item.str).join(" ")
        fullText += `\n\n--- Page ${i} ---\n\n${pageText}`
      }

      setExtractedText(fullText.trim())
    } catch (err) {
      console.error(err)
      setError("Failed to extract text. Please try a different PDF file.")
    }

    setIsProcessing(false)
  }

  const copyText = () => {
    navigator.clipboard.writeText(extractedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadTxt = () => {
    const blob = new Blob([extractedText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${pdfFile?.name.replace(".pdf", "")}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  const toolContent = getToolContent("pdf-to-text")

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">PDF to Text</h1>
        <p className="text-gray-400 text-base text-center mb-8">Extract all text content from PDF files instantly</p>

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

          {/* Extract Button */}
          <button
            type="button"
            onClick={extractText}
            disabled={!pdfFile || isProcessing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg disabled:opacity-50 disabled:hover:scale-100 mb-6"
          >
            {isProcessing ? "Extracting..." : "Extract Text"}
          </button>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Extracted Text */}
          {extractedText && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-white">Extracted Text</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={copyText}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] text-sm hover:bg-[#00E5FF]/30 transition-colors"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    type="button"
                    onClick={downloadTxt}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] text-sm hover:bg-[#00E5FF]/30 transition-colors"
                  >
                    <Download className="h-3 w-3" />
                    Download TXT
                  </button>
                </div>
              </div>
              <textarea
                value={extractedText}
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none h-96 resize-none"
              />
            </div>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="ad-slot mt-8">
          <div id="ad-bottom"></div>
        </div>

        {/* How to Use Section */}
        <HowToUse steps={[
          "Click 'Upload PDF' and select your PDF file",
          "Click 'Extract Text' to process the PDF",
          "Wait for text extraction to complete",
          "Copy the extracted text or download as TXT file",
          "Use the text for notes, assignments, or research"
        ]} />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/pdf-to-text" toolName="PDF to Text" />

        {/* FAQ Section */}
        <ToolFAQ
          toolName="PDF to Text"
          faqs={[
            {
              question: "How does PDF to text extraction work?",
              answer: "The tool uses PDF.js to parse your PDF file and extract all text content from each page. The extracted text is displayed in a textarea where you can copy it or download as a TXT file."
            },
            {
              question: "Can it extract text from scanned PDFs?",
              answer: "No, this tool extracts text from PDFs that contain selectable text. Scanned PDFs (images of text) require OCR (Optical Character Recognition) which is not supported by this tool."
            },
            {
              question: "Is my PDF data private?",
              answer: "Yes, all processing happens locally in your browser. Your PDF is never uploaded to any server. The text extraction is performed entirely client-side for maximum privacy."
            },
            {
              question: "What can I do with the extracted text?",
              answer: "You can copy the text to use in documents, download it as a TXT file for offline use, or use it for research, notes, or assignments. This is especially useful for students copying notes from PDF textbooks."
            }
          ]}
        />

        {/* Social Share */}
        <SocialShare title="PDF to Text - Extract text from PDF files" />
        <ToolContent content={toolContent} toolName="Pdf To Text" toolPath="/tools/pdf-to-text" />
        <RelatedTools currentToolPath="/tools/pdf-to-text" currentCategory={toolContent.category} />

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