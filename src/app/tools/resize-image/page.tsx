"use client"

import { useState } from "react"
import { Upload, Download, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"
import GeneratingAnimation from "@/components/generating-animation"

export default function ResizeImage() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [originalWidth, setOriginalWidth] = useState(0)
  const [originalHeight, setOriginalHeight] = useState(0)
  const [maintainAspect, setMaintainAspect] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setImageFile(file)
      setPreview(URL.createObjectURL(file))

      // Use createImageBitmap to get dimensions — no CSP issues
      try {
        const bitmap = await createImageBitmap(file)
        setOriginalWidth(bitmap.width)
        setOriginalHeight(bitmap.height)
        setWidth(bitmap.width.toString())
        setHeight(bitmap.height.toString())
        bitmap.close()
      } catch {
        // fallback: dimensions will just be empty
      }
    }
  }

  const resizeImage = async () => {
    if (!imageFile || !width || !height) return

    setIsProcessing(true)

    try {
      // createImageBitmap reads directly from File — no blob URL, no CSP issues
      const bitmap = await createImageBitmap(imageFile)

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) throw new Error('Could not get canvas context')

      const newWidth = parseInt(width)
      const newHeight = parseInt(height)

      canvas.width = newWidth
      canvas.height = newHeight

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(bitmap, 0, 0, newWidth, newHeight)
      bitmap.close()

      canvas.toBlob((resizedBlob) => {
        if (!resizedBlob) {
          alert('Error resizing image. Please try again.')
          setIsProcessing(false)
          return
        }

        const url = URL.createObjectURL(resizedBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `resized-${imageFile.name.replace(/\.[^/.]+$/, "")}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        setIsProcessing(false)
      }, 'image/png')
    } catch (error) {
      console.error('Error resizing image:', error)
      alert('Error resizing image. Please try again with a different image.')
      setIsProcessing(false)
    }
  }

  const handleWidthChange = (value: string) => {
    setWidth(value)
    if (maintainAspect && originalWidth && originalHeight && value) {
      const newHeight = Math.round(parseInt(value) * (originalHeight / originalWidth))
      setHeight(isNaN(newHeight) ? "" : newHeight.toString())
    }
  }

  const handleHeightChange = (value: string) => {
    setHeight(value)
    if (maintainAspect && originalWidth && originalHeight && value) {
      const newWidth = Math.round(parseInt(value) * (originalWidth / originalHeight))
      setWidth(isNaN(newWidth) ? "" : newWidth.toString())
    }
  }

  const toolContent = getToolContent("resize-image")

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Resize Image</h1>
        <p className="text-gray-400 text-base text-center mb-8">Resize images to custom dimensions</p>

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

          {/* Dimensions */}
          {imageFile && (
            <div className="mb-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                    placeholder="Width"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                    placeholder="Height"
                  />
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={maintainAspect}
                  onChange={(e) => setMaintainAspect(e.target.checked)}
                  className="w-5 h-5 rounded accent-[#00E5FF] focus:ring-2 focus:ring-[#3B82F6]/50"
                />
                <span className="text-white">Maintain aspect ratio</span>
              </label>
              <p className="text-sm text-gray-400">Original: {originalWidth} x {originalHeight} px</p>
            </div>
          )}

          {/* Preview */}
          {preview && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white">Preview</label>
              <img src={preview} alt="Preview" className="w-full max-w-md mx-auto rounded-xl" />
            </div>
          )}

          {/* Resize Button */}
          {isProcessing ? (
            <div className="py-12">
              <GeneratingAnimation type="image_resize" />
            </div>
          ) : (
            <button
              onClick={resizeImage}
              disabled={!imageFile}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
            >
              Resize Image
            </button>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
            Advertisement
          </div>
        </div>

        <ToolContent content={toolContent} toolName="Resize Images Online Free" toolPath="/tools/resize-image" />
        <RelatedTools currentToolPath="/tools/resize-image" currentCategory={toolContent.category} />

        <Link href="/" className="mt-6 text-[#00E5FF] hover:underline inline-block">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}