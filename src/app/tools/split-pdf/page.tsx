"use client"

import { useState } from "react"
import { Upload, Download, FileText as FileIcon, Scissors } from "lucide-react"
import { PDFDocument } from "pdf-lib"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function SplitPDF() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [splitMethod, setSplitMethod] = useState<"all" | "range">("all")
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

  const splitPDF = async () => {
    if (!pdfFile) return

    setIsProcessing(true)

    try {
      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const totalPages = pdfDoc.getPageCount()
      let splitCount = 0

      if (splitMethod === "all") {
        // Split all pages into separate PDFs
        for (let i = 0; i < totalPages; i++) {
          const newPdf = await PDFDocument.create()
          const [page] = await newPdf.copyPages(pdfDoc, [i])
          newPdf.addPage(page)

          const pdfBytes = await newPdf.save()
          const buffer = new Uint8Array(pdfBytes).buffer
          const blob = new Blob([buffer], { type: 'application/pdf' })
          const url = URL.createObjectURL(blob)

          const link = document.createElement('a')
          link.href = url
          link.download = `page-${i + 1}.pdf`
          link.click()

          URL.revokeObjectURL(url)
          splitCount++
        }
      } else {
        // Extract specific page range
        const pagesToExtract = parsePageRange(pageRange, totalPages)
        const newPdf = await PDFDocument.create()
        const copiedPages = await newPdf.copyPages(pdfDoc, pagesToExtract)
        copiedPages.forEach(page => newPdf.addPage(page))

        const pdfBytes = await newPdf.save()
        const buffer = new Uint8Array(pdfBytes).buffer
        const blob = new Blob([buffer], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = `extracted-${pdfFile.name}`
        link.click()

        URL.revokeObjectURL(url)
        splitCount = 1
      }

      alert(`Successfully split ${splitCount} file(s)!`)
    } catch (error) {
      console.error('Error splitting PDF:', error)
      alert('Error splitting PDF. Please try again.')
    }

    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Split PDF</h1>
        <p className="text-gray-400 text-base text-center mb-8">Split PDF files into separate pages or extract specific ranges</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Upload PDF to Split</label>
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
                <Scissors className="h-8 w-8 text-[#00E5FF]" />
                <div>
                  <p className="font-medium text-white">{pdfFile.name}</p>
                  <p className="text-sm text-gray-400">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Split Options */}
          {pdfFile && (
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Split Method</label>
                <select
                  value={splitMethod}
                  onChange={(e) => setSplitMethod(e.target.value as "all" | "range")}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                >
                  <option value="all">Extract all pages as separate files</option>
                  <option value="range">Extract specific page range</option>
                </select>
              </div>
              
              {splitMethod === "range" && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Page Range</label>
                  <input
                    type="text"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                    placeholder="e.g., 1-5, 8-10"
                  />
                  <p className="text-sm text-gray-400 mt-1">Use commas to separate ranges, e.g., 1-5, 8-10</p>
                </div>
              )}
            </div>
          )}

          {/* Split Button */}
          <button
            onClick={splitPDF}
            disabled={!pdfFile || isProcessing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            {isProcessing ? "Splitting..." : "Split PDF"}
          </button>
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        </div>

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




