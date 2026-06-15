"use client"

import { useState } from "react"
import { Upload, Download, FileText as FileIcon, X } from "lucide-react"
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"
import mammoth from "mammoth"
import Link from "next/link"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"

export default function DocToPdf() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [convertedFiles, setConvertedFiles] = useState<{ file: File; url: string; error?: string }[]>([])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || [])
    setFiles(prev => [...prev, ...uploadedFiles])
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const imgToPdf = async (file: File): Promise<Blob> => {
    const buf = await file.arrayBuffer()
    const doc = await PDFDocument.create()
    const isJpg = ['jpg', 'jpeg'].includes(file.name.split('.').pop()?.toLowerCase() || '')
    const img = isJpg ? await doc.embedJpg(buf) : await doc.embedPng(buf)
    const page = doc.addPage([img.width, img.height])
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height })
    const pdfBytes = await doc.save()
    const buffer = new Uint8Array(pdfBytes).buffer
    return new Blob([buffer], { type: 'application/pdf' })
  }

  const textToPdf = async (file: File): Promise<Blob> => {
    const text = await file.text()
    const doc = await PDFDocument.create()
    const font = await doc.embedFont(StandardFonts.Helvetica)
    const W = 595.28, H = 841.89, M = 50, FS = 11, LH = 15
    let page = doc.addPage([W, H]), y = H - M

    const wrapLine = (text: string, font: any, size: number, maxW: number): string[] => {
      if (!text.trim()) return ['']
      const words = text.split(' ')
      const lines: string[] = []
      let cur = ''
      for (const w of words) {
        const test = cur ? cur + ' ' + w : w
        if (font.widthOfTextAtSize(test, size) > maxW) {
          if (cur) lines.push(cur)
          cur = w
        } else {
          cur = test
        }
      }
      if (cur) lines.push(cur)
      return lines.length ? lines : ['']
    }

    for (const raw of text.split('\n')) {
      for (const ln of wrapLine(raw, font, FS, W - M * 2)) {
        if (y < M) {
          page = doc.addPage([W, H])
          y = H - M
        }
        page.drawText(ln, { x: M, y, size: FS, font, color: rgb(0, 0, 0) })
        y -= LH
      }
    }
    const pdfBytes = await doc.save()
    const buffer = new Uint8Array(pdfBytes).buffer
    return new Blob([buffer], { type: 'application/pdf' })
  }

  const docxToPdf = async (file: File): Promise<Blob> => {
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })
    const text = result.value
    const doc = await PDFDocument.create()
    const font = await doc.embedFont(StandardFonts.Helvetica)
    const W = 595.28, H = 841.89, M = 50, FS = 11, LH = 15
    let page = doc.addPage([W, H]), y = H - M

    const wrapLine = (text: string, font: any, size: number, maxW: number): string[] => {
      if (!text.trim()) return ['']
      const words = text.split(' ')
      const lines: string[] = []
      let cur = ''
      for (const w of words) {
        const test = cur ? cur + ' ' + w : w
        if (font.widthOfTextAtSize(test, size) > maxW) {
          if (cur) lines.push(cur)
          cur = w
        } else {
          cur = test
        }
      }
      if (cur) lines.push(cur)
      return lines.length ? lines : ['']
    }

    for (const raw of text.split('\n')) {
      for (const ln of wrapLine(raw, font, FS, W - M * 2)) {
        if (y < M) {
          page = doc.addPage([W, H])
          y = H - M
        }
        page.drawText(ln, { x: M, y, size: FS, font, color: rgb(0, 0, 0) })
        y -= LH
      }
    }
    const pdfBytes = await doc.save()
    const buffer = new Uint8Array(pdfBytes).buffer
    return new Blob([buffer], { type: 'application/pdf' })
  }

  const convertFile = async (file: File): Promise<Blob> => {
    const ext = file.name.split('.').pop()?.toLowerCase()
    if (['jpg', 'jpeg', 'png'].includes(ext || '')) return imgToPdf(file)
    if (['txt', 'html', 'htm', 'rtf'].includes(ext || '')) return textToPdf(file)
    if (['docx'].includes(ext || '')) return docxToPdf(file)
    throw new Error('Unsupported file type')
  }

  const startConvert = async () => {
    if (files.length === 0 || isProcessing) return
    setIsProcessing(true)
    setConvertedFiles([])

    try {
      const results = await Promise.all(
        files.map(async (file) => {
          try {
            const blob = await convertFile(file)
            return { file, url: URL.createObjectURL(blob) }
          } catch (err) {
            const ext = file.name.split('.').pop()?.toLowerCase()
            const unsupported = ['doc', 'pptx', 'ppt', 'xlsx', 'xls', 'odt']
            if (ext && unsupported.includes(ext)) {
              return { file, url: '', error: 'Requires server-side conversion' }
            }
            return { file, url: '', error: 'Unsupported file type' }
          }
        })
      )
      setConvertedFiles(results)
    } catch (error) {
      console.error('Conversion error:', error)
    }

    setIsProcessing(false)
  }

  const clearAll = () => {
    setFiles([])
    setConvertedFiles([])
    convertedFiles.forEach(cf => URL.revokeObjectURL(cf.url))
  }

  const toolContent = getToolContent("doc-to-pdf")

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Doc to PDF Converter</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert images and text files to PDF instantly in your browser</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Upload Files</label>
            <div className="border-2 border-dashed border-white/8 rounded-xl p-8 text-center hover:border-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500 mt-2">Supports: JPG, PNG, TXT, HTML, RTF, DOCX</p>
              </label>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mb-6">
              <h2 className="font-medium mb-4 text-white">Selected Files ({files.length})</h2>
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileIcon className="h-6 w-6 text-[#00E5FF]" />
                      <span className="text-white">{file.name}</span>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Convert Button */}
          <div className="flex gap-3">
            <button
              onClick={startConvert}
              disabled={files.length === 0 || isProcessing}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
            >
              {isProcessing ? "Converting..." : "Convert to PDF"}
            </button>
            <button
              onClick={clearAll}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/8 text-gray-400 hover:bg-white/10 transition-colors"
            >
              Clear
            </button>
          </div>

          {/* Converted Files */}
          {convertedFiles.length > 0 && (
            <div className="mt-6">
              <h2 className="font-medium mb-4 text-white">Conversion Results ({convertedFiles.length})</h2>
              <div className="space-y-3">
                {convertedFiles.map((cf, index) => (
                  <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileIcon className={`h-6 w-6 ${cf.error ? 'text-red-400' : 'text-green-400'}`} />
                      <div>
                        <span className="text-white block">{cf.file.name}</span>
                        {cf.error && <span className="text-sm text-red-400">{cf.error}</span>}
                      </div>
                    </div>
                    {cf.url ? (
                      <a
                        href={cf.url}
                        download={`${cf.file.name.replace(/\.[^.]+$/, '')}.pdf`}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00E5FF] text-white hover:bg-[#00E5FF]/80 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </a>
                    ) : (
                      <span className="text-red-400 text-sm">Failed</span>
                    )}
                  </div>
                ))}
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
        <ToolContent content={toolContent} toolName="Doc to PDF Converter Online Free" toolPath="/tools/doc-to-pdf" />
        <RelatedTools currentToolPath="/tools/doc-to-pdf" currentCategory={toolContent.category} />

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