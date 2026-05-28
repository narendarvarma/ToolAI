"use client"

import { useState } from "react"
import { Upload, Share2, Copy, Check } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function FileSharing() {
  const [file, setFile] = useState<File | null>(null)
  const [shareLink, setShareLink] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const uploadFile = async () => {
    if (!file) return

    setIsUploading(true)

    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate mock share link
    const mockLink = `https://share.example.com/${Date.now()}`
    setShareLink(mockLink)
    setIsUploading(false)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">File Sharing</h1>
        <p className="text-gray-400 text-base text-center mb-8">Share files easily with generated links</p>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Upload File</label>
            <div className="border-2 border-dashed border-white/8 rounded-xl p-8 text-center hover:border-[#3B82F6] hover:bg-[#3B82F6]/5 transition-all">
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">Click to upload or drag and drop</p>
              </label>
            </div>
          </div>

          {/* File Info */}
          {file && (
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-[#00E5FF]/20">
              <p className="font-medium text-white">{file.name}</p>
              <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={uploadFile}
            disabled={!file || isUploading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            {isUploading ? "Uploading..." : "Generate Share Link"}
          </button>

          {/* Share Link */}
          {shareLink && (
            <div className="mt-6 p-4 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30">
              <div className="flex items-center gap-3">
                <Share2 className="h-5 w-5 text-[#00E5FF]" />
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 bg-transparent text-white focus:outline-none"
                />
                <button
                  onClick={copyLink}
                  className="px-4 py-2 rounded-lg bg-[#3B82F6] text-white hover:bg-[#3B82F6]/80 transition-colors"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}
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
