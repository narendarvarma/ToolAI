"use client"

import { useState } from "react"
import { Upload, Download, Eraser } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function BackgroundRemover() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setImageFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const removeBackground = async () => {
    if (!imageFile || !preview) return

    setIsProcessing(true)
    // Placeholder for background removal logic
    // In production, this would use remove.bg API or similar
    setTimeout(() => {
      setIsProcessing(false)
      alert("Background removal would be implemented here with remove.bg API or similar service")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Background Remover</h1>
        <p className="text-gray-400 text-base text-center mb-8">Remove image backgrounds instantly</p>
        
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
                <p className="text-sm text-gray-500 mt-2">PNG, JPG, JPEG, WebP</p>
              </label>
            </div>
          </div>

          {/* Preview */}
          {preview && (
            <div className="mb-6">
              <h3 className="font-medium mb-4 text-white">Preview</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Original</p>
                  <img src={preview} alt="Original" className="w-full rounded-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Result</p>
                  <div className="w-full h-64 bg-white/5 rounded-xl border border-[#00E5FF]/20 flex items-center justify-center">
                    <Eraser className="h-12 w-12 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Remove Button */}
          <button
            onClick={removeBackground}
            disabled={!imageFile || isProcessing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            {isProcessing ? "Removing Background..." : "Remove Background"}
          </button>
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <AdSlot adSlot="2000000002" className="w-full max-w-2xl" />
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
