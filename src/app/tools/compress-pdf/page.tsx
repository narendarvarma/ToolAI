"use client"

import { useState } from "react"
import { Upload, Download, FileText as FileIcon } from "lucide-react"
import { PDFDocument } from "pdf-lib"
import AdSlot from "@/components/ad-slot"

export default function CompressPDF() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)

  const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setPdfFile(file)
      setOriginalSize(file.size)
    }
  }

  const compressPDF = async () => {
    if (!pdfFile) return

    setIsProcessing(true)

    try {
      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      
      const pdfBytes = await pdfDoc.save()
      const buffer = new Uint8Array(pdfBytes).buffer
      const blob = new Blob([buffer], { type: 'application/pdf' })
      setCompressedSize(blob.size)

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `compressed-${pdfFile.name}`
      link.click()

      URL.revokeObjectURL(url)
      alert('PDF compressed successfully!')
    } catch (error) {
      console.error('Error compressing PDF:', error)
      alert('Error compressing PDF. Please try again.')
    }

    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Compress PDF</h1>
        <p className="text-gray-400 text-base text-center mb-8">Reduce PDF file size</p>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Upload PDF</label>
            <div className="border-2 border-dashed border-white/8 rounded-xl p-8 text-center hover:border-[#3B82F6] hover:bg-[#3B82F6]/5 transition-all">
              <input
                type="file"
                accept=".pdf"
                onChange={handlePDFUpload}
                className="hidden"
                id="pdf-upload"
              />
              <label htmlFor="pdf-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">Click to upload PDF file</p>
              </label>
            </div>
          </div>

          {/* File Info */}
          {pdfFile && (
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-[#00E5FF]/20">
              <div className="flex items-center gap-3">
                <FileIcon className="h-8 w-8 text-[#00E5FF]" />
                <div>
                  <p className="font-medium text-white">{pdfFile.name}</p>
                  <p className="text-sm text-gray-400">{(originalSize / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Size Comparison */}
          {compressedSize > 0 && (
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-[#00E5FF]/20">
              <div className="flex justify-between text-white mb-2">
                <span>Original: {(originalSize / 1024 / 1024).toFixed(2)} MB</span>
                <span>Compressed: {(compressedSize / 1024 / 1024).toFixed(2)} MB</span>
              </div>
              <div className="text-sm text-green-400">
                Saved: {((1 - compressedSize / originalSize) * 100).toFixed(1)}%
              </div>
            </div>
          )}

          {/* Compress Button */}
          <button
            onClick={compressPDF}
            disabled={!pdfFile || isProcessing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            {isProcessing ? "Compressing..." : "Compress PDF"}
          </button>
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <AdSlot adSlot="4000000005" className="w-full max-w-2xl" />
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
