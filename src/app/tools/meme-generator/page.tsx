"use client"

import { useState } from "react"
import { Upload, Download, Smile } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function MemeGenerator() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [topText, setTopText] = useState("")
  const [bottomText, setBottomText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setImageFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const generateMeme = async () => {
    if (!imageFile || !preview) return

    setIsProcessing(true)

    try {
      const img = new Image()
      img.src = preview
      
      await new Promise((resolve) => {
        img.onload = resolve
      })

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        throw new Error('Could not get canvas context')
      }

      canvas.width = img.width
      canvas.height = img.height
      
      ctx.drawImage(img, 0, 0)

      ctx.fillStyle = 'white'
      ctx.strokeStyle = 'black'
      ctx.lineWidth = Math.max(2, img.width / 150)
      ctx.font = `bold ${img.width / 10}px Impact, Arial Black, sans-serif`
      ctx.textAlign = 'center'

      if (topText) {
        const text = topText.toUpperCase()
        const y = img.height * 0.15
        ctx.strokeText(text, canvas.width / 2, y)
        ctx.fillText(text, canvas.width / 2, y)
      }

      if (bottomText) {
        const text = bottomText.toUpperCase()
        const y = img.height * 0.9
        ctx.strokeText(text, canvas.width / 2, y)
        ctx.fillText(text, canvas.width / 2, y)
      }

      const dataUrl = canvas.toDataURL('image/png')
      
      const response = await fetch(dataUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `meme-${imageFile.name}`
      link.click()
      
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating meme:', error)
      alert('Error generating meme. Please try again.')
    }

    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Meme Generator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Create memes instantly</p>
        
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

          {/* Text Inputs */}
          {imageFile && (
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Top Text</label>
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                  placeholder="TOP TEXT"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Bottom Text</label>
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                  placeholder="BOTTOM TEXT"
                />
              </div>
            </div>
          )}

          {/* Preview */}
          {preview && (
            <div className="mb-6">
              <h3 className="font-medium mb-4 text-white">Preview</h3>
              <div className="relative inline-block">
                <img src={preview} alt="Preview" className="w-full max-w-md mx-auto rounded-xl" />
                {topText && (
                  <div className="absolute top-4 left-0 right-0 text-center text-white text-2xl font-bold drop-shadow-lg">
                    {topText.toUpperCase()}
                  </div>
                )}
                {bottomText && (
                  <div className="absolute bottom-4 left-0 right-0 text-center text-white text-2xl font-bold drop-shadow-lg">
                    {bottomText.toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={generateMeme}
            disabled={!imageFile || isProcessing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            {isProcessing ? "Generating..." : "Generate Meme"}
          </button>
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <AdSlot adSlot="2000000020" className="w-full max-w-2xl" />
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
