"use client"

import { useState } from "react"
import { Upload, Image as ImageIcon, Copy, Check, Download } from "lucide-react"
import Link from "next/link"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function ImageToBase64() {
  useRecentTools("/tools/image-to-base64", "Image to Base64 Converter", "ImageIcon")
  const toolContent = getToolContent("image-to-base64")
  
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [base64String, setBase64String] = useState("")
  const [previewUrl, setPreviewUrl] = useState("")
  const [originalSize, setOriginalSize] = useState(0)
  const [copied, setCopied] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setImageFile(file)
      setOriginalSize(file.size)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setBase64String(result)
        setPreviewUrl(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const copyBase64 = () => {
    navigator.clipboard.writeText(base64String)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadBase64 = () => {
    const blob = new Blob([base64String], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${imageFile?.name.split('.')[0] || "image"}-base64.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
    return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Image to Base64 Converter</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert images to base64 strings instantly with preview</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8">
          <div id="ad-top"></div>
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Upload Image</label>
            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all cursor-pointer">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-300 font-medium">Click to upload image</p>
                <p className="text-gray-500 text-sm mt-1">Supports PNG, JPG, GIF, WebP</p>
              </label>
            </div>
          </div>

          {/* Image Preview */}
          {previewUrl && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white">Image Preview</label>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-64 mx-auto rounded-lg" />
                <div className="mt-3 flex justify-between text-sm text-gray-400">
                  <span>Original size: {formatFileSize(originalSize)}</span>
                  <span>Base64 size: {formatFileSize(base64String.length)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Base64 Output */}
          {base64String && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-white">Base64 String</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={copyBase64}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] text-sm hover:bg-[#00E5FF]/30 transition-colors"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    type="button"
                    onClick={downloadBase64}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] text-sm hover:bg-[#00E5FF]/30 transition-colors"
                  >
                    <Download className="h-3 w-3" />
                    Download
                  </button>
                </div>
              </div>
              <textarea
                value={base64String}
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none h-48 resize-none text-xs font-mono"
              />
            </div>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="ad-slot mt-8">
          <div id="ad-bottom"></div>
        </div>

        {/* How to Use Section */}
        <HowToUse steps={[
          "Click 'Upload Image' and select your image file",
          "View the image preview and file size comparison",
          "Copy the base64 string with one click",
          "Or download the base64 string as a TXT file",
          "Use base64 in HTML img tags, CSS background, or data URLs"
        ]} />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/image-to-base64" toolName="Image to Base64 Converter" />

        {/* Social Share */}
        <SocialShare title="Image to Base64 Converter - Convert images to base64 strings" />

        {/* Tool Content Section */}
        <ToolContent content={toolContent} toolName="Image to Base64 Converter" toolPath="/tools/image-to-base64" />

        {/* Related Tools */}
        <RelatedTools currentToolPath="/tools/image-to-base64" currentCategory={toolContent.category} />

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
