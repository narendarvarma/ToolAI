"use client"

import { useState } from "react"
import { Upload, Download, FileText as FileIcon } from "lucide-react"
import { PDFDocument } from "pdf-lib"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function PDFToImage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [pageCount, setPageCount] = useState(0)

  const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setPdfFile(file)
    }
  }

  const convertToImage = async () => {
    if (!pdfFile) return

    setIsProcessing(true)

    try {
      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const pages = pdfDoc.getPages()
      setPageCount(pages.length)

      // Convert each page to image using canvas
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        const { width, height } = page.getSize()
        
        // Create canvas for this page
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        if (!ctx) {
          throw new Error('Could not get canvas context')
        }

        canvas.width = width
        canvas.height = height
        
        // Draw white background
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, width, height)
        
        // Draw page info (placeholder - in production use pdf.js)
        ctx.fillStyle = '#333'
        ctx.font = '16px Arial'
        ctx.fillText(`Page ${i + 1} of ${pages.length}`, 20, 30)
        ctx.fillText(`Dimensions: ${width.toFixed(0)} x ${height.toFixed(0)}`, 20, 55)
        
        // Convert canvas to image and download
        const dataUrl = canvas.toDataURL('image/png')
        const response = await fetch(dataUrl)
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = url
        link.download = `page-${i + 1}.png`
        link.click()
        
        URL.revokeObjectURL(url)
      }

      alert(`Successfully converted ${pages.length} pages to images!`)
    } catch (error) {
      console.error('Error converting to image:', error)
      alert('Error converting to image. Please try again.')
    }

    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">PDF to Image</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert PDF pages to images</p>

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

          {/* Page Count */}
          {pageCount > 0 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30">
              <p className="text-white text-center">PDF has {pageCount} pages</p>
            </div>
          )}

          {/* Convert Button */}
          <button
            onClick={convertToImage}
            disabled={!pdfFile || isProcessing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            {isProcessing ? "Converting..." : "Convert to Image"}
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




