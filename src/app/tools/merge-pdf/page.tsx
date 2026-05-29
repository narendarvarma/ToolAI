"use client"

import { useState } from "react"
import { Upload, Download, FileText as FileIcon } from "lucide-react"
import { PDFDocument } from "pdf-lib"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function MergePDF() {
  const [pdfFiles, setPdfFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const pdfs = files.filter(file => file.type === 'application/pdf')
    setPdfFiles(prev => [...prev, ...pdfs])
  }

  const removePDF = (index: number) => {
    setPdfFiles(prev => prev.filter((_, i) => i !== index))
  }

  const mergePDFs = async () => {
    if (pdfFiles.length < 2) return

    setIsProcessing(true)

    try {
      const mergedPdf = await PDFDocument.create()

      for (const file of pdfFiles) {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        pages.forEach(page => mergedPdf.addPage(page))
      }

      const pdfBytes = await mergedPdf.save()
      const buffer = new Uint8Array(pdfBytes).buffer
      const blob = new Blob([buffer], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = 'merged.pdf'
      link.click()

      URL.revokeObjectURL(url)
      alert('PDFs merged successfully!')
    } catch (error) {
      console.error('Error merging PDFs:', error)
      alert('Error merging PDFs. Please try again.')
    }

    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Merge PDF</h1>
        <p className="text-gray-400 text-base text-center mb-8">Combine multiple PDF files into one</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Upload PDFs</label>
            <div className="border-2 border-dashed border-white/8 rounded-xl p-8 text-center hover:border-[#3B82F6] hover:bg-[#3B82F6]/5 transition-all">
              <input
                type="file"
                multiple
                accept=".pdf"
                onChange={handlePDFUpload}
                className="hidden"
                id="pdf-upload"
              />
              <label htmlFor="pdf-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500 mt-2">PDF files only</p>
              </label>
            </div>
          </div>

          {/* PDF List */}
          {pdfFiles.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-4 text-white">Selected PDFs ({pdfFiles.length})</h3>
              <div className="space-y-3">
                {pdfFiles.map((file, index) => (
                  <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileIcon className="h-6 w-6 text-[#00E5FF]" />
                      <span className="text-white">{file.name}</span>
                    </div>
                    <button
                      onClick={() => removePDF(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Merge Button */}
          <button
            onClick={mergePDFs}
            disabled={pdfFiles.length < 2 || isProcessing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            {isProcessing ? "Merging..." : "Merge PDFs"}
          </button>
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        </div>

        <button
          onClick={() => window.location.href = "/"}
          className="mt-6 text-[#00E5FF] hover:underline"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}




