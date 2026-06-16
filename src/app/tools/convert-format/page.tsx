"use client"

import { useState } from "react"
import { Upload, Download, FileImage } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"
import { useRecentTools } from "@/hooks/use-recent-tools"
import GeneratingAnimation from "@/components/generating-animation"

export default function ConvertFormat() {
  const toolContent = getToolContent("convert-format")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [targetFormat, setTargetFormat] = useState("png")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setImageFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const convertFormat = async () => {
    if (!imageFile) return

    setIsProcessing(true)

    try {
      // Use createImageBitmap() directly from the File — no blob URL, no CSP issues
      const bitmap = await createImageBitmap(imageFile)

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        throw new Error('Could not get canvas context')
      }

      canvas.width = bitmap.width
      canvas.height = bitmap.height

      // Handle transparency for JPEG — fill white background first
      if (targetFormat === 'jpg' || targetFormat === 'jpeg') {
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      ctx.drawImage(bitmap, 0, 0)
      bitmap.close()

      const mimeType = targetFormat === 'jpg' ? 'image/jpeg' : `image/${targetFormat}`
      const dataUrl = canvas.toDataURL(mimeType, 0.92)

      const response = await fetch(dataUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      const extension = targetFormat === 'jpg' ? 'jpg' : targetFormat
      link.download = `converted-${imageFile.name.replace(/\.[^/.]+$/, "")}.${extension}`
      link.click()

      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error converting format:', error)
      alert('Error converting image format. Please try again with a different image.')
    }

    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Convert Image Format</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert PNG/JPG/WebP formats</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Upload Image</label>
            <div className="border-2 border-dashed border-white/8 rounded-xl p-8 text-center hover:border-[#3B82F6] hover:bg-[#3B82F6]/5 transition-all">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">Click to upload image</p>
              </label>
            </div>
          </div>

          {/* Target Format */}
          {imageFile && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white">Target Format</label>
              <select
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WebP</option>
              </select>
            </div>
          )}

          {/* Preview */}
          {preview && (
            <div className="mb-6">
              <h2 className="font-medium mb-4 text-white">Preview</h2>
              <img src={preview} alt="Preview" className="w-full max-w-md mx-auto rounded-xl" />
            </div>
          )}

          {/* Convert Button */}
          {isProcessing ? (
            <div className="py-12">
              <GeneratingAnimation type="image_convert" />
            </div>
          ) : (
            <button
              onClick={convertFormat}
              disabled={!imageFile}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
            >
              Convert Format
            </button>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
            Advertisement
          </div>
        </div>

        {/* Tool Content Section */}
        <ToolContent content={toolContent} toolName="Convert Image Format" toolPath="/tools/convert-format" />

        {/* Related Tools */}
        <RelatedTools currentToolPath="/tools/convert-format" currentCategory={toolContent.category} />

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