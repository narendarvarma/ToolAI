"use client"

import { useState } from "react"
import { Upload, Download, FileText as FileIcon } from "lucide-react"
import { PDFDocument } from "pdf-lib"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function RemovePages() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pageRange, setPageRange] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setPdfFile(file)
    }
  }

  const parsePageRange = (range: string, totalPages: number): number[] => {
    const pages: number[] = []
    const parts = range.split(',').map(p => p.trim())
    
    parts.forEach(part => {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(n => parseInt(n))
        for (let i = start; i <= end; i++) {
          if (i >= 1 && i <= totalPages) pages.push(i - 1)
        }
      } else {
        const page = parseInt(part)
        if (page >= 1 && page <= totalPages) pages.push(page - 1)
      }
    })
    
    return [...new Set(pages)].sort((a, b) => a - b)
  }

  const removePages = async () => {
    if (!pdfFile || !pageRange) return

    setIsProcessing(true)

    try {
      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const totalPages = pdfDoc.getPageCount()
      
      const pagesToRemove = parsePageRange(pageRange, totalPages)
      const pagesToKeep = []
      
      for (let i = 0; i < totalPages; i++) {
        if (!pagesToRemove.includes(i)) {
          pagesToKeep.push(i)
        }
      }

      const newPdf = await PDFDocument.create()
      const copiedPages = await newPdf.copyPages(pdfDoc, pagesToKeep)
      copiedPages.forEach(page => newPdf.addPage(page))

      const pdfBytes = await newPdf.save()
      const buffer = new Uint8Array(pdfBytes).buffer
      const blob = new Blob([buffer], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `removed-pages-${pdfFile.name}`
      link.click()

      URL.revokeObjectURL(url)
      alert('Pages removed successfully!')
    } catch (error) {
      console.error('Error removing pages:', error)
      alert('Error removing pages. Please try again.')
    }

    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Remove Pages</h1>
        <p className="text-gray-400 text-base text-center mb-8">Remove specific pages from PDF</p>

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

          {/* Page Range */}
          {pdfFile && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white">Page Range to Remove</label>
              <input
                type="text"
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="e.g., 1,3,5-7"
              />
              <p className="text-sm text-gray-400 mt-1">Use commas to separate pages, hyphens for ranges</p>
            </div>
          )}

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

          {/* Remove Button */}
          <button
            onClick={removePages}
            disabled={!pdfFile || !pageRange || isProcessing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            {isProcessing ? "Removing Pages..." : "Remove Pages"}
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




