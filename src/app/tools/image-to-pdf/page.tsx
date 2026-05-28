"use client"

import { useState } from "react"
import { Upload, Download, Image as ImageIcon, X } from "lucide-react"
import { jsPDF } from "jspdf"
import AdSlot from "@/components/ad-slot"

export default function ImageToPDF() {
  const [images, setImages] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    setImages(prev => [...prev, ...imageFiles])
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const convertToPDF = async () => {
    if (images.length === 0) return

    setIsProcessing(true)

    try {
      const pdf = new jsPDF()
      
      for (let i = 0; i < images.length; i++) {
        const file = images[i]
        const imageData = await fileToDataURL(file)
        
        if (i > 0) {
          pdf.addPage()
        }
        
        const imgProps = await pdf.getImageProperties(imageData)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
        
        pdf.addImage(imageData, 'JPEG', 0, 0, pdfWidth, pdfHeight)
      }

      pdf.save('converted.pdf')
      alert('Images converted to PDF successfully!')
    } catch (error) {
      console.error('Error converting to PDF:', error)
      alert('Error converting to PDF. Please try again.')
    }

    setIsProcessing(false)
  }

  const fileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Image to PDF</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert images to PDF format</p>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Upload Images</label>
            <div className="border-2 border-dashed border-white/8 rounded-xl p-8 text-center hover:border-[#3B82F6] hover:bg-[#3B82F6]/5 transition-all">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500 mt-2">PNG, JPG, JPEG, WebP</p>
              </label>
            </div>
          </div>

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-4 text-white">Selected Images ({images.length})</h3>
              <div className="grid grid-cols-3 gap-4">
                {images.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-32 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Convert Button */}
          <button
            onClick={convertToPDF}
            disabled={images.length === 0 || isProcessing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            {isProcessing ? "Converting..." : "Convert to PDF"}
          </button>
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
