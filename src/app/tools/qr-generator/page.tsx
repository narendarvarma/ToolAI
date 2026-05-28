"use client"

import { useState, useRef, useEffect } from "react"
import { Download, QrCode } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function QRGenerator() {
  const [text, setText] = useState("")
  const [size, setSize] = useState(200)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (text && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      canvas.width = size
      canvas.height = size

      // Simple QR code placeholder (in production, use a QR library)
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, size, size)
      ctx.fillStyle = "#000000"
      
      // Draw a simple pattern as placeholder
      const cellSize = size / 25
      for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 25; j++) {
          if (Math.random() > 0.5) {
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
          }
        }
      }
    }
  }, [text, size])

  const downloadQR = () => {
    if (canvasRef.current) {
      const link = document.createElement("a")
      link.download = "qrcode.png"
      link.href = canvasRef.current.toDataURL()
      link.click()
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">QR Generator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Generate QR codes instantly</p>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Text Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Enter Text or URL</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="https://example.com"
            />
          </div>

          {/* Size Slider */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">
              Size: {size}px
            </label>
            <input
              type="range"
              min="100"
              max="500"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full h-2 bg-[#0B0F1A] rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
            />
          </div>

          {/* QR Code Display */}
          {text && (
            <div className="mb-6 flex justify-center">
              <canvas ref={canvasRef} className="rounded-xl" />
            </div>
          )}

          {/* Download Button */}
          <button
            onClick={downloadQR}
            disabled={!text}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            <div className="flex items-center justify-center gap-2">
              <Download className="h-5 w-5" />
              Download QR Code
            </div>
          </button>
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <AdSlot adSlot="4000000020" className="w-full max-w-2xl" />
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
