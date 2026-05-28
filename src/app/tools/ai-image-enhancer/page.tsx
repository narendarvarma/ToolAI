"use client"

import { useState } from "react"
import { Upload, Download, Sparkles } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import { tokenManager } from "@/lib/token-manager"

export default function AIImageEnhancer() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [enhancementType, setEnhancementType] = useState("upscale")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setImageFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const enhanceImage = async () => {
    if (!imageFile || !preview) return

    // Check token limit (estimate: ~1000 tokens for this operation)
    const estimatedTokens = 1000
    if (!tokenManager.canUseTokens(estimatedTokens)) {
      alert(`Daily token limit reached. You have ${tokenManager.getRemainingTokens()} tokens remaining. Tokens reset daily at midnight.`)
      return
    }

    setIsProcessing(true)

    try {
      // Convert image to base64
      const reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.onload = async () => {
        const base64Image = reader.result as string

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'anthropic/claude-3.5-sonnet',
            messages: [
              {
                role: 'system',
                content: 'You are an AI image enhancement assistant. Analyze the uploaded image and provide specific, actionable suggestions for the requested enhancement type. Give practical tips that can be implemented using common image editing tools.'
              },
              {
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: `I want to ${enhancementType} this image. Please analyze it and provide specific enhancement suggestions. Give practical tips that can be implemented.`
                  },
                  {
                    type: 'image_url',
                    image_url: {
                      url: base64Image
                    }
                  }
                ]
              }
            ],
            max_tokens: 2000,
          }),
        })

        const data = await response.json()
        
        if (data.choices && data.choices[0]) {
          const analysis = data.choices[0].message.content
          alert(`AI Analysis:\n\n${analysis}\n\nNote: For actual image processing, you would need a dedicated image AI API. This tool provides expert analysis and suggestions.`)
          // Deduct tokens
          tokenManager.useTokens(estimatedTokens)
        } else {
          throw new Error('No response from AI')
        }
      }
    } catch (error) {
      console.error('Error enhancing image:', error)
      alert('Error enhancing image. Please check your API key and try again.')
    }

    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">AI Image Enhancer</h1>
        <p className="text-gray-400 text-base text-center mb-8">Enhance and upscale images with AI</p>
        
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

          {/* Enhancement Type */}
          {imageFile && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white">Enhancement Type</label>
              <select
                value={enhancementType}
                onChange={(e) => setEnhancementType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              >
                <option value="upscale">Upscale (2x)</option>
                <option value="upscale-4x">Upscale (4x)</option>
                <option value="denoise">Remove Noise</option>
                <option value="sharpen">Sharpen</option>
                <option value="enhance">General Enhancement</option>
              </select>
            </div>
          )}

          {/* Preview */}
          {preview && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white">Preview</label>
              <img src={preview} alt="Preview" className="w-full max-w-md mx-auto rounded-xl" />
            </div>
          )}

          {/* Enhance Button */}
          <button
            onClick={enhanceImage}
            disabled={!imageFile || isProcessing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5" />
              {isProcessing ? "Enhancing..." : "Enhance Image"}
            </div>
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
