"use client"

import { useState } from "react"
import { Upload, Download, FileText as FileIcon } from "lucide-react"
import { PDFDocument, rgb } from "pdf-lib"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function AddWatermark() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [watermarkText, setWatermarkText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setPdfFile(file)
    }
  }

  const addWatermark = async () => {
    if (!pdfFile || !watermarkText) return

    setIsProcessing(true)

    try {
      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const pages = pdfDoc.getPages()

      pages.forEach(page => {
        const { width, height } = page.getSize()
        page.drawText(watermarkText, {
          x: 50,
          y: height / 2,
          size: 24,
          color: rgb(0.5, 0.5, 0.5),
          opacity: 0.3,
        })
      })

      const pdfBytes = await pdfDoc.save()
      const buffer = new Uint8Array(pdfBytes).buffer
      const blob = new Blob([buffer], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `watermarked-${pdfFile.name}`
      link.click()

      URL.revokeObjectURL(url)
      alert('Watermark added successfully!')
    } catch (error) {
      console.error('Error adding watermark:', error)
      alert('Error adding watermark. Please try again.')
    }

    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Add Watermark</h1>
        <p className="text-gray-400 text-base text-center mb-8">Add watermark to PDF files</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
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

          {/* Watermark Text */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Watermark Text</label>
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Enter watermark text"
            />
          </div>

          {/* File Info */}
          {pdfFile && (
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-[#00E5FF]/20">
              <div className="flex items-center gap-3">
                <FileIcon className="h-8 w-8 text-[#00E5FF]" />
                <div>
                  <p className="font-medium text-white">{pdfFile.name}</p>
                  <p className="text-sm text-gray-400">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Add Watermark Button */}
          <button
            onClick={addWatermark}
            disabled={!pdfFile || !watermarkText || isProcessing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            {isProcessing ? "Adding Watermark..." : "Add Watermark"}
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




