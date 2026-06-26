"use client"

import { useState } from "react"
import { Upload, Download, FileText as FileIcon, X } from "lucide-react"
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

  const convertFile = async (file: File): Promise<{ url: string; error?: string }> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('target', 'pdf')

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        return { url: '', error: error.details || error.error || 'Conversion failed' }
      }

      const blob = await response.blob()
      return { url: URL.createObjectURL(blob) }
    } catch (error: any) {
      return { url: '', error: error.message || 'Conversion failed' }
    }
  }

  const startConvert = async () => {
    if (files.length === 0 || isProcessing) return
    setIsProcessing(true)
    setConvertedFiles([])

    const results = await Promise.all(
      files.map(async (file) => {
        const result = await convertFile(file)
        return { file, ...result }
      })
    )

    setConvertedFiles(results)
    setIsProcessing(false)
  }

  const clearAll = () => {
    setFiles([])
    setConvertedFiles([])
    convertedFiles.forEach(cf => URL.revokeObjectURL(cf.url))
  }

  const toolContent = getToolContent("img-to-pdf")

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Image to PDF Converter</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert images to PDF instantly in your browser</p>
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
                <p className="text-sm text-gray-500 mt-2">Supports: JPG, JPEG, PNG, WEBP, GIF, BMP, TIFF</p>
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
        <ToolContent content={toolContent} toolName="Image to PDF Converter Online Free" toolPath="/tools/img-to-pdf" />
        <RelatedTools currentToolPath="/tools/img-to-pdf" currentCategory={toolContent.category} />

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