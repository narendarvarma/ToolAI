"use client"

import { useState } from "react"
import { Upload, Download, Image as ImageIcon, Trash2, ArrowUp, ArrowDown } from "lucide-react"
import { PDFDocument } from "pdf-lib"
import Link from "next/link"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import { useRecentTools } from "@/hooks/use-recent-tools"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"

export default function ScreenshotToPdf() {
  useRecentTools("/tools/screenshot-to-pdf", "Screenshot to PDF", "ImageIcon")
  
  const [images, setImages] = useState<{ id: number; file: File; url: string }[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map(file => ({
        id: Date.now() + Math.random(),
        file,
        url: URL.createObjectURL(file)
      }))
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (id: number) => {
    setImages(images.filter(img => img.id !== id))
  }

  const moveImage = (index: number, direction: "up" | "down") => {
    const newImages = [...images]
    if (direction === "up" && index > 0) {
      [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]]
    } else if (direction === "down" && index < newImages.length - 1) {
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]]
    }
    setImages(newImages)
  }

  const convertToPdf = async () => {
    if (images.length === 0) return

    setIsProcessing(true)

    try {
      const pdfDoc = await PDFDocument.create()

      for (const image of images) {
        const imageBytes = await image.file.arrayBuffer()
        let pdfImage

        if (image.file.type === "image/png") {
          pdfImage = await pdfDoc.embedPng(imageBytes)
        } else if (image.file.type === "image/jpeg" || image.file.type === "image/jpg") {
          pdfImage = await pdfDoc.embedJpg(imageBytes)
        } else {
          // For other formats, try as PNG
          pdfImage = await pdfDoc.embedPng(imageBytes)
        }

        const page = pdfDoc.addPage()
        const { width, height } = pdfImage.scale(1)
        const pageWidth = page.getWidth()
        const pageHeight = page.getHeight()

        // Scale image to fit page while maintaining aspect ratio
        const scale = Math.min(pageWidth / width, pageHeight / height) * 0.9
        const scaledWidth = width * scale
        const scaledHeight = height * scale

        page.drawImage(pdfImage, {
          x: (pageWidth - scaledWidth) / 2,
          y: (pageHeight - scaledHeight) / 2,
          width: scaledWidth,
          height: scaledHeight,
        })
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement("a")
      link.href = url
      link.download = "screenshots.pdf"
      link.click()
      
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
      alert("Failed to convert images to PDF. Please try again.")
    }

    setIsProcessing(false)
  }

  const toolContent = getToolContent("screenshot-to-pdf")

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Screenshot to PDF</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert multiple images to PDF with each image as a page</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8">
          <div id="ad-top"></div>
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8 mb-6">
          {/* Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Upload Images (PNG, JPG)</label>
            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all cursor-pointer">
              <input type="file" accept="image/png,image/jpeg,image/jpg" multiple onChange={handleImageUpload} className="hidden" id="image-upload" />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-300 font-medium">Click to upload images</p>
                <p className="text-gray-500 text-sm mt-1">Supports PNG, JPG (multiple files allowed)</p>
              </label>
            </div>
          </div>

          {/* Images Grid */}
          {images.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-white">Images ({images.length})</label>
                <button
                  type="button"
                  onClick={() => setImages([])}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={image.id} className="relative bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                    <img src={image.url} alt={`Page ${index + 1}`} className="w-full h-32 object-cover" />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        type="button"
                        onClick={() => moveImage(index, "up")}
                        disabled={index === 0}
                        className="p-1 bg-black/50 rounded text-white hover:bg-black/70 disabled:opacity-30"
                      >
                        <ArrowUp className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage(index, "down")}
                        disabled={index === images.length - 1}
                        className="p-1 bg-black/50 rounded text-white hover:bg-black/70 disabled:opacity-30"
                      >
                        <ArrowDown className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="p-1 bg-red-500/50 rounded text-white hover:bg-red-500/70"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-xs text-white">
                      Page {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Convert Button */}
          <button
            type="button"
            onClick={convertToPdf}
            disabled={images.length === 0 || isProcessing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg disabled:opacity-50 disabled:hover:scale-100"
          >
            {isProcessing ? "Converting..." : "Convert to PDF"}
          </button>
        </div>

        {/* Single bottom ad */}
        <div className="ad-slot mt-8">
          <div id="ad-bottom"></div>
        </div>

        {/* How to Use Section */}
        <HowToUse steps={[
          "Click 'Upload Images' and select multiple PNG or JPG files",
          "Arrange the order using up/down arrows on each image",
          "Remove unwanted images with the trash icon",
          "Click 'Convert to PDF' to create your PDF",
          "Download the PDF with each image as a separate page"
        ]} />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/screenshot-to-pdf" toolName="Screenshot to PDF" />

        {/* FAQ Section */}
        <RelatedTools
          toolName="Screenshot to PDF"
          faqs={[
            {
              question: "How does screenshot to PDF conversion work?",
              answer: "The tool uses pdf-lib to create a new PDF document and embeds each uploaded image as a separate page. Images are automatically scaled to fit the page while maintaining their aspect ratio."
            },
            {
              question: "Can I arrange the order of images?",
              answer: "Yes, use the up and down arrows on each image to rearrange their order. The top image will be page 1, the second will be page 2, and so on."
            },
            {
              question: "What image formats are supported?",
              answer: "The tool supports PNG and JPG/JPEG formats. These are the most common screenshot formats and work best for PDF conversion."
            },
            {
              question: "Is my image data private?",
              answer: "Yes, all processing happens locally in your browser. Your images are never uploaded to any server. The PDF conversion is performed entirely client-side for maximum privacy."
            }
          ]}
        />

        {/* Social Share */}
        <SocialShare title="Screenshot to PDF - Convert images to PDF" />
        <ToolContent content={toolContent} toolName="Screenshot To Pdf" toolPath="/tools/screenshot-to-pdf" />
        <RelatedTools currentToolPath="/tools/screenshot-to-pdf" currentCategory={toolContent.category} />

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