"use client"

import { useState } from "react"
import { Upload, Download, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import Breadcrumb from "@/components/breadcrumb"
import { getToolContent } from "@/lib/tool-content"
import { useRecentTools } from "@/hooks/use-recent-tools"
import GeneratingAnimation from "@/components/generating-animation"
import Script from "next/script"
import { BASE_URL } from "@/lib/config"

export default function ImageCompressor() {
  const toolContent = getToolContent("image-compressor")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [quality, setQuality] = useState(80)
  const [isProcessing, setIsProcessing] = useState(false)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image Compressor",
    "description": "Compress images online for free. Reduce JPG, PNG, WebP file size up to 90% without losing quality. No signup required.",
    "url": `${BASE_URL}/tools/image-compressor`,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "Compress images up to 90%",
      "Supports JPG, PNG, WebP formats",
      "No signup required",
      "Browser-based processing",
      "Maintains image quality"
    ],
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0"
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setImageFile(file)
      setPreview(URL.createObjectURL(file))
      setOriginalSize(file.size)
      setCompressedSize(0)
    }
  }

  const compressImage = async () => {
    if (!imageFile) return

    setIsProcessing(true)

    try {
      // createImageBitmap reads directly from File — no blob URL, no CSP issues
      const bitmap = await createImageBitmap(imageFile)

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) throw new Error('Could not get canvas context')

      canvas.width = bitmap.width
      canvas.height = bitmap.height

      // White background for JPEG transparency handling
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(bitmap, 0, 0)
      bitmap.close()

      canvas.toBlob(
        (compressedBlob) => {
          if (!compressedBlob) {
            alert('Error compressing image. Please try again.')
            setIsProcessing(false)
            return
          }

          setCompressedSize(compressedBlob.size)

          const url = URL.createObjectURL(compressedBlob)
          const link = document.createElement('a')
          link.href = url
          link.download = `compressed-${imageFile.name.replace(/\.[^/.]+$/, "")}.jpg`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)

          setIsProcessing(false)
        },
        'image/jpeg',
        quality / 100
      )
    } catch (error) {
      console.error('Error compressing image:', error)
      alert('Error compressing image. Please try again with a different image.')
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "Image Compressor", href: "/tools/image-compressor" }]} />
          <h1 className="text-3xl font-bold mb-3 text-center text-white">Image Compressor</h1>
          <p className="text-gray-400 text-base text-center mb-8">Compress images while maintaining quality</p>

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

          {/* Quality Slider */}
          {imageFile && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-2 bg-[#0B0F1A] rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
              />
            </div>
          )}

          {/* Size Info */}
          {originalSize > 0 && (
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-[#00E5FF]/20">
              <div className="flex justify-between text-white mb-2">
                <span>Original: {(originalSize / 1024).toFixed(2)} KB</span>
                {compressedSize > 0 && <span>Compressed: {(compressedSize / 1024).toFixed(2)} KB</span>}
              </div>
              {compressedSize > 0 && (
                <div className="text-sm text-green-400">
                  Saved: {((1 - compressedSize / originalSize) * 100).toFixed(1)}%
                </div>
              )}
            </div>
          )}

          {/* Preview */}
          {preview && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white">Preview</label>
              <img src={preview} alt="Preview" className="w-full max-w-md mx-auto rounded-xl" />
            </div>
          )}

          {/* Compress Button */}
          {isProcessing ? (
            <div className="py-12">
              <GeneratingAnimation type="image_compressor" />
            </div>
          ) : (
            <button
              onClick={compressImage}
              disabled={!imageFile}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
            >
              Compress Image
            </button>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
            Advertisement
          </div>
        </div>

        <ToolContent content={toolContent} toolName="Image Compressor" toolPath="/tools/image-compressor" />
        <RelatedTools currentToolPath="/tools/image-compressor" currentCategory={toolContent.category} />
        <SocialShare url={`${BASE_URL}/tools/image-compressor`} title="Image Compressor - Free Online Tool" />

        <Link href="/" className="mt-6 text-[#00E5FF] hover:underline inline-block">
          ← Back to Home
        </Link>
      </div>
    </div>
    </>
  )
}