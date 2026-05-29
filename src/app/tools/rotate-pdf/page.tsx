"use client"

import { useState } from "react"
import { Upload, Download, FileText as FileIcon, RotateCw } from "lucide-react"
import { PDFDocument, degrees } from "pdf-lib"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function RotatePDF() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [rotation, setRotation] = useState(90)
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setPdfFile(file)
    }
  }

  const rotatePDF = async () => {
    if (!pdfFile) return

    setIsProcessing(true)

    try {
      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const pages = pdfDoc.getPages()

      pages.forEach(page => {
        const currentRotation = page.getRotation().angle
        page.setRotation(degrees(currentRotation + rotation))
      })

      const pdfBytes = await pdfDoc.save()
      const buffer = new Uint8Array(pdfBytes).buffer
      const blob = new Blob([buffer], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `rotated-${pdfFile.name}`
      link.click()

      URL.revokeObjectURL(url)
      alert('PDF rotated successfully!')
    } catch (error) {
      console.error('Error rotating PDF:', error)
      alert('Error rotating PDF. Please try again.')
    }

    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Rotate PDF</h1>
        <p className="text-gray-400 text-base text-center mb-8">Rotate PDF pages by specified angle</p>

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

          {/* Rotation Selection */}
          {pdfFile && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white">Rotation Angle</label>
              <div className="grid grid-cols-4 gap-3">
                {[90, 180, 270, 360].map(angle => (
                  <button
                    key={angle}
                    onClick={() => setRotation(angle)}
                    className={`py-3 rounded-xl border-2 transition-all ${
                      rotation === angle
                        ? "bg-[#3B82F6] border-[#3B82F6] text-white"
                        : "bg-white/5 border-white/8 text-white hover:border-[#3B82F6]"
                    }`}
                  >
                    {angle}°
                  </button>
                ))}
              </div>
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

          {/* Rotate Button */}
          <button
            onClick={rotatePDF}
            disabled={!pdfFile || isProcessing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            <div className="flex items-center justify-center gap-2">
              <RotateCw className="h-5 w-5" />
              {isProcessing ? "Rotating..." : "Rotate PDF"}
            </div>
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




